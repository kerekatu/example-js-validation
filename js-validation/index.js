const inputName = document.querySelector('#inputName')

const hasError = (field) => {
  if (field.disabled || field.type === 'submit' || field.type === 'button')
    return

  const validity = field.validity

  if (validity.valid) {
    return
  } else if (validity.valueMissing) {
    return '᛫ Please fill out this field.'
  } else if (validity.typeMismatch) {
    if (field.type === 'email') {
      return '᛫ Please enter a valid email address.'
    } else {
      return '᛫ Please use the corrent input type.'
    }
  } else if (validity.tooShort) {
    return `᛫ The given value is too short (min. ${field.getAttribute(
      'minLength'
    )} characters).`
  } else if (validity.tooLong) {
    return `᛫ The given value is too long (max. ${field.getAttribute(
      'maxLength'
    )} characters).`
  } else {
    return '᛫ The given value is invalid.'
  }
}

const showError = (field, error) => {
  field.classList.add('error')

  const id = field.id || field.name
  if (!id) return

  let message = field.form.querySelector('.error-message#error' + id)
  if (!message) {
    message = document.createElement('div')
    message.className = 'error-message'
    message.id = 'error' + id
    field.parentNode.insertBefore(message, field.nextSibling)
  }

  message.innerHTML = error
  message.style.display = 'block'
  message.style.visibility = 'visible'
}

const removeError = (field) => {
  field.classList.remove('error')

  const id = field.id || field.name
  if (!id) return

  const message = field.form.querySelector('.error-message#error' + id)
  if (!message) return

  message.innerHTML = ''
  message.style.display = 'none'
  message.style.visibility = 'hidden'
}

document.addEventListener(
  'blur',
  (e) => {
    if (!e.target.form.classList.contains('form-validate')) return

    const error = hasError(event.target)

    if (error) {
      showError(e.target, error)
      return
    }

    removeError(e.target)
  },
  true
)
