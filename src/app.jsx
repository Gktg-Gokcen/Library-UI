import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/ekutuphane/router/Router';
import ThemeProvider from 'src/theme';
import { Toaster, toast } from 'sonner'

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Toaster
      className='my-toast'
        toastOptions={{
          classNames: {

            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
        position='top-right'
        duration={5000}
        closeButton
      />
      <Router />
    </ThemeProvider>
  );
}
