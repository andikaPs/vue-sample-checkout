<template>
  <div class="w-11/12 py-10 px-6 mx-auto grid grid-cols-12 gap-5">
    <div class="col-span-8">
      <div>
        <h1 class="font-bold text-xl text-neutral-700">Ala KFC</h1>
        <p class="text-sm font-normal text-neutral-500 tracking-wider mt-2">
          This app sample for checkout
        </p>
      </div>

      <Search @keyword="handleKeyword" />

      <FilterMenu @changeMenu="handleChangeMenu" />

      <CardMenu :menu="menu" v-if="loadMenu" @addCart="handleCart" />
      <div
        v-if="load"
        class="
          mt-10
          w-full
          flex
          justify-center
          items-center
          text-neutral-700
          animate-bounce
        "
      >
        Please Wait ...
      </div>
    </div>
    <div class="col-span-4 border-l-2 border-neutral-200 pl-4">
      <Cart :cart="listCart" @clearCart="handleCart" :total="total" />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Search from '../components/Search.vue'
import FilterMenu from '../components/FilterMenu.vue'
import CardMenu from '../components/CardMenu.vue'
import Cart from '../components/Cart.vue'
import useMenu from '../composables/useMenu'
import useCart from '../composables/useCart'
import { onUpdated, watchEffect } from '@vue/runtime-core'
export default {
  name: 'HomeView',
  components: {
    Search,
    FilterMenu,
    CardMenu,
    Cart,
  },
  setup() {
    const { menu, getAll, findMenu, load, loadMenu, filterMenu } = useMenu()
    const { listCart, getAllCart, total, getTotal } = useCart()
    const keyword = ref('')
    filterMenu(
      localStorage.getItem('current-menu')
        ? localStorage.getItem('current-menu')
        : 'All'
    )
    getAllCart()
    getTotal()

    const handleKeyword = (search) => {
      if (search) {
        keyword.value = search
        findMenu(keyword.value)
      } else {
        getAll()
      }
    }

    const handleChangeMenu = (menu) => {
      filterMenu(menu)
    }

    const handleCart = (m) => {
      setTimeout(() => {
        getAllCart()
        getTotal()
      }, 1000)
    }

    return {
      menu,
      handleKeyword,
      load,
      loadMenu,
      handleChangeMenu,
      listCart,
      handleCart,
      total,
    }
  },
}
</script>

<style>
</style>