import type { NextPageContext, NextComponentType } from "next";

export interface PageMetadata {
  hideAppBar: boolean;
}

export interface MakePageOptions {
  hideAppBar?: boolean;
}

export type PageWithMetadata<PropTypes = any> = NextComponentType<
  NextPageContext,
  any,
  PropTypes
> & {
  pageMetadata?: PageMetadata;
};

export const pageDefaults: PageMetadata = {
  hideAppBar: false,
};

export function makePage<PropTypes = any>(
  Component: NextComponentType<NextPageContext, any, PropTypes>,
  options: MakePageOptions = {}
): PageWithMetadata<PropTypes> {
  const Page: PageWithMetadata<PropTypes> = (props: PropTypes) => (
    //@ts-ignore
    <Component {...props} />
  );
  Page.pageMetadata = { ...pageDefaults, ...options };
  return Page;
}
