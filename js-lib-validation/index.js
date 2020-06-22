import validate from 'validate.js'

const constrains = {
  name: {
    length: {
      minimum: 3,
      maximum: 20
    },
    format: {
      pattern: '[a-zA-Z]+',
      message: 'Use only letters'
    }
  },

  email: {
    presence: true,
    email: true
  }
}

const handleFormSubmit = (form) => {
  const values = validate.collectFormValues(form)
  const errors = validate(values, constrains)
}

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault()
  handleFormSubmit(this)
})
