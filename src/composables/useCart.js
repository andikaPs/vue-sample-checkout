import axios from "axios";
import { ref } from "vue";

const useCart = () => {
  const listCart = ref([])
  const getAllCart = async () => {
    try {
      let { data } = await axios.get('http://localhost:3000/cart/')
      listCart.value = await data
    } catch (error) {
      console.log(error)
    }
  }
  const addToCart = (item) => {
    axios
      .post('http://localhost:3000/cart/', item)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return { listCart, getAllCart, addToCart }
}

export default useCart