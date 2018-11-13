/**
 * The size of an icon. It's either responsive (adapts to EM), or has
 * a fixed size.
 */
export type Size = "responsive" | number;

export interface Instance {
  size: Size;
  Component: React.ReactType;
}

export interface Descriptor {
  name: string;
  instances: Instance[];
}
