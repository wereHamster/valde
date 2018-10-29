Valde is an incubator for [Catalog](https://www.catalog.style) extensions. The repository contains multiple packages (managed by [lerna](https://lernajs.io)) that are published independently into the **@valde** scope on [npmjs.com](https://www.npmjs.com).

### Usage

Packages are stored in the `packages/` folder, each has its own subfolder. To install a package, use `npm install @valde/<package>`.

### Contributing

Do you want to make changes or create a new package in the **@valde** namespace? Head over [here](/contributing) to read how to get started.

### Publishing

The website, including pull requests, are automatically deployed through [now](https://zeit.co/now). Note that old deployments linger around and need to be cleaned up manually (use `now rm valde --safe --yes`).

The packages are automatically published to npmjs.com when you push tags to GitHub. Use `lerna version` to create these tags. The packages are then published by [travis](https://travis-ci.org/wereHamster/valde)
