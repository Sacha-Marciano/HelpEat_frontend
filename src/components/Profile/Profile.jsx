import { useState, useEffect } from "react";

import "./Profile.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function Profile({
  favoriteRecipes,
  setSelectedCard,
  onCardClick,
  handleDeleteCard,
  schedule,
  recipesList,
}) {
  const [scheduledRecipes, setScheduledRecipes] = useState([]);

  const [scheduledIngredients, setScheduleIngredients] = useState([]);
  const [scheduledMeasures, setScheduleMeasures] = useState([]);

  const onClick = () => {
    console.log(scheduledIngredients);
    console.log(scheduledMeasures);
  };

  useEffect(() => {
    const tempScheduledRecipes = [];
    schedule.map((item) => {
      if (item.recipesOfDay.breakfast > 0) {
        tempScheduledRecipes.push(item.recipesOfDay.breakfast);
      }
      if (item.recipesOfDay.lunch > 0) {
        tempScheduledRecipes.push(item.recipesOfDay.lunch);
      }
      if (item.recipesOfDay.dinner > 0) {
        tempScheduledRecipes.push(item.recipesOfDay.dinner);
      }
    });
    setScheduledRecipes(tempScheduledRecipes);

    const tempIngredients = [];
    const tempMeasures = [];
    scheduledRecipes.forEach((item) => {
      const tempRecipe = recipesList.filter((recipe) => recipe._id === item);
      tempIngredients.push(tempRecipe[0].ingredients);
      tempMeasures.push(tempRecipe[0].measures);
    });
    setScheduleIngredients(tempIngredients);
    setScheduleMeasures(tempMeasures);
  }, [schedule]);
  return (
    <div className="profile">
      <div className="profile__section" onClick={onClick}>
        <h2 className="profile__title">Grocery List</h2>
        <ul className="profile__grocery-list">
          {scheduledIngredients.length > 0
            ? scheduledIngredients.map((item, index) => {
                return (
                  <li key={index}>
                    {` ${scheduledMeasures[index].join(" ")}
                    ${item.join(" ")}`}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      <div className="profile__section">
        <h2 className="profile__title">Favorite Recipes</h2>
        <div className="profile__favorites">
          {favoriteRecipes.length > 0
            ? favoriteRecipes.map((item) => {
                return (
                  <RecipeCard
                    isWholeCard={true}
                    card={item}
                    setSelectedCard={setSelectedCard}
                    onClick={onCardClick}
                    handleDeleteCard={handleDeleteCard}
                  />
                );
              })
            : ""}{" "}
        </div>
      </div>
    </div>
  );
}

export default Profile;
