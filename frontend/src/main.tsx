import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import AlbumProvider from './context/AlbumProvider.tsx'
import NotesProvider from './context/NotesProvider.tsx'
import MusicProvider from './context/MusicProvider.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AuthProvider>
      <MusicProvider>
        <AlbumProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </AlbumProvider>
      </MusicProvider>
    </AuthProvider>
  </StrictMode>,
)
