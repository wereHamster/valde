import * as PropTypes from "prop-types";
import * as React from "react";
import styled from "react-emotion";
import { Theme } from "@catalog/core";
import { FontFace } from "./types";

export interface FontProps {
  name: string;
  fontFace: FontFace;

  /**
   * Use this to provide a more project-specific sample text than the pangram.
   * The "Sample" tab will be shown alongside the pangram, this is not a replacement
   * for it.
   */
  sample?: React.ReactNode;

  /**
   * Information for developers how to use the font in their code. Use the predefined
   * renderer (fontUsageCSS) or write your own.
   *
   * The renderer is given the same props as the Font component itself.
   */
  usage?: (props: FontProps, context: { catalog: any }) => React.ReactNode;

  cssProperties: React.CSSProperties;
}

interface State {
  selectedTab: "PANGRAM" | "SAMPLE" | "USAGE" | "CSS";
}

export class Font extends React.PureComponent<FontProps, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any };

  state: State = {
    selectedTab: "PANGRAM"
  };

  render() {
    const { catalog } = this.context;
    const { name, fontFace, sample, usage, cssProperties } = this.props;
    const { selectedTab } = this.state;

    return (
      <Root>
        <Name theme={catalog.theme}>
          <div>{name}</div>

          <Tabs>
            <Tab
              theme={catalog.theme}
              active={selectedTab === "PANGRAM"}
              onClick={() => {
                this.setState({ selectedTab: "PANGRAM" });
              }}
            >
              Pangram
            </Tab>
            {sample && (
              <Tab
                theme={catalog.theme}
                active={selectedTab === "SAMPLE"}
                onClick={() => {
                  this.setState({ selectedTab: "SAMPLE" });
                }}
              >
                Sample
              </Tab>
            )}
            {usage && (
              <Tab
                theme={catalog.theme}
                active={selectedTab === "USAGE"}
                onClick={() => {
                  this.setState({ selectedTab: "USAGE" });
                }}
              >
                Usage
              </Tab>
            )}
            <Tab
              theme={catalog.theme}
              active={selectedTab === "CSS"}
              onClick={() => {
                this.setState({ selectedTab: "CSS" });
              }}
            >
              CSS
            </Tab>
          </Tabs>
        </Name>
        <div>
          <div>
            {selectedTab === "PANGRAM" && (
              <Pangram style={{ fontFamily: fontFace.fontFamily, ...fontFace.cssProperties, ...cssProperties }}>
                The quick brown fox jumps over the lazy dog
              </Pangram>
            )}
            {selectedTab === "SAMPLE" && (
              <Sample style={{ fontFamily: fontFace.fontFamily, ...fontFace.cssProperties, ...cssProperties }}>
                {sample}
              </Sample>
            )}
            {usage && selectedTab === "USAGE" && usage(this.props, { catalog })}
            {selectedTab === "CSS" && <ComputedStyle {...this.props} catalog={catalog} />}
          </div>
        </div>
      </Root>
    );
  }
}

const Root = styled("div")`
  flex-basis: 100%;
  margin: 16px 0;
`;

const Name = styled("div")<{ theme: Theme }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${p => p.theme.brandColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, 1)};
  line-height: ${p => p.theme.msRatio};

  display: flex;
  align-items: baseline;

  margin-bottom: 4px;
`;

const Tabs = styled("div")`
  display: flex;
  align-items: baseline;
  margin-left: 8px;
  margin-bottom: 4px;
`;

const Tab = styled("div")<{ theme: Theme; active: boolean }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${p => p.theme.brandColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, -3)};
  line-height: ${p => p.theme.msRatio};

  padding: 0 6px;
  color: ${p => (p.active ? p.theme.brandColor : p.theme.brandColor + "88")};

  cursor: pointer;

  transition: all 0.16s;

  &:hover {
    color: ${p => (p.active ? p.theme.brandColor : p.theme.brandColor + "DD")};
  }
`;

const Pangram = styled("div")`
  white-space: nowrap;
`;

const Sample = styled("div")`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const Definition = styled("div")<{ theme: Theme }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${p => p.theme.textColor + "AA"};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, 0)};
  line-height: ${p => p.theme.msRatio};
  line-height: 1.5;
  padding: 20px;
  background: white;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

  dl {
    margin: 2px 0 2px 20px;
  }
  dt {
    display: inline-block;
  }
  dd {
    display: inline-block;
    margin-left: 8px;
    color: ${p => p.theme.textColor};
  }
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;

const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export const fontUsageCSS = ({ cssProperties }: FontProps, { catalog }: { catalog: any }) => (
  <Definition theme={catalog.theme}>
    .selector {"{"}
    <dl>
      {Object.keys(cssProperties)
        .sort()
        .map(k => (
          <div key={k}>
            <dt>{toKebabCase(k)}:</dt>
            <dd>{(cssProperties as any)[k]};</dd>
          </div>
        ))}
    </dl>
    {"}"}
  </Definition>
);

class ComputedStyle extends React.PureComponent<
  FontProps & { catalog: any },
  { style: undefined | CSSStyleDeclaration }
> {
  state: { style: undefined | CSSStyleDeclaration } = {
    style: undefined
  };

  extractComputedProperties = (ref: null | any) => {
    if (ref) {
      const style = window.getComputedStyle(ref);
      this.setState({ style });
    }
  };

  render() {
    const { name, fontFace, cssProperties, catalog } = this.props;
    const { style } = this.state;

    const relevantProperties: any = {};
    if (style) {
      for (const s in style) {
        if (typeof s === "string" && s.match(/^(font[A-Z]|lineHeight)/)) {
          const value = style[s];
          if (value && (value !== "normal" && value !== "auto" && value !== "100%")) {
            relevantProperties[s] = value;
          }
        }
      }
    }

    return (
      <>
        <div
          style={{ fontFamily: fontFace.fontFamily, ...fontFace.cssProperties, ...cssProperties }}
          ref={this.extractComputedProperties}
        />

        <Definition theme={catalog.theme}>
          .{name} {"{"}
          <dl>
            {Object.keys(relevantProperties)
              .sort()
              .map(k => (
                <div key={k}>
                  <dt>{toKebabCase(k)}:</dt>
                  <dd>{(relevantProperties as any)[k]};</dd>
                </div>
              ))}
          </dl>
          {"}"}
        </Definition>
      </>
    );
  }
}
