'use strict'
const random_string = require("random-string")
const Mail = use("Mail")
const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
  async emailRegister({ request, response }) {
    try {
      // return console.log(request.originalUrl(), request.protocol(), 'hello');
      let token = random_string({ length: 50 })
      let userData = request.all()
      userData.confirmation_token = token
      await Mail.send('emails.confirmation', { userData, hostURL: request.headers().host, protocol: request.protocol() }, (message) => {
        message
          .to(userData.email)
          .from('info@parle.io', 'Parle')
          .subject('Welcome to Parle')
      })
      const user = await User.create(userData)

      return response.status(200).send({
        message: 'Registration successful',
        user
      })
    } catch (error) {
      console.log(error);
      return response.status(400).send({
        message: 'Registration failed'
      })
    }
  }
}

module.exports = UserController
