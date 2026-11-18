import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EarnPoints } from "./EarnPoints";

const items = [
  { id: "checkin", title: "Arrive and check in", points: "+100 points" },
  { id: "archive", title: "STAN SMITH Archive booth", points: "+50 points" },
  { id: "exchange", title: "Green Exchange booth", points: "+50 points · Get a Kermit" },
  { id: "styling", title: "Styling Corner booth", points: "+100 points" },
];

const meta = {
  title: "Components/Earn Points",
  component: EarnPoints,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "List of event activities. Pending items show a SCAN button, completed ones a DONE tag. In Figma this component uses hardcoded colors, so it does not react to the theme yet.",
      },
    },
  },
  args: { items },
} satisfies Meta<typeof EarnPoints>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma state "Antes": nothing scanned yet. */
export const Pending: Story = {};

/** Figma state "Despues": every activity completed. */
export const Done: Story = {
  args: { items: items.map((i) => ({ ...i, done: true })) },
};

/** Mid-event: some done, some pending. */
export const Mixed: Story = {
  args: { items: items.map((i, idx) => ({ ...i, done: idx < 2 })) },
};
