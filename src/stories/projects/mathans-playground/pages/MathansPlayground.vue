<script setup lang="ts">
import { PageHeader, MessageNotification } from '@jumpcloud/circuit/components';
import { SparklesIcon } from '@heroicons/vue/24/outline';
import AdminTopBar from '@/components/AdminTopBar.vue';
import AdminDemoNav from '@/components/Nav/AdminDemoNav.vue';
import { useDemoSettings } from '@/composables/useDemoSettings';

const { reload } = useDemoSettings();
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AdminDemoNav
      active-item="home"
      user-name="Mathan Chakkravarthy"
      user-email="mathan@jumpcloud.com"
      user-initials="MC"
      @settings-saved="reload"
    />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AdminTopBar />
      <PageHeader
        title="Mathan's Playground"
        subtitle="Experimental Circuit UI and flows live here."
      >
        <template #icon>
          <SparklesIcon class="size-7 text-neutral-base" />
        </template>
      </PageHeader>

      <div class="flex-1 overflow-y-auto p-lg bg-neutral-surface">
        <MessageNotification
          severity="info"
          title="Welcome"
          detail="Add new stories under Projects/Mathan's Playground in Storybook, or wire pages into this shell as you prototype."
        />
      </div>
    </div>
  </div>
</template>
