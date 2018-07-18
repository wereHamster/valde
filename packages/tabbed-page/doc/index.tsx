import { TabbedPage } from "../src/tabbed-page";
import { markdown } from "catalog";

const pane1 = {
  label: "Introduction",
  render: () => markdown`
The \`TabbedPage\` component is used in place of the standard Catalog \`Page\` component. It adds the option to switch between multiple panes.
It provides a different way to nest content, for the case when the sidebar (which is limited to just two levels) is insufficient.
  `
};

const pane2 = {
  label: "Usage",
  render: () => markdown`
~~~code|lang-js
import { TabbedPage } from "@valde/tabbed-page"

export default () => (
  <TabbedPage
    panes={[
      {
        label: "First Pane",
        render: () => <div>…</div>
      },
      {
        label: "Second Pane",
        render: () => <div>…</div>
      }
    ]}
  />
)
~~~

You can use the \`markdown\` function from catalog in the render function if you prefer:

~~~code|lang-js
import { TabbedPage } from "@valde/tabbed-page"
import { markdown } from "catalog"

export default () => (
  <TabbedPage
    panes={[
      {
        label: "First Pane",
        render: () => markdown\`# This is a heading\`
      }
    ]}
  />
)
~~~
  `
};

const pane3 = {
  label: "Notes",
  render: () => markdown`
The style (colors, fonts) of the pane switcher menu is hardcoded, it won't adapt to your theme.
  `
};

export default {
  title: "tabbed-page",
  path: "/packages/tabbed-page",
  component: () => <TabbedPage panes={[pane1, pane2, pane3]} />
};
