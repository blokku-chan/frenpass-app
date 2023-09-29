import { defineConfig } from "vite";
import { imba } from "vite-plugin-imba";
import { resolve } from "path";
import url from "url";

// ENTRY
const _dirname = url.fileURLToPath(new URL(".", import.meta.url));
const entry = resolve(_dirname, "src/main.js");

export default defineConfig(({ command, mode }) => {
  return {
    base: "/",
    plugins: [imba()],
    resolve: {
      extensions: [
        ".imba",
        ".imba1",
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
      ],
    },
    define: {
      "import.meta.vitest": undefined,
    },
    build: {
      sourcemap: true,
      manifest: true,
      minify: true,
      rollupOptions: {
        output: {
          dir: "./dist_client",
          name: "main",
        },
        input: {
          entry,
        },
      },
    },
    server: {
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
    },
  };
});
