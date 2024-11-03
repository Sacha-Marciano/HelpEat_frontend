import { useContext } from "react";

import "./ScheduleCard.css";

import RecipeCard from "../RecipeCard/RecipeCard";

import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";

function ScheduleCard({ day, recipesOfDay, onScheduleClick, onCardClick }) {
  const recipesList = useContext(CurrentRecipesContext);
  return (
    <div className="schedule-card">
      <h2 className="schedule-card__title" onClick={onScheduleClick}>
        {day}
      </h2>
      <div className="schedule-card__container">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div className="schedule-card__recipe" key={meal}>
            {recipesOfDay[meal] != "" ? (
              <RecipeCard
                key={recipesOfDay[meal]}
                isWholeCard={false}
                isInProfile={false}
                recipe={recipesList.find(
                  (item) => item._id === recipesOfDay[meal]
                )}
                onClick={onCardClick}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleCard;
