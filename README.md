> Valde is an incubator for [Catalog](https://www.catalog.style) extensions. The project consists of multiple, independent packages which help you create beautiful documentation pages.

The packages cover a wide range of topics and use cases. Some packages offer just React components, while others also include guidelines how to structure whole sections of your documentation.

#### 🎉 Mature and widely used packages

 - [@valde/iconography](/packages/iconography): Document individual icons or a complete icon set.
 - [@valde/typography](/packages/typography): Document, explain and test the typography choices (typefaces, fonts etc).

#### 👷🏽‍♀️ Work in progress

If you have an idea for a package [describe it in a GitHub issue](https://github.com/wereHamster/valde/issues), or even [start working on it](/contributing#create-new-package) yourself.

No packages in this section.

#### 💔 Not supported or maintained

 - [@valde/tabbed-page](/packages/tabbed-page): Gives you more control for structuring the content through the use of tabs.
 - [@valde/react-component-page](/packages/react-component-page): An experiment to use a whole page to document one component.

## Getting Started

The first step is to add the package to your project:

```
npm install --save @valde/<package>
```

Detailed documentation how to use each package is available on the respective documentation pages.

## Contributing

Follow the instructions in the [Contributing](https://valde.caurea.org/#/contributing)  section of the documentation.

## Publishing

#### Website

No manual work is required to publish the website. All changes, including pull requests, are automatically deployed through [now](https://zeit.co/now).

**Note:** Old deployments linger around and need to be cleaned up manually. To delete old, unused deployments use `now rm valde --safe --yes`.

#### Packages

The packages are automatically published to [npm](https://www.npmjs.com/) when you push tags to GitHub (via [Travis CI](https://travis-ci.org/wereHamster/valde)).

 1. Use `lerna version` to bump the versions and create Git tags. Be careful when deciding whether the changes require a major, minor or patch version bump.
 2. Push tags to GitHub: `git push`

That's it, the packages should become available on npm within a few minutes 🍾
