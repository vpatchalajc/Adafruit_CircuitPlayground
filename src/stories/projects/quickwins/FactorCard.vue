<script setup lang="ts">
import { computed } from 'vue';
import { ToggleSwitch, RichText, CheckboxWithLabel } from '@jumpcloud/circuit/components';
import Divider from 'primevue/divider';
import type { Component } from 'vue';

defineOptions({
  name: 'FactorCard',
});

import type { SupportedResource } from './mfaFactorsData';

export interface FactorCardProps {
  name: string;
  icon: Component;
  enabled: boolean;
  descriptionContent: string;
  supportedResources: SupportedResource[][];
  showAdditionalSettings?: boolean;
  additionalSettingsLabel?: string;
  additionalSettingsChecked?: boolean;
}

const props = withDefaults(defineProps<FactorCardProps>(), {
  showAdditionalSettings: false,
  additionalSettingsLabel: '',
  additionalSettingsChecked: false,
});

const emit = defineEmits<{
  'update:enabled': [value: boolean];
  'update:additionalSettingsChecked': [value: boolean];
}>();

const enabledModel = computed({
  get: () => props.enabled,
  set: (v: boolean) => emit('update:enabled', v),
});

const additionalCheckedModel = computed({
  get: () => props.additionalSettingsChecked,
  set: (v: boolean) => emit('update:additionalSettingsChecked', v),
});
</script>

<template>
  <div
    class="flex flex-col gap-md rounded border border-neutral-default_solid bg-neutral-surface p-lg"
  >
    <!-- Header: icon, name, toggle -->
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center gap-md">
        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-sm bg-neutral-default_solid"
        >
          <component :is="icon" class="size-6 text-neutral-base" />
        </div>
        <span class="text-heading-3 text-neutral-base">{{ name }}</span>
      </div>
      <div class="flex shrink-0 items-center gap-xs">
        <ToggleSwitch v-model="enabledModel" />
        <span class="text-body-md text-neutral-subtle">
          {{ props.enabled ? 'Enabled' : 'Disabled' }}
        </span>
      </div>
    </div>

    <!-- Description (with optional RichText for Learn More link) -->
    <div class="pl-12">
      <RichText
        v-if="descriptionContent"
        :content="descriptionContent"
        tag="p"
        class="text-body-md text-neutral-base"
      />
    </div>

    <!-- Supported Resources -->
    <div class="flex flex-col gap-md pl-12">
      <span class="text-body-md font-semibold text-neutral-base">Supported Resources</span>
      <div class="flex flex-wrap items-center gap-md">
        <template v-for="(group, groupIndex) in supportedResources" :key="groupIndex">
          <div v-if="groupIndex > 0" class="h-4 w-px shrink-0 bg-neutral-default_solid" />
          <div class="flex flex-wrap items-center gap-md">
            <div
              v-for="(resource, resIndex) in group"
              :key="`${groupIndex}-${resIndex}`"
              class="flex items-center gap-xs"
            >
              <component
                :is="resource.icon"
                class="size-4 shrink-0 text-neutral-base"
                aria-hidden
              />
              <span class="text-body-sm font-semibold text-neutral-base">{{ resource.label }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Additional Settings (optional) -->
    <template v-if="showAdditionalSettings">
      <Divider />
      <div class="flex flex-col gap-sm pl-12">
        <span class="text-body-md font-semibold text-neutral-base">Additional Settings</span>
        <CheckboxWithLabel v-model="additionalCheckedModel" :binary="true">
          <template #label>{{ additionalSettingsLabel }}</template>
        </CheckboxWithLabel>
      </div>
    </template>
  </div>
</template>
