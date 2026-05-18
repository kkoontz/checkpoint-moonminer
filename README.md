# Moon Miner

Moon Miner — click the cheese moon, buy upgrades, and automate your lunar mining empire.

## Game variants

| Page | Theme |
|------|--------|
| [`index.html`](index.html) | **Moon Miner** — cheese moon, sunny HUD, Knife / Mousetronaut upgrades |
| [`void-harvest.html`](void-harvest.html) | **Void Harvest** — obsidian moon, cyber palette, Plasma Pick / Wisp Drone upgrades |

Same mechanics on both pages; separate saves (each page has its own in-memory state).

## Run locally

Open `index.html` or `void-harvest.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

Then visit the URL shown (usually `http://localhost:3000`).

## How to play

1. Click the moon to earn **cheese**.
2. Buy **click upgrades** (Knife, Cheese Cart) to increase cheese per click.
3. Buy **automatic upgrades** (Mousetronaut, Lunar Rover) to earn cheese every 3 seconds.
4. Upgrade prices increase after each purchase.

## Tech stack

- HTML5
- Bootstrap 5
- Vanilla JavaScript (`app.js`)
- Custom CSS (`style.css`)

## Checkpoint requirements

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Click image to collect resource | Yes |
| 2 | Current resource total always displayed | Yes |
| 3 | At least 4 upgrades | Yes |
| 4 | At least 1 click-power upgrade | Yes |
| 5 | At least 1 automatic-interval upgrade | Yes |
| 6 | Quantity of each upgrade visible | Yes |
| 7 | Total per click and per interval displayed | Yes |
| 8 | Automatic upgrades every 3 seconds | Yes |
| 9 | Cannot buy without enough resource | Yes |
| 10 | Purchase deducts price | Yes |
| 11 | Different bonus values and prices | Yes |
| 12 | Price increases after purchase | Yes |

## Git workflow

Work happens on `main`. After each milestone (layout, core loop, upgrades, auto tick, styling, docs), commit and push:

```bash
git add -A
git commit -m "describe the milestone"
git push origin main
```

## Links

- [Course checkpoint](https://course.codeworksacademy.com/fullstack/docs/unit-02/checkpoint-moonminer)
- [Instructor demo](https://kevin-koontz.github.io/moon-miner/)
