import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/turbo-transition.esm.js",
      format: "esm",
      sourcemap: true
    },

    {
      file: "dist/turbo-transition.umd.js",
      name: "IRun",
      format: "umd",
      sourcemap: true
    }
  ],

  plugins: [
    resolve(),
    terser()
  ]
};
