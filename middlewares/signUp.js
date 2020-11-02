const Validator = require('validator')
const isEmpty = require('./is-Empty')

const userInputValidation = (data) => {
  const errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
 

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'name must be between 2 and 50 character'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name filed is reqired'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'email filed is reqired'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = 'password length should be more the 6 character long'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'password filed is reqired'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = userInputValidation
