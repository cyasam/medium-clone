import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { Session } from 'next-auth';

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
