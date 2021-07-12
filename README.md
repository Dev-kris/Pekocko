# So Pokecko | Hotsauce Review App

In this project I worked with a frontend engineer and was tasked with building a secure API based on this company's needs. 

This company wanted to create a web app that allows users to share hot sauce recipies, like/dislike eachothers recepies, modify, delete, and browse sauces. 

The app lets users create sauces with a title, description, manufacturer, hot/spicy rating, picture, and ingredients list. 

The frontend, once connected to the API, DB, and populated, looks like this. 

<p align="center">

  <br>
  <img src="https://github.com/Dev-kris/Pekocko/blob/master/demo/sauce_site.png" width="550" alt="Hotsauce Review site homepage">
</p>


# Backend

For the backend I created an express server and used MongoDB Atlas for the database.  
The API created needed to be secure in response to recent malicious attacks on their parent website. 
As such a cobination of bcrypt, jwt, and OWASP practices were used to secure the API and DB. 

The API has the following routes:
<p align="center">

  <br>
  <img src="https://github.com/Dev-kris/Pekocko/blob/master/demo/sauce_api.png" width="550" title="Reddit Copy">
</p>

  

# To Run

To start the web app open a command line inside the project folder and run

````
npm run start
````
and then 

```` 
nodemon server
````
after which a live version of the project can be found on http://localhost:8081/login  (if a live version doesn't automatically display)
