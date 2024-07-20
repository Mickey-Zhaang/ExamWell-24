import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Use '0.0.0.0' to accept connections from any IP address
    port: 3000,      // Customize the port number as needed
    open: 'http://localhost:3000/home', // Automatically open this URL in the browser
  }
})
