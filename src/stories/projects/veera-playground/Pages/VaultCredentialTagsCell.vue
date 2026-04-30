<script setup lang="ts">
import Tag from 'primevue/tag';
import { computed } from 'vue';

defineOptions({
  name: 'VaultCredentialTagsCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
}>();

const tags = computed(() => {
  const value = props.data?.tags;
  return Array.isArray(value) ? (value as string[]) : [];
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-xs px-2 py-1.5">
    <Tag v-for="(tag, idx) in tags" :key="`${tag}-${idx}`" :value="tag" severity="secondary" />
    <span v-if="tags.length === 0" class="text-body-md text-neutral-subtle">—</span>
  </div>
</template>
