workflow "Validate" {
  on = "push"
  resolves = "validate"
}

action "install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "tsc" {
  needs = "install"
  uses = "actions/npm@master"
  args = "./node_modules/.bin/tsc --build packages"
}

action "tsc" {
  needs = "install"
  uses = "actions/npm@master"
  args = "./node_modules/.bin/tslint --project packages/tsconfig.tslint.json"
}

action "validate" {
  needs = ["tsc", "lint"]
}
