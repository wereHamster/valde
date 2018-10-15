import * as PropTypes from "prop-types";
import * as React from "react";
import styled from "react-emotion";
import { Theme } from "@catalog/core";
import { Cut } from "./types";

export interface FontProps {
  name: string;
  fontType: Cut;

  sample: React.ReactNode;

  cssProperties: React.CSSProperties;
}

interface State {
  selectedTab: "SAMPLE" | "DEFINITION" | "CSS";
}

export class Font extends React.PureComponent<FontProps, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };

  state: State = {
    selectedTab: "SAMPLE"
  };

  render() {
    const { catalog } = this.context;
    const { name, fontType, sample, cssProperties } = this.props;
    const { selectedTab } = this.state;

    const { fontSize, lineHeight } = cssProperties;

    return (
      <Root>
        <Name theme={catalog.theme}>
          <FontIcon />

          <div>{name}</div>

          <Tabs>
            <Tab
              theme={catalog.theme}
              active={selectedTab === "SAMPLE"}
              onClick={() => {
                this.setState({ selectedTab: "SAMPLE" });
              }}
            >
              Sample
            </Tab>
            <Tab
              theme={catalog.theme}
              active={selectedTab === "DEFINITION"}
              onClick={() => {
                this.setState({ selectedTab: "DEFINITION" });
              }}
            >
              Definition
            </Tab>
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
            {selectedTab === "SAMPLE" && <Sample style={{ ...cssProperties }}>{sample}</Sample>}
            {selectedTab === "DEFINITION" && (
              <Definition theme={catalog.theme}>
                <dl>
                  <div>
                    <dt>Font:</dt>
                    <dd>{fontType.name}</dd>
                  </div>
                  <div>
                    <dt>Size:</dt>
                    <dd>
                      {fontSize}/{lineHeight}
                    </dd>
                  </div>
                </dl>
              </Definition>
            )}
            {selectedTab === "CSS" && (
              <Definition theme={catalog.theme}>
                .{name} {"{"}
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
            )}
          </div>
        </div>
      </Root>
    );
  }
}

const Root = styled.div`
  flex-basis: 100%;
  margin: 16px 0;
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.brandColor};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, 1)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};

  display: flex;
  align-items: baseline;

  margin-bottom: 4px;

  position: relative;
  & svg {
    position: absolute;
    left: -26px;
    top: 5px;
    width: 18px;
    height: 18px;

    color: #333;

    display: flex;
  }
`;

const Tabs = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 8px;
  margin-bottom: 4px;
`;

const Tab = styled.div`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.brandColor};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, -3)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};

  padding: 0 6px;
  color: ${(p: { theme: Theme; active: boolean }) => (p.active ? p.theme.brandColor : p.theme.brandColor + "88")};

  cursor: pointer;

  transition: all 0.16s;

  &:hover {
    color: ${(p: { theme: Theme; active: boolean }) => (p.active ? p.theme.brandColor : p.theme.brandColor + "DD")};
  }
`;

const Sample = styled.div`
  padding: 20px;
  background: white;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const Definition = styled.div`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.textColor + "AA"};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, 0)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};
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
    color: ${(p: { theme: Theme }) => p.theme.textColor};
  }
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;

const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const FontIcon = () => (
  <svg x="0" y="0" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M450.783,207.165v14.042c-15.256-12.252-34.607-19.607-55.652-19.607c-49.099,0-89.043,39.945-89.043,89.043 s39.945,89.043,89.043,89.043c21.045,0,40.396-7.355,55.652-19.607v14.042h33.391V207.165H450.783z M395.13,346.295 c-30.687,0-55.652-24.966-55.652-55.652c0-30.688,24.966-55.652,55.652-55.652s55.652,24.966,55.652,55.652 C450.783,321.33,425.817,346.295,395.13,346.295z"
    />
    <path
      fill="currentColor"
      d="M166.957,65.534L31.18,374.121h36.479l46.526-105.739h105.543l46.526,105.739h36.479L166.957,65.534z M128.877,234.991 l38.079-86.545l38.079,86.545H128.877z"
    />
    <rect fill="currentColor" y="413.074" width="512" height="33.391" />
  </svg>
);
