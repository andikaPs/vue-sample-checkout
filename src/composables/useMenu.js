import axios from 'axios'
import { ref } from 'vue'

const useMenu = () => {
  const menu = ref([])
  const load = ref(true)
  const loadMenu = ref(false)
  const listMenu = ref([])

  const getAll = async () => {
    load.value = true
    try {
      let { data } = await axios.get('https://ala-kfc-json.herokuapp.com/all')
      menu.value = await data
      load.value = false
      loadMenu.value = true
    } catch (error) {
      console.log(error)
    }
  }
  const findMenu = async (keyword) => {
    load.value = true
    loadMenu.value = false
    try {
      let { data } = await axios.get(
        `https://ala-kfc-json.herokuapp.com/all?name=${keyword}`
      )
      if ((await data.length) > 0) {
        menu.value = await data
        load.value = false
        loadMenu.value = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getListMenu = async () => {
    try {
      let { data } = await axios.get('https://ala-kfc-json.herokuapp.com/menu')
      listMenu.value = await data
    } catch (error) {
      console.log(error)
    }
  }

  const filterMenu = async (keyword) => {
    load.value = true
    loadMenu.value = false
    try {
      let { data } = await axios.get(
        `https://ala-kfc-json.herokuapp.com/${keyword}`
      )
      menu.value = await data
      load.value = false
      loadMenu.value = true
    } catch (error) {
      console.log(error)
    }
  }

  return {
    menu,
    getAll,
    findMenu,
    load,
    loadMenu,
    getListMenu,
    listMenu,
    filterMenu,
  }
}

export default useMenu
