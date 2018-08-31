## Getting Started

To make changes to a package, you need to have [node](https://nodejs.org) installed. Then use the following commands to start the server:

```
npm install
npm run dev
```

The documentation is then available at http://localhost:3000.

The packages are written in [TypeScript](https://www.typescriptlang.org). But don't worry, you don't need to know all the intricate details of TypeScript to be able to contribute.


### Change existing package

The easiest way to make changes to an existing package is to start the server, navigate to the documentation page of that package, and then change the code.

The page will automatically reload when you make the change, so you get immediate feedback.


### Create new package

 1. Create a new folder under `packages/`.

 2. Copy `package.json` from one of the existing packages and adapt: update the name, description and dependencies. Leave everything else untouched.

 3. Copy `tsconfig.json` from one of the existing packages. It doesn't matter which, all the files should be same anyways.

 4. Place all source files into the `src/` folder.

 5. Create a `doc/` folder with an `index.tsx` file that exports a Catalog Page.

 6. Register the catalog page in the main index (`pages/index.tsx`).

 7. Register the package in `packages/tsconfig.json`.

That's pretty much it. Now start the server, navigate to the documentation page of that package and start writing the code.

As soon as you have something worthwhile to show, open a pull request.
