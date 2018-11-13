import { Icon, Icons, Descriptor } from "../src/index";
import { markdown } from "@catalog/core";

const descriptors: Descriptor[] = [
  {
    name: "check",
    instances: [
      {
        size: 24,
        Component: () => (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" fillRule="nonzero" d="M16.4 10L15 8.6l-4 4-2-2L7.6 12l3.4 3.4z" />
          </svg>
        )
      },
      {
        size: 48,
        Component: () => (
          <svg viewBox="0 0 24 24" width="48" height="48">
            <path fill="currentColor" fillRule="nonzero" d="M16.4 10L15 8.6l-4 4-2-2L7.6 12l3.4 3.4z" />
          </svg>
        )
      },
      {
        size: 64,
        Component: () => (
          <svg viewBox="0 0 24 24" width="64" height="64">
            <path fill="currentColor" fillRule="nonzero" d="M16.4 10L15 8.6l-4 4-2-2L7.6 12l3.4 3.4z" />
          </svg>
        )
      }
    ]
  },
  {
    name: "really-looong-name",
    instances: [
      {
        size: 24,
        Component: () => (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7z" fill="currentColor" />
          </svg>
        )
      },
      {
        size: 32,
        Component: () => (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7z" fill="currentColor" />
          </svg>
        )
      }
    ]
  },
  {
    name: "responsive",
    instances: [
      {
        size: "responsive",
        Component: () => (
          <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M19.586 11l-6-6L15 3.586 23.414 12 15 20.414 13.586 19l6-6H2v-2z" fill="currentColor" />
          </svg>
        )
      },
      {
        size: 32,
        Component: () => (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path d="M19.586 11l-6-6L15 3.586 23.414 12 15 20.414 13.586 19l6-6H2v-2z" fill="currentColor" />
          </svg>
        )
      }
    ]
  },
  {
    name: "combobox-search",
    instances: [
      {
        size: 16,
        Component: () => (
          <svg viewBox="0 0 16 16" width="16" height="16">
            <path
              d="M12.606 11.192l3.101 3.1a1 1 0 0 1-1.414 1.415l-3.1-3.1a7 7 0 1 1 1.414-1.414zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
              fill="currentColor"
            />
          </svg>
        )
      }
    ]
  },
  {
    name: "angle-back",
    instances: [
      {
        size: 16,
        Component: () => (
          <svg viewBox="0 0 16 16" width="16" height="16">
            <path
              d="M10.707 4.207a1 1 0 0 0-1.414-1.414l-4.5 4.5a1 1 0 0 0 0 1.414l4.5 4.5a1 1 0 1 0 1.414-1.414L6.914 8l3.793-3.793z"
              fill="currentColor"
            />
          </svg>
        )
      }
    ]
  }
];

export default {
  title: "iconography",
  path: "/packages/iconography",
  component: () => markdown`
![version](https://img.shields.io/npm/v/@valde/iconography.svg)

# Icon

The \`Icon\` component displays one named icon and also provides a detail view that shows more details (eg. multiple sizes) of that icon.

This component is best used in a grid, to show a whole range if icons next to each other.

### Example

${(
    <div style={{ flexBasis: "100%", marginTop: 24 }}>
      <Icon allSizes={[]} descriptor={descriptors[0]} />
    </div>
  )}


### Usage

~~~code|lang-js
import { Icon } from "@valde/iconography";

<Icon
  allSizes={[16, 24]}
  descriptor={{
    name: "angle-back",
    instances: [
      {
        size: 16,
        Component: require('.../ic_angle-back_16dp.svg')
      },
      {
        size: 24,
        Component: require('.../ic_angle-back_24dp.svg')
      }
    ]
  }}
/>
~~~


# Icons

The \`Icons\` component displays a number of icons in a grid. It also offers a search/filter functionality.

### Example

${(
    <div style={{ flexBasis: "100%", marginTop: 24 }}>
      <Icons descriptors={descriptors} />
    </div>
  )}
  `
};
