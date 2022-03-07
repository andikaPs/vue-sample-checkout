<template>
    <div class="my-5">
        <form @submit.prevent="handleSubmit">
            <div class="relative w-full text-neutral-400">
                <input
                    type="text"
                    placeholder="Find Food By Name . . ."
                    class="
                        w-full
                        py-3
                        px-10
                        placeholder:text-neutral-400
                        text-neutral-400 text-sm
                        tracking-wider
                        font-normal
                        outline-none
                        bg-neutral-200
                        rounded-md
                    "
                    v-model="keyword"
                    @keyup="handleSubmit()"
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 top-3 absolute left-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
const store = useStore()
const keyword = ref('')

watch(keyword, () => {
    if (keyword.value == '') {
        store.dispatch('getAllMenu')
    }
    store.commit('searchMenu', keyword.value)
})
const handleSubmit = () => {
    console.log(keyword.value)
}
</script>

<style>
</style>