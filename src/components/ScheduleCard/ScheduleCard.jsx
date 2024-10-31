import "./ScheduleCard.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function ScheduleCard({
  day,
  recipesOfday,
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
          {recipesOfday.breakfast !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfday.breakfast}
              setSelectedCard={setSelectedCard}
              onClick={onCardClick}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfday.lunch !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfday.lunch}
              setSelectedCard={setSelectedCard}
              onClick={onCardClick}
            />
          ) : (
            ""
          )}
        </div>
        <div className="schedule-card__recipe">
          {recipesOfday.dinner !== "" ? (
            <RecipeCard
              isWholeCard={false}
              name={recipesOfday.dinner}
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
