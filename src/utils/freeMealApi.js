export function getRecipes(count) {
  const fetchOneRecipe = () => {
    return fetch(`https://themealdb.com/api/json/v1/1/random.php`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then((obj) => {
        return obj.meals[0];
      })
      .then((data) => {
        const recipe = {
          _id: data.idMeal,
          name: data.strMeal,
          image: `${data.strMealThumb}/preview`,
          ingredients: getIngredients(data),
          measures: getMeasures(data),
          instructions: data.strInstructions.split("\r\n"),
          isFavorite: false,
        };
        return recipe;
      });
  };

  const fetchRecipesUntilUnique = async () => {
    const recipes = new Map();
    while (recipes.size < count) {
      const newRecipe = await fetchOneRecipe();
      if (!recipes.has(newRecipe._id)) {
        recipes.set(newRecipe._id, newRecipe);
      }
    }
    return Array.from(recipes.values());
  };

  return fetchRecipesUntilUnique();
}

function getIngredients(data) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    if (ingredient && ingredient !== " ") {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}

function getMeasures(data) {
  const measures = [];
  for (let i = 1; i <= 20; i++) {
    const measure = data[`strMeasure${i}`];
    if (measure && measure !== " ") {
      measures.push(measure);
    }
  }
  return measures;
}
