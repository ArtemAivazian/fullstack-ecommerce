import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Segment, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { productsApi } from '../misc/ProductsApi'
import ProductsForm from './ProductsForm'
import ProductsTable from './ProductsTable'
import { isAdmin } from '../misc/Helpers'
import { Navigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

const formInitialState = {
  id: '',
  name: '',
  price: '',
  quantity: '',
  description: '',

  idError: false,
  nameError: false,
  priceError: false,
  quantityError: false,
  descriptionError: false
}
function ProductsPage() {

  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ ...formInitialState })
  const { keycloak } = useKeycloak()

  useEffect(() => {
    // IIFE (Immediately Invoked Function Expression)
    (async () => {
      await handleGetProducts();
    })();
  }, []);


  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [id]: value }))
  }

  const handleGetProducts = async () => {
    try {
      const response = await productsApi.getProducts()
      const products = response.data
      setProducts(products)
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleCreateProduct = async () => {
    if (!isValidForm()) {
      return
    }

    const { name, description, price, quantity } = form
    const product = { name, description, price, quantity }
    try {
      await productsApi.createProduct(product, keycloak.token)
      clearForm()
      await handleGetProducts()
    } catch (error) {
      handleLogError(error)
    }
  }

  const clearForm = () => {
    setForm({ ...formInitialState })
  }

  const isValidForm = () => {
    const idError = form.id.trim() === ''
    const nameError = form.name.trim() === ''
    const quantityError = form.quantity.trim() === ''
    const priceError = form.price.trim() === ''
    const descriptionError = form.description.trim() === ''

    setForm((prevForm) => ({
        ...prevForm,
        idError,
        nameError,
        quantityError,
        priceError,
        descriptionError
    }));

    return !(idError || nameError || quantityError || priceError || descriptionError)
  }



  if (!isAdmin(keycloak)) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Segment>
            <Header as='h2'>
              {/* <Icon name='video camera' /> */}
              <Header.Content>Products</Header.Content>
            </Header>
            <Divider />
            <ProductsForm
              form={form}
              handleChange={handleChange}
              handleCreateProduct={handleCreateProduct}
              clearForm={clearForm}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <ProductsTable
            products={products}
            // handleDeleteMovie={handleDeleteMovie}
            // handleEditMovie={handleEditMovie}
          />
        </Grid.Column>
      </Grid>

      {/* <ConfirmationModal
        modal={modal}
        movie={movieToBeDeleted}
      /> */}
    </Container>
  )
}

export default ProductsPage