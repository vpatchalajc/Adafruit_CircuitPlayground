<script setup lang="ts">
import { computed } from 'vue';
import { useDataTableSmallSize } from '@jumpcloud/circuit/components';
import VaultTypes from './VaultTypes.vue';
import type { FolderRow } from './folderTypes';

defineOptions({
  name: 'FolderPrimaryCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
  size?: 'default' | 'small';
}>();

const smallSize = useDataTableSmallSize(props.size);

const row = computed((): FolderRow | undefined => {
  const d = props.data as Partial<FolderRow> | undefined;
  if (!d?.folderName || d.resourceCount == null) return undefined;
  return d as FolderRow;
});

function resourceSubtitle(count: number): string {
  return `${count} ${count === 1 ? 'Resource' : 'Resources'}`;
}
</script>

<template>
  <div
    class="relative flex h-full items-center gap-sm overflow-hidden px-sm py-xs"
    :class="smallSize ? 'text-body-sm' : 'text-body-md'"
  >
    <div class="shrink-0">
      <VaultTypes type="Folder" :shared="Boolean(row?.shared)" density="compact" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col items-start gap-xs">
      <span
        class="w-full truncate text-neutral-base"
        :class="smallSize ? 'text-body-sm-bold' : 'text-body-md-bold'"
      >
        {{ row?.folderName }}
      </span>
      <span class="text-body-xs w-full truncate text-neutral-muted">
        {{ row ? resourceSubtitle(row.resourceCount) : '' }}
      </span>
    </div>
  </div>
</template>
