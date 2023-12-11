import { forwardRef as forwardReactRef } from 'react';

type As = React.ElementType;

type Assign<T, U> = Omit<T, keyof U> & U;

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: (
      | Assign<React.ComponentProps<Component>, Props>
      | Assign<React.ComponentProps<AsComponent>, Props>
    ) & { as?: AsComponent },
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
};

export default function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<any, Props & { as?: As }>,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<Component, Props>;
}
