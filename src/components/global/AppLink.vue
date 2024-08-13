<template>
  <a
    v-bind="$attrs"
    class="cursor-pointer"
    :href="href"
    @click.prevent="handleClick"
  >
    <slot />
  </a>
</template>

<script setup lang="ts" generic="N extends AppRouteName">
import { computed } from "vue"

import type { AppRouteName, AppRouteOptions } from "@/plugins/router"

import { isNotEmptyString } from "@/utils/string"
import { useRouter } from "vue-router"

const props = defineProps<{
  name?: N
  params?: AppRouteOptions[N] extends { params: any } ? AppRouteOptions[N]["params"] : null
  query?: AppRouteOptions[N] extends { query: any } ? AppRouteOptions[N]["query"] : null
  path?: string
  blank?: boolean
  external?: boolean
  prevent?: boolean
}>()

const emit = defineEmits<{
  click: [data: { event: MouseEvent; href: string }]
}>()

const router = useRouter()

const resolvedRoute = computed(() =>
  router.resolve({
    name: props.name,
    params: props.params ?? undefined,
    query: props.query ?? undefined,
  }),
)

const href = computed(() => props.path ?? resolvedRoute.value.href)

const handleClick = async (event: MouseEvent): Promise<void> => {
  if (isNotEmptyString(props.path)) {
    if (!props.external) router.push({ path: props.path })
    else window.location.href = props.path
    return
  }

  if (props.prevent) {
    event.preventDefault()

    emit("click", {
      event,
      href: resolvedRoute.value.href,
    })

    return
  }

  if (props.blank) {
    alert("TODO: blank")
    return
  }

  await router.push(resolvedRoute.value)
  return
}
</script>
