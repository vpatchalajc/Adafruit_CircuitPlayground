import type { Meta, StoryObj } from '@storybook/vue3';
import AccessNavigationDemoPage from './AccessNavigationDemoPage.vue';

const meta = {
  title: 'PROJECTS/Veera Playground/Access & Password Vault',
  component: AccessNavigationDemoPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AccessNavigationDemoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccessHome: Story = {
  args: {
    initialView: 'access',
    initialPasswordVaultActivated: false,
  },
};

export const PasswordVaultLanding: Story = {
  args: {
    initialView: 'password-vault',
    initialPasswordVaultActivated: false,
  },
};

export const PasswordVaultDashboard: Story = {
  args: {
    initialView: 'password-vault',
    initialPasswordVaultActivated: true,
  },
};
