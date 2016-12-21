Keystone Starter Kit
====================

A KeystoneJS starter kit based on [Keystone Demo](https://github.com/keystonejs/keystone-demo) with the authorisation
code from the [SydJS](https://github.com/JedWatson/sydjs-site) site added.

**Features**
- Updated from Jade to Pug
- Blog functionality and comments from the Keystone Demo
- User management including sign up and password reset from SydJS
- Sign up using Github, Google+, Facebook & Twitter from SydJS
- User profile page from SydJS
- Database initialisation using JSON
- .env support for application specific environment variables
- Cloudinary image upload from Keystone Demo
- Password reset email tested using Mailgun

### Run

```npm install && node keystone.js```

### Social API keys
The social API keys must be added to a .env file in the project root folder. A sample file has been provided, ```.env.sample```, to show the values needed for each API.


## License

(The MIT License)

Copyright (c) 2016 Brendan Wyse

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
