/**
 * @module left-pad-react
 */

import * as React from "react";
import { __catalogPreview__ } from "../src/index";
import { ReactSpecimen } from "@catalog/core";

export type Color = "RED" | "GREEN" | "MAGENTA";

export interface SomeComponentProps {
  /**
   * The label is a really useful prop. You should use it.
   */
  label: string;

  /**
   * This field uses a custom type.
   */
  color: Color;
}

/**
 * The best component in the whole wide world.
 *
 * Why use this component? Because of reasons.
 *
 * @stability stable
 */
export class SomeComponent extends React.Component<SomeComponentProps> {
  render() {
    return <div>SomeComponent ({this.props.label})</div>;
  }
}

__catalogPreview__(SomeComponent, () => (
  <ReactSpecimen sourceText="<… source …>">
    <SomeComponent label="nice" color="MAGENTA" />
  </ReactSpecimen>
));
