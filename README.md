# React Next Pokedex

## Context

A Pokédex is a tool/device that allows Pokémon trainers to learn more about Pokémon, where they live, how they behave and interact with trainers, their environment and other Pokémon.

A Pokédex is particularly useful in the context of catching and learning from Pokémon. To a lesser extent, Pokémon trainers use it to devise their battle strategy (i.e. types, evolutions and other species-level characteristics: it can’t provide much insight to an individual Pokémon’s details).

## App

This App display a list of pokemons and their individual detail using [PokeAPI](https://pokeapi.co)

The App allows you to:

- Main View: Search by name, including fuzzy matching
- Main View: Filter by type, including combinations
- Main View: Filter by favourites
- Main View: remove from favourites
- Main View: Filter by game/version
- Main View: add to favourites
- Main View: Paginate with 20 entries per page
- Detail View: Display a detail of each Pokémon, the following fields are part of the entry view:
  - Abilities
  - Stats
  - Types
  - Versions (games) where it appears
  - Held items
  - Exp.
  - Height
  - Weight
- Detail View: add to favourites
- Detail View: remove from favourites

This app integrates [Next.js](https://nextjs.org/) with [Typescript](https://www.typescriptlang.org/), [Redux Toolkit](https://redux-toolkit.js.org) and [Material-UI](https://mui.com/).

\*The **Redux Toolkit** is a standardized way to write Redux logic (create actions and reducers, setup the store with some default middlewares like redux devtools extension).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/luisignaciocc/react-next-pokedex)

## Development

Clone the repository:

```bash
https://github.com/luisignaciocc/react-next-pokedex.git
cd react-next-pokedex
```

Install the dependencies:

```bash
npm install
#or
yarn
```

Start the development server:

```bash
npm run dev
#or
yarn dev
```

Deploy it to the cloud with [Vercel](https://nextjs.org/docs/deployment).
