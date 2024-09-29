import axios from 'axios'
import { config } from '../../Constants'

export const productsApi = {
  getProducts,
  getProduct,
  createProduct
}

function getProducts() {
  return instance.get('/inventory-service/product/all')
}

function getProduct(id) {
  return instance.get(`/inventory-service/product/${id}`)
}

function createProduct(product, token) {
  return instance.post('/inventory-service/product/create', product, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 404) {
            return { status: error.response.status };
        }
        return Promise.reject(error);
    }
);


// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`
}