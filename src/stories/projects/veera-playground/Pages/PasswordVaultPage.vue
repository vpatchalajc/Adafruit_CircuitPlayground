<script setup lang="ts">
import { LinkText } from '@jumpcloud/circuit/components';
import Button from 'primevue/button';

defineOptions({
  name: 'PasswordVaultPage',
});
</script>

<template>
  <div
    class="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto"
    data-test-id="password-vault-landing"
  >
    <div
      class="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-xl px-md py-xl"
    >
      <!-- Figma 3:7790 — single SVG scales cleanly under PageHeader (no w-screen / flex-wrap issues) -->
      <div class="w-full max-w-sm shrink-0">
        <svg
          class="h-auto w-full"
          viewBox="0 0 400 260"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <!-- Browser: outer = border (subtle), inner = face (surface) so stroke is not the same as fill -->
          <rect
            x="16"
            y="8"
            width="368"
            height="180"
            rx="10"
            class="text-neutral-subtle fill-current"
          />
          <rect
            x="18"
            y="10"
            width="364"
            height="176"
            rx="8"
            class="text-neutral-surface fill-current"
          />
          <circle class="text-neutral-subtle" cx="36" cy="28" r="3.5" fill="currentColor" opacity="0.5" />
          <circle class="text-neutral-subtle" cx="52" cy="28" r="3.5" fill="currentColor" opacity="0.4" />
          <circle class="text-neutral-subtle" cx="68" cy="28" r="3.5" fill="currentColor" opacity="0.3" />

          <!-- Content panel (outer subtle ring + inner surface) -->
          <rect
            x="36"
            y="50"
            width="328"
            height="120"
            rx="6"
            class="text-neutral-subtle fill-current"
            opacity="0.35"
          />
          <rect
            x="38"
            y="52"
            width="324"
            height="116"
            rx="4"
            class="text-neutral-surface fill-current"
          />

          <!-- Floating credential glyphs (simple paths — valid in all SVG UAs) -->
          <g
            class="text-neutral-subtle"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- key (bit + shaft) -->
            <circle cx="74" cy="100" r="3.5" />
            <path d="M77 100h16l-2 2.5h-5.5v9.5h-3v-8H78l-2 1.5z" />
            <!-- id card -->
            <rect x="128" y="90" width="32" height="24" rx="3" />
            <line x1="132" y1="96" x2="150" y2="96" />
            <line x1="132" y1="102" x2="144" y2="102" />
            <!-- card -->
            <rect x="318" y="92" width="30" height="20" rx="2.5" />
            <line x1="322" y1="98" x2="344" y2="98" />
            <line x1="322" y1="104" x2="334" y2="104" />
            <!-- lock -->
            <rect x="308" y="116" width="20" height="16" rx="2" />
            <path d="M312 116v-4.5a6 6 0 0 1 12 0V116" />
          </g>

          <!-- Center shield (brand emphasis) -->
          <g class="text-button-primary-base">
            <circle
              cx="200"
              cy="120"
              r="40"
              fill="currentColor"
              fill-opacity="0.1"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M200 96c-10 0-18 8-18 18 0 12 9 20 18 28 9-8 18-16 18-28 0-10-8-18-18-18z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <circle cx="200" cy="114" r="3.5" fill="currentColor" />
            <path d="M200 120v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </g>

          <!-- Password pill -->
          <rect
            x="130"
            y="204"
            width="140"
            height="40"
            rx="20"
            class="text-neutral-subtle fill-current"
            opacity="0.3"
          />
          <rect
            x="132"
            y="206"
            width="136"
            height="36"
            rx="18"
            class="text-neutral-surface fill-current"
          />
          <g class="text-neutral-subtle" fill="currentColor" opacity="0.65">
            <circle cx="168" cy="224" r="2.2" />
            <circle cx="200" cy="224" r="2.2" />
            <circle cx="232" cy="224" r="2.2" />
          </g>
        </svg>
      </div>

      <div class="flex w-full max-w-2xl shrink-0 flex-col items-center gap-md text-center">
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
  </div>
</template>
