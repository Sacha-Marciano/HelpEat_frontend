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
  onDeleteClick,
  onResetSearch,
  displayedCards,
  schedule,
  isShowMore,
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
              dayIndex={item.dayIndex}
              recipesOfDay={item.scheduledRecipes}
              onScheduleClick={onScheduleClick}
              onCardClick={onRecipeCardClick}
              onDeleteClick={onDeleteClick}
            />
          );
        })}
      </div>
      <h2 className="main__container-title">WorldWide Recipes </h2>

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
        {isShowMore ? (
          displayedCards.length < recipesList.length ? (
            <button
              className="main__button main__show-more-button"
              type="button"
              onClick={onShowMoreClick}
            >
              Show more
            </button>
          ) : (
            ""
          )
        ) : (
          <button
            className="main__button main__show-all-button"
            type="button"
            onClick={onResetSearch}
          >
            Reset Search
          </button>
        )}
      </div>
    </main>
  );
}

export default Main;
