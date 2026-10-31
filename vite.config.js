import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-google-doc-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/doc')) {
            try {
              const exportUrl = 'https://docs.google.com/document/d/1yWiKZdHJlovfvMzfBOaFTW3auEaKyKcEMBUOU68BPSE/export?format=txt';
              const response = await fetch(exportUrl, { redirect: 'follow' });
              const text = await response.text();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, text }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          next();
        });
      }
    }
  ],
  base: './',
  server: {
    host: true, // Mở cổng truy cập từ điện thoại qua mạng LAN / Wi-Fi
    port: 3000,
    open: true
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('lucide-react') || id.includes('sonner') || id.includes('canvas-confetti')) {
              return 'vendor-ui';
            }
          }
        }
      }
    }
  }
});
