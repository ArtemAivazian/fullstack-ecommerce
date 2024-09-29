import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function ProductsForm({ form, handleChange, handleCreateProduct, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label='Name *'
        id='name'
        onChange={handleChange}
        value={form.name}
        error={form.nameError}
      />
      <Form.Input
        fluid
        label='Description *'
        id='description'
        onChange={handleChange}
        value={form.description}
        error={form.descriptionError}
      />
      <Form.Input
        fluid
        label='Quantity *'
        id='quantity'
        onChange={handleChange}
        value={form.quantity}
        error={form.quantityError}
      />
      <Form.Input
        fluid
        label='Price'
        id='price'
        onChange={handleChange}
        value={form.price}
        error={form.priceError}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={handleCreateProduct}>Save</Button>
      </Button.Group>
    </Form>
  )
}

export default ProductsForm