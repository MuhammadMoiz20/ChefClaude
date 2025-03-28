import { useEffect, useRef, useState } from "react";
import Recipe from "./Recipe";
import IngList from "./IngredientList";
import GetRecipe from "./getRecipefromAPI";
import { getRecipeFromMistral } from "./getRecipefromAPI";
import { marked } from "marked";

export default function SearchBox() {
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeMarkdown, setRecipeMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scroll = useRef(null)

  useEffect(() => {
    if (recipeMarkdown && scroll.current) {
      setTimeout(() => {
        scroll.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100); // small delay to wait for render
    }
  }, [recipeMarkdown]);
  

  // Handles form submission to add an ingredient
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = formData.get("Ingredient").trim();
    if (newIngredient) {
      setIngredientList((prev) =>
        prev.includes(newIngredient) ? prev : [...prev, newIngredient]
      );
      e.target.reset(); // clear the input after submission
    }
  };

  // Remove the last ingredient in the list
  const deleteItem = () => {
    setIngredientList((prev) => {
      const newList = [...prev];
      newList.pop();
      return newList;
    });
  };

  // Calls the API to get a recipe based on the current ingredients
  const handleGetRecipe = async () => {
    setIsLoading(true);
    setRecipeMarkdown(""); // Clear any previous recipe
    try {
      const recipe = await getRecipeFromMistral(ingredientList);
      const html = marked(recipe); // Convert markdown to HTML
      setRecipeMarkdown(html);
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Map over the ingredients to create a list
  const mappedIngredients = ingredientList.map((ingredient, index) => (
    <li key={index} className="ingredientListItem">
      {ingredient}
    </li>
  ));

  return (
    <main>
      <form onSubmit={handleSubmit} className="input">
        <input
          type="text"
          placeholder="e.g. Oregano"
          className="InputField"
          name="Ingredient"
          aria-label="Enter ingredient"
        />
        <div className="button-container">
          <button className="button" type="submit">
            + Add
          </button>
          <button type="button" onClick={deleteItem} className="button delete">
            - Delete
          </button>
        </div>
      </form>

      {ingredientList.length > 0 && <IngList NewIngredientList={mappedIngredients} />}
      {ingredientList.length >= 4 && <GetRecipe ref={scroll} handleRecipe={handleGetRecipe} />}
      
      {isLoading && (
        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <p>Chef Claude is thinking up a recipe...</p>
        </div>
      )}
      
      {recipeMarkdown && !isLoading && <Recipe markdownRecipe={recipeMarkdown} />}
    </main>
  );
}