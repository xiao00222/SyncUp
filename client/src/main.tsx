import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App/Layouts/Styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './App/Router/routes';
import { Store, StoreContext } from './lib/stores/store';
import {ToastContainer} from 'react-toastify';
const queryClient= new QueryClient;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={Store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
    <RouterProvider router={router}/>
    </QueryClientProvider>
    </StoreContext.Provider>
  </StrictMode>,
)
