# HelpEat app

This is the HelpEat app front-end.
Helpeat is a webapp that wants to help you manage your eating schedule.
Here you will find easy and delicious recipes posted by our users around the world.
You can also save your favorite recipes and schedule your weekly cooking.
To save even more time, HelpEat will generate a grocery list just for you !

You can visit the deployed site right [here](https://helpeat.jumpingcrab.com/)
Backend repo : https://github.com/Sacha-Marciano/HelpEat_backend

## Technical Description

The app uses the third-party API FreeMeal. On each call, the API returns a recipe with an image, ingredients and steps to reproduce.
The user can save recipes as it's favorite and add a eat schedule.
Based on the ingredients of the meals in the eat schedule, HelpEat will generate a personalized grocery list.

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

- Implement back-end that will replace the third party API (will be used as recipe database)
- Implement users handling in back-end(will be used to personalize feed based on user)

### Credits

- Idea and design - Dana Marciano
- Favicon - nawicon on Flaticon
- Close Icon - inkubators on Flaticon
- API - freemeal.com
- Toque icon - Nikita Golubev
