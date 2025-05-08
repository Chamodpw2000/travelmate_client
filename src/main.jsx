import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ClientContextProvider from './context/ClientContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientContextProvider>
    <GoogleOAuthProvider clientId='195751350994-vvqc916mvfga4sllg3us4j3m1aeoamba.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
    </ClientContextProvider>
  </StrictMode>,
)
