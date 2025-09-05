# Quiz Master - AI-Powered Quiz Application

A modern, full-stack quiz application built with React, Node.js, and AI integration. Users can create custom quizzes on any topic and receive instant feedback with detailed explanations.

## 🚀 Features

- **AI-Generated Questions**: Create quizzes on any topic using AI
- **Modern UI/UX**: Beautiful, responsive design with glass morphism effects
- **Real-time Feedback**: Instant results with detailed explanations
- **Custom Topics**: Choose any subject for your quiz
- **Progress Tracking**: Visual progress indicators and score tracking
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **AI Integration** for question generation
- **RESTful API** design

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fullstack-project
```

### 2. Install Dependencies

Install dependencies for both client and server:

```bash
# Install root dependencies
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### 3. Environment Setup

Create a `.env` file in the `server` directory with your OpenAI API key:

```bash
# server/.env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

**Note**: You'll need an OpenAI API key to generate quiz questions.

### 4. Run the Application

Start both the client and server simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
fullstack-project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Home.tsx    # Landing page
│   │   │   ├── Quiz.tsx    # Quiz interface
│   │   │   └── Results.tsx # Results page
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🎯 Usage

1. **Start a Quiz**: Enter a topic of your choice or leave blank for general knowledge
2. **Answer Questions**: Select your answers from multiple choice options
3. **Get Feedback**: See immediate results with explanations
4. **Review Results**: View detailed breakdown of all questions and answers

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build the application for production

### Client Only
- `npm run dev --prefix client` - Start only the React development server
- `npm run build --prefix client` - Build the React app for production

### Server Only
- `npm run dev --prefix server` - Start only the Node.js server
- `npm start --prefix server` - Start the server in production mode

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effects
- **Gradient Backgrounds**: Subtle, elegant color schemes
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: High contrast text and keyboard navigation

## 🔌 API Endpoints

### POST /api/quiz
Generate quiz questions for a given topic.

**Request Body:**
```json
{
  "topic": "JavaScript",
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "What is the correct syntax for creating a function in JavaScript?",
      "options": ["function myFunc() {}", "def myFunc():", "func myFunc() {}", "create myFunc() {}"],
      "answer": "function myFunc() {}",
      "explanation": "JavaScript uses the 'function' keyword to declare functions."
    }
  ]
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `npm run build --prefix client`
2. Deploy the `client/dist` folder

### Backend (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy the `server` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created for a full-stack developer position interview.

---

**Note**: This application requires an OpenAI API key to generate quiz questions. Make sure to add your API key to the server environment variables before running the application.
