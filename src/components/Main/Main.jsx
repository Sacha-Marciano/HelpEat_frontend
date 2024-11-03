// Import methods from librairies
import { useContext } from "react";

// Import styles
import "./Main.css";

// Import components
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import RecipeCard from "../RecipeCard/RecipeCard";

//Import context
import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";

function Main({
  onRecipeCardClick,
  onShowMoreClick,
  onScheduleClick,
  displayedCards,
  schedule,
}) {
  const recipesList = useContext(CurrentRecipesContext);
  return (
    <main className="main">
      <div className="main__schedule">
        {schedule.map((item) => {
          return (
            <ScheduleCard
              key={item.dayIndex}
              day={item.name}
              recipesOfDay={item.scheduledRecipes}
              onScheduleClick={onScheduleClick}
              onCardClick={onRecipeCardClick}
            />
          );
        })}
      </div>
      <div className="main__recipe-container">
        {displayedCards.map((recipe) => {
          return (
            <RecipeCard
              key={recipe._id}
              isWholeCard={true}
              isInProfile={false}
              recipe={recipe}
              onClick={onRecipeCardClick}
            />
          );
        })}
        {displayedCards.length < recipesList.length ? (
          <button
            className="main__show-more-button"
            type="button"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}

export default Main;
