import { ReactNode } from 'react';
import sx from './DefaultLayout.module.less';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className={sx['max-width-500']}>{children}</div>;
}

export default DefaultLayout;
