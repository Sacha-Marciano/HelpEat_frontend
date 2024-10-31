import "./ScheduleCard.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function ScheduleCard({
  day,
  recipesOfDay,
  onScheduleClick,
  onCardClick,
  setSelectedCard,
}) {
  return (
    <div className="schedule-card">
      <h2 className="schedule-card__title" onClick={onScheduleClick}>
        {day}
      </h2>
      <div className="schedule-card__container">
        <div className="schedule-card__recipe">
          {recipesOfDay.breakfast !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfDay.breakfast}
              setSelectedCard={setSelectedCard}
              onClick={onCardClick}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfDay.lunch !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfDay.lunch}
              setSelectedCard={setSelectedCard}
              onClick={onCardClick}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfDay.dinner !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfDay.dinner}
              setSelectedCard={setSelectedCard}
              onClick={onCardClick}
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
