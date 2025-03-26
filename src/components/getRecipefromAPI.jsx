import React from "react";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const API_URL = "https://api-inference.huggingface.co/v1/chat/completions";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_HF_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                ],
                max_tokens: 1024,
            }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return "Sorry, I couldn't generate a recipe at this time. Please try again later.";
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