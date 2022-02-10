import { reactive } from '@vue/reactivity'
import axios from 'axios'
const state = reactive({
  menu: [],
  cart: []
})

const methods = {
  async getALlMenu() {
    try {
      let data = await axios.get('http://localhost:3000/all')
      console.log(await data)
    } catch(err) {
      console.log(err)
    }
  },
  async getMenu(menu) {

  },
  getFilterMenu() {

  }
}

export default { state, methods }