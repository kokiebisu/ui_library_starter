#!/usr/bin/env node
const path = require("path");
const rollup = require("rollup");
// locates and resolves packages in node_modules
const { nodeResolve } = require("@rollup/plugin-node-resolve");
// transpile ES6/7 code to generate standalone bundle
const { babel } = require("@rollup/plugin-babel");

const currentWorkingPath = process.cwd();

// get the main and name property from 'package.json' in the directory where the command is executed
const { main, name } = require(path.join(currentWorkingPath, "package.json"));

// main is the path to the build entrypoint /Users/ken/Desktop/components/packages/atoms-builder + /lib/atoms-builder
const inputPath = path.join(currentWorkingPath, main);

const fileName = name.replace("@components", "");

const inputOptions = {
  input: inputPath,
  external: ["react"],
  plugins: [
    nodeResolve(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "bundled",
    }),
  ],
};

const outputOptions = [
  {
    file: `dist/${fileName}.cjs.js`,
    format: "cjs",
  },
  {
    file: `dist/${fileName}.esm.js`,
    format: "esm",
  },
];

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  outputOptions.forEach(async (options) => {
    await bundle.write(options);
  });
}

build();
