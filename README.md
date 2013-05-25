middleend-boilerplate
=====================

A boilerplate for building applications with a middleend. This is an ongoing project, trying to build good concepts
on handling different aspects of a middleend.

Deps
====
You have to install Node JS over at <a href="http://nodejs.org" target="_blank">Node JS</a>. When installed you need
the grunt-cli node module.
  ```terminal
  npm install grunt-cli -g
  ```
You might have to use 'sudo'.
  ```terminal
  sudo npm install grunt-cli -g
  ```
  
Install middleend
=================
You just have to install the project dependencies. In the root folder of the project.
  ```terminal
  npm install
  ```
You might have to use 'sudo'.
  ```terminal
  sudo npm install
  ```

Running the middleend
=====================
You have to start the server.js file in the project root folder.
  ```terminal
  node server
  ```
Go to localhost:3000 and login with user: jim and password: jim. You can change this in 
<strong>server/authentication.js</strong>,at the top.

Deploying your application
==========================
You use grunt to deploy the project.
  ```terminal
  grunt deploy
  ```

To run it in production:
  ```terminal
  NODE_ENV=production node server
  ```
or on windows:
  ```terminal
  SET NODE_ENV=production
  node server
  ```

Testing your application
========================
To run the tests:
  ```terminal
  grunt test
  ```
This will run the specs defined under <strong>tests/specs</strong>.
### Writing a test

Good to know
============
### Authentication
### Fake responses
### The config
### Templating
### Validating
