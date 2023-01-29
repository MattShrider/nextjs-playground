import type { ReactNode } from 'react';
export type Props<T = unknown> = T & { children: ReactNode | undefined };

export type Page<P = unknown> = {
    (props: P): ReactNode | null;
    removeToolbars?: boolean;
}