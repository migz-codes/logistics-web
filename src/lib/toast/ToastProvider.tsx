'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}

      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        className='text-sm'
      />
    </>
  )
}
