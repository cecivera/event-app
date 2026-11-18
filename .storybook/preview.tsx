import type { Preview } from "@storybook/nextjs-vite";
import "../src/tokens/tokens.css";
import "../src/tokens/typography.css";
import "../src/tokens/adl.css";

const preview: Preview = {
  initialGlobals: { theme: "stan-smith" },
  globalTypes: {
    theme: {
      description: "White-label theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "stan-smith", title: "Stan Smith" },
          { value: "default", title: "Default" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div data-theme={context.globals.theme}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    backgrounds: { disabled: true },
  },
};

export default preview;
