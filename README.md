# Chef Claude Recipe Generator

![Chef Claude Logo](./src/images/Chef_Claude_Icon.png)

Chef Claude is a responsive web application that helps you discover new recipes based on ingredients you have on hand. Simply add your available ingredients, and Chef Claude will suggest a delicious recipe you can make!

## Features

- Add and remove ingredients from your inventory
- Generate recipe suggestions based on your available ingredients
- Responsive design that works on mobile, tablet, and desktop devices
- Loading indicator for better user experience during API calls
- Markdown rendering for beautifully formatted recipes

## Demo

[View Live Demo](#) (Add your deployment URL once available)

## Technologies Used

- React 18
- Vite
- Hugging Face API (Mixtral-8x7B-Instruct model)
- Marked (for Markdown rendering)
- CSS3 with responsive design principles

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API token

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/chef-claude.git
   cd chef-claude
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Hugging Face API token
   ```
   VITE_HF_ACCESS_TOKEN=your_huggingface_token_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## Deployment

This application can be easily deployed to platforms like Vercel, Netlify, or GitHub Pages. Make sure to set up your environment variables in your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Recipe generation powered by Hugging Face's Mixtral model
- Icons and design inspiration from [source if applicable]
