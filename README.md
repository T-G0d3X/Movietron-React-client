# [Movietron-React-client](https://movietron.netlify.app/)
(published here) &#8593;


## *Description*

 Client-side for an application called Movietron based on its existing server-side code I built before as one of my projects ([REST API and database](https://github.com/T-G0d3X/Movietron-API)). Movietron-React-client is a single-page application (SPA), built using React libary, using state routing to navigate between views.


## *User Stories*

 - As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in. 
 -  As a user, I want to be able to create a profile so I can save data about my favorite movies.

 

## *Key Features*

 **Main view** 
 - Returns a list of ALL movies to the user (each listed item with an image, title, and description) 
 - Sorting and filtering 
 -  Ability to select a movie for more details
 
 **Single Movie view**
 
 - Returns data (description, genre, director, image) about a single movie to the user
 - Allows users to add a movie to their list of favorites

**Login view**

 - Allows users to log in with a username and password 
 -  Registration view 
 - Allows new users to register (username, password, email,
   birthday)

**Genre view** 


 - Returns data about a genre, with a name and description 
 - Displays example movies

 **Director view** 

 - Returns data about a director (name, bio, birth year, death year) 
 - Displays example movies

 **Profile view** 
 - Allows users to update their user info (username, password, email, date of birth)
 - Allows existing users to deregister
 - Displays favorite movies 
 -  Allows users to remove a movie from their list of favorites

## Technologies used

- React 
- React Bootstrap
- Redux
- Babel
- Bootstrap
