<script setup lang="ts">
import { computed, type FunctionalComponent } from 'vue';
import { useDataTableSmallSize } from '@jumpcloud/circuit/components';
import {
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
  KeyIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline';
import type { CredentialCategory } from './credentialTypes';

defineOptions({
  name: 'CredentialNameCell',
});

const props = defineProps<{
  data?: Record<string, unknown>;
  size?: 'default' | 'small';
}>();

const smallSize = useDataTableSmallSize(props.size);

const row = computed(
  (): { serviceName: string; credentialType: CredentialCategory; categoryLabel: string } | undefined => {
    const d = props.data as
      | { serviceName?: string; credentialType?: CredentialCategory; categoryLabel?: string }
      | undefined;
    if (!d?.credentialType || !d.serviceName) return undefined;
    return {
      credentialType: d.credentialType,
      serviceName: d.serviceName,
      categoryLabel: d.categoryLabel ?? '',
    };
  },
);

const theme = computed(() =>
  resolveTypeTheme(row.value?.credentialType ?? 'password'),
);

/**
 * Figma-aligned: tinted squircle + heroicon glyph.
 * Uses Circuit semantic surface + foreground tokens only.
 */
function resolveTypeTheme(t: CredentialCategory): {
  surface: string;
  iconClass: string;
  Main: FunctionalComponent;
  show2faBadge: boolean;
} {
  switch (t) {
    case 'password':
      return {
        surface: 'bg-info-surface',
        iconClass: 'text-info-base',
        Main: ShieldCheckIcon,
        show2faBadge: false,
      };
    case 'payment_card':
      return {
        surface: 'bg-warning-surface',
        iconClass: 'text-warning-base',
        Main: CreditCardIcon,
        show2faBadge: false,
      };
    case 'key':
      return {
        surface: 'bg-error-surface',
        iconClass: 'text-error-base',
        Main: KeyIcon,
        show2faBadge: false,
      };
    case 'secure_note':
      return {
        surface: 'bg-success-surface',
        iconClass: 'text-success-base',
        Main: DocumentTextIcon,
        show2faBadge: false,
      };
    case 'two_factor':
      return {
        surface: 'bg-success-surface',
        iconClass: 'text-success-base',
        Main: LockClosedIcon,
        show2faBadge: true,
      };
    default:
      return {
        surface: 'bg-info-surface',
        iconClass: 'text-info-base',
        Main: ShieldCheckIcon,
        show2faBadge: false,
      };
  }
}
</script>

<template>
  <div
    class="relative flex h-full items-center gap-2 overflow-hidden px-2 py-1.5"
    :class="smallSize ? 'text-body-sm' : 'text-body-md'"
  >
    <!-- Type avatar: rounded square — icon on tinted surface -->
    <div
      class="relative flex size-7 shrink-0 items-center justify-center overflow-visible rounded-md shadow-e100 ring-1 ring-neutral-default_solid"
    >
      <div class="pointer-events-none absolute inset-0 rounded-md" :class="theme.surface" />
      <component
        :is="theme.Main"
        class="relative z-[1] size-4"
        :class="theme.iconClass"
        aria-hidden="true"
      />
      <!-- 2FA overlay clock (matches Figma small badge) -->
      <div
        v-if="theme.show2faBadge"
        class="absolute bottom-px right-px z-[2] flex size-5 items-center justify-center rounded-full bg-neutral-surface shadow-e100 ring-2 ring-neutral-default_solid"
      >
        <ClockIcon class="size-4 text-success-base" aria-hidden="true" />
      </div>
    </div>

    <div class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
      <span
        class="w-full truncate text-neutral-base"
        :class="smallSize ? 'text-body-sm-bold' : 'text-body-md-bold'"
      >
        {{ row?.serviceName }}
      </span>
      <span class="text-body-xs w-full truncate text-neutral-muted">
        {{ row?.categoryLabel }}
      </span>
    </div>
  </div>
</template>
