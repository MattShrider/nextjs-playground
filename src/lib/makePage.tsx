export const pageLayouts = {
  default: "default",
  fullscreen: "fullscreen",
} as const;

export interface PageMetadata {
  layout: keyof typeof pageLayouts;
  requireAuthentication: boolean;
}

export interface MakePageOptions {
  layout?: keyof typeof pageLayouts;
  requireAuthentication?: boolean;
}

export interface PageWithMetadata<PropTypes = unknown> {
  (props: PropTypes): JSX.Element;
  pageMetadata: PageMetadata;
}

export const pageDefaults: PageMetadata = {
  layout: pageLayouts.default,
  requireAuthentication: true,
};

export function makePage<PropTypes = unknown>(
  Component: (p: PropTypes) => JSX.Element,
  options: MakePageOptions
): PageWithMetadata<PropTypes> {
  const Page: PageWithMetadata<PropTypes> = (props: any) => (
    <Component {...props} />
  );
  Page.pageMetadata = { ...pageDefaults, ...options };
  return Page;
}
