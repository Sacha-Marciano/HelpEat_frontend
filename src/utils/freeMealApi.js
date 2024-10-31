export function getRecipe() {
  return fetch("http://themealdb.com/api/json/v1/1/random.php")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      const info = {};
      info.name = response.strMeal;
      info.image = response.strMealThumb;
      info.recipe = response.strInstructions;
      return info;
    })
    .catch((err) => {
      console.error(err);
    });
}
