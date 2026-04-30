<script setup lang="ts">
import { computed } from 'vue';
import Tag from 'primevue/tag';
import type { AccessRow } from './passwordVaultUsersTypes';

defineOptions({
  name: 'AccessPermissionsCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
}>();

const permissions = computed(
  () => (props.data as AccessRow | undefined)?.permissions ?? [],
);
</script>

<template>
  <!-- Inset matches Circuit DataTable cell padding pattern (semantic spacing tokens, not raw px). -->
  <div
    class="flex h-full min-h-0 w-full min-w-0 flex-wrap items-center gap-xs whitespace-normal px-sm py-xs"
  >
    <Tag
      v-for="(perm, i) in permissions"
      :key="`${perm}-${i}`"
      :value="perm"
      severity="secondary"
    />
  </div>
</template>
