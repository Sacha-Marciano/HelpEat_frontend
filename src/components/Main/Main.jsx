import { useState, useEffect } from "react";

// Import styles
import "./Main.css";

// Import components
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import RecipeCard from "../RecipeCard/RecipeCard";

function Main({
  onScheduleClick,
  setSelectedCard,
  onCardClick,
  recipesList,
  schedule,
  handleDeleteCard,
}) {
  return (
    <main className="main">
      <div className="main__schedule">
        {schedule.map((item) => {
          return (
            <ScheduleCard
              key={item._id}
              day={item.day}
              recipesOfDay={item.recipesOfDay}
              onScheduleClick={onScheduleClick}
              onCardClick={onCardClick}
              setSelectedCard={setSelectedCard}
              recipesList={recipesList}
              handleDeleteCard={handleDeleteCard}
            />
          );
        })}
      </div>
      <div className="main__recipe-container">
        {recipesList.map((item) => {
          return (
            <RecipeCard
              key={item._id}
              isWholeCard={true}
              card={item}
              onClick={onCardClick}
              setSelectedCard={setSelectedCard}
              handleDeleteCard={handleDeleteCard}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
