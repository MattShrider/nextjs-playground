import type {
  PageMetadata,
  MakePageOptions,
  PageWithMetadata,
  MyPageProps,
} from "@/types/types";
import type { NextPageContext, NextComponentType } from "next";

export const pageDefaults: PageMetadata = {
  hideAppBar: false,
};

export function makePage<PropTypes extends MyPageProps = MyPageProps>(
  Component: NextComponentType<NextPageContext, any, PropTypes>,
  options: MakePageOptions = {}
): PageWithMetadata<PropTypes> {
  const Page: PageWithMetadata<PropTypes> = (props: PropTypes) => (
    <Component {...props} />
  );
  Page.pageMetadata = { ...pageDefaults, ...options };
  return Page;
}
