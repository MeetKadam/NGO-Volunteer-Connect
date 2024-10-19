import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './store/auth.jsx'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { SidebarProvider } from './Shop/context/sidebar_context';
// import { CoursesProvider } from './Shop/context/courses_context';
// import { CartProvider } from './Shop/context/cart_context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <React.StrictMode>
    <App />
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
bodyClassName='toastBody'
/>
  </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
