import pkg from "./package.json"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import license from "rollup-plugin-license"

export default [
  {
    input: "index.js",
    output: {
      name: "jskos",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      json(),
      // Add a plugin that assembles licenses for dependencies
      license({
        banner: {
          commentStyle: "ignored",
          content: `${pkg.name} v${pkg.version}\nCopyright (c) 2018 Verbundzentrale des GBV (VZG)\n@license ${pkg.license}\n\nFor dependency license information, please see ${pkg.browser}.LICENSES.txt.`,
        },
        thirdParty: {
          output: {
            file: pkg.browser + ".LICENSES.txt",
          },
        },
      }),
      babel({
        babelHelpers: "bundled",
      }),
    ],
  },
]
