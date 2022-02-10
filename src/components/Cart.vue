<template>
  <div class="flex justify-between items-center">
    <h1 class="font-bold text-xl text-neutral-700">Cart</h1>

    <button
      class="
        text-sm
        bg-red-200
        px-6
        py-2
        text-neutral-500
        shadow-md shadow-red-200
        rounded-md
        cursor-pointer
        hover:shadow-lg
        transition-shadow
      "
      @click="clearCart"
    >
      Clear
    </button>
  </div>

  <div
    class="mt-10 grid grid-cols-6 place-content-between gap-3"
    v-for="item in cart"
    :key="item.id"
  >
    <!-- image -->
    <div class="col-span-2 overflow-hidden relative">
      <img
        :src="`src/assets/img/${item.image}`"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- body -->
    <div class="col-span-3 flex justify-center flex-col">
      <h3 class="text-sm text-neutral-700">{{ item.name }}</h3>
      <p class="text-xs text-neutral-500 mt-2">Rp. {{ item.price }}</p>
    </div>
    <!-- action -->
    <div class="col-span-1 flex flex-col justify-center items-center">
      <div
        class="
          px-2
          py-1
          rounded-md
          text-neutral-500
          cursor-pointer
          bg-stone-300
        "
      >
        +
      </div>
      <span class="my-2 text-neutral-600 text-sm">{{ item.qty }}</span>
      <div
        class="
          px-2
          py-1
          rounded-md
          text-neutral-500
          cursor-pointer
          bg-stone-300
        "
      >
        -
      </div>
    </div>
  </div>
</template>

<script>
import useCart from '../composables/useCart'
import axios from 'axios'
export default {
  name: 'CartComponent',
  props: ['cart'],
  emits: ['clearCart'],
  setup(_, { emit }) {
    const { listCart, getAllCart } = useCart()
    const clearCart = () => {
      getAllCart()
      setTimeout(() => {
        listCart.value.forEach((item) => {
          axios
            .delete(`http://localhost:3000/cart/${item.id}`)
            .then((res) => {
              emit('clearCart', res)
            })
            .catch((err) => console.log(err))
        })
      }, 1000)
    }
    return {
      clearCart,
    }
  },
}
</script>

<style>
</style>