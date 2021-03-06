import { Catalog, markdown } from "@catalog/core";
import { css, Global } from "@emotion/core";
import * as React from "react";

const globalStyles = css`
  /* Tuna Light */
  @font-face {
    font-family: Tuna;
    font-style: normal;
    font-weight: 300;
    src: url(${require("../fonts/Tuna/371F3E_3_0.woff2").default}) format("woff2");
  }

  /* Tuna LightItalic */
  @font-face {
    font-family: Tuna;
    font-style: italic;
    font-weight: 300;
    src: url(${require("../fonts/Tuna/371F3E_5_0.woff2").default}) format("woff2");
  }

  /* Tuna Regular */
  @font-face {
    font-family: Tuna;
    font-style: normal;
    font-weight: 400;
    src: url(${require("../fonts/Tuna/371F3E_7_0.woff2").default}) format("woff2");
  }

  /* Tuna RegularItalic */
  @font-face {
    font-family: Tuna;
    font-style: italic;
    font-weight: 400;
    src: url(${require("../fonts/Tuna/371F3E_9_0.woff2").default}) format("woff2");
  }

  /* Tuna Bold */
  @font-face {
    font-family: Tuna;
    font-style: normal;
    font-weight: 700;
    src: url(${require("../fonts/Tuna/371F3E_0_0.woff2").default}) format("woff2");
  }

  /* Tuna BoldItalic */
  @font-face {
    font-family: Tuna;
    font-style: italic;
    font-weight: 700;
    src: url(${require("../fonts/Tuna/371F3E_1_0.woff2").default}) format("woff2");
  }

  /* Fallback font for examples: Roboto Slab */
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

  body {
    ul[class*="Menu-className"] {
      border: none;

      > li {
        > a {
          border: none;
          padding: 8px 40px !important;
          font-size: 1.3rem;
          border: none;

          &:hover, &:active, &:focus {
            text-decoration: underline;
            border: none;
          }
        }

        > div {
          > a {
            border: none;
            padding: 8px 40px !important;
            font-size: 1.3rem;
            border: none;

            &:hover, &:active, &:focus {
              text-decoration: underline;
              border: none;
            }
          }

          > ul {
            margin-top: -4px;
            > li {
              > a {
                border: none;
                padding: 0 40px;
                font-size: 1rem;
                border: none;

                &:hover, &:active, &:focus {
                  text-decoration: underline;
                  border: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;

/*
@font-face {font-family: 'Tuna-MediumItalic';src: url('webfonts/371F3E_8_0.eot');src: url('webfonts/371F3E_8_0.eot?#iefix') format('embedded-opentype'),url('webfonts/371F3E_8_0.woff2') format('woff2'),url('webfonts/371F3E_8_0.woff') format('woff'),url('webfonts/371F3E_8_0.ttf') format('truetype');}
@font-face {font-family: 'Tuna-Heavy';src: url('webfonts/371F3E_2_0.eot');src: url('webfonts/371F3E_2_0.eot?#iefix') format('embedded-opentype'),url('webfonts/371F3E_2_0.woff2') format('woff2'),url('webfonts/371F3E_2_0.woff') format('woff'),url('webfonts/371F3E_2_0.ttf') format('truetype');}
@font-face {font-family: 'Tuna-HeavyItalic';src: url('webfonts/371F3E_4_0.eot');src: url('webfonts/371F3E_4_0.eot?#iefix') format('embedded-opentype'),url('webfonts/371F3E_4_0.woff2') format('woff2'),url('webfonts/371F3E_4_0.woff') format('woff'),url('webfonts/371F3E_4_0.ttf') format('truetype');}
@font-face {font-family: 'Tuna-Medium';src: url('webfonts/371F3E_6_0.eot');src: url('webfonts/371F3E_6_0.eot?#iefix') format('embedded-opentype'),url('webfonts/371F3E_6_0.woff2') format('woff2'),url('webfonts/371F3E_6_0.woff') format('woff'),url('webfonts/371F3E_6_0.ttf') format('truetype');}
*/

interface State {
  isMounted: boolean;
}

export default class extends React.PureComponent<{}, State> {
  state: State = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    if (!this.state.isMounted) {
      return null;
    } else {
      return (
        <>
          <Global styles={globalStyles} />
          <Catalog {...config} />
        </>
      );
    }
  }
}

declare const require: (moduleName: string) => any;

const config = {
  title: "Valdë",

  theme: {
    brandColor: "#460028",

    pageHeadingBackground: "#460028",

    sidebarColor: "#FFFFFF",
    sidebarColorActive: "#0d68cc",
    sidebarColorText: "#333333",
    sidebarColorTextActive: "#0d68cc",
    sidebarColorLine: "#46002922",
    sidebarColorHeading: "#460028",

    codeColor: "#00205B",
    linkColor: "#FF5578",
    textMedium: "#00205B",

    bgDark: "#333333",
    bgLight: "#EFEFEF",

    fontFamily: "Tuna, serif",
    fontHeading: "Tuna, serif",
    fontMono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",

    baseFontSize: 18,
    msRatio: 1.25
  },

  pages: [
    {
      title: "Welcome",
      path: "/",
      component: () => markdown`${require("../../README.md").default}`
    },
    {
      title: "Contributing",
      path: "/contributing",
      component: () => markdown`${require("../../docs/contributing.md").default}`
    },
    {
      title: "Packages",
      pages: [
        require("../../packages/iconography/doc/index").default,
        require("../../packages/react-component-page/doc/index").default,
        require("../../packages/tabbed-page/doc/index").default,
        require("../../packages/typography/doc/index").default
      ]
    },
    {
      title: "User Guides",
      pages: [
        {
          title: "Typography",
          path: "/user-guides/typography",
          component: () => markdown`${require("../../docs/user-guides/typography.md").default}`
        }
      ]
    },
    {
      title: "Playground",
      pages: [
        {
          title: "react-component-page",
          path: "/playground/react-component-page",
          component: require("../../packages/react-component-page/doc/playground").default
        }
      ],
      hideFromMenu: true
    }
  ]
};
