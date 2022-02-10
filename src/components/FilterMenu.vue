<template>
  <div class="flex w-full overflow-auto lg:overflow-visible">
    <button
      class="
        text-sm
        font-normal
        inline-block
        px-6
        py-2
        mx-3
        rounded-md
        shadow-lg shadow-stone-200
        cursor-pointer
      "
      :class="getClass(menu)"
      v-for="menu in listMenu"
      :key="menu"
      @click="handleMenu(menu)"
    >
      <span class="text-neutral-500">{{ menu }}</span>
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useMenu from '../composables/useMenu'
export default {
  name: 'FilterMenu',
  setup(props, context) {
    const currentMenu = ref(
      localStorage.getItem('current-menu')
        ? localStorage.getItem('current-menu')
        : 'all'
    )

    const { listMenu, getListMenu } = useMenu()
    getListMenu()

    const handleMenu = (menu) => {
      currentMenu.value = menu
      localStorage.setItem('current-menu', menu)
      context.emit('changeMenu', menu)
      getClass(menu)
    }

    const getClass = (menu) => {
      if (currentMenu.value == menu) {
        return 'bg-red-300 text-slate-100'
      } else {
        return 'bg-stone-200 text-neutral-500'
      }
    }
    return {
      currentMenu,
      listMenu,
      getClass,
      handleMenu,
    }
  },
}
</script>

<style>
</style>