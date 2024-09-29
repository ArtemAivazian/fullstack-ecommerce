import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { productsApi } from '../misc/ProductsApi'
import ProductList from './ProductList'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const response = await productsApi.getProducts()
        const products = response.data
        setProducts(products)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    })();
  }, []);

  return (
    isLoading ? <></> : (
      <Container>
        <ProductList products={products} />
      </Container>
    )
  )
}

export default Home