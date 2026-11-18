import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "./Tag";

const meta = {
  title: "ADL/Tag",
  component: Tag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "[Global] Tag from the adidas Global Library: a label for a category or status. Types: Default, Subtle, Membership. Regular or bold, light or on dark.",
      },
    },
  },
  args: { children: "Label" },
  argTypes: { type: { control: "inline-radio", options: ["default", "subtle", "membership"] } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, max-content)", gap: 16 }}>
      {(["default", "subtle", "membership"] as const).map((t) => (
        <div key={t} style={{ display: "contents" }}>
          <Tag type={t}>{t}</Tag>
          <Tag type={t} bold>{t}</Tag>
        </div>
      ))}
    </div>
  ),
};

export const OnDark: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24, background: "#000" }}>
      <Tag onDark>Default</Tag>
      <Tag onDark bold>Default</Tag>
      <Tag type="membership" onDark>Membership</Tag>
      <Tag type="membership" onDark bold>Membership</Tag>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
