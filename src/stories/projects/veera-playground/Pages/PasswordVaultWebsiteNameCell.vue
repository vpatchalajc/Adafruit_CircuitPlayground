<script setup lang="ts">
import { computed } from 'vue';
import { DataTableCellLink } from '@jumpcloud/circuit/components';
import VaultTypes from './VaultTypes.vue';
import { isVaultPreviewType } from './vaultDisplayTypes';

defineOptions({
  name: 'PasswordVaultWebsiteNameCell',
});

const props = defineProps<{
  /** DataTable passes row payload */
  data: Record<string, unknown>;
}>();

const row = computed(() => ({
  name: String(props.data.name ?? ''),
}));

/** Credentials list uses typed subtitle; Websites fall back to www.* host style. */
function formatWebsiteSubtitle(raw: string): string {
  const t = raw.trim();
  if (!t) return '';
  const noProto = t.replace(/^https?:\/\//, '');
  const host = noProto.split('/')[0]?.trim() ?? noProto;
  if (!host.includes('.')) return host;
  return host.startsWith('www.') ? host : `www.${host}`;
}

const description = computed(() => {
  const label = props.data.credentialTypeLabel;
  if (typeof label === 'string' && label.trim() !== '') return label;
  return formatWebsiteSubtitle(String(props.data.url ?? props.data.urlDisplay ?? ''));
});

const previewType = computed(() =>
  isVaultPreviewType(props.data.vaultPreviewType) ? props.data.vaultPreviewType : 'Website',
);
</script>

<template>
  <div class="flex h-full min-h-0 min-w-0 w-full flex-1 items-stretch px-sm py-xs">
    <div class="mr-sm flex shrink-0 items-center self-center">
      <VaultTypes :type="previewType" density="compact" />
    </div>
    <DataTableCellLink
      class="min-w-0 flex-1"
      size="default"
      :label="row.name"
      :description="description"
      href="#"
    />
  </div>
</template>
