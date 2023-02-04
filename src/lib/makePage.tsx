import type { PageMetadata, MakePageOptions, PageWithMetadata } from "@/types";
import type { NextPageContext, NextComponentType } from "next";

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
