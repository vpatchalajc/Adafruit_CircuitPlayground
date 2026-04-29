import type { Meta, StoryObj } from '@storybook/vue3';
import MultiFactorAuthenticationPage from './MultiFactorAuthenticationPage.vue';

const meta: Meta<typeof MultiFactorAuthenticationPage> = {
  title: 'Projects/Veera Playground/Multi Factor Authentication',
  component: MultiFactorAuthenticationPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MultiFactorAuthenticationPage>;

export const Default: Story = {};
