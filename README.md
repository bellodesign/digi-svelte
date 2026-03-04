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

## Merging from a colleague fork

If a colleague has changes in a fork, you can merge them into this repository with a temporary remote:

```sh
# add fork as a temporary remote
git remote add oliie https://github.com/oliie/digi-svelte.git

# fetch fork branches
git fetch oliie --prune

# merge fork main into your current main
git checkout main
git merge oliie/main

# push merged result
git push origin main
```

When you are done, remove the temporary remote:

```sh
git remote remove oliie
```
