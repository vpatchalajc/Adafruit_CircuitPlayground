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
  <div class="flex min-w-0 flex-wrap gap-xs">
    <Tag
      v-for="(perm, i) in permissions"
      :key="`${perm}-${i}`"
      :value="perm"
      severity="secondary"
    />
  </div>
</template>
