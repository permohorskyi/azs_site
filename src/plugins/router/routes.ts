import { RouteRecordRaw } from "vue-router"

export const namedRoutes = [
  {
    name: "settings",
    path: "/view/userspace/main/settings/configuration",
    component: () => import("@/pages/SettingsPage.vue"),
  },
] as const satisfies RouteRecordRaw[]

export const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
  ...namedRoutes,
]

export type AppRouteName = (typeof namedRoutes)[number]["name"]

type RouteOptionsNarrower<T extends Record<AppRouteName, null | Partial<Record<"params" | "query", Record<string, string>>>>> = T

export type AppRouteOptions = RouteOptionsNarrower<{
  settings: null
}>
