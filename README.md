<h1 align="center">✨ chatR- The Fullstack Chat & Video Calling App ✨</h1>

![Demo App](/public/screenshot-for-readme.png)

Highlights:

- 🌐 Real-time Messaging with Typing Indicators & Reactions
- 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
- 🔐 JWT Authentication & Protected Routes
- 🌍 Language Exchange Platform with 32 Unique UI Themes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 Global State Management with Zustand
- 🚨 Error Handling (Frontend & Backend)
- 🚀 Free Deployment
- 🎯 Built with Scalable Technologies like Stream
- ⏳ And much more!

---

## 🧪 .env Setup

### Backend (`/backend`)

```
cd backend
mv .env.example .env
```

```
PORT=5001
MONGODB_URI=your_mongo_uri
STREAM_API_KEY=your_steam_api_key
STREAM_API_SECRET=your_steam_api_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend`)

```
cd frontend
mv .env.example .env
```

```
VITE_STREAM_API_KEY=your_stream_api_key
```

### Setting up API Keys

- [Stream IO](https://getstream.io/) - Get your stream API keys & secrets here.
- [Mongo Atlas](https://www.mongodb.com/products/platform/atlas-database)- Cloud Mongo DB

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
