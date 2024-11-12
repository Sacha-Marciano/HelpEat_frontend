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
import MobileNav from "../Navigation/MobileNav";

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
import {
  getServerRecipes,
  addServerRecipe,
  deleteServerRecipe,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
  addScheduleRecipe,
  deleteScheduleRecipe,
  getOwner,
} from "../../utils/mainApi";

function App() {
  // Hooks
  const [recipesList, setRecipesList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState("");
  const [selectedRecipeCard, setSelectedRecipeCard] = useState({});
  const [selectedScheduleCard, setSelectedScheduleCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [ownerName, setOwnerName] = useState("");
  const [width, SetWidth] = useState(window.innerWidth);

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
    getOwnerName(card.owner);
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

  // Shoul upgrade to randomize (mathfloor,mathrandom(0 - arr.length), until the number is less than the arr length
  // then display the recipe, then pop the recipe from the arr and do again until empty)
  const handleShowMore = () => {
    setDisplayedCards(recipesList);
  };

  // Set displayed card back to original display
  const handleResetSearch = () => {
    setDisplayedCards([recipesList[0], recipesList[1], recipesList[2]]);
    setIsShowMore(true);
  };

  // Add selected card to favorite array
  const handleAddFavorite = (recipeId) => {
    addFavoriteRecipe(recipeId)
      .then((response) => {
        setFavoriteList(getFavoriteList(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Remove selected card from favorite array
  const handleDeleteFavorite = (recipeId) => {
    deleteFavoriteRecipe(recipeId)
      .then((response) => {
        setFavoriteList(getFavoriteList(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Gets favorite list by ID
  const getFavoriteList = (data) => {
    const newFavoriteList = [];
    if (data) {
      data.forEach((recipeId) => {
        newFavoriteList.push(
          ...recipesList.filter((recipe) => recipe._id === recipeId)
        );
      });
    }
    return newFavoriteList;
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

  // Set a new recipeto server then to recipes list array
  const handleRecipeSubmit = (item) => {
    addServerRecipe(item)
      .then((data) => {
        setRecipesList([data, ...recipesList]);
        closePopup();
      })
      .catch((err) => {
        setValidationError(true);
        console.error(err);
      });
  };

  // Delete recipe from server then from recipes list array
  const handleRecipeDelete = (data) => {
    deleteServerRecipe(data)
      .then((deletedRecipe) => {
        setRecipesList(
          recipesList.filter((recipe) => recipe._id !== deletedRecipe._id)
        );
        closePopup();
      })
      .catch((err) => console.error(err));
  };

  // Set a recipe ID in the schedule for asked time
  const handleScheduleSubmit = (data) => {
    addScheduleRecipe(data)
      .then((newSchedule) => {
        setSchedule(newSchedule);
        closePopup();
      })
      .catch((err) => {
        setValidationError(true);
        console.error(err);
      });
  };

  // Remove recipe ID from shedule
  const handleScheduleDelete = (data) => {
    deleteScheduleRecipe(data)
      .then((newSchedule) => {
        setSchedule(newSchedule);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Finds card owner's name
  const getOwnerName = (data) => {
    getOwner(data)
      .then((newOwnerName) => {
        setOwnerName(newOwnerName.ownerName);
        setSelectedPopup("recipe-card-popup");
      })
      .catch((err) => {
        console.error(err);
      });
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
        setSchedule(user.schedule);
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
      .then((user) => {
        handleLogin({ email: data.email, password: data.password });
        setSchedule(user.schedule);
        closePopup();
      })
      .catch((err) => {
        setValidationError(true);
        console.error(err);
      });
  };

  //Removes the token from local storage on log out
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closePopup();
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
        setSchedule(response.schedule);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(`${err} - User is not logged in`);
      });
  }, []);

  // Set favorite list when user or recipes list are changed
  useEffect(() => {
    setFavoriteList(getFavoriteList(currentUser.favoriteRecipesId));
  }, [recipesList, currentUser]);

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
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
            isLoggedIn={isLoggedIn}
            selectedPopup={selectedPopup}
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
          {width > 500 ? (
            <Navigation
              isOpen={selectedPopup === "navigation-popup"}
              onClickSearch={handleSearchClick}
              onClickAddRecipe={handleAddRecipeClick}
              onClickScheduleRecipe={handleAddScheduleClick}
              onLogout={handleLogout}
            />
          ) : isLoggedIn ? (
            <MobileNav
              onClickSearch={handleSearchClick}
              onClickAddRecipe={handleAddRecipeClick}
              onClickScheduleRecipe={handleAddScheduleClick}
              onLogout={handleLogout}
            />
          ) : (
            ""
          )}
          <RecipeCardModal
            isOpen={selectedPopup === "recipe-card-popup"}
            onClose={closePopup}
            onAddFavorite={handleAddFavorite}
            onRecipeDelete={handleRecipeDelete}
            selectedCard={selectedRecipeCard}
            ownerName={ownerName}
            isLoggedIn={isLoggedIn}
          />
          <SearchModal
            isOpen={selectedPopup === "search-popup"}
            onClose={closePopup}
            onSearch={handleSearch}
            validationError={validationError}
            setValidationError={setValidationError}
          />
          <AddRecipeModal
            isOpen={selectedPopup === "add-recipe-popup"}
            onClose={closePopup}
            onSubmit={handleRecipeSubmit}
            validationError={validationError}
            setValidationError={setValidationError}
          />
          <AddScheduleModal
            isOpen={selectedPopup === "schedule-popup"}
            onClose={closePopup}
            onSubmit={handleScheduleSubmit}
            favoriteList={favoriteList}
            schedule={schedule}
            selectedScheduleCard={selectedScheduleCard}
            validationError={validationError}
            setValidationError={setValidationError}
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
            validationError={validationError}
            setValidationError={setValidationError}
          />
        </div>
      </CurrentRecipesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
