<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import Button from 'primevue/button';
import passwordVaultHeroUrl from '../assets/password-vault-hero.png';

defineOptions({
  name: 'PasswordVaultPage',
});

const emit = defineEmits<{
  enable: [];
}>();

function learnMore() {
  window.open('https://jumpcloud.com/support', '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <!-- items-stretch (default): avoid items-center on column flex — it shrink-wraps children to min-content width -->
  <div
    class="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center overflow-auto border-t border-neutral-default_solid bg-neutral-surface px-6 py-6"
  >
    <div class="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-12 pb-12">
      <figure class="mx-auto w-full max-w-[360px] shrink-0">
        <img
          :src="passwordVaultHeroUrl"
          alt="Password Vault illustration: secure credentials in a browser with a vault and masked password"
          class="h-auto w-full object-contain"
          width="360"
          height="360"
          decoding="async"
          fetchpriority="high"
        />
      </figure>
      <div class="flex w-full flex-col gap-6 text-center">
        <div class="mx-auto flex w-full max-w-xl flex-col gap-4">
          <h2 class="text-heading-1 text-neutral-base">
            Password Vault: Secure Credential Management
          </h2>
          <p class="text-body-md text-neutral-subtle">
            An all-in-one solution for password management. Secure user credentials, enforce policies, and
            control access to high-risk resources.
          </p>
        </div>
        <div class="flex w-full flex-wrap items-center justify-center gap-10">
          <Button
            label="Learn More"
            severity="primary"
            variant="text"
            icon-pos="right"
            @click="learnMore"
          >
            <template #icon="iconProps">
              <ArrowTopRightOnSquareIcon :class="iconProps.class" />
            </template>
          </Button>
          <Button label="Enable Password Vault" @click="emit('enable')" />
        </div>
      </div>
    </div>
  </div>
</template>
