import React from 'react'
import { Table } from 'semantic-ui-react'

function ProductsTable({ products }) {
  const height = window.innerHeight - 100
  const style = {
    height: height,
    maxHeight: height,
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  const productList = products && products.map(product => {
    return (
      <Table.Row key={product.id}>
        <Table.Cell>{product.id}</Table.Cell>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell>{product.description}</Table.Cell>
        <Table.Cell>{product.price}</Table.Cell>
        <Table.Cell>{product.quantity}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div style={style}>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={2}>Id</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={3}>Description</Table.HeaderCell>
            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
            <Table.HeaderCell width={3}>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productList}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ProductsTable