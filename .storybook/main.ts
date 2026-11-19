import { existsSync } from "node:fs";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  // AdihausDIN is proprietary: it lives in fonts-local/ (git-ignored). Without it Storybook falls back to Barlow.
  staticDirs: existsSync("./fonts-local") ? [{ from: "../fonts-local", to: "/fonts-local" }] : [],
};

export default config;
