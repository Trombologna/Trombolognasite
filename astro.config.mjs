import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://www.trombologna.it/",
  markdown: { remarkPlugins: [], rehypePlugins: [] },
  integrations: [],
  output: "static"
});
