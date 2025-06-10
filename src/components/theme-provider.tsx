'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProviderWrapper({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
}: Props) {
  return (
    <ThemeProvider attribute={attribute} defaultTheme={defaultTheme} enableSystem={enableSystem}>
      {children}
    </ThemeProvider>
  );
}
