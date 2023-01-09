import { createStore } from 'vuex'
import axios from 'axios'
import { supabase } from '../supabase'
const baseUrl = 'https://ala-kfc-json.vercel.app/'

export const store = createStore({
  state: {
    menu: [],
    cart: [],
    currentMenu: localStorage.getItem('current-menu')
      ? localStorage.getItem('current-menu')
      : null,
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
        menu.name
          ? menu.name.toLowerCase().includes(keyword.toLowerCase())
          : menu.products.name.toLowerCase().includes(keyword.toLowerCase())
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
        let data
        if (state.currentMenu) {
          data = await supabase
            .from('product_type')
            .select(
              `
                                *,
                                products(*),
                                menu_type(*)
                            `
            )
            .eq('menu_type_id', state.currentMenu)
        } else {
          data = await supabase.from('product_type').select(
            `
                                *,
                                products(*),
                                menu_type(*)
                            `
          )
        }
        commit('setMenu', data.data)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    async getListMenu({ commit }) {
      try {
        const { data, error } = await supabase.from('menu_type').select()
        commit('setListMenu', data)
      } catch (error) {
        console.log(error)
      }
    },
    async filterMenu({ commit }, id) {
      commit('setLoading', true)
      try {
        const { data, error } = await supabase
          .from('product_type')
          .select(
            `
                        *,
                        products(*),
                        menu_type(*)
                    `
          )
          .eq('menu_type_id', id)
        commit('setMenu', data)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
    async getAllCart({ commit, dispatch }) {
      try {
        const { data, error } = await supabase
          .from('cart')
          .select(
            `
            *,
            products(*)
          `
          )
          .order('created_at', { ascending: false })
        commit('setCart', data)
        dispatch('countTotal')
      } catch (error) {
        console.log(error)
      }
    },
    async addToCart({ dispatch, state }, id) {
      try {
        const ready = state.cart.find((item) => item.product_id == id)

        if (ready) {
          console.log('product is ready in cart')
          const { data, error } = await supabase
            .from('cart')
            .update({ qty: ready.qty + 1 })
            .eq('id', ready.id)
          if (error) {
            throw error
          }
        } else {
          const { data, error } = await supabase
            .from('cart')
            .insert([{ product_id: id }])
          if (error) {
            throw error
          }
        }
        dispatch('getAllCart')
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCart({ commit, dispatch }, id) {
      try {
        const { data, error } = await supabase
          .from('cart')
          .delete()
          .eq('id', id)
        if (error) {
          throw error
        }
        dispatch('getAllCart')
        commit('setTotal', 0)
      } catch (error) {
        console.log(error)
      }
    },
    async clearCart({ dispatch }) {
      try {
        const { data, error } = await supabase.from('cart').delete()
        if (error) {
          throw error
        }
        dispatch('getAllCart')
        commit('setTotal', 0)
      } catch (error) {
        console.log(error)
      }
    },
    async incrementCart({ state, dispatch }, id) {
      const product = state.cart.find((item) => item.id == id)
      try {
        const { data, error } = await supabase
          .from('cart')
          .update({ qty: product.qty + 1 })
          .eq('id', id)
        if (error) {
          throw error
        }
        dispatch('getAllCart')
      } catch (error) {
        console.log(error)
      }
    },
    async decrementCart({ state, dispatch }, id) {
      const product = state.cart.find((item) => item.id == id)
      try {
        const { data, error } = await supabase
          .from('cart')
          .update({ qty: product.qty - 1 })
          .eq('id', id)
        if (error) {
          throw error
        }
        dispatch('getAllCart')
      } catch (error) {
        console.log(error)
      }
    },
    countTotal({ state, commit }) {
      let total = 0
      state.cart.forEach((cart) => (total += cart.products.price * cart.qty))
      commit('setTotal', total)
    },
  },
})
