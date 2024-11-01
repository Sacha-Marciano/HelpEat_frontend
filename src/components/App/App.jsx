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
import RecipeCardModal from "../Popups/RecipeCardModal/RecipeCardModal";
import SearchModal from "../Popups/SearchModal/SearchModal";
import LoginModal from "../Popups/LoginModal/LoginModal";
import RegisterModal from "../Popups/RegisterModal/RegisterModal";

// Import constants
import { recipes, scheduleConst } from "../../utils/constants";

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
  const [validationError, setValidationError] = useState(false);
  const [schedule, setSchedule] = useState(scheduleConst);
  const [selectedScheduleCard, setSelectedScheduleCard] = useState("");

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
  const handleScheduleClick = (evt) => {
    setSelectedScheduleCard(
      schedule.filter((item) => item.day === evt.target.textContent)[0]
    );
    setOpenPopup("popup-schedule");
  };

  // Close popups
  const closePopup = () => {
    setOpenPopup("");
  };

  // Add recipe to favorites array
  const handleAddFavorite = (recipe) => {
    if (!favoriteRecipes.some((item) => item._id === recipe._id)) {
      setFavoriteRecipes([recipe, ...favoriteRecipes]);
    } else {
      console.log("Recipe is already favorite !");
    }
    closePopup();
  };

  // Set diplayed card depending on search
  const handleSearch = (search) => {
    const searchResult = recipes.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.recipeSearch.toLowerCase().split(" ")[0])
    );
    if (searchResult.length > 0) {
      setDisplayedCards(searchResult);
      closePopup();
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  };

  // Add submitted recipe to schedule
  const handleScheduleSubmit = (data) => {
    const temp = schedule;
    temp[data.day].recipesOfDay[data.time] = data.recipeId;
    setSchedule(temp);
    closePopup();
  };
  // Delete selected recipe from schedule
  const handleDeleteCard = (card) => {
    console.log(card);
    //This function will ne implemented when back end is ready
  };

  // Handle new recipe submit and adds it to displayed card
  const handleSubmitRecipe = (card) => {
    setDisplayedCards([card, ...displayedCards]);
    closePopup();
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
              schedule={schedule}
              handleDeleteCard={handleDeleteCard}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              favoriteRecipes={favoriteRecipes}
              setSelectedCard={setSelectedCard}
              onCardClick={handleCardClick}
              handleDeleteCard={handleDeleteCard}
              schedule={schedule}
              recipesList={displayedCards}
            />
          }
        />
      </Routes>
      <About />
      <Footer />
      <SearchModal
        isOpen={openedPopup === "popup-search"}
        onClose={closePopup}
        onSearch={handleSearch}
        validationError={validationError}
      />
      <AddRecipeModal
        isOpen={openedPopup === "popup-add-recipe"}
        onClose={closePopup}
        handleSubmitRecipe={handleSubmitRecipe}
      />
      <AddScheduleModal
        isOpen={openedPopup === "popup-schedule"}
        onClose={closePopup}
        onSubmit={handleScheduleSubmit}
        favoriteRecipes={favoriteRecipes}
        schedule={schedule}
        selectedScheduleCard={selectedScheduleCard}
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
