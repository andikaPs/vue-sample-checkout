import axios from 'axios'
import { ref } from 'vue'

const useCart = () => {
  const listCart = ref([])
  const total = ref(0)
  const getAllCart = async () => {
    try {
      let { data } = await axios.get('https://ala-kfc-json.herokuapp.com/cart/')
      listCart.value = await data
    } catch (error) {
      console.log(error)
    }
  }
  const addToCart = (item) => {
    axios
      .get(`https://ala-kfc-json.herokuapp.com/cart/${item.id}`)
      .then((res) => {
        if (res) {
          const data = res.data
          axios
            .put(`https://ala-kfc-json.herokuapp.com/cart/${item.id}`, {
              id: data.id,
              name: data.name,
              price: data.price,
              image: data.image,
              qty: data.qty + 1,
            })
            .then((res) => console.log('cart updated'))
            .catch((err) => console.log(err))
        } else {
          console.log('belum ada')
        }
      })
      .catch((err) => {
        axios
          .post('https://ala-kfc-json.herokuapp.com/cart/', item)
          .then(function (response) {
            console.log('cart added')
          })
          .catch(function (error) {
            console.log(error)
          })
      })
  }

  const increasQty = (id) => {
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
            console.log('cart updated')
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }
  const decreasQty = (id) => {
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
            console.log('cart updated')
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  const deleteItem = async (id) => {
    await axios.delete(`https://ala-kfc-json.herokuapp.com/cart/${id}`)
    total.value = 0
  }

  const getTotal = () => {
    let tempTotal = 0
    setTimeout(() => {
      listCart.value.forEach((item, index) => {
        tempTotal = item.price * item.qty + tempTotal
      })
      total.value = tempTotal
    }, 1000)
  }

  return {
    listCart,
    getAllCart,
    addToCart,
    increasQty,
    decreasQty,
    deleteItem,
    total,
    getTotal,
  }
}

export default useCart
