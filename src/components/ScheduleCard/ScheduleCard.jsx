import "./ScheduleCard.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function ScheduleCard({
  day,
  recipesOfDay,
  onScheduleClick,
  onCardClick,
  recipesList,
  handleDeleteFavorite,
}) {
  return (
    <div className="schedule-card">
      <h2 className="schedule-card__title" onClick={onScheduleClick}>
        {day}
      </h2>
      <div className="schedule-card__container">
        <div className="schedule-card__recipe">
          {recipesOfDay.breakfast > 0 ? (
            <RecipeCard
              isWholeCard={false}
              card={
                recipesList.filter(
                  (item) => item._id == recipesOfDay.breakfast
                )[0]
              }
              onClick={onCardClick}
              handleDeleteFavorite={handleDeleteFavorite}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfDay.lunch > 0 ? (
            <RecipeCard
              isWholeCard={false}
              card={
                recipesList.filter((item) => item._id == recipesOfDay.lunch)[0]
              }
              onClick={onCardClick}
              handleDeleteFavorite={handleDeleteFavorite}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfDay.dinner > 0 ? (
            <RecipeCard
              isWholeCard={false}
              card={
                recipesList.filter((item) => item._id == recipesOfDay.dinner)[0]
              }
              onClick={onCardClick}
              handleDeleteFavorite={handleDeleteFavorite}
            />
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
