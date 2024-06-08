import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import AuthProviders from './providers/AuthProviders.jsx';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProviders>
    <RouterProvider router={router} />
    <Toaster/>
    </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>,
)
