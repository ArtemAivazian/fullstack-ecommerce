const prod = {
    url: {
      KEYCLOAK_BASE_URL: "",
      API_BASE_URL: '',
    }
  }
  
  const dev = {
    url: {
      KEYCLOAK_BASE_URL: "http://localhost:9090",
      API_BASE_URL: 'http://localhost:8010'
    }
  }
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod