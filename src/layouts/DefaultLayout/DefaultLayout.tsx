import { ReactNode } from 'react';
import sx from './DefaultLayout.module.less';
import FloatingTab from '@/components/FloatingTab/FloatingTab';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={sx['max-w-600']}>
      {children}
      <div className='fixed left-0 bottom-4 flex w-full justify-center'>
        <FloatingTab />
      </div>
    </div>
  );
}

export default DefaultLayout;
