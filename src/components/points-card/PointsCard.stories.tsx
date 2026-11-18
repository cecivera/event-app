import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PointsCard } from "./PointsCard";

const meta = {
  title: "Components/Points Card",
  component: PointsCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Event points, raffle entries and progress to the next entry. Switch theme with the toolbar (Default / Stan Smith). Only `accent` and `accent-strong` tokens change per theme.",
      },
    },
  },
  args: {
    points: 8879,
    eventPoints: 150,
    raffleEntries: 1,
    progress: 50,
    pointsToNextEntry: 50,
  },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof PointsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Follows the theme selected in the toolbar. */
export const Playground: Story = {};

/** Matches Figma "Default" mode (black accents). */
export const Default: Story = {
  globals: { theme: "default" },
};

/** Matches Figma "Stan Smith" mode (green accents). */
export const StanSmith: Story = {
  globals: { theme: "stan-smith" },
};

/** Both themes side by side, as in the Figma matrix. */
export const BothThemes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div data-theme="stan-smith">
        <PointsCard {...args} />
      </div>
      <div data-theme="default">
        <PointsCard {...args} />
      </div>
    </div>
  ),
};

/** Edge: nothing earned yet. Behavior for zero is an open decision in the spec. */
export const Empty: Story = {
  args: { points: 0, eventPoints: 0, raffleEntries: 0, progress: 0, pointsToNextEntry: 100 },
};

/** Edge: large balance, to check overflow. */
export const LargeBalance: Story = {
  args: { points: 1234567, eventPoints: 98765, raffleEntries: 42, progress: 90, pointsToNextEntry: 10 },
};
