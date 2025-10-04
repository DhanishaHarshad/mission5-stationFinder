import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs"; //file system - helps store, access and manage data on an operating system

const certKeyPath = "./certs/localhost+2-key.pem";
const certCrtPath = "./certs/localhost+2.pem";

const httpsConfig =
  fs.existsSync(certKeyPath) && fs.existsSync(certCrtPath)
    ? {
        key: fs.readFileSync(certKeyPath),
        cert: fs.readFileSync(certCrtPath),
      }
    : false;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsConfig,
    port: 5713,
  },
});
