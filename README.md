# my-registry

A personal component registry — a collection of UI animations, scroll effects, Lottie
integrations, and 3D components, recreated from things I found interesting around the web.

The site itself is both the showcase (live preview + source + install instructions) and the
registry source. It is [shadcn registry](https://ui.shadcn.com/docs/registry) compatible, so
any component here installs into another project with the official `shadcn` CLI.

## Using a component in another project

The target project needs to be a React + Tailwind project that has been initialized once:

```bash
npx shadcn@latest init -y -p nova
```

Then pick whichever of these fits:

### 1. Namespace (nicest once set up)

Register this registry in the target project a single time:

```bash
npx shadcn@latest registry add '@my-registry=https://my-registry-cylll.vercel.app/r/{name}.json'
```

After that, install by short name:

```bash
npx shadcn@latest add @my-registry/animated-button
```

### 2. Full URL (no setup)

```bash
npx shadcn@latest add https://my-registry-cylll.vercel.app/r/animated-button.json
```

### 3. Local relative path (no server, no deployment)

If the target project sits next to this repo on disk:

```bash
npx shadcn@latest add ../my-registry/public/r/animated-button.json
```

Only **relative** paths work here — absolute Windows paths (`C:/...`) are parsed as a URL
scheme and `file://` URLs are not implemented by the CLI.

Any of these writes the component source into the target project's `components/<category>/`
folder and installs its npm dependencies. Nothing is fetched at runtime afterwards — the
component is a plain local file from then on.

## Adding a new component

```bash
npm run new -- <category> <name> "<title>" "<description>" [npm-deps...]
```

Example:

```bash
npm run new -- ui-animations magnetic-button "Magnetic Button" "Button drifts toward the cursor." motion
```

This scaffolds `registry/<category>/<name>/{<name>.tsx, demo.tsx}`, adds the entry to
`registry.json`, and registers the demo in `components/site/component-preview.tsx`.

Then:

1. Write the real implementation in `registry/<category>/<name>/<name>.tsx`
2. `npm install <deps>` if it needs new packages
3. Adjust `demo.tsx` so the preview shows the component off well
4. `npm run dev` and check the Preview / Code / Install tabs
5. `npm run registry:build` to regenerate `public/r/*.json`

Categories are fixed to `ui-animations`, `scroll`, `lottie`, and `three` — they are defined in
`lib/registry.ts` (`CATEGORIES`) and validated in `scripts/new-component.mjs`.

## Development

```bash
npm run dev             # site at http://localhost:3000
npm run registry:build  # regenerate public/r/*.json from registry.json
npm run lint
npx tsc --noEmit
```

`public/r/` is a build artifact but **is committed** — it is what the CLI fetches.
Re-run `npm run registry:build` and commit the result whenever a component changes.

## Layout

```
registry/<category>/<name>/   component source + its demo
registry.json                 registry manifest (input to `shadcn build`)
public/r/*.json               generated registry items (what the CLI fetches)
app/docs/[category]/[component]/  component detail page
components/site/              the showcase site's own UI
scripts/new-component.mjs     scaffolding for new components
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn CLI · motion · GSAP ·
lottie-react · three / react-three-fiber / drei · shiki
