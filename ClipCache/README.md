ChatterStream
A sleek, AI-powered Twitter client built with the Twitter API and integrated with Mistral AI for contextual chatbot responses. Users can search and save media, track their favorite users, and enjoy a personalized home feed populated with random content from their curated network.

Features
User Authentication – Secure login with Twitter credentials (OAuth 2.0 flow)

Search Feeds for Media – Filter and view media posts from any user's timeline

Save Media – Bookmark tweets with media for later reference

Save Users – Build a curated array of favorite users

Curated Home Feed – Scroll through a home feed made from randomly selected saved users

Integrated AI Chatbot – Ask Mistral AI questions about the tweet content, trends, or get responses contextualized to the current feed

Getting Started
Prerequisites
Node.js 18+

A Twitter Developer Account with API v2 access

Mistral API key or local model (depending on your setup)

Installation
bash
git clone https://github.com/yourusername/chatterstream.git
cd chatterstream
npm install
Environment Variables
Create a .env file in the root directory:

TWITTER_BEARER_TOKEN=your_token_here
MISTRAL_API_KEY=your_mistral_key_here
SESSION_SECRET=your_secret
Run the App
bash
npm run dev

AI Chatbot Integration
Mistral AI is used to generate natural-language responses based on the content of tweets or user queries. The chatbot is stateless and provides context-aware commentary, insights, and replies without persisting data.

Tech Stack
Frontend: React + TailwindCSS

Backend: Node.js + Express

Auth: OAuth 2.0 with Twitter

Database: MongoDB (for saved users and media)

AI: Mistral (cloud or local model)

To-Do
[ ] Add pagination to curated feed

[ ] Expand chatbot to summarize media content

[ ] Dark mode UI toggle

[ ] Allow tagging and categorizing saved media

License
MIT