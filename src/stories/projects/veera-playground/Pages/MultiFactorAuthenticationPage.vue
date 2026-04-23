<script setup lang="ts">
import { ref } from 'vue';
import { AppNavigation, PageHeader, RichText } from '@jumpcloud/circuit/components';
import TopBar from '@/components/TopBar.vue';
import ConfigPageLayout from '@/components/layout/page-layouts/ConfigPageLayout.vue';
import FactorCard from '../../quickwins/FactorCard.vue';
import { defaultMfaFactors } from '../../quickwins/mfaFactorsData';
import { menuItems, profileMenuItems } from '../data/passwordVaultNavigation';
import type { MfaFactor } from '../../quickwins/mfaFactorsData';

defineOptions({
  name: 'MultiFactorAuthenticationPage',
});

const factors = ref<MfaFactor[]>(defaultMfaFactors.map((item) => ({ ...item })));

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
      activeItem="security"
      :collapsible="true"
      :topNavToggle="true"
    />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <TopBar />
      <PageHeader title="MFA Configuration" />
      <ConfigPageLayout class="h-full! w-full!">
        <div class="flex flex-col gap-lg">
          <div class="flex flex-col gap-md">
            <h2 class="text-heading-2 text-neutral-base">Factors</h2>
            <RichText
              tag="p"
              class="text-body-md text-neutral-base"
              content="Use MFA to secure access to your organization's resources. Enable factors here, after which you must require MFA on users and resources. [Learn More](https://jumpcloud.com/support)"
            />
          </div>

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
