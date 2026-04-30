<script setup lang="ts">
/**
 * Password Vault VaultTypes previews — PNG assets aligned with Password Vault design.
 */
import { computed } from 'vue';
import { UsersIcon } from '@heroicons/vue/24/outline';
import { credentialTypeDisplayLabel, type VaultPreviewType } from './vaultDisplayTypes';

import iconPassword from '../assets/vault-type-icons/password.png';
import iconTwoFactor from '../assets/vault-type-icons/two-factor.png';
import iconKey from '../assets/vault-type-icons/key.png';
import iconPaymentCard from '../assets/vault-type-icons/payment-card.png';
import iconNote from '../assets/vault-type-icons/note.png';
import iconIdCard from '../assets/vault-type-icons/id-card.png';
import iconIdentity from '../assets/vault-type-icons/identity.png';
import iconWebsite from '../assets/vault-type-icons/website.png';
import iconFolder from '../assets/vault-type-icons/folder.png';

defineOptions({
  name: 'VaultTypes',
});

const ICON_BY_TYPE: Record<VaultPreviewType, string> = {
  Password: iconPassword,
  '2FA': iconTwoFactor,
  Key: iconKey,
  'Payment Card': iconPaymentCard,
  Note: iconNote,
  'ID Card': iconIdCard,
  Identity: iconIdentity,
  Website: iconWebsite,
  Folder: iconFolder,
};

const props = withDefaults(
  defineProps<{
    type?: VaultPreviewType;
    /** Shared folder badge (folders only) */
    shared?: boolean;
    /** Narrow layout (~28px) vs default (~36px) */
    density?: 'default' | 'compact';
  }>(),
  {
    type: 'Password',
    shared: false,
    density: 'default',
  },
);

const iconSrc = computed(() => ICON_BY_TYPE[props.type]);

const outerSizeClass = computed(() => (props.density === 'compact' ? 'size-7' : 'size-9'));

const altLabel = computed(() => credentialTypeDisplayLabel(props.type));
</script>

<template>
  <div class="relative inline-flex shrink-0" :class="outerSizeClass">
    <img
      :src="iconSrc"
      :alt="altLabel"
      class="size-full rounded-md object-contain"
      loading="lazy"
      decoding="async"
    />

    <span
      v-if="shared && type === 'Folder'"
      class="absolute bottom-0 right-0 rounded-full bg-neutral-surface p-xxs shadow-e100 ring-1 ring-neutral-default_solid"
    >
      <UsersIcon class="size-2 text-neutral-base" aria-hidden="true" />
    </span>
  </div>
</template>
