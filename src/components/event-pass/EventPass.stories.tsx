import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventPass } from "./EventPass";

const meta = {
  title: "Components/Event Pass",
  component: EventPass,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Attendee pass with QR. The `status` prop switches between Valid and Checked in. Colors come from the Theme collection (Default / Stan Smith).",
      },
    },
  },
  args: {
    eventName: "STAN SMITH · SHANGHAI",
    guestName: "Cecilia Vera",
    code: "SS-1001",
    guestType: "Guest",
    plusOne: "Yes (+1)",
    status: "valid",
  },
  argTypes: {
    status: { control: "inline-radio", options: ["valid", "checked-in"] },
  },
} satisfies Meta<typeof EventPass>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Before the door. Follows the theme selected in the toolbar. */
export const Valid: Story = {};

/** After staff scan the QR at the door. */
export const CheckedIn: Story = { args: { status: "checked-in" } };

/** All four combinations: both statuses in both themes, as in the Figma matrix. */
export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: 24 }}>
      {(["stan-smith", "default"] as const).map((theme) => (
        <div key={theme} data-theme={theme} style={{ display: "grid", gap: 24 }}>
          <EventPass {...args} status="valid" />
          <EventPass {...args} status="checked-in" />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

/** Press accreditation with a longer name, to check wrapping. */
export const LongName: Story = {
  args: { guestName: "Alexandra Montserrat-Villanueva", guestType: "Press", plusOne: "Yes (+1)" },
};
