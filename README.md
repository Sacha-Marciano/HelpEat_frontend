# HelpEat app

This is the HelpEat app front-end.
Helpeat is a webapp that wants to help you manage your eating schedule.
Here you will find easy and delicious recipes posted by our users around the world.
You can also save your favorite recipes and schedule your weekly cooking.
To save even more time, HelpEat will generate a grocery list just for you !

You can visit the deployed site right [here](https://helpeat.jumpingcrab.com/).
Backend repo : https://github.com/Sacha-Marciano/HelpEat_backend .

## Screenshot from the app

![Screenshot 2024-11-10 103357](https://github.com/user-attachments/assets/3876c8dc-cd8b-4a58-b58b-ee185bbcef32)
![Screenshot 2024-11-10 103831](https://github.com/user-attachments/assets/6441d0bf-3f0f-446e-bf32-cfd7935009f5)
After the you're logged in you can start build your own week menu.

![Screenshot 2024-11-10 105928](https://github.com/user-attachments/assets/f3c858f6-a86a-4a04-96eb-3f7e48ee28ff)
When clicking on a recipe in the schedule, feed or profile it will fully open and show you everything you need to succeed

![Screenshot 2024-11-10 103857](https://github.com/user-attachments/assets/f3e8ce49-be9c-46c3-98b1-3e50d4f0bcda)
The navigation is intuitive and you can do every action from there.

![Screenshot 2024-11-10 103737](https://github.com/user-attachments/assets/a6228e0e-4fec-4758-bd81-b63757d3106c)
In your profile you will find all your favorite recipes and a cutom grocery list for all the recipes in your week menu.
The grocery list gets updated everytime you add or delete a recipe from your eat schedule !

##Technical Overview

This application is developed using React with Create React App (CRA) and connects to an Express server hosted on a Virtual Machine within Google Cloud. The server-client communication leverages various Node.js libraries, including bcryptjs for secure password hashing.

###Front-End

The front-end is built using React and employs well-known React hooks such as useState and useEffect for efficient state and lifecycle management.

###Back-End

The back-end is powered by an Express server, handling all API requests and serving as the main point of communication with the database.

###Security

User data is securely stored and managed, ensuring it remains accessible whenever required. The use of bcryptjs enhances security by encrypting passwords, thus safeguarding user credentials.

###Hosting

The application is deployed on a Google Cloud Virtual Machine, providing reliable and scalable hosting for both the front-end and back-end components.

This architecture ensures a seamless and secure user experience while maintaining high performance and scalability.

## How to

The app menu contains the following features :

- Navigate to profile (accessible also when clicking on username)
- Search a recipe - displays search result and a button to reset the research
- Add a recipe - add a custom recipe, displays it and mark it as favorite
- Schedule a recipe (accesible when clicking on schedule card) - add a recipe to schedule card and calculate a grocery list every time a recipe is added

Clicking on the recipes card in main, profile or schedule card will open a popup with all the recipe info

## Updates

From new to old:

- v2.1.1 Style and fix new components, update README
- v2.1.0 Finish backend intrgation, connect frontend actions and calls to main API
- v2.0.0 Start backend integration, implement login and signup
- v1.6.1 Update README
- v1.6.0 Fix after review, redeploy vi gh-pages
- v1.5.2 update package.json
- v1.5.1 fix github pages issue
- v1.5.0 final check before pull request, update README
- v1.4.1 fix popups
- v1.4.0 Add schedule popup, fix navigation functionality, implement grocery list
- v1.3.0 First API implementation, fix code to handle API response format
- v1.2.0 Implement grocery list and favorites in profile, imrove search and add recipe features
- v1.1.2 Implement add recipe modal
- v1.1.1 Implement search modal functionality
- v1.1.0 JSX and markup - design only
- v1.0.2 Create JSX for Header, About and Footer components
- v1.0.1 Structure directories
- v1.0.0 Create a React + Vite app and update README

### Future upgrades

- Release better UI for mobile format

### Credits

- Idea and design - Dana Marciano
- Favicon - nawicon on Flaticon
- Close Icon - inkubators on Flaticon
- API - freemeal.com
- Toque icon - Nikita Golubev
