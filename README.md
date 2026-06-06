# Astro Kings

Booking site for **Astro Kings** — Nottingham's 5-a-side football centre on Wigman Rd.
A dark *stadium-night / liquid-glass* design: four floodlit 4G pitches, a real multi-step
booking flow, leagues, memberships and a player dashboard.

Built as a React + Vite + Tailwind implementation of the Claude Design prototype.

## Run it

```bash
npm install
npm run dev        # local dev server (Vite)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Screens

Hash-routed (`#home`, `#browse`, …) so it deploys as a static site anywhere:

| Route        | Page                                                            |
| ------------ | --------------------------------------------------------------- |
| `#home`      | Floodlit hero (looping reference video) + quick-book + sections |
| `#browse`    | Find a pitch — format/day/time filters + availability list      |
| `#venue`     | Pitch detail — gallery, specs, reviews, sticky booking card     |
| `#booking`   | 4-step flow: slot → details/add-ons → payment → confirmation    |
| `#dashboard` | My bookings — upcoming games, team payment splits, loyalty      |
| `#pricing`   | Pitch hire prices + memberships                                 |
| `#leagues`   | Leagues & tournaments + live table                              |
| `#about`     | About, events & contact                                         |
| `#login`     | Log in / sign up                                                |

## Structure

```
src/
  index.css            design system (CSS variables, liquid glass, backdrop)
  main.jsx  App.jsx     mount + stage + router/page switch
  lib/                  data.js · icons.jsx · router.js
  components/           ui.jsx (glass, buttons, fields…) · Nav.jsx (navbar + footer)
  pages/                Home · Browse · Venue · Booking · Dashboard · Pricing · Leagues · About · Auth
  assets/               brand logo
```

## Design notes

- **Brand:** coral accent `#E8645A`, driven by the `--accent` CSS variable.
- **Liquid glass:** translucent panels with `backdrop-blur` + saturate, hairline borders,
  inset specular sheen and layered shadows. Depth is controlled by `data-glass` on `<html>`
  (`subtle` / `medium` / `heavy`, default `heavy`).
- **Surface:** near-black `#06090A` base with floodlight radial glows, a faint pitch-line
  grid and film grain (`data-grain` on `<html>`).
- **Imagery** is intentionally left as labelled placeholders (`pitch photo · wide`, etc.) and a
  reference hero video — swap in real footage/photos and it reads as finished.

The prototype's review-only scaffolding (the Tweaks panel and screen jumper) was dropped for
this real build; the home hero uses the default "stacked" layout.
