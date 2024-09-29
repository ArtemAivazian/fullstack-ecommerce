import React from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'
import ProductCard from './ProductCard'

function ProductList({ products }) {
  const productList = products.map(product => <ProductCard key={product.id} product={product} link={true} />)

  return (
    products.length > 0 ? (
      <Card.Group doubling centered>
        {productList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No products</Header>
        </Segment>
      )
  )
}

export default ProductList