import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "ADL/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "[Global] Button from the adidas Global Library. Types: Primary, Secondary, Membership. States: Enabled, Hover, Disabled, Loading. Light and on dark, fixed or full width. ADL colors do not change with the app theme. Font is Barlow here because AdihausDIN is proprietary.",
      },
    },
  },
  args: { children: "Label" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "membership"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const variants = ["primary", "secondary", "membership"] as const;

function Matrix({ onDark }: { onDark?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, max-content)",
        gap: 16,
        padding: 24,
        background: onDark ? "#000" : "#fff",
      }}
    >
      {variants.map((v) => (
        <div key={v} style={{ display: "contents" }}>
          <Button variant={v} onDark={onDark}>Enabled</Button>
          <Button variant={v} onDark={onDark} disabled>Disabled</Button>
          <Button variant={v} onDark={onDark} loading>Label</Button>
          <Button variant={v} onDark={onDark} icon={false}>No icon</Button>
        </div>
      ))}
    </div>
  );
}

/** Every type and state on a light surface. Hover with the mouse to see the hover state. */
export const AllLight: Story = { render: () => <Matrix />, parameters: { layout: "fullscreen" } };

/** Same grid with the "On dark" inverse colors. */
export const AllOnDark: Story = { render: () => <Matrix onDark />, parameters: { layout: "fullscreen" } };

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ width: 326 }}><Story /></div>],
};

export const AsLink: Story = { args: { href: "#", children: "Go to event" } };
