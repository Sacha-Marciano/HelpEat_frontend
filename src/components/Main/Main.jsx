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
  onLoginClick,
  onSignupClick,
  displayedCards,
  schedule,
  isShowMore,
  isLoggedIn,
}) {
  const recipesList = useContext(CurrentRecipesContext);
  return (
    <main className="main">
      {isLoggedIn ? (
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
      ) : (
        <div className="main__presentation">
          <h1 className="main__presentation-title">Welcome to HelpEat !</h1>
          <p className="main__presentation-paragraph">
            Helpeat is a webapp that wants to help you manage your eating
            schedule. Here you will find easy and delicious recipes posted by
            our users around the world. You can also save your favorite recipes
            and schedule your weekly cooking. To save even more time, HelpEat
            will generate a grocery list just for you !
          </p>
          <p className="main__presentation-actions">
            <button
              className="main__presentation-button"
              type="button"
              onClick={onLoginClick}
            >
              Log in
            </button>
            or
            <button
              className="main__presentation-button"
              type="button"
              onClick={onSignupClick}
            >
              Sign up
            </button>
            to enjoy the EatSchedule and GroceryList features !
          </p>
        </div>
      )}
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
