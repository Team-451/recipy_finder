import Recipes from "../models/Recipes";

export const getRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const Recipes = await Recipes.find({ userId });
    res.status(200).json(Recipes[0].recipeId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateSavedRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;
    const userSavedRecipe = await Recipes.find({ userId });
    if (userSavedRecipe.length === 0) {
      const newSavedRecipes = new Recipes({
        userId,
        recipeId: recipeId,
      });
      await newSavedRecipes.save();
    } else if (
      userSavedRecipe.length !== 0 &&
      userSavedRecipe[0].recipeId.includes(recipeId)
    ) {
      userSavedRecipe[0].recipeId = userSavedRecipe[0].recipeId.filter(
        (id) => id !== recipeId
      );
    } else {
      userSavedRecipe[0].recipeId.push(recipeId);
    }
    const updatedSavedRecipes = await Recipes.findByIdAndUpdate(
      userSavedRecipe[0]._id,
      {
        userId,
        recipeId: [...userSavedRecipe[0].recipeId],
      },
      { new: true }
    );
    res.status(200).json(updatedSavedRecipes.recipeId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
