# Digi-Svelte

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Kända problem och begränsningar — Stencil web components i Svelte

Digi-komponenterna är byggda med Stencil.js som web components. Integrationen fungerar, men det finns ett antal kända quirks och begränsningar att känna till.

### 1. SSR är inaktiverat — stor begränsning

`ssr = false` i `src/routes/+layout.ts` löser krasch-problemet (Stencil kräver `window` och `customElements`), men innebär:

- Ingen server-side rendering — sidan är en ren SPA
- Sämre SEO och initialladdningstid (blank sida tills JS laddats)
- `prerender = true` genererar statisk HTML men innehållet renderas fortfarande i webbläsaren

Stencil stödjer inte SSR/hydration utan specialhantering. Det är Digi-teamets ansvar att lösa.

### 2. Events är dubbelwrappade

Stencil re-emittar native DOM-events inuti `CustomEvent.detail` istället för att exponera värdet direkt. Det gör event-handlers onödigt komplexa:

```ts
onafOnInput={(e) => {
  name = ((e as CustomEvent).detail as InputEvent)?.target
    ? (((e as CustomEvent).detail as InputEvent).target as HTMLInputElement).value
    : '';
}}
```

Jämför med vad man förväntar sig:

```ts
onafOnInput={(e) => { name = (e as CustomEvent<string>).detail }}
```

Se `src/routes/form/+page.svelte` för verkliga exempel.

### 3. Ingen tvåvägsbindning med `bind:`

Svelte's `bind:value` fungerar inte mot web components. Man måste göra det manuellt:

```svelte
<digi-form-input
  af-value={name}
  onafOnInput={(e) => { name = ... }}
/>
```

Det fungerar, men är mer verbost och känsligare för event-strukturen ovan.

### 4. Komplexa props (objekt/arrayer) kan inte passas som attribut

HTML-attribut är strängar. Komplexa typer som `Date` och `Date[]` kräver property-assignment, inte `setAttribute`. Det finns tre alternativ — med olika avvägningar:

| Approach | TypeScript | Runtime |
|---|---|---|
| `af-min-date={date}` (kebab) | OK (finns i typen) | Fel — `setAttribute` stringifierar till `"[object Object]"` |
| `afMinDate={date}` (camelCase) | TS-fel (`does not exist in type`) | OK |
| `bind:this` + `$effect` | OK | OK |

Svelte 5 avgör setAttribute vs property-assignment med `prop in element`. Kebab-case (`af-min-date`) finns inte som JS-property → `setAttribute` anropas → stringifiering. CamelCase (`afMinDate`) finns som getter/setter på Stencil-elementet → property-assignment fungerar korrekt.

**Enklaste lösningen i praktiken: camelCase direkt i templaten** — fungerar, men ger ett TS-fel:

```svelte
<digi-calendar-datepicker afMinDate={minDate} />
```

**Fullt typsäker lösning: `bind:this` + `$effect`** — mer verbose men utan TS-fel:

```svelte
<script>
  let datepickerEl = $state<HTMLElement | null>(null);
  $effect(() => {
    if (!datepickerEl) return;
    (datepickerEl as HTMLElement & { afMinDate: Date }).afMinDate = new Date();
  });
</script>

<digi-calendar-datepicker bind:this={datepickerEl} />
```

**Bästa långsiktiga lösningen:** Uppdatera [`scripts/generate-digi-types.js`](scripts/generate-digi-types.js) så att `DigiProps` även exponerar camelCase-varianter för icke-primitiva typer. Då fungerar `afMinDate={minDate}` direkt utan TS-fel och utan `bind:this`-omväg.

Testat i `src/routes/form/+page.svelte` med `afMinDate` (begränsar valbara datum till idag och framåt).

### 5. Shadow DOM blockerar global CSS

Tailwind-klasser och globala CSS-regler kan inte nå in i Stencil-komponenternas Shadow DOM. Styling sker uteslutande via CSS custom properties — vilket Digi har designat för. Det är en hård begränsning: man kan inte överskriva interna stilar utan att Digi exponerar tokens för det.

### 6. TypeScript-typer kräver underhåll

Genererade typer i `src/digi-elements.d.ts` löser TS-feltypningarna men:

- Måste regenereras vid varje Digi-paketuppdatering (`node scripts/generate-digi-types.js`)
- Event-typer för `onafOnClick` m.fl. är inte alltid precisa — casts till `HTMLElement & { value: string }` förekommer

### Sammanfattning

| Problem | Svårighetsgrad | Status |
|---|---|---|
| SSR-stöd saknas | Hög | Workaround (`ssr = false`) |
| Dubbelwrappade events | Medium | Manuell hantering, se `/form` |
| Ingen `bind:` | Låg–Medium | Manuell hantering |
| Objekt/array-props | Låg | Fungerar via Svelte 5 property-binding |
| Shadow DOM / CSS | Låg | Designat för tokens |
| TS-typ-underhåll | Låg | Script finns |

Det primära bekymret på sikt är **SSR** — allt annat är hanterbara ergonomiproblem.
