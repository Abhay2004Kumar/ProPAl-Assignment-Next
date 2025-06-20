import './globals.css'
import ClientOnly from '../components/ClientOnly';
import { ThemeProviderWrapper } from '../components/theme-provider';
import { Toaster } from 'react-hot-toast';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <body>
        <ClientOnly>
          <ThemeProviderWrapper>
            {children}
            <Toaster position="top-center" />
          </ThemeProviderWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}
