import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "ADL/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "[Global] Button from the adidas Global Library. Types: Primary, Secondary, Membership. States: Enabled, Hover, Disabled, Loading. Fixed or full width. ADL colors do not change with the app theme. Font is Barlow here because AdihausDIN is proprietary.",
      },
    },
  },
  args: { children: "Label", onClick: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "membership"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Disabled never fires onClick. */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** Loading never fires onClick and tells assistive tech it is busy. */
export const Loading: Story = {
  args: { loading: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

const variants = ["primary", "secondary", "membership"] as const;

function Matrix() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, max-content)",
        gap: 16,
        padding: 24,
        background: "#fff",
      }}
    >
      {variants.map((v) => (
        <div key={v} style={{ display: "contents" }}>
          <Button variant={v}>Enabled</Button>
          <Button variant={v} disabled>Disabled</Button>
          <Button variant={v} loading>Label</Button>
          <Button variant={v} icon={false}>No icon</Button>
        </div>
      ))}
    </div>
  );
}

/** Every type and state on a light surface. Hover with the mouse to see the hover state. */
export const AllLight: Story = { render: () => <Matrix />, parameters: { layout: "fullscreen" } };

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ width: 326 }}><Story /></div>],
};

export const AsLink: Story = { args: { href: "#", children: "Go to event" } };
