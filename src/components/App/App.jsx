// Import methods from libraries
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

// Import contexts
import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";

// Import constants
import { scheduleConst } from "../../utils/constants";

function App() {
  // Hooks
  const [recipesList, setRecipesList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState("");
  const [selectedRecipeCard, setSelectedRecipeCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [schedule, setSchedule] = useState(scheduleConst);
  const [validationError, setValidationError] = useState(false);

  // Open and close popups
  const handleNavClick = () => {
    setSelectedPopup("navigation-popup");
  };
  const handleSearchClick = () => {
    setSelectedPopup("search-popup");
  };
  const handleAddRecipeClick = () => {
    setSelectedPopup("add-recipe-popup");
  };
  const handleScheduleClick = () => {
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

  // Add selected card to favorite array
  const handleAddFavorite = (recipe) => {
    recipesList.find((item) => item._id === recipe._id).isFavorite = true;
    setFavoriteList([recipe, ...favoriteList]);
    closePopup();
  };

  // Remove selected card from favorite array
  const handleDeleteFavorite = (recipe) => {
    const tempFavorites = favoriteList.filter(
      (item) => item._id !== recipe._id
    );
    setFavoriteList(tempFavorites);
    recipesList.find((item) => item._id === recipe._id).isFavorite = false;
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
    } else {
      setValidationError(true);
    }
  };

  // Set a new recipe to recipes list array
  const handleSubmitRecipe = (item) => {
    setRecipesList([item, ...recipesList]);
  };

  // On page load/refresh
  useEffect(() => {
    setIsLoading(true);
    getRecipes(3)
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
                  displayedCards={displayedCards}
                  schedule={schedule}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                favoriteList={favoriteList}
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
          onClickScheduleRecipe={handleScheduleClick}
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
          onSubmitRecipe={handleSubmitRecipe}
        />
      </div>
    </CurrentRecipesContext.Provider>
  );
}

export default App;
