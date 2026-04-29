<script setup lang="ts">
import { LinkText } from '@jumpcloud/circuit/components';
import MfaConfigurationPageShell from '../../quickwins/MfaConfigurationPageShell.vue';
import { menuItems, profileMenuItems } from '../data/passwordVaultNavigation';

defineOptions({
  name: 'MultiFactorAuthenticationPage',
});
</script>

<template>
  <MfaConfigurationPageShell
    :menu-items="menuItems"
    :profile-menu-items="profileMenuItems"
    active-item="security"
  >
    <template #customText>
      <p class="px-2 text-left text-body-xs text-neutral-subtle">
        Having trouble with the new navigation?
        <LinkText
          label="Check out the guide"
          href="https://jumpcloud.com/support"
          target="_blank"
          rel="noopener noreferrer"
          :showIcon="false"
          customClass="text-body-xs"
        />
      </p>
    </template>
  </MfaConfigurationPageShell>
</template>
