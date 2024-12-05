import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/Store.jsx'
import { Toaster } from "react-hot-toast"
import { Analytics } from '@vercel/analytics/react'

// combined store for all the reducers with thunk middleware applied
const store = configureStore({
  reducer: rootReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <Provider store={store} >
    <BrowserRouter>
      <App />
      <Toaster />
      <Analytics />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
