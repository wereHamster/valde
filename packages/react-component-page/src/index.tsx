import * as React from "react";
import { Page, CodeSpecimen } from "catalog";

export const __catalogPreview__ = (component: React.ComponentClass, Preview: React.ComponentType) => {
  component["__catalogPreview__"] = Preview;
};

export interface Field {
  name: string;
  type: { name: string; module: string };
  comment?: {
    shortText: string;
    text?: string;
  };
}

export interface ComponentProps {
  name: string;
  fields: Field[];
}

export interface DefaultPropValues {
  [x: string]: undefined | { value: string; module: string };
}

export interface Props {
  /**
   * The name of the module from which the component can be imported from.
   */
  module: string;

  /**
   * The name of the component.
   */
  componentName: string;

  /**
   * Optional headline that is shown as the first item on the page, formatted as a blockquote.
   */
  headline?: string;

  /**
   * A preview of the component. This is rendered just after the headline, at the very top of the page.
   */
  Preview: React.ReactType;

  /**
   * This describes the props that the component accepts.
   */
  props: ComponentProps;

  /**
   * The default props
   */
  defaultProps: DefaultPropValues;
}

export class ReactComponentPage extends React.PureComponent<Props> {
  componentDidMount() {
    const h1 = document.querySelector("div[class*=PageHeader-PageHeader] h1");
    h1.innerHTML = "";
    h1.appendChild(document.createTextNode(`<${this.props.componentName} … >`));

    const h2 = document.querySelector("div[class*=PageHeader-PageHeader] h2");
    h2.innerHTML = `${this.props.module}`;
  }

  render() {
    const { headline, Preview, props, defaultProps } = this.props;

    return (
      <Page>
        {headline && `> ${headline}`}

        {<Preview />}

        {`### Props`}
        {
          <CodeSpecimen>
            interface {props.name} {`{\n`}
            {props.fields.map(({ name, type }, i) => (
              <React.Fragment key={i}>
                {`    `}
                {name}: <a href={`#${type.module}`}>{type.name}</a>;{`\n`}
              </React.Fragment>
            ))}
            {`}`}
          </CodeSpecimen>
        }

        {`### Fields`}
        {props.fields.map(
          ({ name, type, comment }) =>
            ` - **${name}**: [${type.name}](#${type.module})\n${comment ? comment.shortText : ""}`
        )}

        {false && `### Defaults`}
        {false && (
          <CodeSpecimen>
            const defaultProps: Partial
            {"<"}
            {props.name}
            {">"} = {`{\n`}
            {props.fields.map(
              ({ name }, i) =>
                defaultProps[name] && (
                  <React.Fragment key={i}>
                    {`    `}
                    {name}: <a>{defaultProps[name].value}</a>,{`\n`}
                  </React.Fragment>
                )
            )}
            {`}`}
          </CodeSpecimen>
        )}
      </Page>
    );
  }
}
