import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import { sass } from "@stencil/sass";
import autoprefixer from "autoprefixer";
import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import tailwindConfig from "./tailwind.config";
import stylelint from "stylelint";

export const create: () => Config = () => ({
  namespace: 'stencil-starter-project-name',
    testing: {
    moduleNameMapper: {
      "^/assets/(.*)$": "<rootDir>/src/tests/iconPathDataStub.ts",
      "^lodash-es$": "lodash"
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"]
  },

  outputTargets: [
    { type: "dist-hydrate-script" },
    { type: "dist-custom-elements", autoDefineCustomElements: true },
    { type: "dist" },
    { type: "docs-readme" },
    { type: "docs-json", file: "./dist/extras/docs-json.json" },
    // { type: "custom", name: "preact", generator: generatePreactTypes },
    {
      type: "www",
      baseUrl: "https://stenciljs.com/",
      prerenderConfig: "./prerender.config.ts",
      serviceWorker: {
        unregister: true
      }
    }
  ],
    plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"]
    }),
    postcss({
      plugins: [
        tailwindcss(tailwindConfig as any as TailwindConfig),
        autoprefixer(),
        stylelint({
          configFile: ".stylelintrc-postcss.json",
          fix: true
        })
      ]
    })
  ],

})


export const config = create();
