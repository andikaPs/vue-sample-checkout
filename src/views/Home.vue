<template>
    <div class="w-11/12 py-10 px-2 mx-auto grid grid-cols-12 gap-5 lg:px-6">
        <div class="col-span-12 lg:col-span-8 relative">
            <nav class="flex justify-between items-start">
                <div>
                    <h1 class="font-bold text-xl text-neutral-700">Ala KFC</h1>
                    <p class="
                            text-sm
                            font-normal
                            text-neutral-500
                            tracking-wider
                            mt-2
                        ">
                        This app sample for checkout
                    </p>
                </div>
                <button type="button" class="text-neutral-700 lg:hidden relative" @click="isOpen = !isOpen">
                    <small
                        class="absolute w-3 h-3 bg-neutral-100 flex justify-center items-center text-xs rounded-full -right-1 -bottom-1 text-neutral-700">{{
                            totalProductinCart
                        }}</small>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <MobileCart v-if="isOpen" ref="target" />
            </nav>

            <Search />

            <FilterMenu />

            <div v-if="load" class="
                    mt-10
                    w-full
                    flex
                    justify-center
                    items-center
                    text-neutral-700
                    animate-bounce
                ">
                Please Wait ...
            </div>
            <CardMenu />
        </div>
        <div class="hidden lg:block lg:col-span-4 lg:border-l-2 lg:border-neutral-200 lg:pl-4">
            <Cart />
        </div>
    </div>
</template>

<script setup>
    import { onClickOutside } from "@vueuse/core"
    import Search from '../components/Search.vue'
    import FilterMenu from '../components/FilterMenu.vue'
    import CardMenu from '../components/CardMenu.vue'
    import Cart from '../components/Cart.vue'
    import MobileCart from "../components/MobileCart.vue"
    import { useStore } from 'vuex'
    import { computed } from '@vue/runtime-core'
    import { ref } from "vue"

    const store = useStore()
    const target = ref(null)
    const isOpen = ref(false)
    const totalProductinCart = computed(() => store.state.cart.length)

    const load = computed(() => store.state.loading)

    onClickOutside(target, () => {
        isOpen.value = false
    })
</script>

<style>

</style>
