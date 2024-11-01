import { useState, useEffect } from "react";

import "./Profile.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function Profile({
  favoriteRecipes,
  setSelectedCard,
  onCardClick,
  handleDeleteFavorite,
  schedule,
  recipesList,
}) {
  const [scheduledRecipes, setScheduledRecipes] = useState(() => {
    const tempScheduledRecipes = [];
    schedule.map((item) => {
      if (item.recipesOfDay.breakfast != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.breakfast);
      }
      if (item.recipesOfDay.lunch != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.lunch);
      }
      if (item.recipesOfDay.dinner != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.dinner);
      }
    });
    return tempScheduledRecipes;
  });

  const [scheduledIngredients, setScheduleIngredients] = useState([]);
  const [scheduledMeasures, setScheduleMeasures] = useState([]);

  useEffect(() => {
    // Get all recipes, measures and ingredients when schedule is changed
    const tempScheduledRecipes = [];
    schedule.map((item) => {
      if (item.recipesOfDay.breakfast != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.breakfast);
      }
      if (item.recipesOfDay.lunch != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.lunch);
      }
      if (item.recipesOfDay.dinner != 0) {
        tempScheduledRecipes.push(item.recipesOfDay.dinner);
      }
    });
    setScheduledRecipes(tempScheduledRecipes);

    const tempIngredients = [];
    const tempMeasures = [];
    scheduledRecipes.forEach((item) => {
      const tempRecipe = recipesList.filter((recipe) => recipe._id === item);
      tempIngredients.push(...tempRecipe[0].ingredients);
      tempMeasures.push(...tempRecipe[0].measures);
    });
    setScheduleIngredients(tempIngredients);
    setScheduleMeasures(tempMeasures);
  }, [schedule]);
  return (
    <div className="profile">
      <div className="profile__section">
        <h2 className="profile__title">Grocery List</h2>
        <ul className="profile__grocery-list">
          {scheduledIngredients.length > 0
            ? scheduledIngredients.map((item, index) => {
                return (
                  <li key={index} className="profile__ingredient">
                    {` ${scheduledMeasures[index]}
                    ${item}`}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      <div className="profile__section">
        <h2 className="profile__title">Favorite Recipes</h2>
        <ul className="profile__favorites">
          {favoriteRecipes.length > 0
            ? favoriteRecipes.map((item) => {
                return (
                  <li key={item._id} className="profile__recipe-card">
                    <RecipeCard
                      isWholeCard={true}
                      isInProfile={true}
                      card={item}
                      setSelectedCard={setSelectedCard}
                      onClick={onCardClick}
                      handleDeleteFavorite={handleDeleteFavorite}
                    />
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
