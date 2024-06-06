import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import AuthProviders from './providers/AuthProviders.jsx';
import { Toaster } from 'react-hot-toast';
import { router } from './routes/Routes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
    <RouterProvider router={router} />
    <Toaster/>
    </AuthProviders>
  </React.StrictMode>,
)
