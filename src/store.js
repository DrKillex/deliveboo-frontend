import { reactive } from "vue";

export const store = reactive({
  apiBaseUrl: import.meta.env.VITE_BACKEND_API_URL,
  apiUrls: {
    restaurants: '/restaurants'
  },
  storage: "http://127.0.0.1:8000/storage/"
}
)