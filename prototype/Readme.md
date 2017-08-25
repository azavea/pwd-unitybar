# PWD Unity Bar Prototype

Parameters
- app {parcelViewer, creditsExplorer, retrofitMap, retrofitCampaign}
- theme ('blue', 'white', {backgroundColor, foregroundColor, logoUrl})
- Public vs Internal (public)
    - Internal = purple theme unless custom
- hasLogo (yes)
- hasSearch (yes)
- searchPlaceholder ("Search")
- hasMapAction (yes)
- onClickMap
- hasHelpAction (yes)
- onClickHelp
- customActions {icon, title, onClick}
- isAuth (no)
    - Auth has menu
    - Unauth has no menu
- hasSettings (yes)
- onClickSettings
- customMenuOptions {name, onClick}

---

## Installation and Use
Run `npm install` in the project directory to install required packages.

Run `grunt` to watch for file changes and automatically open browser to
`localhost:3000`.

---

## Things to note

### RSCSS
This prototype attempts to adhere to the [rscss](http://rscss.io/) guidelines
for SASS. It's quite similar to what we've used before at Azavea.

Worth reading through the [rscss docs](http://rscss.io/). It's a quick read.

[Summary](http://rscss.io/summary.html):

- Think in **components**, named with 2 words (`.screenshot-image`)
- Components contain **elements**, named with 1 word (`.blog-post > .title`)
- **Variant** classnames have a dash prefix (`.shop-banner.-with-icon`)
- Components can nest
- Use **@extends** to make things simple

Note the abundant use of the `>` **child selector**. When porting the prototype,
try to avoid anonymous wrapper elements and adhere to the prototype's DOM.
If you must add a wrapper somewhere, give it a suitable classname and insert
that into the SASS where appropriate. Eg:

- Before: `.page-header > .search-filter-bar`
- After: `.page-header > .search-filter-bar-container > .search-filter-bar`

### Responsive

This prototype uses [include-media](http://include-media.com/) for handling
breakpoints and related media queries (eg, retina).

Some examples:

```css
@include media('>phone') { }
@include media('>phone', '<=tablet') { }
@include media('>=358px', '<850px') { }
@include media('>desktop', '<=1350px') { }
@include media('retina2x') { }
@include media('>=350px', '<tablet', 'retina3x') { }
```

### main.js

No need to retain the actual code from `main.js` but be sure to replicate
what it does.

### Not in the prototype (yet)

- Tbd
