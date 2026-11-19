import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ButtonIcon } from "./ButtonIcon";

const meta = {
  title: "ADL/Button Icon",
  component: ButtonIcon,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Icon-only button used for actions where space is limited, like toolbars or utility actions.",
      },
    },
  },
  args: { label: "Next", onClick: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["large", "medium", "small"] },
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] },
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Next" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

const sizes = ["large", "medium", "small"] as const;
const variants = ["primary", "secondary", "ghost"] as const;

/** Every size and type in the Enabled state. Hover with the mouse to see the Hover state. */
export const All: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, max-content)", gap: 24, padding: 24 }}>
      {sizes.map((s) =>
        variants.map((v) => <ButtonIcon key={`${s}-${v}`} size={s} variant={v} label={`${s} ${v}`} />),
      )}
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const AsLink: Story = { args: { href: "#", label: "Go to event" } };
