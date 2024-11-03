// The function accept a count parameter.
// It is because the API only return a single recipe
// The fetch request is create in a functional variable
// The function returns an array of "n" promises depending on count
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
        const recipe = {};
        recipe._id = data.idMeal;
        recipe.name = data.strMeal;
        recipe.image = `${data.strMealThumb}/preview`;
        recipe.ingredients = getIngredients(data);
        recipe.measures = getMeasures(data);
        recipe.instructions = data.strInstructions.split("\r\n");
        recipe.isFavorite = false;
        return recipe;
      });
  };
  return Promise.all(Array.from({ length: count }, fetchOneRecipe));
}

function getIngredients(data) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    if (ingredient && ingredient != " ") {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}

function getMeasures(data) {
  const measures = [];
  for (let i = 1; i <= 20; i++) {
    const measure = data[`strMeasure${i}`];
    if (measure && measure != " ") {
      measures.push(measure);
    }
  }
  return measures;
}
