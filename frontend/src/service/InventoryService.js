// InventoryService.js
import Keycloak from 'keycloak-js';
import { httpClient } from '../httpclient/HttpClient';

// Keycloak Init Options
let initOptions = {
  url: 'http://localhost:9090/',
  realm: 'dev',
  clientId: 'devpublicclient',
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'check-sso',
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
    kc.onTokenExpired = () => {
      kc.updateToken(30).then(() => {
        console.log("Token refreshed");
      }).catch(err => {
        console.error("Failed to refresh token", err);
      });
    };
  }
}, () => {
  console.error("Authentication Failed");
});

// Function to fetch products from the backend
export const fetchProducts = () => {
  return httpClient.get('/inventory-service/product/all');
};

// Function to create a new product
export const createProduct = (productDto) => {
    return httpClient.post('/inventory-service/product/create', productDto);
};
