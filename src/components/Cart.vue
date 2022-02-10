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
        @click="increment(item.id)"
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
          pointer-events-none
        "
        :class="getClass(item.qty)"
        @click="decrement(item.id, item.qty)"
      >
        -
      </div>
    </div>
    <div
      class="col-span-6 flex justify-center text-red-500 cursor-pointer"
      title="Delete"
      @click="deleteCart(item.id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  </div>

  <div
    class="my-8 bg-stone-500 px-6 py-4 rounded-md shadow-md shadow-stone-500/30"
    v-if="cart.length"
  >
    <div class="w-full flex justify-between text-neutral-100">
      <h3>Total</h3>
      <p>Rp. {{ total }}</p>
    </div>

    <button
      class="
        bg-lime-400
        w-full
        text-neutral-600
        flex
        items-center
        justify-center
        font-semibold
        tracking-wider
        py-2
        text-sm
        rounded-md
        mt-5
      "
      @click="checkout"
    >
      Checkout
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4 ml-2"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCart from '../composables/useCart'
import { onUpdated } from '@vue/runtime-core'
export default {
  name: 'CartComponent',
  props: ['cart', 'total'],
  emits: ['clearCart'],
  setup(_, { emit }) {
    const { listCart, getAllCart, increasQty, decreasQty, deleteItem } =
      useCart()

    const clearCart = () => {
      getAllCart()
      setTimeout(() => {
        listCart.value.forEach((item) => {
          deleteItem(item.id)
          emit('clearCart', item)
        })
      }, 1000)
    }

    const increment = (id) => {
      increasQty(id)
      emit('clearCart', id)
    }
    const decrement = (id, qty) => {
      if (qty > 1) {
        decreasQty(id)
      }
      emit('clearCart', id)
    }

    const deleteCart = (id) => {
      deleteItem(id)
      emit('clearCart', id)
    }

    const getClass = (qty) => {
      return {
        'pointer-events-none': qty == 1,
        'pointer-events-auto': qty > 1,
      }
    }

    const checkout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be checkout this cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sure!',
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart()
          Swal.fire('Success!', 'Your cart has been checkout.', 'success')
        }
      })
    }

    return {
      clearCart,
      increment,
      decrement,
      getClass,
      deleteCart,
      checkout,
    }
  },
}
</script>

<style>
</style>