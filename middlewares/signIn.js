const Validator = require('validator')
const isEmpty = require('./is-Empty')

const loginValidation = (data) => {
  const errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Enter a registered email'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Enter a valid password'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = loginValidation
