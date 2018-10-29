Valde is an incubator for [Catalog](https://www.catalog.style) extensions. The repository contains multiple packages (managed by [lerna](https://lernajs.io)) that are published independently into the **@valde** scope on [npmjs.com](https://www.npmjs.com).

### Usage

Packages are stored in the `packages/` folder, each has its own subfolder. To install a package, use `npm install @valde/<package>`.

### Contributing

Do you want to make changes or create a new package in the **@valde** namespace? Head over [here](/contributing) to read how to get started.

### Publishing

Use `lerna version` to bump the versions in packages that have changed, then push the commits and tags to GitHub. The packages will be automatically published to npmjs.com by [travis](https://travis-ci.org/wereHamster/valde).
