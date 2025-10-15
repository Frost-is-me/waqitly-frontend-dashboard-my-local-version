import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import './plugins/i18n.ts'
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange={false}
        storageKey="waqitly-theme"
      >
        <App />
      </ThemeProvider>
    </QueryClientProvider>
    </HashRouter>
  </StrictMode>,
)
