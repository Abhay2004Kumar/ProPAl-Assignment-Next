import './globals.css'
import { ThemeProviderWrapper } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ThemeProviderWrapper>
        {children}
        <Toaster position="top-center" />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
