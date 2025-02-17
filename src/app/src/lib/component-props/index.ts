import {
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { DehydratedState } from '@tanstack/react-query';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

/* #[ReactQuery] Added for hydration */
export type DehydratedStateProps = {
  props?: {
    dehydratedState?: DehydratedState;
  };
};
