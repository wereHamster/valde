import * as PropTypes from "prop-types";
import * as React from "react";
import styled from "react-emotion";
import { Page, Theme } from "@catalog/core";

export interface Pane {
  label: string;
  render(): JSX.Element;
}

export interface Props {
  initialPaneIndex?: number;
  panes: Pane[];
}

interface State {
  activePaneIndex: number;
}

export class TabbedPage extends React.PureComponent<Props, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any }

  state: State = {
    activePaneIndex: this.props.initialPaneIndex || 0
  };

  activatePane = (activePaneIndex: number) => (): void => {
    this.setState({ activePaneIndex });
  };

  render() {
    const { catalog } = this.context;
    const { panes } = this.props;
    const { activePaneIndex } = this.state;
    const activePane = panes[activePaneIndex];

    return (
      <Page>
        <Menu>
          {panes.map(({ label }, i) => (
            <MenuItem key={i} theme={catalog.theme} isActive={activePaneIndex === i} onClick={this.activatePane(i)}>
              {label}
            </MenuItem>
          ))}
        </Menu>

        <Content>{activePane && activePane.render()}</Content>
      </Page>
    );
  }
}

const Menu = styled("div")`
  display: flex;
  margin-bottom: 32px;
  flex-basis: 100%;
`;

const MenuItem = styled("div")`
  font-style: normal;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  color: ${(p: { theme: Theme }) => p.theme.sidebarColorText};
  font-family: ${(p: { theme: Theme }) => p.theme.fontHeading};
  font-size: ${(p: { theme: Theme }) => getFontSize(p.theme, 2)};
  line-height: ${(p: { theme: Theme }) => p.theme.msRatio};
  position: relative;
  margin-right: 32px;
  border-bottom: 2px solid
    ${(p: { theme: Theme; isActive: boolean }) => (p.isActive ? p.theme.sidebarColorTextActive : "transparent")};
  cursor: pointer;
  transition: color 0.12s;
  user-select: none;

  &:hover {
    color: ${(p: { theme: Theme }) => p.theme.sidebarColorTextActive};
  }
`;

const Content = styled("div")`
  flex-basis: 100%;

  & > div[class*="Page-Page"] {
    margin: 0;
    padding: 0;
  }
`;

const getFontSize = ({ baseFontSize, msRatio }: Theme, level: number = 0) =>
  `${(baseFontSize / 16) * Math.pow(msRatio, level)}em`;
