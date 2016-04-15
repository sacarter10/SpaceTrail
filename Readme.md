*Initial set-up*  
- make sure Ruby is intalled  
- `gem install sass` (required by grunt-contrib-sass library)  
- `gem install compass` (required by grunt-contrib-sass) 

- install node and use v1.0.0
- `npm install`  


*To Run*
To compile sass and jsx one time: "grunt"  
To compile and then watch for changes to sass/jsx: "grunt caw"   

To run the server locally: "node server.js"  

Open http://localhost:3000/ 

Live here: http://spacetrail.sallyanncarter.com 

TODO: 
* When searching dead ship -- find more things w/ more crew members, but risk death
* QuickStart button
* use radio buttons instead of text input where possible -- requires less error checking!
* Better error checking / messaging for invalid inputs
* compile everything during deployment -- snap-ci?
* Save game state in localStorage across browser sessions
* does #planets div really need to be square? adds weird padding to bottom of page
