<script setup lang="ts">
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';

defineOptions({
  name: 'VaultCredentialActionCell',
});

const props = defineProps<{
  /** PrimeVue Menu model entries */
  menuItems?: Record<string, unknown>[];
}>();

const menu = ref<InstanceType<typeof Menu> | null>(null);

const items = computed(() => props.menuItems ?? []);

function toggle(event: Event) {
  menu.value?.toggle(event);
}
</script>

<template>
  <div class="flex items-center gap-xs">
    <Button label="Quick View" severity="secondary" variant="outlined" size="small" />
    <Button severity="secondary" variant="text" size="small" aria-haspopup="true" aria-label="More actions" @click="toggle">
      <template #icon="iconProps">
        <EllipsisVerticalIcon :class="iconProps.class" />
      </template>
    </Button>
    <Menu v-if="items.length > 0" ref="menu" :model="items" popup append-to="body" />
  </div>
</template>
