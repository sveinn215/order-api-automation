Design Pattern:

I am using resource design pattern here. so the tests will be separated for each endpoint. i choose this pattern
in order to separate the test to make the test readable and independent for each API. 

Tech Stack : 

Javascript + Mocha + Chai
I am using javascript mocha+chai because its easy to install and manage. mocha also have their mochawesome report
which produced good and readable report (also could import directly to xray testcase management system)

How to Run the test : 

1. Change the baseUrl on common.js
2. type npm install
3. type npm run test-api

Improvement to platform independent : 

This code actually already platform independent its only using node js installed in the machine. so when we are using
pipeline we need to execute command to install node JS first. we could also using docker to dockerize the node js and this code. 

