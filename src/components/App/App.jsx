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
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";

// Import popups
import AddRecipeModal from "../Popups/AddRecipeModal/AddRecipeModal";
import AddScheduleModal from "../Popups/AddScheduleModal/AddScheduleModal";
import RecipeCardModal from "../Popups/RecipeCardModal/RecipeCardModal";
import SearchModal from "../Popups/SearchModal/SearchModal";
import LoginModal from "../Popups/LoginModal/LoginModal";
import RegisterModal from "../Popups/RegisterModal/RegisterModal";

// Import constants
import { recipesConst, scheduleConst } from "../../utils/constants";

function App() {
  //Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [openedPopup, setOpenPopup] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    image: "",
    ingredients: [],
    steps: [],
  });
  const [recipes, setRecipes] = useState(recipesConst);
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
  const handleCardClick = (card) => {
    setSelectedCard(card);
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

  // Delete selected recipe from schedule
  const handleDeleteFavorite = (card) => {
    console.log(card);
    const temp = favoriteRecipes.filter((item) => item._id !== card._id);
    setFavoriteRecipes(temp);
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

  // Handle new recipe submit and adds it to displayed card
  const handleSubmitRecipe = (card) => {
    setRecipes([card, ...recipes]);
    setFavoriteRecipes([card, ...favoriteRecipes]);
    closePopup();
  };

  // Every time the recipes array is modified, displayed card are rerendered
  useEffect(() => {
    setDisplayedCards(recipes);
  }, [recipes]);

  //Add event listener when mounting popup
  useEffect(() => {
    if (!openedPopup) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    const handleClickClose = (evt) => {
      if (evt.target.classList[0] === "modal") {
        closePopup();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleClickClose);
    //Remove event listener on unmounting
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleClickClose);
    };
  }, [openedPopup]);

  return (
    <div className="page">
      <Header onSearchClick={handleSearchClick} onAddClick={handleAddClick} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            isLoading ? (
              <Preloader />
            ) : (
              <Main
                onScheduleClick={handleScheduleClick}
                onCardClick={handleCardClick}
                displayedCards={displayedCards}
                schedule={schedule}
                handleDeleteFavorite={handleDeleteFavorite}
                recipesList={recipes}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              favoriteRecipes={favoriteRecipes}
              setSelectedCard={setSelectedCard}
              onCardClick={handleCardClick}
              handleDeleteFavorite={handleDeleteFavorite}
              schedule={schedule}
              recipesList={recipes}
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
        favoriteRecipes={favoriteRecipes}
      />
    </div>
  );
}

export default App;
