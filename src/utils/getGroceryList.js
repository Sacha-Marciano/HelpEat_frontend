// Makes all unit's short name to same unit
const convertUnit = (unit) => {
  const conversions = {
    tbs: "tablespoon",
    tblsp: "tablespoon",
    tbsp: "tablespoon",
    tsp: "teaspoon",
    ts: "teaspoon",
    cup: "cup",
    g: "g",
    gram: "g",
    kg: "kg",
    Kg: "kg",
    kilogram: "kg",
    lb: "lb",
    oz: "oz",
  };
  return conversions[unit.toLowerCase()] || unit;
};

// Function to generate the grocery list based on recipesOfWeek and recipesList
export const getGroceryList = (recipesOfWeek, recipesList) => {
  const tempGroceryMap = {};

  recipesOfWeek.forEach((recipeId) => {
    const recipe = recipesList.find((item) => item._id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ingredient, index) => {
        const measure = recipe.measures[index];

        // Extract quantity and unit
        const match = measure.match(/^(\d*\.?\d+)?\s*(.*)$/);
        const quantity = parseFloat(match[1]) || 1;
        let unit = match[2].trim();

        unit = convertUnit(unit);

        if (!tempGroceryMap[ingredient]) {
          tempGroceryMap[ingredient] = {};
        }

        if (tempGroceryMap[ingredient][unit]) {
          // If unit already exists, add the quantity
          tempGroceryMap[ingredient][unit] += quantity;
        } else {
          // New unit for this ingredient
          tempGroceryMap[ingredient][unit] = quantity;
        }
      });
    }
  });

  // Create groceryList and add different-unit measures
  const tempGroceryList = Object.keys(tempGroceryMap).map((ingredient) => {
    const units = Object.keys(tempGroceryMap[ingredient])
      .map((unit) => `${tempGroceryMap[ingredient][unit]} ${unit}`)
      .join(" and ");
    return { ingredient, measure: units };
  });

  return tempGroceryList;
};
