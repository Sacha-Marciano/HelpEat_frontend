import { useState, useEffect } from "react";

// Import styles
import "./Main.css";

// Import components
import ScheduleCard from "../ScheduleCard/ScheduleCard";
import RecipeCard from "../RecipeCard/RecipeCard";

import { daySchedule } from "../../utils/constants";

function Main({ onScheduleClick, setSelectedCard, onCardClick, recipesList }) {
  return (
    <main className="main">
      <div className="main__schedule">
        {daySchedule.map((item) => {
          return (
            <ScheduleCard
              key={item._id}
              day={item.day}
              recipesOfday={item.recipesOfDay}
              onScheduleClick={onScheduleClick}
              onCardClick={onCardClick}
              setSelectedCard={setSelectedCard}
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
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
