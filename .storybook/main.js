module.exports = {
  stories: ["../packages/**/*.stories.js"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    // removing default css from storybook
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
    );

    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
      ],
    });

    // without this, then storybook will reference the module field path in package.json
    config.resolve.mainFields = ["src", "module", "main"];

    return config;
  },
};
