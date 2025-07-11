# Chattrix - Language Learning Social Platform

A modern, full-stack web application designed to connect language learners worldwide through chat, video calls, and social networking features.

## 🌟 Features

### 🔐 Authentication & User Management
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Registration & Login**: Email-based signup with validation
- **Profile Management**: Complete user profiles with language preferences
- **Onboarding Flow**: Guided setup for new users to specify learning goals

### 👥 Social Features
- **Friend System**: Send and accept friend requests
- **User Discovery**: AI-powered recommendations for language exchange partners
- **Profile Cards**: Rich user profiles showing native/learning languages with flag indicators
- **Location-based Matching**: Connect with users from specific regions

### 💬 Real-time Chat
- **Stream Chat Integration**: Powered by Stream Chat for real-time messaging
- **Thread Support**: Reply to specific messages in conversations
- **Message History**: Persistent chat history across sessions
- **File Sharing**: Support for media and file sharing in chats

### 📹 Video Calling
- **Stream Video Integration**: High-quality video calls powered by Stream Video
- **Call Controls**: Mute, camera toggle, and screen sharing capabilities
- **Call Invitations**: Send video call links through chat
- **Responsive Design**: Optimized for desktop and mobile devices

### 🎨 User Interface
- **Modern Design**: Built with React, Tailwind CSS, and DaisyUI
- **Theme System**: 30+ beautiful themes with dark/light mode support
- **Responsive Layout**: Mobile-first design that works on all devices
- **Loading States**: Smooth loading animations and skeleton screens

### 🔧 Technical Features
- **Real-time Updates**: Live friend request notifications
- **State Management**: Zustand for theme management, React Query for server state
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Performance**: Optimized with React Query caching and lazy loading

## 🏗️ Architecture

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Route-based page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API utilities and helpers
│   ├── store/              # Zustand state management
│   └── constants/          # Application constants
```

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route definitions
│   ├── middleware/        # Custom middleware
│   └── lib/               # Database and external service connections
```

### Key Technologies
- **Frontend**: React 19, Vite, Tailwind CSS, DaisyUI, React Query, Zustand
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Real-time**: Stream Chat, Stream Video
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS with 30+ DaisyUI themes

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Stream Chat account and API keys

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chattrix
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Variables**

   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   STREAM_API_KEY=your_stream_chat_api_key
   STREAM_SECRET_KEY=your_stream_chat_secret_key
   NODE_ENV=development
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_STREAM_API_KEY=your_stream_chat_api_key
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Development Mode**
   ```bash
   # Start backend server
   cd backend && npm run dev
   
   # Start frontend development server (in new terminal)
   cd frontend && npm run dev
   ```

2. **Production Build**
   ```bash
   # Build the entire application
   npm run build
   
   # Start production server
   npm start
   ```

## 📱 Usage Guide

### For New Users
1. **Sign Up**: Create an account with email and password
2. **Complete Onboarding**: Set your native language, learning language, and location
3. **Discover Friends**: Browse recommended language partners
4. **Send Friend Requests**: Connect with users who match your learning goals

### For Existing Users
1. **Login**: Access your account
2. **View Friends**: See your current language exchange partners
3. **Start Chatting**: Click on any friend to begin a conversation
4. **Video Calls**: Initiate video calls directly from chat
5. **Manage Requests**: Accept or decline incoming friend requests

### Features Walkthrough

#### 🔍 Finding Language Partners
- Browse the "Meet New Learners" section on the home page
- View user profiles with language flags and location information
- Send friend requests to users who match your learning goals

#### 💬 Chatting with Friends
- Click on any friend card to open a chat
- Send text messages, emojis, and files
- Use thread replies for organized conversations
- Access chat history across sessions

#### 📹 Video Calling
- Click the video call button in any chat
- Share the call link with your friend
- Use call controls for mute, camera, and screen sharing
- High-quality video and audio streaming

#### 🎨 Customizing Your Experience
- Choose from 30+ beautiful themes
- Toggle between light and dark modes
- Responsive design adapts to your device

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/onboarding` - Complete user onboarding

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `GET /api/users/friend-requests` - Get incoming friend requests
- `GET /api/users/outgoing-friend-requests` - Get sent friend requests
- `POST /api/users/friend-request/:userId` - Send friend request
- `PUT /api/users/friend-request/:requestId/accept` - Accept friend request

### Chat
- `GET /api/chat/token` - Get Stream Chat token

## 🛠️ Development

### Project Structure
```
Chattrix/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── lib/           # Utilities and connections
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # API and utilities
│   │   └── store/         # State management
│   └── package.json
└── package.json           # Root package.json
```

### Key Components

#### Frontend Components
- **Layout**: Main application layout with sidebar
- **Navbar**: Navigation bar with theme selector
- **Sidebar**: Friend list and navigation
- **FriendCard**: User profile cards with action buttons
- **ChatLoader**: Loading states for chat interface
- **CallButton**: Video call initiation component

#### Backend Models
- **User**: User profile with language preferences and friends
- **FriendRequest**: Friend request management system

#### State Management
- **useAuthUser**: Authentication state management
- **useThemeStore**: Theme selection with localStorage persistence
- **React Query**: Server state management and caching

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET_KEY=your_secure_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **Stream Chat** for real-time messaging capabilities
- **Stream Video** for video calling features
- **DaisyUI** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **React Query** for efficient server state management

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Chattrix** - Connecting language learners worldwide through technology! 🌍✨ 