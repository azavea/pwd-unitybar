# PWD Unity Bar Prototype

This is a prototype of the PWD Unity Bar – a unified header for use across all
Philadelphia Water Dept stormwater-related web apps.

The html, sass, and behaviors of this prototype should be replicated in a
reusable React component.

## HTML

index.html contains the unity bar html (`header.pwd-unity-bar`), along with
some buttons for demoing the three main themes.

In porting the prototype to React, let's discuss any deviations from the html
as authored. Care was taken to make it semantic and accessible.

## SASS

As with most of our prototypes, the SASS is organized into a hierarchy of
folders, with the most critical bits living in the components folder.

Unlike most of our prototypes, however, one of the outputs of the `grunt`
build process is a single monolithic .scss file (`pwd-unity-bar.scss`).

In theory, this monolithic .scss file should be part of the React component,
such that it can be included in each project's `sass/vendors` folder.

In particular, this would allow each project to override the component's
`!default` variables (in `sass/01_settings`), including:
- `$pwdub-background-color: $pwdub-blue !default;`
- `$pwdub-foreground-color: $pwdub-white !default;`
- `$pwdub-height: 56px !default;`
- `$pwdub-gutter: 8px !default;`
- `$pwdub-app-switcher-gutter: 56px !default;`
- `$pwdub-app-switcher-gutter-mobile: 40px !default;`
- `$pwdub-breakpoint-mobile: 480px !default;`
- `$pwdub-breakpoint-tablet: 640px !default;`
- `$pwdub-z-index: 10000 !default;`

## Imagery

 All images (eg logos) are encoded into `01_settings/_images.scss` to be used
 as `background-image`s. And all icons are included in `index.html` as `<svg>`
 symbols.

 This allows the component to remain simple (no font or image files) and
 makes it easy to change icon colors using the CSS `fill:` property.

## Font

The demo (`index.html`) uses Open Sans, and all of our PWD web apps should move
to Open Sans as soon as reasonable.

However, the Unity Bar itself does not specify a `font-family`, so that it won't
look out of place if used on a site with a different font.

## JS

The jquery code in `main.js` doesn't need to be retained when porting to React.
But all of the behaviors it encodes should be, including:
- App switcher open/close
- Actions menu open/close
- Open search widget on click/focus
- Close search widget on blur
- Close other menus whenever a menu (or search) is opened

Pay special heed to:
- Set `tabindex="-1"` on all descendent links of any hidden menu
- Set `tabindex="0"` on those links when a menu is shown
- Same for the search `<button>` BUT not the search `<input>` – so that tabbing
into the search field is still possible

## Themeable

There are three built-in themes: `-pwdub-theme-blue`, `-pwdub-theme-white`,
`-pwdub-theme-internal`.

Each app should use whichever theme is appropriate, by setting the corresponding
classname on `header.pwd-unity-bar`.

If additional themes are needed, consult `sass/05_basics/_themes.scss` to see
which elements need to be treated. It's not too complicated.

## Accessibility

Care has been taken to make the Unity Bar accessible.

There are surely additional improvements to be made, but in the least,
please be mindful not to negatively impact accessibility when porting to React.

## Responsiveness

The Unity Bar scales up and down, with substantial style differences across
breakpoints, particularly wrt the App Switcher, Actions Menu, and Search controls.

## TBD: Search Behavior

The behavior of the searchbox during search is an open question. What do
autocomplete and search suggestions look like? How are keystrokes and clicks on
suggestions handled? Etc etc.

With multiple stormwater apps in the wild right now, search is bound to
behave differently across them right now. Normalizing them may be non-trivial.

We'll need to figure this out soon, but it seemed premature to tackle it in
the initial prototype.

## React Component Parameters

The React component should support a number of parameters to customize the
Unity Bar. Some ideas:
- `appName`: The display name of the app. Render in `.appname`.
- `theme`: {'blue', 'white', 'custom'} (default: blue)
  - Custom would require {backgroundColor, foregroundColor, logoUrl}
- `access`: {public, internal} (default: public)
    - If internal, 'theme' is ignored.
- `hasLogo`: (default: true)
- `hasSearch`: (default: true)
- `searchPlaceholder`: (default: "Search")
- `hasMapAction`: (default: true)
- `mapActionUrl`
- `hasHelpAction` (default: true)
- `helpActionUrl`
- `customActions`: (array of {icon, title, onClick handler})
  - These replace the map and/or help actions.
  - Max two of these total (including map and help).
- `authenticated`: (default: false)
    - If true, the Actions Menu is included
    - If false, no Actions Menu
- `hasSettings` (default: false)
    - If true, include "Settings" option in Actions Menu
- `settingsUrl`
- `customMenuOptions`: (array of {name, onClick handler})
    - These are placed in the Actions Menu
    - Settings and Sign out always come last

---

## Future Work
- Revisit focus ring
- Figure out search behavior

---

## Installation and Use
Run `npm install` in the project directory to install required packages.

Run `grunt` to watch for file changes and automatically open browser to
`localhost:3000` to see the demo.

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
