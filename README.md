# Instruction to run the project.

1 Clone the Project Using the suitable commands
2 Install the dependencies using npm install
3 Install nodemon for development process using npm i nodemon -g
4 make a .env file and add mongoDB connection URL and other API keys.
5 npm run dev to start the server.

# API DOCS

Working Demo Link of backend : https://medbikri.herokuapp.com/

Full Working Project using reactjs as frontend : https://medbikrii.netlify.app/

the frontend has some minor bugs that needs to be fixed.


1> /getVideos => Get Request

Require a json input with following format.


{

  "page":pageNumber(an integer)

}


return 15 videos belonging to that particular page.


2> /search => Post Request


Require a json input with following format.


{

"title":videoTitle(string),


"description":videoDesc(string),


"page":pageNumber(an integer)


}

return 10 videos belonging to that particular page and satisfying the description and title query.(Uses regex)
