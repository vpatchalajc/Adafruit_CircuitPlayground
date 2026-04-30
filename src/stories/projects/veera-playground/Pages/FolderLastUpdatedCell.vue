<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'FolderLastUpdatedCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
}>();

/** Spec: Mar 15, 2024 @ 08:23 AM */
function formatLastUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const datePart = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${datePart} @ ${timePart}`;
}

const label = computed(() => formatLastUpdated(String(props.data?.lastUpdatedIso ?? '')));
</script>

<template>
  <div class="flex h-full min-h-0 w-full items-center justify-end px-sm py-xs">
    <span class="text-body-md text-neutral-base">{{ label }}</span>
  </div>
</template>
