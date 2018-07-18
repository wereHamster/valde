import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import styled, { injectGlobal } from "react-emotion";
import posed from "react-pose";
import Measure from "react-measure";
import { markdown } from "catalog";

type Size = any;

injectGlobal`
div[class*="AppLayout"] {
  z-index: unset;
`;

export interface Props {
  allSizes: Size[];
  descriptor: { name: string; sizes: Size[] };
}

interface State {
  isOpen: boolean;
  activeSize: { size: Size; Component: React.ReactType };
}

const config = {
  initialPose: "initial",
  initial: {
    width: "auto",
    height: "auto",
    top: "auto",
    left: "auto",
    flip: true,
    transition: { duration: 0 },
    delayChildren: 50
  },
  fullscreen: {
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    flip: true,
    transition: { duration: 200 },
    delayChildren: 120,
    staggerChildren: 50
  }
};

const Box = styled(posed.div(config))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f9f9f9;
`;

const StyleInjector = markdown`
~~~code

~~~
`;

const CanvasBoxChild = styled(
  posed.div({
    initial: { opacity: 0, scale: 1.2 },
    fullscreen: { opacity: 1, scale: 1 }
  })
)`
  margin-right: 18px;
`;

const PreviewChild = styled(
  posed.div({
    initial: { opacity: 1 },
    fullscreen: { opacity: 0 }
  })
)``;

export class IconSpecimen extends React.PureComponent<Props, State> {
  state: State = {
    isOpen: false,
    activeSize: this.props.descriptor.sizes[0]
  };

  toggle = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      // allSizes,
      descriptor: { name, sizes }
    } = this.props;
    const { isOpen, activeSize } = this.state;

    return (
      <Root style={{ zIndex: isOpen ? 9999 : 1 }}>
        <Measure bounds>
          {({ measureRef, contentRect }) => (
            <CanvasContainer innerRef={measureRef}>
              <button
                style={{
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  position: "fixed",
                  zIndex: 99999,
                  top: 40,
                  right: 40,
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "100%",
                  background: "#018786",
                  boxShadow:
                    "0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)",
                  opacity: isOpen ? 1 : 0,
                  transition: "all .2s"
                }}
                onClick={this.toggle}
              >
                <svg width="36" height="36" viewBox="0 0 24 24">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="white"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>

              <Box pose={isOpen ? "fullscreen" : "initial"} style={{ position: isOpen ? "fixed" : "static" }}>
                {(() => {
                  return (
                    <React.Fragment>
                      <div
                        style={{
                          display: isOpen ? "flex" : "none",
                          flexDirection: "column"
                        }}
                      >
                        <Name
                          style={{
                            fontSize: "32px",
                            margin: "-4em 0 1.5em",
                            alignSelf: "center"
                          }}
                        >
                          {name}
                        </Name>
                        <div style={{ display: "flex" }}>
                          {sizes.map((size, i) => (
                            <CanvasBoxChild key={i}>
                              <Canvas
                                style={{
                                  width: 160,
                                  height: 160
                                }}
                              >
                                <Grid size={size.size === "EM" ? 60 : size.size} />
                                <div
                                  style={{
                                    position: "relative",
                                    zIndex: 20,
                                    fontSize: size.size === "EM" ? "60px" : undefined
                                  }}
                                >
                                  <size.Component />
                                </div>
                              </Canvas>
                              <Name>{size.size === "EM" ? `${size.size} @ 60px` : `${size.size}x${size.size}`}</Name>
                            </CanvasBoxChild>
                          ))}
                        </div>
                        <div
                          style={{
                            marginTop: 40,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start"
                          }}
                        >
                          <div
                            style={{
                              flexGrow: 1,
                              marginRight: 20,
                              minWidth: 400,
                              maxWidth: 600
                            }}
                            className="catalog-g6dbai-Code-Code"
                          >
                            <code
                              style={{ fontSize: 14, whiteSpace: "unset" }}
                              className="catalog-2u9ymu-HighlightedCode-HighlightedCode"
                            >
                              {ReactDOMServer.renderToStaticMarkup(<activeSize.Component />)}
                            </code>
                          </div>
                          <button
                            style={{
                              outline: "none",
                              border: "none",
                              padding: "8px 20px 7px 16px",
                              marginTop: 2,
                              display: "flex",
                              alignItems: "center",
                              fontSize: 18,
                              background: "#018786",
                              color: "white"
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="white" />
                              <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                            SVG
                          </button>
                        </div>
                      </div>

                      <PreviewChild>
                        {!isOpen &&
                          contentRect.bounds &&
                          contentRect.bounds.width > 0 && (
                            <Canvas
                              onClick={this.toggle}
                              style={{
                                width: contentRect.bounds.width,
                                height: contentRect.bounds.height
                              }}
                            >
                              <Grid size={activeSize.size === "EM" ? 32 : activeSize.size} />
                              <div
                                style={{
                                  position: "relative",
                                  zIndex: 20,
                                  fontSize: activeSize.size === "EM" ? "32px" : undefined
                                }}
                              >
                                <activeSize.Component />
                              </div>
                            </Canvas>
                          )}
                      </PreviewChild>
                    </React.Fragment>
                  );
                })()}
              </Box>
            </CanvasContainer>
          )}
        </Measure>
        <Name>{name}</Name>

        <div style={{ display: "none" }}>{StyleInjector}</div>
      </Root>
    );
  }
}

/*
const Sizes = styled("div")`
  position: absolute;
  z-index: 10;
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  display: flex;
`;

const SizeTag = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 27px;
  color: white;
  background: ${({ available }: { available: boolean; active: boolean }) => (available ? "#1190D7" : "#E0E0E0")};
  border-right: 1px solid white;
  cursor: ${({ available }: { available: boolean; active: boolean }) => (available ? "pointer" : "initial")};
  user-select: none;

  &::after {
    display: block;
    content: "";
    opacity: ${({ active }: { available: boolean; active: boolean }) => (active ? 1 : 0)};
    transition: opacity 0.12s;
    position: absolute;
    top: 20px;
    left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 8px 0 8px;
    border-color: #1190d7 transparent transparent transparent;
  }
`;
*/

