// Import methods from libraries
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import styles
import "./App.css";

// Import components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Footer from "../Footer/Footer";

// Import popups
import AddRecipeModal from "../Popups/AddRecipeModal/AddRecipeModal";
import AddScheduleModal from "../Popups/AddScheduleModal/AddScheduleModal";
import LoginModal from "../Popups/LoginModal/LoginModal";
import RecipeCardModal from "../Popups/RecipeCardModal/RecipeCardModal";
import SearchModal from "../Popups/SearchModal/SearchModal";

import { recipes, daySchedule } from "../../utils/constants";

function App() {
  //Hooks
  const [openedPopup, setOpenPopup] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    image: "",
    ingredients: [],
    steps: [],
  });
  const [displayedCards, setDisplayedCards] = useState(recipes);

  // Up-lifted functions
  // Open popups
  const handleAddClick = () => {
    setOpenPopup("popup-add-recipe");
  };
  const handleSearchClick = () => {
    setOpenPopup("popup-search");
  };
  const handleCardClick = () => {
    setOpenPopup("popup-card-recipe");
  };
  const handleScheduleClick = () => {
    setOpenPopup("popup-schedule");
  };

  // Close popups
  const closePopup = () => {
    setOpenPopup("");
  };

  // Add recipe to favorites array
  const handleAddFavorite = (recipe) => {
    setFavoriteRecipes([recipe, ...favoriteRecipes]);
  };

  return (
    <div className="page">
      <Header onSearchClick={handleSearchClick} onAddClick={handleAddClick} />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <Main
              onScheduleClick={handleScheduleClick}
              onCardClick={handleCardClick}
              setSelectedCard={setSelectedCard}
              recipesList={displayedCards}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <About />
      <Footer />
      <SearchModal
        isOpen={openedPopup === "popup-search"}
        onClose={closePopup}
      />
      <AddRecipeModal
        isOpen={openedPopup === "popup-add-recipe"}
        onClose={closePopup}
      />
      <AddScheduleModal
        isOpen={openedPopup === "popup-schedule"}
        onClose={closePopup}
        selectedDay="Monday"
        favoriteRecipes={favoriteRecipes}
      />
      <RecipeCardModal
        isOpen={openedPopup === "popup-card-recipe"}
        onClose={closePopup}
        onAddFavorite={handleAddFavorite}
        selectedCard={selectedCard}
      />
    </div>
  );
}

export default App;
