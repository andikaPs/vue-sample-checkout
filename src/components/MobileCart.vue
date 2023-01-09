<script setup>
  import { computed, onMounted, onUpdated } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import Cart from './Cart.vue'
  const store = useStore()

  const cart = computed(() => store.state.cart)
  const total = computed(() => store.state.total)

  const clearCart = () => {
    cart.value.forEach((item) => {
      store.dispatch('deleteCart', item.id)
    })
  }

  const increment = (id) => {
    store.dispatch('incrementCart', id)
  }
  const decrement = (id, qty) => {
    if (qty > 1) {
      store.dispatch('decrementCart', id)
    }
  }

  const deleteCart = (id) => {
    store.dispatch('deleteCart', id)
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

  onMounted(() => {
    store.dispatch('getAllCart')
    store.dispatch('countTotal')
  })
</script>

<template>
  <div
    class="w-full bg-white broder-2 border-black px-4 py-3 absolute z-10 right-0 top-10 shadow-xl shadow-stone-100/20 rounded-lg">

    <Cart />
  </div>
</template>

<style>

</style>
