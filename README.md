# The Copper Spoon — restref demo

A small static restaurant website for testing OpenTable restref widgets.

## Live site

- Home (floating widget): https://richielee-ot.github.io/restaurant-website-demo/
- Reservations (embedded widget): https://richielee-ot.github.io/restaurant-website-demo/reservations.html
- Settings (snippets): https://richielee-ot.github.io/restaurant-website-demo/settings.html

## How to demo

1. Open **Settings** to copy or inspect the two snippets.
2. Edit a snippet on **Settings** and Save. Home, Reservations, and Settings all read that snippet from this browser.
3. The floating snippet is written into the **site header**. The embedded snippet is written into the reservations page body.

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
