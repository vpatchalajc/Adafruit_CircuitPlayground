import type { Meta, StoryObj } from '@storybook/vue3';
import MathansPlayground from './MathansPlayground.vue';

const meta: Meta<typeof MathansPlayground> = {
  title: "Projects/Mathan's Playground/Home",
  component: MathansPlayground,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MathansPlayground>;

export const Default: Story = {};
