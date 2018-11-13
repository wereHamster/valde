import * as PropTypes from "prop-types";
import * as React from "react";
import styled from "react-emotion";
import { Descriptor } from "./types";
import { Icon } from "./icon";

export interface IconsProps {
  descriptors: Descriptor[];
}

interface State {
  search: string;
}

export class Icons extends React.PureComponent<IconsProps, State> {
  static contextTypes = {
    catalog: PropTypes.object.isRequired
  };
  context!: { catalog: any };

  state: State = {
    search: ""
  };

  render() {
    const { descriptors } = this.props;
    const { search } = this.state;

    const filterDescriptors = (() => {
      if (search === "") {
        return (ds: Descriptor[]) => ds;
      } else {
        const re = new RegExp(`${search}`, 'i');
        return (ds: Descriptor[]) => ds.filter(d => d.name.match(re))
      }
    })();

    return (
      <Root>
        <Filter theme={this.context.catalog.theme}>
          <label>Search</label>
          <Input
            theme={this.context.catalog.theme}
            value={search}
            onChange={ev => {
              this.setState({ search: ev.currentTarget.value });
            }}
          />
        </Filter>
        <Grid>
          {filterDescriptors(descriptors).map((descriptor, i) => (
            <Icon allSizes={[]} descriptor={descriptor} />
          ))}
        </Grid>
      </Root>
    );
  }
}

const Root = styled("div")`
  flex-basis: 100%;
`;

const Grid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 16px;
`;

const Filter = styled("div")`
  label {
    display: block;
    margin-bottom: 4px;

    color: ${p => p.theme.textColor};
    font-family: ${p => p.theme.fontHeading};
    font-size: ${p => getFontSize(p.theme, 0)};
    line-height: ${p => p.theme.msRatio};
  }
`;

const Input = styled("input")<{ theme: Theme }>`
  width: 100%;
  margin-bottom: 16px;

  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontHeading};
  font-size: ${p => getFontSize(p.theme, 0)};
  line-height: ${p => p.theme.msRatio};

  padding: 10px 14px;

  outline: none;
  border: 1px solid ${p => p.theme.brandColor}88;

  &:focus {
    border-color: ${p => p.theme.brandColor};
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
