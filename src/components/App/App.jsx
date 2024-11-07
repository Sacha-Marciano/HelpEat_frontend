// Import methods from libraries
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import styles
import "./App.css";

// Import third-party API methods
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
import LoginModal from "../Popups/LoginModal/LoginModal";
import RegisterModal from "../Popups/RegisterModal/RegisterModal";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Import contexts
import { CurrentRecipesContext } from "../../contexts/currentRecipesContext";
import { CurrentUserContext } from "../../contexts/currentUserContext";

// Import constants
import { SCHEDULECONST } from "../../utils/config";

// Import API authentication methods
import { signUserIn, signUserUp, getUserByToken } from "../../utils/auth";

// Import API calls
import { getServerRecipes } from "../../utils/mainApi";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
  const handleLoginClick = () => {
    setSelectedPopup("login-popup");
  };
  const handleSignupClick = () => {
    setSelectedPopup("signup-popup");
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

  //Checks if login is succesfull and add token to local storage
  const handleLogin = (data) => {
    signUserIn(data)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        return getUserByToken(localStorage.getItem("jwt"));
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closePopup();
      })
      .catch((err) => {
        setValidationError(true);
        console.log(err);
      });
  };

  //Check if data is valid and add a user to server then log user in
  const handleSignUp = (data) => {
    signUserUp(data)
      .then(() => {
        handleLogin({ email: data.email, password: data.password });
        closePopup();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Removes the token from local storage on log out
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  // On page load/refresh
  useEffect(() => {
    setIsLoading(true);
    getServerRecipes()
      .then((recipes) => {
        setRecipesList(recipes);
        setDisplayedCards([recipes[0], recipes[1], recipes[2]]);
      })

      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getUserByToken(localStorage.getItem("jwt"))
      .then((response) => {
        if (!response) {
          <Navigate to="/" />;
        }
        setCurrentUser(response);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(`${err} - User is not logged in`);
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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentRecipesContext.Provider value={recipesList}>
        <div className="page">
          <Header
            onNavClick={handleNavClick}
            onLogout={handleLogout}
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
            isLoggedIn={isLoggedIn}
          />
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
                    onLoginClick={handleLoginClick}
                    onSignupClick={handleSignupClick}
                    displayedCards={displayedCards}
                    schedule={schedule}
                    isShowMore={isShowMore}
                    isLoggedIn={isLoggedIn}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    favoriteList={favoriteList}
                    schedule={schedule}
                    onRecipeCardClick={handleRecipeCardClick}
                    onDeleteFavorite={handleDeleteFavorite}
                  />
                </ProtectedRoute>
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
          <LoginModal
            isOpen={selectedPopup === "login-popup"}
            onClose={closePopup}
            onSubmit={handleLogin}
            setSelectedPopup={setSelectedPopup}
            validationError={validationError}
            setValidationError={setValidationError}
          />
          <RegisterModal
            isOpen={selectedPopup === "signup-popup"}
            onClose={closePopup}
            onSubmit={handleSignUp}
            setSelectedPopup={setSelectedPopup}
          />
        </div>
      </CurrentRecipesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
