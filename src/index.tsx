import '@/output.css';
import { CustomRouter } from '@/router';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={navigate}>
          <CustomRouter />
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
