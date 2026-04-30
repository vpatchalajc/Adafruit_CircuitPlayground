<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'PasswordVaultCredentialLastSeenCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
}>();

/** Matches spec: Apr 01, 2024 @ 09:15 AM */
function formatLastSeen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const datePart = d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${datePart} @ ${timePart}`;
}

const label = computed(() => formatLastSeen(String(props.data?.lastSeenIso ?? '')));
</script>

<template>
  <div class="flex h-full min-h-0 w-full items-center justify-end px-2 py-1">
    <span class="text-body-md text-neutral-base">{{ label }}</span>
  </div>
</template>
