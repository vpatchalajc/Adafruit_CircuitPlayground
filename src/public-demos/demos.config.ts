/**
 * Demo manifest — the single source of truth.
 * 
 * https://demos.jumpcloud-test.workers.dev/{{demo.id}}-latest/
 *
 * Add your demo here and it will:
 *   1. Show up in the local dev server (pnpm dev:demos)
 *   2. Get built and uploaded to R2 on merge to master
 *   3. Be available at demos.jumpcloud-test.workers.dev/<id>-latest/
 */
export const demos = [
  {
    id: 'hello-world',
    name: 'Hello World',
    component: '@/stories/projects/hello-world/HelloWorld.vue',
  },
  {
    id: 'mustafa-playground',
    name: "Mustafa's Playground",
    component: '@/stories/projects/mustafa-playground/pages/MustafaPlayground.vue',
  },
  {
    id: 'agent0-composable',
    name: 'Agent Zero — Composable',
    component: '@/stories/projects/burak-agent0/pages/admin-portal/full-demo/Agent0ComposablePage.vue',
  },
  {
    id: 'ai-assistant-phase01',
    name: 'AI Assistant | Phase 01',
    component: '@/stories/projects/burak-agent0/pages/admin-portal/full-demo/Agent0Phase01Page.vue',
  },
  {
    id: 'agent0-alt02',
    name: 'Agent Zero — Alternative 02',
    component: '@/stories/projects/burak-agent0/pages/Agent0Alt02Page.vue',
  },
  {
    id: 'access-reviews-m1-admin',
    name: 'Access Reviews — Milestone 1 (Admin)',
    component: '@/stories/projects/access-reviews-milestone1/pages/AccessReviewsAdminPage.vue',
  },
  {
    id: 'access-reviews-m1-reviewer',
    name: 'Access Reviews — Milestone 1 (Reviewer)',
    component: '@/stories/projects/access-reviews-milestone1/pages/AccessReviewsReviewerPage.vue',
  },
  {
    id: 'get-started',
    name: 'Get Started',
    component: '@/stories/projects/jakes-playground/pages/GetStartedPage.vue',
  },
];
