<template>
    <div class="w-11/12 py-10 px-6 mx-auto grid grid-cols-12 gap-5">
        <div class="col-span-8">
            <div>
                <h1 class="font-bold text-xl text-neutral-700">Ala KFC</h1>
                <p
                    class="
                        text-sm
                        font-normal
                        text-neutral-500
                        tracking-wider
                        mt-2
                    "
                >
                    This app sample for checkout
                </p>
            </div>

            <Search />

            <FilterMenu />

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
            <CardMenu />
        </div>
        <div class="col-span-4 border-l-2 border-neutral-200 pl-4">
            <Cart />
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import Search from '../components/Search.vue'
import FilterMenu from '../components/FilterMenu.vue'
import CardMenu from '../components/CardMenu.vue'
import Cart from '../components/Cart.vue'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
const store = useStore()

const load = computed(() => store.state.loading)
</script>

<style>
</style>