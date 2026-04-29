<script setup lang="ts">
import { computed } from 'vue';
import { useDataTableSmallSize } from '@jumpcloud/circuit/components';
import { FolderIcon } from '@heroicons/vue/24/outline';
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
    class="relative flex h-full items-center gap-2 overflow-hidden px-2 py-1.5"
    :class="smallSize ? 'text-body-sm' : 'text-body-md'"
  >
    <!-- Turquoise folder (Circuit info surface + info foreground) -->
    <div
      class="flex size-7 shrink-0 items-center justify-center rounded-md shadow-e100 ring-1 ring-neutral-default_solid bg-info-surface"
      aria-hidden="true"
    >
      <FolderIcon class="size-5 text-info-base shrink-0" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
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
