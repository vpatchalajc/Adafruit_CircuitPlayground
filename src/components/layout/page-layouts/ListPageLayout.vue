<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineOptions({
  name: 'ListPageLayout',
});

export interface ListPageLayoutProps {}

defineProps<ListPageLayoutProps>();

const slots = useSlots();
const hasSidebar = computed(() => !!slots.sidebar);
</script>

<template>
  <div class="w-screen h-screen flex">
    <div class="layout-container @container flex-[1_1_0] min-w-0 min-h-0" data-layout="list">
      <div class="layout-wrapper" :class="{ 'has-sidebar': hasSidebar }">
        <main
          class="layout-main min-w-0"
          :class="{ 'with-sidebar': hasSidebar }"
        >
          <slot />
        </main>
        <aside
          v-if="hasSidebar"
          class="layout-aside min-w-0 border-neutral-default_solid"
        >
          <slot name="sidebar" />
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  container-type: inline-size;
}

.layout-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.layout-wrapper.has-sidebar {
  flex-direction: column;
  overflow-y: auto;
}

.layout-main {
  flex: 1 1 0%;
  height: 100%;
  /* Required so flex layouts can shrink this pane and activate overflow scrolling */
  min-height: 0;
  overflow-y: auto;
  padding: 1.5rem;
}

.layout-main.with-sidebar {
  flex: none;
  height: auto;
  overflow-y: visible;
  padding: 1.5rem;
}

.layout-aside {
  flex: none;
  height: auto;
  padding: 1.5rem;
  border-left-width: 0;
}

@container (min-width: 1024px) {
  .layout-wrapper.has-sidebar {
    flex-direction: row;
    overflow-y: visible;
  }

  .layout-main.with-sidebar {
    flex: 2 1 0%;
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .layout-aside {
    flex: 1 1 0%;
    height: 100%;
    overflow-y: auto;
    padding: 1.5rem;
    border-left-width: 1px;
    border-left-style: solid;
  }
}
</style>
