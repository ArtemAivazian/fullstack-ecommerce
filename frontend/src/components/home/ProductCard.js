import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ProductCard({ product, link }) {
  const content = (
    <>
      {/* <Image src={movie.poster ? movie.poster : '/images/movie-poster.jpg'} wrapped ui={false} /> */}
      <Card.Content textAlign="center">
        <Card.Header>{product.name}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>Id: <strong>{product.id}</strong></Card.Description>
        <Card.Description>Price: <strong>{product.price}</strong></Card.Description>
        <Card.Description>Quantity: <strong>{product.quantity}</strong></Card.Description>
        <Card.Description>Description: <p>{product.description}</p></Card.Description>
      </Card.Content>
    </>
  )
  return (
    !link ? <Card>{content}</Card> : <Card as={Link} to={`/product/${product.id}`}>{content}</Card>
  )
}

export default ProductCard