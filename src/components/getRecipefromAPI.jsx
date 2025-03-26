import React from "react";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    // Correct Gemini API endpoint for the latest version
    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
    
    // Get the API key from environment variable
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    try {
        console.log("Ingredients:", ingredientsString);
        console.log("Using Gemini API");
        
        // Format the prompt for Gemini
        const prompt = `You are a helpful cooking assistant. Create a recipe using some or all of these ingredients: ${ingredientsString}. Format your response in markdown with a title, ingredients list, and step-by-step instructions.`;
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                }
            }),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API responded with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        // Check if the response has the expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error("Unexpected API response format:", data);
            throw new Error("Received unexpected response format from API");
        }
        
        // Extract the recipe text from Gemini's response
        const recipeText = data.candidates[0].content.parts[0].text;
        return recipeText;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return `Sorry, I couldn't generate a recipe at this time. Error: ${error.message}`;
    }
}

export default function GetRecipe({ handleRecipe }) {
  return (
    <div className="horizontal_flex">
      <div className="vertical_flex">
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients</p>
      </div>
      <button onClick={handleRecipe} className="button get_recipe">Get a recipe</button>
    </div>
  );
}