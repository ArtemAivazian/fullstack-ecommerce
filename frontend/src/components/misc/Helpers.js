

export const isAdmin = (keycloak) => {
  return keycloak?.tokenParsed?.resource_access?.['devpublicclient']?.roles?.includes('ADMIN') ?? false
}

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log(error.message)
  }
}