import * as React from "react";
import styled from "react-emotion";
import { Descriptor } from "./types";
import { Icon } from "./icon";

export const Icons = ({ descriptors }: { descriptors: Descriptor[] }) => (
  <Root>
    {descriptors.map((descriptor, i) => (
      <Icon allSizes={[]} descriptor={descriptor} />
    ))}
  </Root>
);

const Root = styled("div")`
  display: flex;
`;
