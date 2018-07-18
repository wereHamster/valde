import * as React from "react";
import { Catalog } from "catalog";

export default class extends React.PureComponent<{}> {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    if (!this.state.isMounted) {
      return null;
    } else {
      return <Catalog {...config} />;
    }
  }
}

declare const require: (moduleName: string) => any;

const config = {
  title: "Valde",
  pages: [
    {
      title: "Welcome",
      path: "/",
      component: require("../README.md")
    },
    {
      title: "Packages",
      pages: [
        require("../packages/icon-specimen/doc/index").default,
        require("../packages/tabbed-page/doc/index").default
      ]
    }
  ]
};
