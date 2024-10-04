import { defineConfig } from 'vite'


export default defineConfig({
  build:{
    emptyOutDir: false,
    rollupOptions:{
      input:{
        content: "./src/chrome/contentScript.ts",
        // "content-main": "./content_script/main.ts",
      },
      output:{
        entryFileNames: "assets/[name].js"
      }
    },
  },
})