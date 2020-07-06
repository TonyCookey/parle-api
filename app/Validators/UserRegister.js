'use strict'

class UserRegister {
  get rules() {
    return {
      // validation rules
      full_name: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }
  get messages() {
    return {
      'full_name.required': 'You must provide a full name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }
  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = UserRegister
