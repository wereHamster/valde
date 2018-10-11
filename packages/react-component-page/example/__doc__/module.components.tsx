import { SomeComponent } from "../module";

export const SomeComponentPageProps = {
  module: "left-pad-react",
  componentName: `SomeComponent`,
  headline: `The best component in the whole wide world.`,
  Preview: (SomeComponent as any)["__catalogPreview__"],
  props: {
    name: "SomeComponentProps",
    fields: [
      {
        name: "label",
        type: { name: "string", module: "" },
        comment: {
          shortText: "The label is a really useful prop. You should use it."
        }
      },
      {
        name: "color",
        type: { name: "Color", module: "" },
        comment: { shortText: "This field uses a custom type." }
      }
    ]
  },
  defaultProps: {}
};
