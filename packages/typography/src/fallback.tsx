import { Theme } from "@catalog/core";
import styled from "@emotion/styled";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FontFace } from "./types";

export interface FallbackProps {
  fontFaces: Array<FontFace>;

  /**
   * Use this to provide your own sample text.
   */
  sample?: React.ReactNode;
}

interface State {
  cut: FontFace;
  activeFallback: undefined | string;
}

export class Fallback extends React.PureComponent<FallbackProps, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any }

  state: State = {
    cut: this.props.fontFaces[0],
    activeFallback: undefined
  };

  selectCut = (cut: FontFace) => () => {
    this.setState({ cut });
  };

  toggleFallback = (fontFamily: undefined | string) => () => {
    if (this.state.activeFallback === fontFamily) {
      this.setState({ activeFallback: undefined });
    } else {
      this.setState({ activeFallback: fontFamily });
    }
  };

  render() {
    const { catalog } = this.context;
    const { fontFaces, sample = defaultSample } = this.props;
    const { cut, activeFallback } = this.state;
    const fontStack = activeFontStack(cut, activeFallback)

    return (
      <Root theme={catalog.theme}>
        <Cuts theme={catalog.theme}>
          <strong>Cut:</strong>{" "}
          {fontFaces.map((c, i) => (
            <CutOption key={i} isActive={c === cut} onClick={this.selectCut(c)}>
              {c.name}
            </CutOption>
          ))}
        </Cuts>
        <Stack theme={catalog.theme}>
          <strong>Fallback:</strong>{" "}
          <Option
            theme={catalog.theme}
            isActive={activeFallback === undefined}
            onClick={this.toggleFallback(undefined)}
          >
            None
          </Option>
          {cut.fallback.map((fontFamily, i) => (
            <Option
              key={i}
              theme={catalog.theme}
              isActive={activeFallback === fontFamily}
              onClick={this.toggleFallback(fontFamily)}
            >
              {fontFamily}
            </Option>
          ))}
        </Stack>
        <SampleContainer>
          <Sample theme={catalog.theme}>
            <div
              style={{
                ...cut.cssProperties,
                fontFamily: cut.fontFamily,
                opacity: activeFallback ? 0.7 : 1,
                color: activeFallback ? "#BF2626" : undefined
              }}
            >
              {sample}
            </div>
            {activeFallback && (
              <FallbackOverlay style={{ ...cut.cssProperties, fontFamily: fontStack }}>{sample}</FallbackOverlay>
            )}
          </Sample>
        </SampleContainer>
      </Root>
    );
  }
}

const defaultSample = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </>
);

const Root = styled("div")`
  flex-basis: 100%;
  margin: 24px 0;
`;

const Cuts = styled("div")<{ theme: Theme }>`
  display: flex;
  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, 0)};
  line-height: ${p => p.theme.msRatio};
`;

const CutOption = styled("div")<{ isActive: boolean }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  opacity: ${p => (p.isActive ? 1 : 0.6)};
  margin-left: 12px;
  cursor: pointer;
  user-select: none;
  text-decoration: ${p => (p.isActive ? "underline" : "none")};

  &:hover {
    opacity: 1;
  }
`;

const Stack = styled("div")<{ theme: Theme }>`
  display: flex;
  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, 0)};
  line-height: ${p => p.theme.msRatio};
  margin: 8px 0;
`;

const Option = styled("div")<{ isActive: boolean }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  opacity: ${p => (p.isActive ? 1 : 0.6)};
  margin-left: 8px;
  cursor: pointer;
  user-select: none;
  text-decoration: ${p => (p.isActive ? "underline" : "none")};

  &:hover {
    opacity: 1;
  }
`;

const SampleContainer = styled("div")`
  padding: 15px 30px;
  background: white;
  margin: 12px 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
`;

const Sample = styled("div")<{ theme: Theme }>`
  position: relative;
  color: ${p => p.theme.textColor};
  font-size: ${p => getFontSize(p.theme, 1)};
  line-height: 1.7;

  display: flex;
  flex-direction: column;
`;

const FallbackOverlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  color: #008030;
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;

const  activeFontStack = (cut: FontFace, activeFallback: undefined | string) => {
  const stack = [cut.fontFamily, ...cut.fallback]
  const stackIndex = activeFallback ? stack.indexOf(activeFallback) : 0
  return stack.slice(stackIndex).join(',')
}
