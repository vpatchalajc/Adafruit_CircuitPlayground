<script setup lang="ts">
import { ref } from 'vue';
import { AppNavigation, PageHeader, RichText } from '@jumpcloud/circuit/components';
import TopBar from '@/components/TopBar.vue';
import ConfigPageLayout from '@/components/layout/page-layouts/ConfigPageLayout.vue';
import FactorCard from './FactorCard.vue';
import { defaultMfaFactors } from './mfaFactorsData';
import { menuItems, profileMenuItems } from '../burak-agent0/features/agent0/shared/data/navigation';
import type { MfaFactor } from './mfaFactorsData';

defineOptions({
  name: 'MfaConfigurationPage',
});

const factors = ref<MfaFactor[]>(defaultMfaFactors);

function updateFactorEnabled(id: string, enabled: boolean) {
  const f = factors.value.find((x) => x.id === id);
  if (f) f.enabled = enabled;
}

function updateFactorAdditionalChecked(id: string, checked: boolean) {
  const f = factors.value.find((x) => x.id === id);
  if (f) f.additionalSettingsChecked = checked;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppNavigation
      :menuItems="menuItems"
      :profileMenuItems="profileMenuItems"
      activeItem="Security"
      :collapsible="true"
      :topNavToggle="true"
    />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <TopBar />
      <PageHeader title="MFA Configuration" />
      <ConfigPageLayout class="w-full! h-full!">
        <div class="flex flex-col gap-lg">
          <!-- Factors section header -->
          <div class="flex flex-col gap-md">
            <h2 class="text-heading-2 text-neutral-base">Factors</h2>
            <RichText
              tag="p"
              class="text-body-md text-neutral-base"
              content="Use MFA to secure access to your organization's resources. Enable factors here, after which you must require MFA on users and resources. [Learn More](https://jumpcloud.com/support)"
            />
          </div>

          <!-- Factor cards -->
          <div class="flex flex-col gap-md">
            <FactorCard
              v-for="factor in factors"
              :key="factor.id"
              :name="factor.name"
              :icon="factor.icon"
              :enabled="factor.enabled"
              :description-content="factor.descriptionContent"
              :supported-resources="factor.supportedResources"
              :show-additional-settings="factor.showAdditionalSettings ?? false"
              :additional-settings-label="factor.additionalSettingsLabel ?? ''"
              :additional-settings-checked="factor.additionalSettingsChecked ?? false"
              @update:enabled="(v) => updateFactorEnabled(factor.id, v)"
              @update:additional-settings-checked="(v) => updateFactorAdditionalChecked(factor.id, v)"
            />
          </div>
        </div>
      </ConfigPageLayout>
    </div>
  </div>
</template>
