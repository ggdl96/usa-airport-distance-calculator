# USA airport distance calculator

## Installation istructions

node is required (18.19). It can be installed with:
- [NVM](https://github.com/nvm-sh/nvm)
- [N](https://github.com/tj/n)
- [NVM.FISH](https://github.com/jorgebucaran/nvm.fish)

after that you will need to run

```bash
npm i
```

## Getting Started

First, you will need to set up env variables in a .env.local file

```text
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
AIRLABS_API=
AIRLABS_API_KEY=
COUNTRY_CODE=

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Things to improve

- add more tests to have better coverage
- cancel previous requests to avoid making unnecessary calls
- improve map zoom, it must be more dynamic
- improve query params usage, probably better to use URLSearchParams
