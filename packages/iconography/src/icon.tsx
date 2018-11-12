import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import styled, { injectGlobal } from "react-emotion";
import posed from "react-pose";
import Measure, { MeasuredComponentProps, BoundingRect } from "react-measure";
import { markdown } from "@catalog/core";
import { Size, Descriptor, Instance } from "./types";

/* tslint:disable-next-line */
injectGlobal`
div[class*="AppLayout"] {
  z-index: unset;
}
`;

const kRootSize = 100;

export interface Props {
  allSizes: Size[];
  descriptor: Descriptor;
}

interface State {
  isOpen: boolean;
  activeInstance: Instance;
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

const Preview = styled(
  posed.div({
    initial: { opacity: 1 },
    fullscreen: { opacity: 0 }
  })
)``;

export class Icon extends React.PureComponent<Props, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any };

  state: State = {
    isOpen: false,
    activeInstance: this.props.descriptor.instances[0]
  };

  toggle = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { catalog } = this.context;

    return (
      <Root style={{ zIndex: this.state.isOpen ? 9999 : 1 }}>
        <Measure bounds>
          {({ measureRef, contentRect }: MeasuredComponentProps) => (
            <CanvasContainer innerRef={measureRef}>
              {contentRect.bounds && (
                <Inner {...this.props} {...this.state} {...contentRect.bounds} toggle={this.toggle} />
              )}
            </CanvasContainer>
          )}
        </Measure>

        <Name theme={catalog.theme}>{this.props.descriptor.name}</Name>

        <div style={{ display: "none" }}>{StyleInjector}</div>
      </Root>
    );
  }
}

class Inner extends React.PureComponent<Props & State & BoundingRect & { toggle(): void }> {
  render() {
    const { isOpen, activeInstance, width, height, toggle } = this.props;

    return (
      <Box pose={isOpen ? "fullscreen" : "initial"} style={{ position: isOpen ? "fixed" : "static" }}>
        <Detail {...this.props} />

        <Preview>
          {!isOpen && (
            <IconCanvas
              width={width}
              height={height}
              size={activeInstance.size === "responsive" ? 32 : activeInstance.size}
              Component={activeInstance.Component}
              onClick={toggle}
            />
          )}
        </Preview>
      </Box>
    );
  }
}

class Detail extends React.PureComponent<Props & State & { toggle(): void }, { activeInstance: Instance }> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any };

  state = {
    activeInstance: this.props.descriptor.instances[0]
  };

  activateInstance = (i: number) => (): void => {
    this.setState({ activeInstance: this.props.descriptor.instances[i] });
  };

  render() {
    const { catalog } = this.context;
    const { activeInstance } = this.state;
    const { descriptor, isOpen, toggle } = this.props;
    const { name, instances } = descriptor;

    return (
      <div
        style={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          alignSelf: "stretch",
          flexGrow: 1
        }}
      >
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
            boxShadow: "0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)",
            opacity: isOpen ? 1 : 0,
            transition: "all .2s"
          }}
          onClick={toggle}
        >
          <svg width="36" height="36" viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="white"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>

        <DetailHeader theme={catalog.theme}>
          <div>Icon</div>
          <Name theme={catalog.theme}>{name}</Name>
        </DetailHeader>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {instances.map(({ size, Component }, i) => (
            <CanvasBoxChild key={i}>
              <IconCanvas
                width={160}
                height={160}
                size={size === "responsive" ? 60 : size}
                Component={Component}
                highlighted={instances[i] === activeInstance}
                onClick={this.activateInstance(i)}
              />
              <Name theme={catalog.theme}>{size === "responsive" ? `@60px` : `${size}x${size}`}</Name>
            </CanvasBoxChild>
          ))}
        </div>

        <div
          style={{
            alignSelf: "stretch",
            margin: "0 40px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <div
            style={{
              flexGrow: 1,
              marginRight: 40
            }}
            className="catalog-g6dbai-Code-Code"
          >
            <code
              style={{ fontSize: 14, whiteSpace: "unset", minHeight: 100 }}
              className="catalog-2u9ymu-HighlightedCode-HighlightedCode"
            >
              {ReactDOMServer.renderToStaticMarkup(<activeInstance.Component />)}
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
    );
  }
}

const CanvasContainer = styled("div")`
  position: relative;
  width: ${kRootSize}px;
  height: ${kRootSize}px;
  top: 0;
  left: 0;
  z-index: 99900;
`;

const Canvas = styled("div")<{ highlighted?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: box-shadow 0.2s;
  cursor: pointer;

  box-shadow: ${p => (p.highlighted ? "0 0 6px 2px rgba(0, 0, 0, 0.1)" : "0 0 1px 0 rgba(0, 0, 0, 0.1)")};

  &:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  }

  svg rect {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover svg rect {
    opacity: 1;
  }
`;

const Root = styled("div")`
  margin-right: 16px;
  margin-bottom: 16px;
  width: ${kRootSize}px;

  svg {
    display: block;
  }
`;

interface IconCanvasProps {
  width: number;
  height: number;

  size: number;
  Component: React.ReactType;

  highlighted?: boolean;
}

class IconCanvas extends React.PureComponent<IconCanvasProps & React.HTMLAttributes<HTMLDivElement>> {
  render() {
    const { width, height, size, Component, ...props } = this.props;

    return (
      <Canvas {...props} style={{ width, height }}>
        <Grid size={size} />
        <div
          style={{
            position: "relative",
            zIndex: 20,
            fontSize: `${size}px`
          }}
        >
          <Component />
        </div>
      </Canvas>
    );
  }
}

class Grid extends React.PureComponent<{ size: number }> {
  render() {
    const { size } = this.props;

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
  }
}

const Name = styled("div")<{ theme: Theme }>`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, -1)};
  line-height: ${p => p.theme.msRatio};
  margin: 6px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailHeader = styled("div")<{ theme: Theme }>`
  height: 179px;
  align-self: stretch;
  padding: 0px 0px 21px 42px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background: ${p => p.theme.brandColor};
  margin: 0px;

  & div:first-child {
    font-style: normal;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-family: ${p => p.theme.fontHeading};
    font-size: ${p => getFontSize(p.theme, 1)};
    line-height: ${p => p.theme.msRatio};
    color: white;
    opacity: 0.6;
  }

  & div:last-child {
    font-family: ${p => p.theme.fontHeading};
    font-size: ${p => getFontSize(p.theme, 4)};
    line-height: ${p => p.theme.msRatio};
    color: white;
    margin: 0;
  }
`;

interface Theme {
  brandColor: string;
  fontHeading: string;
  textColor: string;
  sidebarColorText: string;
  sidebarColorTextActive: string;
  baseFontSize: number;
  msRatio: number;
}

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;
