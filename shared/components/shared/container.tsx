import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  id?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ id, className, children }) => {
  return <div id={id} className={cn('mx-auto container', className)}>{children}</div>;
};
