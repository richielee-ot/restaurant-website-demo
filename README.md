# The Copper Spoon — restref demo

A small static restaurant website for testing OpenTable restref widgets. OpenTable teammates can open the live site, see a default snippet, paste their own generated code, or share a URL with a restaurant ID.

## Live site

- Home: https://richielee-ot.github.io/restaurant-website-demo/
- Reservations / widget tester: https://richielee-ot.github.io/restaurant-website-demo/reservations.html

## Default snippet

The reservations page loads this restref-v2 floating widget unless URL params or a pasted snippet override it:

```html
<script type="text/javascript" src="//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=floating&ot_source=Restaurant%20website"></script>
```

The widget is injected into `#restref-mount`. If `widgetMode=floating`, look for the OpenTable overlay button rather than an inline form.

## Paste your own snippet

1. Open the [reservations page](https://richielee-ot.github.io/restaurant-website-demo/reservations.html).
2. Paste a generated `<script>` snippet into **Paste restref snippet**.
3. Click **Load snippet**.

The pasted code runs in the browser only. It is not saved on a server.

## Share a configured link

Use restaurant params instead of pasting markup:

`https://richielee-ot.github.io/restaurant-website-demo/reservations.html?rid=515106&widgetMode=floating`

Optional `domain` (defaults to `www.opentable.co.uk`):

`https://richielee-ot.github.io/restaurant-website-demo/reservations.html?rid=515106&widgetMode=floating&domain=www.opentable.com`

On the reservations page, **Load from params** applies the fields, and **Copy shareable link** copies the URL.

## Run locally

The widget script uses a protocol-relative URL, so serve over HTTP rather than opening the HTML file directly:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 and http://localhost:8000/reservations.html.
