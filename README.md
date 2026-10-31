# hollowbrookroasters.com

The website for Hollowbrook Roasters — our coffees, the subscription, wholesale, café hours
and brew guides. Live at https://hollowbrookroasters.com.

## How it's built

Plain HTML, one stylesheet and one small script. No framework, no build step, nothing to
install.

```
index.html              home
coffees.html            current lineup and prices
subscription.html       how the subscription works + the sign-up form
wholesale.html          wholesale info and price guide
cafe.html               café hours, address, parking
about.html
contact.html
brew-guides/            brew guides index + one .html file per guide
404.html                GitHub Pages serves this for any missing path
css/style.css           all the styles
js/main.js              mobile menu, "open now" badge, subscription price summary
images/                 logo and illustrations (hand-drawn SVG)
sitemap.xml, robots.txt
llms.txt                short summary of the site and its pages for AI assistants
CNAME                   custom domain for GitHub Pages
```

Every page has its own copy of the header and footer. If you change a nav link, the address,
the hours or anything else in the footer, change it in **every** `.html` file (a quick
`grep -rl "Haywood Road" --include=*.html .` finds them all). Café hours also live in
`js/main.js` (`HOURS`) for the "open now" badge, and the subscription price per bag is
`PRICE_PER_BAG` in the same file.

The forms open the visitor's email client (`mailto:`); there is no backend.

## Running it locally

Links are root-relative (`/coffees.html`), so serve the folder rather than opening files
directly:

```bash
python3 -m http.server 8000     # http://localhost:8000
# or
npx serve .
```

## Adding a brew guide

1. Copy `brew-guides/v60-pour-over.html` to `brew-guides/<slug>.html` and write the guide.
   Update the `<title>`, meta description and canonical URL at the top.
2. Add it to the list in `brew-guides/index.html`.
3. Add its URL to `sitemap.xml`, with a `<lastmod>` set to the date of the commit.

Whenever you change a page, update its `<lastmod>` in `sitemap.xml` to the date of that
change (`git log -1 --format=%cs -- <file>` prints the last commit date for a file).

## Deploying

GitHub Pages publishes the root of `main` to hollowbrookroasters.com (Settings → Pages,
"Deploy from a branch", `main` / root). Every push to `main` is live within a minute or two;
there are no preview deploys, so open a pull request and check it locally first.

Questions: ask Eli.
