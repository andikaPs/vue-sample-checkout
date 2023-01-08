<template>
    <div class="flex w-full overflow-auto lg:overflow-visible">
        <button class="
                text-sm
                font-normal
                inline-block
                px-6
                py-2
                mx-3
                rounded-md
                shadow-lg shadow-stone-200
                cursor-pointer capitalize
            " :class="getClass(menu)" v-for="menu in listMenu" :key="menu" @click="handleMenu(menu)">
            <span>{{ menu.name }}</span>
        </button>
    </div>
</template>

<script setup>
    import { computed, onMounted } from '@vue/runtime-core'
    import { useStore } from 'vuex'

    const store = useStore()

    const listMenu = computed(() => store.state.listMenu)
    const getClass = (menu) => {
        if (store.state.currentMenu == menu.id) {
            return 'bg-yellow-400 text-gray-100'
        } else {
            return 'bg-stone-200 text-neutral-500'
        }
    }

    const handleMenu = (menu) => {
        store.commit('setCurrentMenu', menu.id)
        store.dispatch('filterMenu', menu.id)
        localStorage.setItem('current-menu', menu.id)
        getClass(menu)
    }

    onMounted(() => {
        store.dispatch('getListMenu')
    })
</script>

<style>

</style>
