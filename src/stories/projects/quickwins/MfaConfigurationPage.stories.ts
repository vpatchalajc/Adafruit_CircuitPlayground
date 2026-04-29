import type { Meta, StoryObj } from '@storybook/vue3';
import MfaConfigurationPage from './MfaConfigurationPage.vue';

const meta: Meta<typeof MfaConfigurationPage> = {
  title: 'Projects/QuickWins/MFA Configuration',
  component: MfaConfigurationPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MfaConfigurationPage>;

export const Default: Story = {};
