import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Required for path resolution in ES modules
import { dirname } from "path"; // Required for path resolution in ES modules
import process from "process"; // was having errors unti i added this

// Calculate the equivalent of __dirname for ES Module environments.
// This resolves the ESLint error: '__dirname' is not defined.
const __filename = fileURLToPath(import.meta.url);
const currentDirname = dirname(__filename);

// This function resolves the path relative to the config file's location
// We now use the calculated directory name instead of the undefined __dirname global.
const resolvePath = (p) => path.resolve(currentDirname, p);

let serverConfig = {};

// 2. Check if HTTPS is explicitly enabled (process.env is available at runtime)
if (process.env.HTTPS === "true") {
  console.log(
    "--- Vite: Attempting to enable HTTPS using ES6 imports and resolved paths ---"
  );

  // Retrieve file paths from environment variables
  // NOTE: If ESLint still flags 'process', it means your linter config is missing the 'node' environment setting.
  // However, this code will execute correctly during runtime because it is a Node process.
  const crtPath = process.env.SSL_CRT_FILE || "localhost.pem";
  const keyPath = process.env.SSL_KEY_FILE || "localhost-key.pem";

  try {
    // 3. Manually read the certificate files into memory
    const cert = fs.readFileSync(resolvePath(crtPath));
    const key = fs.readFileSync(resolvePath(keyPath));

    // 4. Set the HTTPS server configuration
    serverConfig = {
      // Allows Vite to run over HTTPS
      https: {
        key: key,
        cert: cert,
      },
      // Note: If you want a specific port, set it here (e.g., port: 5173)
    };
    console.log(
      `Successfully loaded custom certificates from ${crtPath} and ${keyPath}.`
    );
  } catch (error) {
    console.error(
      "--- ERROR: Failed to load custom SSL files for Vite server ---"
    );
    console.error(
      `Please ensure the files are at: ${resolvePath(
        crtPath
      )} and ${resolvePath(keyPath)}`
    );
    // Outputting the error to help debug file issues
    console.error(error.message);
  }
}

// Export the final configuration
export default defineConfig({
  plugins: [react()],
  // Apply the server configuration
  server: serverConfig,
});
