'use client'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => (
  <input 
    {...props}
    className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 w-full placeholder:text-zinc-500 transition-all"
  />
)