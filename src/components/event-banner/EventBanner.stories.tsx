import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventBanner } from "./EventBanner";

const meta = {
  title: "Components/Event Banner",
  component: EventBanner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Event banner for the Earn points and Connect accounts screens. Without an image it shows a branded placeholder in the theme's accent-strong color.",
      },
    },
  },
  args: {
    title: "Earn points at the event",
    description: "Earn points and join the prize draw.",
    ctaLabel: "See activities",
  },
} satisfies Meta<typeof EventBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Follows the theme selected in the toolbar. */
export const Playground: Story = {};

/** Both themes side by side, as in the Figma matrix. */
export const BothThemes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div data-theme="stan-smith">
        <EventBanner {...args} />
      </div>
      <div data-theme="default">
        <EventBanner {...args} />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

/** CTA as a link instead of a button. */
export const AsLink: Story = {
  args: { ctaHref: "#activities" },
};

/** With a real event image. */
export const WithImage: Story = {
  args: {
    imageSrc:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="716" height="440"><rect width="100%" height="100%" fill="#509f90"/><circle cx="358" cy="220" r="90" fill="#e3f3ea"/></svg>',
      ),
    imageAlt: "Event photo placeholder",
  },
};
