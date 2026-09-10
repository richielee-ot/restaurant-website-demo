# The Copper Spoon — restref demo

A small static restaurant website for testing OpenTable restref widgets.

## Live site

- Home (floating widget): https://richielee-ot.github.io/restaurant-website-demo/
- Reservations (embedded widget): https://richielee-ot.github.io/restaurant-website-demo/reservations.html
- Settings (snippets): https://richielee-ot.github.io/restaurant-website-demo/settings.html

## How to demo

1. Open **Settings**. Confirm the two snippets, or paste replacements and save. Saves stay in this browser only.
2. Open **Home**. The Home Page Widget is the floating restref implementation (`widgetMode=floating`). Look for the OpenTable overlay button.
3. Open **Reservations**. The Reservation Page Widget is the embedded restref implementation (`widgetMode=embedded`) in the page body.

## Default snippets

Home Page Widget:

```html
<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=floating&ot_source=Restaurant%20website'></script>
```

Reservation Page Widget:

```html
<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=embedded&ot_source=Restaurant%20website'></script>
```

## Run locally

The widget scripts use protocol-relative URLs, so serve over HTTP rather than opening the HTML files directly:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000, http://localhost:8000/reservations.html, and http://localhost:8000/settings.html.
