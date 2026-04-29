import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'PROJECTS/Veera Playground/Welcome',
  render: () => ({
    template: '<button style="background: blue; color: white; padding: 20px;">Hello from Veera!</button>',
  }),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
