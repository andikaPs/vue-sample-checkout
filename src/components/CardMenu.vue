<template>
  <div class="grid grid-cols-2 md:grid-cols-3 mt-5 gap-3 lg:grid-cols-4 lg:gap-7 lg:mt-10">
    <div v-for="m in menu" :key="m.id" @click="handleClick(m.name)"
      class="col-span-1 px-4 py-3.5 flex flex-col items-center bg-stone-50 shadow-lg shadow-stone-50 rounded-md cursor-pointer border border-transparent hover:border-gray-500 transition-colors space-y-2">
      <!-- image -->
      <div class="w-36 h-36 lg:w-28 lg:h-24 lg:mr-3">
        <img :src="m.image ?? m.products.image" alt="" />
      </div>
      <!-- body -->
      <div class="text-center">
        <h3 class="text-lg font-semibold tracking-wide text-neutral-700">
          {{ m.name ?? m.products.name }}
        </h3>
        <p class="text-sm font-normal mt-2 text-neutral-500">
          Rp. {{ m.price ?? m.products.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed, onMounted } from '@vue/runtime-core'

  const store = useStore()

  const menu = computed(() => store.state.menu)

  const handleClick = (name) => {
    const dataMenu = store.getters.getMenu(name)
    store.dispatch('addToCart', dataMenu[0])
  }

  onMounted(() => {
    store.dispatch('getAllMenu')
  })
</script>

<style>

</style>
