import { useEffect, useState, useContext } from "react";
import "./Profile.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";
import { getGroceryList } from "../../utils/getGroceryList";

function Profile({
  favoriteList,
  schedule,
  onRecipeCardClick,
  onDeleteFavorite,
}) {
  const recipesList = useContext(CurrentRecipesContext);

  // function for week's recipes init
  const initializeScheduledRecipes = () => {
    const tempScheduledRecipes = [];
    schedule.forEach((item) => {
      if (item.scheduledRecipes.breakfast) {
        tempScheduledRecipes.push(item.scheduledRecipes.breakfast);
      }
      if (item.scheduledRecipes.lunch) {
        tempScheduledRecipes.push(item.scheduledRecipes.lunch);
      }
      if (item.scheduledRecipes.dinner) {
        tempScheduledRecipes.push(item.scheduledRecipes.dinner);
      }
    });
    return tempScheduledRecipes;
  };

  const [recipesOfWeek, setRecipesOfWeek] = useState(
    initializeScheduledRecipes
  );
  const [groceryList, setGroceryList] = useState([]);

  // Update recipesOfWeek if schedule changes
  useEffect(() => {
    setRecipesOfWeek(initializeScheduledRecipes());
  }, [schedule]);

  // Generate groceryList using the imported function
  useEffect(() => {
    setGroceryList(getGroceryList(recipesOfWeek, recipesList));
  }, [recipesOfWeek, recipesList]);

  return (
    <div className="profile">
      <div className="profile__section">
        <h2 className="profile__title">Grocery List</h2>
        <ul className="profile__grocery-list">
          {groceryList.map((item, index) => (
            <li className="gg" key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="profile__section">
        <h2 className="profile__title">Favorite Recipes</h2>
        <ul className="profile__favorites">
          {favoriteList.map((item) => (
            <li key={item._id} className="profile__recipe-card">
              <RecipeCard
                isWholeCard={true}
                isInProfile={true}
                recipe={item}
                onClick={onRecipeCardClick}
                onDeleteFavorite={onDeleteFavorite}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
