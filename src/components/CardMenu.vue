<template>
    <div class="flex mt-5 flex-wrap gap-5 justify-around">
        <div
            v-for="m in menu"
            :key="m.id"
            @click="handleClick(m.name)"
            class="
                flex
                items-center
                w-2/5
                bg-stone-50
                shadow-lg shadow-stone-50
                rounded-md
                py-5
                my-3
                cursor-pointer
                hover:bg-stone-100 hover:shadow-stone-100
                transition-colors
            "
        >
            <!-- image -->
            <div class="w-2/5 mr-3">
                <img :src="m.image" alt="" />
            </div>
            <!-- body -->
            <div>
                <h3
                    class="text-lg font-semibold tracking-wide text-neutral-700"
                >
                    {{ m.name }}
                </h3>
                <p class="text-sm font-normal mt-2 text-neutral-500">
                    Rp. {{ m.price }}
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