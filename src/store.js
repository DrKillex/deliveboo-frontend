import { reactive } from "vue";

export const store = reactive({
  apiBaseUrl: import.meta.env.VITE_BACKEND_API_URL,
  apiUrls: {
    restaurants: '/restaurants',
    products: '/products',
    payment: '/payment'
  },
  selectedRestaurant: '',
  restaurants: [],
  categories: [],
  categoriesId: [],
  searchBarText: "",
  selectedCategories: [],
  products: [],
  cart: [],
  totalPrice:'',
  cartWarning: false,
}
)