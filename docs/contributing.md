### Requirements

You need to have [nodejs](https://nodejs.org) installed.

### Getting started

 1. Clone the [repository](https://github.com/wereHamster/valde): `git clone https://github.com/wereHamster/valde.git`
 2. Install dependencies: `npm install`
 3. Start the server: `npm run dev`
 4. Open the website in your browser: [http://localhost:3000](http://localhost:3000)

### Change an existing package

Packages are stored in the `packages/` folder, each has its own subfolder. The documentation page for each package is stored alongside the code.

The code is written in [TypeScript](https://www.typescriptlang.org). But don't worry, you don't need to know all the intricate details of TypeScript to be able to make changes.

Make your changes to the code and/or documentation. The page should automatically reload after you save your changes.

Once you are happy with your work submit a [Pull Request](https://github.com/wereHamster/valde/pulls) on GitHub.

### Create a package

The following steps are a best effort. If something doens't work as expected, or if you are unsure about something, use one of the existing packages as a reference.

 1. Create a new folder under `packages/`.
 2. Copy `package.json` from one of the existing packages and adapt: update the name, description and dependencies. Leave everything else untouched.
 3. Copy `tsconfig.json` from one of the existing packages. It doesn't matter which, all the files should be same anyways.
 4. Place all source files into the `src/` folder.
 5. Create a `doc/` folder with an `index.tsx` file that exports a Catalog Page.
 6. Register the catalog page in the main index (`pages/index.tsx`).
 7. Register the package in `tsconfig.json`.
 8. Restart the server (`npm run dev`) so that it picks up your new package.

As soon as you have something worthwhile to show, open a [Pull Request](https://github.com/wereHamster/valde/pulls) on GitHub.
