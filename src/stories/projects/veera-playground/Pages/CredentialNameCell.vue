<script setup lang="ts">
import { computed } from 'vue';
import { useDataTableSmallSize } from '@jumpcloud/circuit/components';
import VaultTypes from './VaultTypes.vue';
import type { CredentialCategory } from './credentialTypes';
import type { VaultPreviewType } from './vaultDisplayTypes';

defineOptions({
  name: 'CredentialNameCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
  size?: 'default' | 'small';
}>();

const smallSize = useDataTableSmallSize(props.size);

const row = computed(
  (): { serviceName: string; credentialType: CredentialCategory; categoryLabel: string } | undefined => {
    const d = props.data as
      | { serviceName?: string; credentialType?: CredentialCategory; categoryLabel?: string }
      | undefined;
    if (!d?.credentialType || !d.serviceName) return undefined;
    return {
      credentialType: d.credentialType,
      serviceName: d.serviceName,
      categoryLabel: d.categoryLabel ?? '',
    };
  },
);

function categoryToVaultType(c: CredentialCategory): VaultPreviewType {
  switch (c) {
    case 'password':
      return 'Password';
    case 'payment_card':
      return 'Payment Card';
    case 'key':
      return 'Key';
    case 'secure_note':
      return 'Note';
    case 'two_factor':
      return '2FA';
    default:
      return 'Password';
  }
}

const vaultType = computed(() => categoryToVaultType(row.value?.credentialType ?? 'password'));
</script>

<template>
  <div
    class="relative flex h-full items-center gap-sm overflow-hidden px-sm py-xs"
    :class="smallSize ? 'text-body-sm' : 'text-body-md'"
  >
    <VaultTypes v-if="row" :type="vaultType" density="compact" />

    <div class="flex min-w-0 flex-1 flex-col items-start gap-xs">
      <span
        class="w-full truncate text-neutral-base"
        :class="smallSize ? 'text-body-sm-bold' : 'text-body-md-bold'"
      >
        {{ row?.serviceName }}
      </span>
      <span class="text-body-xs w-full truncate text-neutral-muted">
        {{ row?.categoryLabel }}
      </span>
    </div>
  </div>
</template>
