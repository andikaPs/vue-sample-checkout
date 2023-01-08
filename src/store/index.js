import { createStore } from 'vuex'
import axios from 'axios'
const baseUrl = 'https://ala-kfc-json.vercel.app/'
export const store = createStore({
    state: {
        menu: [],
        cart: [],
        currentMenu: localStorage.getItem('current-menu')
            ? localStorage.getItem('current-menu')
            : 'all',
        listMenu: [],
        loading: true,
        total: 0,
    },
    getters: {
        getMenu: (state) => (name) => {
            return state.menu.filter((menu) => menu.name == name)
        },
        getTotal(state) {
            let total = 0
            state.cart.forEach((cart) => (total += cart.price * cart.qty))
            state.total = total
            return total
        },
    },
    mutations: {
        setMenu(state, payload) {
            state.menu = payload
        },
        setListMenu(state, payload) {
            state.listMenu = payload
        },
        setCurrentMenu(state, menu) {
            state.currentMenu = menu
        },
        setLoading(state, load) {
            state.loading = load
        },
        searchMenu(state, keyword) {
            const filter = state.menu.filter((menu) =>
                menu.name.toLowerCase().includes(keyword)
            )
            if (filter.length > 0) {
                state.menu = filter
            }
        },
        setTotal(state, total) {
            state.total = total
        },
        setCart(state, payload) {
            state.cart = payload
        },
    },
    actions: {
        async getAllMenu({ commit, state }) {
            commit('setLoading', true)
            try {
                // let { data } = await axios.get(`${baseUrl}${state.currentMenu}`)
                let { data } = await axios.get('/src/data/db.json')
                commit('setMenu', await data)
                commit('setLoading', false)
            } catch (error) {
                console.log(error)
            }
        },
        async getListMenu({ commit }) {
            try {
                let { data } = await axios.get(`${baseUrl}menu`)
                commit('setListMenu', await data)
            } catch (error) {
                console.log(error)
            }
        },
        async filterMenu({ commit }, keyword) {
            try {
                let { data } = await axios.get(`${baseUrl}${keyword}`)
                commit('setMenu', await data)
            } catch (error) {
                console.log(error)
            }
        },
        async getAllCart({ commit, dispatch }) {
            try {
                let { data } = await axios.get(`${baseUrl}cart/`)
                commit('setCart', await data)
                dispatch('countTotal')
            } catch (error) {
                console.log(error)
            }
        },
        addToCart({ dispatch }, item) {
            axios
                .get(`${baseUrl}cart/${item.id}`)
                .then((res) => {
                    if (res) {
                        const data = res.data
                        axios
                            .put(`${baseUrl}cart/${item.id}`, {
                                id: data.id,
                                name: data.name,
                                price: data.price,
                                image: data.image,
                                qty: data.qty + 1,
                            })
                            .then((res) => {
                                dispatch('getAllCart')
                            })
                            .catch((err) => console.log(err))
                    } else {
                        console.log('belum ada')
                    }
                })
                .catch((err) => {
                    axios
                        .post(`${baseUrl}cart/`, item)
                        .then(function (response) {
                            dispatch('getAllCart')
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
        },
        async deleteCart({ commit, dispatch }, id) {
            await axios.delete(`https://ala-kfc-json.herokuapp.com/cart/${id}`)
            dispatch('getAllCart')
            commit('setTotal', 0)
        },
        incrementCart({ getters, dispatch }, id) {
            axios
                .get(`https://ala-kfc-json.herokuapp.com/cart/${id}`)
                .then((res) => {
                    const data = res.data
                    axios
                        .put(`https://ala-kfc-json.herokuapp.com/cart/${id}`, {
                            id: data.id,
                            name: data.name,
                            price: data.price,
                            image: data.image,
                            qty: data.qty + 1,
                        })
                        .then((res) => {
                            dispatch('getAllCart')
                            getters.getTotal
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        },
        decrementCart({ getters, dispatch }, id) {
            axios
                .get(`https://ala-kfc-json.herokuapp.com/cart/${id}`)
                .then((res) => {
                    const data = res.data
                    axios
                        .put(`https://ala-kfc-json.herokuapp.com/cart/${id}`, {
                            id: data.id,
                            name: data.name,
                            price: data.price,
                            image: data.image,
                            qty: data.qty - 1,
                        })
                        .then((res) => {
                            dispatch('getAllCart')
                            getters.getTotal
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        },
        countTotal({ state, commit }) {
            let total = 0
            state.cart.forEach((cart) => (total += cart.price * cart.qty))
            commit('setTotal', total)
        },
    },
})
