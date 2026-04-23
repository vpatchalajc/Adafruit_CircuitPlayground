import type { Meta, StoryObj } from '@storybook/vue3';
import AccessNavigationDemoPage from './AccessNavigationDemoPage.vue';

const meta: Meta<typeof AccessNavigationDemoPage> = {
  title: "Projects/Veera Playground/Access navigation (Password Vault Figma)",
  component: AccessNavigationDemoPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof AccessNavigationDemoPage>;

export const Default: Story = {};
