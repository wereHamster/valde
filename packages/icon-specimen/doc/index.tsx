import { IconSpecimen } from "../src/icon-specimen";
import { markdown } from "catalog";

export default {
  title: "icon-specimen",
  path: "/packages/icon-specimen",
  component: () => markdown`
The \`IconSpecimen\` component displays one named icon and also provides a detail view that shows more details (eg. multiple sizes) of that icon.

This component is best used in a grid, to show a whole range if icons next to each other.

# Example

${(
    <div style={{ marginTop: 24, display: "flex" }}>
      <IconSpecimen
        allSizes={[]}
        descriptor={{
          name: "Check",
          sizes: [
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
        }}
      />
      <IconSpecimen
        allSizes={[]}
        descriptor={{
          name: "Danger",
          sizes: [
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
        }}
      />
    </div>
  )}

# Usage

TODO

  `
};
