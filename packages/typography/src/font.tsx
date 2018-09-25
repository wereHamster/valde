import * as PropTypes from "prop-types";
import * as React from "react";
import styled from "react-emotion";
import { Theme } from "catalog";
import { FontWeightProperty } from "csstype";
import { Cut } from "./types";

export interface FontProps {
  name: string;
  fontType: Cut;

  sample: React.ReactNode;

  cssProperties: React.CSSProperties;
  fontWeights: Array<FontWeightProperty>;
}

interface State {
  fontWeight: FontWeightProperty;
}

export class Font extends React.PureComponent<FontProps, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };

  state: State = {
    fontWeight: this.props.cssProperties.fontWeight!
  };

  render() {
    const { catalog } = this.context;
    const { name, fontType, sample, cssProperties, fontWeights } = this.props;
    const { fontWeight } = this.state;

    return (
      <Root>
        <Name theme={catalog.theme}>Font: {name}</Name>

        <Description theme={catalog.theme}>
          <div>
            {fontType.name}, {cssProperties.fontSize}/{cssProperties.lineHeight}
          </div>
          {fontWeights.length > 0 && (
            <div>
              Weight:{" "}
              {fontWeights.map((weight, i) => (
                <Weight
                  key={i}
                  isSelected={weight === fontWeight}
                  onMouseOver={() => {
                    this.setState({ fontWeight: weight });
                  }}
                >
                  {weight}
                </Weight>
              ))}
            </div>
          )}
        </Description>

        <Sample style={{ ...cssProperties, fontWeight }}>{sample}</Sample>
      </Root>
    );
  }
}

const Root = styled.div`
  flex-basis: 100%;
  margin: 24px 0;
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.brandColor};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, 3)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};
`;

const Sample = styled.div`
  padding: 20px;
  background: white;
  margin: 12px 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
`;

const Description = styled.div`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.textColor + "DD"};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, 0)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};
  line-height: 1.5;
  margin: 8px 0 16px;
`;

const Weight = styled.div`
  display: inline-block;
  margin-left: 4px;
  opacity: ${(p: { isSelected: boolean }) => (p.isSelected ? 1 : 0.6)};
  cursor: pointer;
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;
