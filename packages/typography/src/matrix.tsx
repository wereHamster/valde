import { Theme } from "@catalog/core";
import styled from "@emotion/styled";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FontFace } from "./types";

export interface MatrixProps {
  fontFaces: Array<FontFace>;
}

export class Matrix extends React.PureComponent<MatrixProps> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any };

  render() {
    const { catalog } = this.context;
    const { fontFaces } = this.props;

    const sortedWeights = Array.from(new Set(fontFaces.map(cut => cut.cssProperties.fontWeight))).sort();
    const styles = ["normal", "italic"];

    return (
      <Root theme={catalog.theme}>
        {sortedWeights.map(weight => {
          return styles.map(style => {
            const cut = fontFaces.find(
              x => x.cssProperties.fontWeight === weight && x.cssProperties.fontStyle === style
            );
            if (cut) {
              return <div style={{ ...cut.cssProperties, fontFamily: cut.fontFamily }}>{cut.name}</div>;
            } else {
              return <Unused theme={catalog.theme}>{capitalize(style)} ({weight}) not available</Unused>;
            }
          });
        })}
      </Root>
    );
  }
}

const Root = styled("div")<{ theme: Theme }>`
  flex-basis: 100%;
  margin: 24px 0;

  padding: 15px 30px;
  background: white;
  margin: 12px 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

  font-size: ${p => getFontSize(p.theme, 3)};
  line-height: 1.7;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Unused = styled("div")<{ theme: Theme }>`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, -4)};
  line-height: ${p => p.theme.msRatio};
  opacity: 0.5;
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;

const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`
