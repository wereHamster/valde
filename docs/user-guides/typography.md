> This document outlines how to build a beautiful typography page. It aims to provide a guideline what decisions need to be taken when deciding the typography of a project and how to document these decisions. The typography page should also be used by developers to document the fonts – reusable blocks of material that can be used to style components.

```hint
To make it easier to build such a page, new Catalog components are required.
```

# Outline

Here is the rough structure

```image|plain,span-6
src: /static/typography.png
```

# Contrast

The text contrast doesn't depend on the typeface, and should be documented on the colors page.

TODO: provide a custom specimen that does something similar to this: https://material.io/tools/color/#!/?view.left=1&view.right=0&primary.color=AED581&secondary.color=424242

# Developer Notes

Ideally you should have roughly 5-10 different font materials in your project. If you have signigicantly more it's an sign that your design is incoherent.

## Naming

Use semantic names for your font materials, for example _h1_, _h2_, _h4_, _lead_, _body_, _label_. These fonts should adapt size at breakpoints. This ensures that fonts maintain a consistent size throughout the project. When you need a font that behaves differently across breakpoints, create a new material (eg. _label_ and _largeLabel_).

Do not put the font size into the name (eg. _header24_, _copy16_) unless the font has a fixed size across all breakpoints.

A font should include everything that defines its looks (except color). Think of a font as the set of blocks of lead that a typesetter keeps in a drawer.

- font family (including fallbacks)
- weight
- style (normal, italic)
- size
- line height
- letter spacing
- font variant (ligatures, small-caps etc)

### Example

```code|lang-css
@mixin keylineA {
  font-family: Tuna, sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 1.3em;
  letter-spacing: -0.01em;
}
```

## Color

The color should not be part of the font. You often don't know in what context the font will be used. Or maybe you want it to inherit the color anyways. Only if you are absolutely sure that you will never need the font in a different color, then go ahead and include it in its definition.

When using a font material, a good rule is to set the color right after the font, like so:

```code|lang-css
.pageTitle {
  @include keylineA;
  color: var(--title-color);
}
```