const CanvasContainer = styled("div")`
  position: relative;
  width: 120px;
  height: 120px;
  top: 0;
  left: 0;
  z-index: 99900;
`;

const Canvas = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Root = styled("div")`
  margin-right: 16px;
  margin-bottom: 16px;
  width: 120px;

  svg {
    display: block;
  }
`;

const Grid = ({ size }: { size: number }) => {
  const halfSize = size / 2;
  const center = 60;
  const whiskerLength = size / 2;

  const Corner = ({ dx, dy }: { dx: (a: number, b: number) => number; dy: (a: number, b: number) => number }) => (
    <g>
      <line
        x1={dx(center, halfSize)}
        x2={dx(center, halfSize + whiskerLength)}
        y1={dy(center, halfSize)}
        y2={dy(center, halfSize)}
        strokeWidth={1}
        stroke="#EEEEEE"
      />
      <line
        x1={dx(center, halfSize)}
        x2={dx(center, halfSize)}
        y1={dy(center, halfSize)}
        y2={dy(center, halfSize + whiskerLength)}
        strokeWidth={1}
        stroke="#EEEEEE"
      />
    </g>
  );

  const add = (a: number, b: number): number => a + b;
  const sub = (a: number, b: number): number => a - b;

  return (
    <svg style={{ display: "block", position: "absolute", zIndex: 5 }} width="120" height="120" viewBox="0 0 120 120">
      <g>
        <rect x={center - halfSize} y={center - halfSize} width={size} height={size} fill="#FFBBFF" />

        <Corner dx={sub} dy={sub} />
        <Corner dx={add} dy={sub} />
        <Corner dx={add} dy={add} />
        <Corner dx={sub} dy={add} />
      </g>
    </svg>
  );
};

const Name = styled("div")`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: rgb(51, 51, 51);
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.2;
  position: relative;
  margin: 6px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
