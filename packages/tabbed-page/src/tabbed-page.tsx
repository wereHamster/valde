import * as React from "react";
import styled from "react-emotion";
import { Page } from "catalog";

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
  state: State = {
    activePaneIndex: this.props.initialPaneIndex || 0
  };

  activatePane = (activePaneIndex: number) => (): void => {
    this.setState({ activePaneIndex });
  };

  render() {
    const { panes } = this.props;
    const { activePaneIndex } = this.state;
    const activePane = panes[activePaneIndex];

    return (
      <Page>
        <Menu>
          {panes.map(({ label }, i) => (
            <MenuItem key={i} isActive={activePaneIndex === i} onClick={this.activatePane(i)}>
              {label}
            </MenuItem>
          ))}
        </Menu>

        <Content>
          {activePane && activePane.render()}
        </Content>
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
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 27.648px;
  line-height: 1.2;
  position: relative;
  margin-right: 32px;
  border-bottom: 2px solid ${(p: { isActive: boolean }) => (p.isActive ? "rgb(17, 144, 215)" : "tranparent")};
  cursor: pointer;
  transition: color 0.12s;
  user-select: none;

  &:hover {
    color: rgb(17, 144, 215);
  }
`;

const Content = styled('div')`
  flex-basis: 100%;

  & > div[class*="Page-Page"] {
    margin: 0;
    padding: 0;
  }
`