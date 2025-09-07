import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 깃허브 리포명이 'reponame'라면 base는 '/reponame/'
export default defineConfig({
  plugins: [react()],
  base: '/topgun/'
})
