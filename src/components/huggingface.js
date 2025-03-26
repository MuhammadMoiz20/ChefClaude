// src/api/huggingface.js
export async function getRecipeFromMistral(ingredientsArr) {
    // Replace this with your actual API call code
    // For example, using fetch to call your backend or Hugging Face API
    const response = await fetch('https://api.example.com/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr })
    });
    const data = await response.json();
    return data.recipe; // adjust according to your API response
  }