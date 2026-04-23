<script setup lang="ts">
import { LinkText } from '@jumpcloud/circuit/components';
import Button from 'primevue/button';
import { ArrowTopRightOnSquareIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';
import { KeyIcon, LockClosedIcon, CreditCardIcon, IdentificationIcon } from '@heroicons/vue/24/outline';

import ConfigPageLayout from '@/components/layout/page-layouts/ConfigPageLayout.vue';

defineOptions({
  name: 'PasswordVaultPage',
});
</script>

<template>
  <ConfigPageLayout class="h-full! w-full! max-w-full!">
    <div
      class="flex min-h-0 flex-1 flex-col items-center justify-center gap-xl px-md py-xl"
    >
      <!-- Figma: Password Vault landing — node 3:7790 -->
      <div
        class="flex max-w-md flex-col items-center gap-6"
        role="img"
        aria-label="Password Vault illustration: browser window with secure credentials"
      >
        <div
          class="relative w-full overflow-hidden rounded-md border border-neutral-default_solid bg-neutral-surface p-6 shadow-sm"
        >
          <div class="mb-3 flex h-2 gap-1">
            <span class="size-2 rounded-full bg-neutral-subtle" />
            <span class="size-2 rounded-full bg-neutral-subtle" />
            <span class="size-2 rounded-full bg-neutral-subtle" />
          </div>
          <div
            class="relative flex min-h-40 items-center justify-center gap-2 rounded-sm border border-field-default bg-neutral-surface p-4"
          >
            <KeyIcon
              class="size-6 shrink-0 text-neutral-subtle"
            />
            <IdentificationIcon
              class="size-6 shrink-0 text-neutral-subtle"
            />
            <div
              class="flex size-16 shrink-0 items-center justify-center rounded-full border border-button-primary-base bg-button-primary-muted"
            >
              <ShieldCheckIcon class="size-8 text-button-primary-base" />
            </div>
            <CreditCardIcon
              class="size-6 shrink-0 text-neutral-subtle"
            />
            <LockClosedIcon
              class="size-6 shrink-0 text-neutral-subtle"
            />
          </div>
        </div>
        <div
          class="flex items-center justify-center rounded-lg border border-field-default bg-neutral-surface_subtle px-4 py-2"
        >
          <span class="text-body-lg tracking-widest text-neutral-subtle" aria-hidden="true"
            >* * *</span
          >
        </div>
      </div>

      <div class="flex max-w-2xl flex-col items-center gap-md text-center">
        <h2 class="text-heading-2 text-neutral-base">
          Password Vault: Secure Credential Management
        </h2>
        <p class="text-body-md text-neutral-subtle">
          An all-in-one solution for password management and Privileged Access Management (PAM).
          Secure user credentials, enforce policies, and control access to high-risk resources.
        </p>
        <div class="mt-sm flex flex-wrap items-center justify-center gap-md">
          <LinkText
            label="Learn More"
            href="https://jumpcloud.com/support"
            target="_blank"
            rel="noopener noreferrer"
            :showIcon="true"
            customClass="text-body-md"
          />
          <Button label="Set Up Your Password Vault" />
        </div>
      </div>
    </div>
  </ConfigPageLayout>
</template>
