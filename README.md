# Digi-Svelte

## ⚠️ Temporär demo-konfiguration

Navigationen är begränsad till enbart Tabell-sidan för demo. Återställ dessa filer för att få tillbaka alla routes:

- `src/lib/constants/index.ts` — återställ `NAV_ITEMS` med alla routes
- `src/routes/+page.ts` — ta bort redirect, återställ `export const prerender = true;`
- `src/routes/+layout.ts` — ta bort redirect-logiken, behåll bara `ssr = false` och `prerender = false`

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

`prerender = false` är satt globalt eftersom sidor med dynamiska route-parametrar (t.ex. `/sok?q=...`) inte kan prerendereras.

Stencil stödjer inte SSR/hydration utan specialhantering.

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

| Approach                       | TypeScript                        | Runtime                                                     |
| ------------------------------ | --------------------------------- | ----------------------------------------------------------- |
| `af-min-date={date}` (kebab)   | OK (finns i typen)                | Fel — `setAttribute` stringifierar till `"[object Object]"` |
| `afMinDate={date}` (camelCase) | TS-fel (`does not exist in type`) | OK                                                          |
| `bind:this` + `$effect`        | OK                                | OK                                                          |

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

### 5. TypeScript-typer kräver underhåll

Genererade typer i `src/digi-elements.d.ts` löser TS-feltypningarna men:

- Måste regenereras vid varje Digi-paketuppdatering (`node scripts/generate-digi-types.js`)
- Event-typer för `onafOnClick` m.fl. är inte alltid precisa — casts till `HTMLElement & { value: string }` förekommer

### Sammanfattning

| Problem               | Svårighetsgrad | Status                                 |
| --------------------- | -------------- | -------------------------------------- |
| SSR-stöd saknas       | Hög            | Workaround (`ssr = false`)             |
| Dubbelwrappade events | Medium         | Manuell hantering, se `/form`          |
| Ingen `bind:`         | Låg–Medium     | Manuell hantering                      |
| Objekt/array-props    | Låg            | Fungerar via Svelte 5 property-binding |
| TS-typ-underhåll      | Låg            | Script finns                           |

Det primära bekymret på sikt är **SSR** — allt annat är hanterbara ergonomiproblem.

---

## Netlify-driftsättning — problem och lösningar

### CORS / Private Network Access — API-anrop blockerades i webbläsaren

**Problem:** `jobsearch.api.jobtechdev.se` resolvar till en privat IP-adress. Moderna webbläsare blockerar anrop från publika sajter till privata adresser (Private Network Access-policy). Felet i konsolen:

```
Access to fetch at 'https://jobsearch.api.jobtechdev.se/search' blocked by CORS policy:
Permission was denied for this request to access the `local` address space.
```

**Orsak:** Söksidans load-funktion låg i `+page.ts` (universal load) — den körs i webbläsaren vid klientnavigering, vilket triggade blockeringen.

**Lösning:** Byt till `+page.server.ts` (server-only load). Anropet sker då via Netlify Functions istället för från webbläsaren.

---

### adapter-static fungerar inte med dynamiska rutter

**Problem:** Projektet använde `@sveltejs/adapter-static`, som kräver att alla sidor kan prerendereras statiskt. `/sok` är dynamisk (beror på söktermen) → build kraschade.

**Lösning:** Byt till `@sveltejs/adapter-netlify` i `svelte.config.js`. Dynamiska rutter hanteras då av Netlify Functions.

---

### `defineCustomElements` kraschade i Netlify Function

**Problem:** Designsystemets loader (`@designsystem-se/af/loader/index.js`) är ett CommonJS-paket. I Netlify Functions (ESM-kontext) fungerar inte named imports:

```
SyntaxError: Named export 'defineCustomElements' not found.
The requested module is a CommonJS module.
```

**Lösning:** Använd en top-level `if (browser)`-check med dynamisk import i `+layout.svelte`:

```ts
import { browser } from '$app/environment';

if (browser) {
  import('@designsystem-se/af/loader').then((m) => m.defineCustomElements());
}
```

Vite tree-shakar bort server-sökvägen vid build, så importen körs aldrig server-side. På klienten körs den direkt vid modulinitiering (innan komponenten mountas) — snabbare än `onMount` och utan flicker.

> **Obs:** `ssr.noExternal` är ett alternativ men orsakar att Stencil-runtimen bundlas dubbelt (en gång i SSR-bundle, en gång i klient-bundle), vilket ger ett `$instanceValues$`-fel i Stencil.

---

## Stencil lazy loading — hur `defineCustomElements()` fungerar

```ts
import { defineCustomElements } from '@designsystem-se/af/loader';
defineCustomElements();
```

### Vad som händer

`defineCustomElements()` anropar Stencils `bootstrapLazy()` med ett JSON-register över alla ~251 komponenter. Registret innehåller bara **metadata** (komponentnamn, props, events) — ingen komponent-JS laddas in vid anropet.

Stencil registrerar lightweight stubs via `customElements.define()`. Varje stub vet vilket chunk-filnamn som hör till komponenten (`p-*.entry.js`). Chunks laddas in dynamiskt **första gången** browsern stöter på elementet i DOM.

| Resurs                           | Laddning                       |
| -------------------------------- | ------------------------------ |
| JS (komponentlogik, ~251 chunks) | Lazy — per komponent vid behov |
| CSS (alla komponenters stilar)   | Eager — en fil vid sidladdning |

### I development

Vite servar allt från `node_modules` direkt, så chunk-resolvingen fungerar utan konfiguration. Chunks hämtas från `node_modules/@designsystem-se/af/dist/digi-arbetsformedlingen/p-*.entry.js`.

### I produktion — det som kräver åtgärd

Stencils runtime resolvar chunk-URL:er via `resourcesUrl` (standard: `"./"` relativt `document.baseURI`). Det betyder att `p-*.entry.js`-filerna måste ligga tillgängliga på rätt URL i produktionsmiljön — de kopieras **inte** automatiskt av Vite till build-outputen.

#### Alternativ 1 — Kopiera chunks till `static/`

Kopiera hela Stencil-dist till `static/digi/` så att filerna servas som statiska tillgångar:

```sh
cp node_modules/@designsystem-se/af/dist/digi-arbetsformedlingen/p-*.entry.js static/digi/
```

Konfigurera sedan `resourcesUrl` så Stencil vet var den ska leta:

```ts
defineCustomElements(window, { resourcesUrl: '/digi/' });
```

#### Alternativ 2 — Automatisera med `vite-plugin-static-copy`

Installera pluginen:

```sh
npm install -D vite-plugin-static-copy
```

Lägg till i `vite.config.ts`:

```ts
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@designsystem-se/af/dist/digi-arbetsformedlingen/p-*.entry.js',
          dest: 'digi'
        }
      ]
    })
  ]
});
```

Och uppdatera anropet i `+layout.svelte`:

```ts
defineCustomElements(window, { resourcesUrl: '/digi/' });
```

### Verifiera i produktion

Efter `npm run build && npm run preview` — öppna DevTools Network och filtrera på `p-`. Vid navigation till en sida med en Digi-komponent ska en chunk hämtas. Om 404 visas saknas `resourcesUrl`-konfigurationen eller filerna på rätt plats.
