import * as React from "react";
import { ReactComponentPage } from "../src/index";
// import { ReactSpecimen, CodeSpecimen } from "@catalog/core";
import { SomeComponentPageProps } from "../example/__doc__/module.components";

/*
const Preview = () => (
  <ReactSpecimen sourceText="<… source …>">
    <CodeSpecimen>test</CodeSpecimen>
  </ReactSpecimen>
);

const samplePropsCarrier = (
  <ReactComponentPage
    module="catalog"
    componentName="CodeSpecimen"
    headline="The Code Specimen displays a piece of code."
    Preview={Preview}
    props={{
      name: "Props",
      fields: [
        {
          name: "collapsed",
          type: { name: "boolean", module: "" },
          comment: {
            shortText: "Useful for longer or redundant code that still needs to be accessible"
          }
        },
        {
          name: "lang",
          type: { name: "string", module: "" },
          comment: {
            shortText: "Defines the language for code highlighting"
          }
        },
        {
          name: "span",
          type: { name: "Span", module: "catalog" },
          comment: {
            shortText: "Width of the specimen"
          }
        }
      ]
    }}
    defaultProps={{
      collapsed: { value: "false", module: "" },
      lang: { value: "undefined", module: "" },
      span: { value: "6", module: "" }
    }}
  />
);
*/

export default () => (
  <ReactComponentPage
    {...SomeComponentPageProps}
    sourceUrl="https://github.com/wereHamster/valde/blob/cc6f39380a7345659626f872b4259600a6380216/packages/react-component-page/src/example.tsx#L23-L34"
    discussionUrl="https://github.com/wereHamster/valde/issues/new?title=react-component-page"
  />
);
