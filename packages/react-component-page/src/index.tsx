import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "react-emotion";
import { Page, CodeSpecimen } from "@catalog/core";

/* tslint:disable-next-line */
export const __catalogPreview__ = (component: React.ComponentClass<any>, Preview: React.ComponentType) => {
  (component as any).__catalogPreview__ = Preview;
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

  /**
   * URL where the source of the component is located.
   */
  sourceUrl?: string;

  /**
   * URL where bugs should be reported to or where users can discuss this component.
   */
  discussionUrl?: string;
}

export class ReactComponentPage extends React.PureComponent<Props> {
  componentDidMount() {
    const { module, componentName, sourceUrl, discussionUrl } = this.props;

    const h1 = document.querySelector("div[class*=PageHeader-className] h1")!;
    h1.innerHTML = "";
    h1.appendChild(document.createTextNode(`<${componentName} … >`));

    const h2 = document.querySelector("div[class*=PageHeader-className] h2")!;
    h2.innerHTML = `${module}`;

    const container = (() => {
      let el = document.querySelector("div[class*=PageHeader-className] .valde-react-component-page-extension");
      if (!el) {
        el = document.createElement("div");
        el.className = "valde-react-component-page-extension";
        document.querySelector("div[class*=PageHeader-className]")!.appendChild(el);
      }
      return el;
    })();

    ReactDOM.render(
      <HeaderExtension>
        {discussionUrl && <HeaderExtensionLink href={discussionUrl}>
          <CommentIcon />
        </HeaderExtensionLink>}
        {sourceUrl && <HeaderExtensionLink href={sourceUrl}>
          <SourceIcon />
        </HeaderExtensionLink>}
      </HeaderExtension>,
      container
    );
  }

  componentWillUnmount() {
    const el = document.querySelector("div[class*=PageHeader-className] .valde-react-component-page-extension");
    if (el) {
      el.remove();
    }
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
                    {name}: <a>{defaultProps[name]!.value}</a>,{`\n`}
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

const HeaderExtension = styled("div")`
  position: absolute;
  right: 21px;
  top: 21px;

  display: flex;
  align-items: center;
`;

const HeaderExtensionLink = styled("a")`
  display: block;
  text-decoration: none;
  color: white;
  margin-left: 23px;

  &:hover {
    color: #ff5578;
  }

  svg {
    display: block;
  }
`;

const CommentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
      <polyline fill="none" points=" 25,9 31,9 31,24 27,24 27,29 20,24 14,24 " />
      <polygon fill="none" points="25,2 1,2 1,19 6,19 6,26 14,19 25,19 " stroke="currentColor" />
    </g>
  </svg>
);

const SourceIcon = () => (
  <svg width="36" height="36" viewBox="0 30 480 448">
    <path fill="currentColor" d="M154.25 349.75l-12.5 12.5c-3.25 3.25-8.25 3.25-11.5 0l-116.5-116.5c-3.25-3.25-3.25-8.25 0-11.5l116.5-116.5c3.25-3.25 8.25-3.25 11.5 0l12.5 12.5c3.25 3.25 3.25 8.25 0 11.5l-98.25 98.25 98.25 98.25c3.25 3.25 3.25 8.25 0 11.5zM302 83l-93.25 322.75c-1.25 4.25-5.75 6.75-9.75 5.5l-15.5-4.25c-4.25-1.25-6.75-5.75-5.5-10l93.25-322.75c1.25-4.25 5.75-6.75 9.75-5.5l15.5 4.25c4.25 1.25 6.75 5.75 5.5 10zM466.25 245.75l-116.5 116.5c-3.25 3.25-8.25 3.25-11.5 0l-12.5-12.5c-3.25-3.25-3.25-8.25 0-11.5l98.25-98.25-98.25-98.25c-3.25-3.25-3.25-8.25 0-11.5l12.5-12.5c3.25-3.25 8.25-3.25 11.5 0l116.5 116.5c3.25 3.25 3.25 8.25 0 11.5z" />
  </svg>
);
