import { Montserrat } from 'next/font/google';
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import './globals.css';

const montserrat = Montserrat({ 
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </body>
    </html>
  );
}