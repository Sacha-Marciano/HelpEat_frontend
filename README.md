# HelpEat Frontend

[![HelpEat Logo](src/images/HelpEatLogo.svg)](https://helpeat.jumpingcrab.com)

**HelpEat** is a modern web application designed to simplify meal planning, recipe discovery, and grocery management. Users can browse and share recipes, schedule their weekly meals, and automatically generate a grocery list based on their planned menu. The app is built with React and connects to a Node.js/Express backend.

---

## 🌟 Features

- **Recipe Discovery:** Browse a curated feed of worldwide recipes, including user-submitted and random recipes from [TheMealDB](https://themealdb.com/).
- **User Accounts:** Register and log in to save your favorite recipes, manage your weekly meal schedule, and access your personalized grocery list.
- **Add & Share Recipes:** Create and upload your own recipes, including images, ingredients, and step-by-step instructions.
- **Meal Scheduling:** Plan your week by assigning recipes to breakfast, lunch, and dinner for each day.
- **Grocery List Generation:** Instantly generate a grocery list based on your scheduled recipes, with smart unit conversion.
- **Favorites:** Mark recipes as favorites for quick access and easy scheduling.
- **Responsive Design:** Fully responsive UI with dedicated mobile navigation.
- **Intuitive Navigation:** Access all features from a single, user-friendly menu.
- **Secure Authentication:** JWT-based authentication with secure password handling.

---

## 🖼️ Screenshots

> Replace the image URLs below with your actual screenshots if needed.

- **Home & Recipe Feed:**
  ![Screenshot Home](https://github.com/user-attachments/assets/3876c8dc-cd8b-4a58-b58b-ee185bbcef32)
  ![Screenshot Feed](https://github.com/user-attachments/assets/6441d0bf-3f0f-446e-bf32-cfd7935009f5)
- **Recipe Details:**
  ![Screenshot Recipe Details](https://github.com/user-attachments/assets/f3c858f6-a86a-4a04-96eb-3f7e48ee28ff)
- **Navigation & Profile:**
  ![Screenshot Navigation](https://github.com/user-attachments/assets/f3e8ce49-be9c-46c3-98b1-3e50d4f0bcda)
  ![Screenshot Profile](https://github.com/user-attachments/assets/a6228e0e-4fec-4758-bd81-b63757d3106c)

---

## 🚀 Live Demo

- **Frontend:** [https://helpeat.jumpingcrab.com/](https://helpeat.jumpingcrab.com/)
- **Backend:** [HelpEat Backend Repo](https://github.com/Sacha-Marciano/HelpEat_backend)

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, React Router DOM, Axios
- **State Management:** React Context API
- **Styling:** CSS Modules, Responsive Design
- **Backend:** Node.js, Express (see backend repo)
- **APIs:**
  - Custom HelpEat API (see backend)
  - [TheMealDB](https://themealdb.com/) for random recipes
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Google Cloud VM (production), Vite dev server (local)

---

## 🏗️ Project Structure

```
HelpEat_frontend/
├── src/
│   ├── components/         # React components (UI, modals, navigation, etc.)
│   ├── contexts/           # React Contexts for user and recipes
│   ├── images/             # App icons and images
│   ├── utils/              # API, config, and helper functions
│   ├── index.css           # Global styles
│   └── main.jsx            # App entry point
├── index.html              # HTML entry point
├── package.json            # Project metadata and scripts
├── vite.config.js          # Vite configuration
└── ...
```

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/Sacha-Marciano/HelpEat_frontend.git
cd HelpEat_frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment (optional)
- By default, the frontend connects to:
  - `http://localhost:3001` in development
  - `https://api.helpeat.jumpingcrab.com` in production
- If you need to change the backend URL, edit `src/utils/mainApi.js`.

### 4. Start the development server
```bash
npm run dev
```
- The app will open at [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
```
- Output will be in the `dist/` directory.

### 6. Preview production build
```bash
npm run preview
```

---

## 🔑 Environment & Configuration

- **API URLs:**
  - Automatically switches between local and production based on `NODE_ENV`.
- **No additional environment variables are required for the frontend by default.**
- **Authentication:**
  - JWT tokens are stored in `localStorage` after login.

---

## 👩‍💻 Usage Guide

1. **Register** for a new account or **log in**.
2. **Browse recipes** on the main page or use the search feature.
3. **Add recipes** to your favorites or create your own.
4. **Schedule meals** for each day and meal time.
5. **View your grocery list** in your profile, auto-generated from your schedule.
6. **Enjoy cooking!**

---

## 📝 Credits & Attributions

- **Idea & Design:** Dana Marciano
- **Development:** Sacha M. Marciano
- **Favicon:** nawicon on Flaticon
- **Close Icon:** inkubators on Flaticon
- **Toque Icon:** Nikita Golubev
- **API:** [TheMealDB](https://themealdb.com/)
- **Other Icons:** Various from SVG Repo and Flaticon

---

## 📈 Changelog

See commit history and release notes for details.

---

## 🚧 Future Improvements

- Enhanced mobile UI/UX
- More robust error handling and validation
- Social features (comments, ratings)
- Recipe categories and filters
- Improved accessibility

---

## 📄 License

This project is for educational and demonstration purposes. For other uses, please contact the author.
