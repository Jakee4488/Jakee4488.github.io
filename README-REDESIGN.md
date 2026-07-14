# Portfolio redesign — `redesign/pipeline`

A full rebuild of `Jakee4488.github.io`, driven by the content of `Jacob_Cv_v8_4.pdf`.

## The idea

The page is a **pipeline run**. A DAG rail sits on the left; each section is a stage node.
As you scroll, the connector fills and stages flip from queued → running → passed. The hero
opens on `engineer.yaml` — a manifest that describes the engineer the way he'd describe a
deployment. Structure carries meaning rather than decorating it.

- **Palette** — deep navy ink (`#0a1020`), signal amber (`#f2a33c`), status mint (`#46d6a8`).
  Amber and navy come straight off the CV; mint is the "passed" colour every CI system uses.
- **Type** — Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (data, labels, YAML).
  Plex is IBM's enterprise-engineering face; it belongs in this world.
- **Motion** — one orchestrated device (the rail) plus quiet scroll reveals. `prefers-reduced-motion`
  is respected.

## Files

```
index.html              new single-page site
styles.css              replaces the old stylesheet entirely
main.js                 rail progress, active stage, reveals (new file)
assets/images/Jacob.jpg unchanged, copied from main
assets/pdfs/Jacob_Cv_v8_4.pdf   latest CV, linked from the hero + nav
```

## Putting it on a branch

From your local clone of the repo:

```bash
git checkout main
git pull
git checkout -b redesign/pipeline

# copy the files from this folder over the repo root, then:
git add index.html styles.css main.js assets/pdfs/Jacob_Cv_v8_4.pdf
git commit -m "Redesign portfolio: pipeline-run layout driven by CV content"
git push -u origin redesign/pipeline
```

Preview it with GitHub Pages by pointing Pages at the branch in
**Settings → Pages → Build and deployment → Branch**, or just open `index.html` locally.
When you're happy: open a PR into `main` and merge.

The old `script.js` doesn't exist in `main` and the old markup depended on AOS + Font Awesome —
neither is needed now, so nothing else has to be deleted. `styles.css` is fully overwritten.

## Content notes

Fixed while transcribing from the CV — worth correcting on the CV itself too:

- "Malayakam" → **Malayalam**
- "CewAI" → **CrewAI**
- "Kottyam" → **Kottayam**
- "Claude.Llama" → **Claude, Llama**
- Two Key Achievements on the CV are missing their numbers ("Cut deployment failures by ___",
  "Achieved ___ increase in analytics throughput"). I did **not** invent figures — the site's stats
  strip only uses numbers that actually appear on the CV (80%, 30 hrs, 100%, First Class).
- "Open Claw" and "Anti-Gravity CLI" were left off the skills list — tell me what they should read as
  and I'll add them back.
