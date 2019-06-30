workflow "Main" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "TypeScript" {
  needs = "Install"
  uses = "docker://node"
  args = "./node_modules/.bin/tsc --build packages"
}

action "Lint" {
  needs = "Install"
  uses = "docker://node"
  args = "./node_modules/.bin/eslint . --ext .js,.jsx,.ts,.tsx"
}

action "Master" {
  needs = ["TypeScript", "Lint"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  needs = "Master"
  uses = "docker://node"
  args = "script/publish --yes from-git"
  secrets = ["NPM_AUTH_TOKEN"]
}