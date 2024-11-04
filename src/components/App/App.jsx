// Import methods from libraries
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import styles
import "./App.css";

// Import API methods
import { getRecipes } from "../../utils/freeMealApi";

//Import components
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

// Import popups
import Navigation from "../Navigation/Navigation";
import RecipeCardModal from "../Popups/RecipeCardModal/RecipeCardModal";
import SearchModal from "../Popups/SearchModal/SearchModal";
import AddRecipeModal from "../Popups/AddRecipeModal/AddRecipeModal";
import AddScheduleModal from "../Popups/AddScheduleModal/AddScheduleModal";

// Import contexts
import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";

// Import constants
import { SCHEDULECONST } from "../../utils/config";

function App() {
  // Hooks
  const [recipesList, setRecipesList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState("");
  const [selectedRecipeCard, setSelectedRecipeCard] = useState({});
  const [selectedScheduleCard, setSelectedScheduleCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [schedule, setSchedule] = useState(SCHEDULECONST);
  const [validationError, setValidationError] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);

  // Open and close popups
  const handleNavClick = () => {
    selectedPopup === "navigation-popup"
      ? closePopup()
      : setSelectedPopup("navigation-popup");
  };
  const handleSearchClick = () => {
    setSelectedPopup("search-popup");
  };
  const handleAddRecipeClick = () => {
    setSelectedPopup("add-recipe-popup");
  };
  const handleScheduleClick = (evt) => {
    setSelectedScheduleCard(
      schedule.find((item) => item.name === evt.target.textContent)
    );
    setSelectedPopup("schedule-popup");
  };
  const handleAddScheduleClick = () => {
    setSelectedScheduleCard(schedule.find((item) => item.name === "Monday"));
    setSelectedPopup("schedule-popup");
  };
  const handleRecipeCardClick = (card) => {
    setSelectedRecipeCard(card);
    setSelectedPopup("recipe-card-popup");
  };
  const closePopup = () => {
    setSelectedPopup("");
  };

  // Set 3 more recipes from recipes list to display
  const handleShowMore = () => {
    const newDisplayCard = [];
    for (let i = 0; i < 3; i++) {
      if (recipesList[displayedCards.length + i]) {
        newDisplayCard.push(recipesList[displayedCards.length + i]);
      }
    }
    setDisplayedCards([...displayedCards, ...newDisplayCard]);
  };

  // Set displayed card back to original display
  const handleResetSearch = () => {
    setDisplayedCards([recipesList[0], recipesList[1], recipesList[2]]);
    setIsShowMore(true);
  };

  // Add selected card to favorite array
  const handleAddFavorite = (recipe) => {
    recipesList.find((item) => item._id === recipe._id).isFavorite = true;
    setFavoriteList([recipe, ...favoriteList]);
  };

  // Remove selected card from favorite array
  const handleDeleteFavorite = (recipe) => {
    recipesList.find((item) => item._id === recipe._id).isFavorite = false;
    const tempFavorites = favoriteList.filter(
      (item) => item._id !== recipe._id
    );
    setFavoriteList(tempFavorites);
  };

  // Set displayed card according to search query
  const handleSearch = (search) => {
    const searchResult = recipesList.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.recipeSearch.toLowerCase().split(" ")[0])
    );
    if (searchResult.length > 0) {
      setDisplayedCards(searchResult);
      closePopup();
      setValidationError(false);
      setIsShowMore(false);
    } else {
      setValidationError(true);
    }
  };

  // Set a new recipe to recipes list array
  const handleRecipeSubmit = (item) => {
    setRecipesList([item, ...recipesList]);
    setFavoriteList([item, ...favoriteList]);
    closePopup();
  };

  // Set a recipe ID in the schedule for asked time
  const handleScheduleSubmit = (data) => {
    const tempSchedule = [...schedule];
    tempSchedule[data.dayIndex].scheduledRecipes[data.time] = data.recipeId;
    setSchedule(tempSchedule);
    closePopup();
  };

  // Remove recipe ID from shedule
  const handleScheduleDelete = (data) => {
    const tempSchedule = [...schedule];
    tempSchedule[data.dayIndex].scheduledRecipes[data.time] = "";
    setSchedule(tempSchedule);
  };

  // On page load/refresh
  useEffect(() => {
    setIsLoading(true);
    getRecipes(15)
      .then((recipes) => {
        setRecipesList(recipes);
        setDisplayedCards([recipes[0], recipes[1], recipes[2]]);
      })

      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Rerender displayed cards when recipes list is changed
  useEffect(() => {
    setDisplayedCards([recipesList[0], recipesList[1], recipesList[2]]);
  }, [recipesList]);

  //Add event listener when mounting popup
  useEffect(() => {
    if (!selectedPopup) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    const handleClickClose = (evt) => {
      if (
        evt.target.classList[0] === "modal" ||
        evt.target.classList[0] === "navigation" ||
        evt.target.classList[0] === "modal__recipe-card"
      ) {
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
  }, [selectedPopup]);

  return (
    <CurrentRecipesContext.Provider value={recipesList}>
      <div className="page">
        <Header onNavClick={handleNavClick} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              isLoading ? (
                <Preloader />
              ) : (
                <Main
                  onRecipeCardClick={handleRecipeCardClick}
                  onShowMoreClick={handleShowMore}
                  onScheduleClick={handleScheduleClick}
                  onDeleteClick={handleScheduleDelete}
                  onResetSearch={handleResetSearch}
                  displayedCards={displayedCards}
                  schedule={schedule}
                  isShowMore={isShowMore}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                favoriteList={favoriteList}
                schedule={schedule}
                onRecipeCardClick={handleRecipeCardClick}
                onDeleteFavorite={handleDeleteFavorite}
              />
            }
          />
        </Routes>
        <About />
        <Footer />
        <Navigation
          isOpen={selectedPopup === "navigation-popup"}
          onClickSearch={handleSearchClick}
          onClickAddRecipe={handleAddRecipeClick}
          onClickScheduleRecipe={handleAddScheduleClick}
        />
        <RecipeCardModal
          isOpen={selectedPopup === "recipe-card-popup"}
          onClose={closePopup}
          onAddFavorite={handleAddFavorite}
          selectedCard={selectedRecipeCard}
        />
        <SearchModal
          isOpen={selectedPopup === "search-popup"}
          onClose={closePopup}
          onSearch={handleSearch}
          validationError={validationError}
        />
        <AddRecipeModal
          isOpen={selectedPopup === "add-recipe-popup"}
          onClose={closePopup}
          onSubmit={handleRecipeSubmit}
        />
        <AddScheduleModal
          isOpen={selectedPopup === "schedule-popup"}
          onClose={closePopup}
          onSubmit={handleScheduleSubmit}
          favoriteList={favoriteList}
          schedule={schedule}
          selectedScheduleCard={selectedScheduleCard}
        />
      </div>
    </CurrentRecipesContext.Provider>
  );
}

export default App;
