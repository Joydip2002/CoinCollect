import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './css/globals.css';
import  { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store.tsx';
import { TransactionProvider } from './context/TransactionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster/>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </Provider>
  </StrictMode>,
)
