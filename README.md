# 🎬 myMovieAppV1

A simple backend application for managing movies, built as part of the Backend development.

## 🚀 Features

- 🛠️ RESTful API for movies CRUD operations
- 🌐 TMDB API integration for fetching movie data
- 💾 MongoDB integration for data storage

## 🧰 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose

## 🖼️ Screenshots

Below are some screenshots of the application:

### 🏠 Home Page
![Home](screenshots/1.png)

### 🔎 Search Page
![Search](screenshots/search.png)

### 🎥 Movie Details
![Movie Details](screenshots/review.png)

### 📝 Write Review
![Write Review](screenshots/writeReview.png)

### ✅ Posted Review
![Posted Review](screenshots/postedReview.png)

### ✏️ Update Review
![Update Review](screenshots/update.png)

### ⚖️ Legal / Footer
![Footer](screenshots/legal.png)

## 🏁 Getting Started

### 📋 Prerequisites

- Node.js & npm
- MongoDB

### ⚙️ Installation

```bash
git clone https://github.com/yourusername/myMovieAppV1.git
cd myMovieAppV1
npm install
```

## 🔑 Configuration
Create a .env file in the root directory and add your environment variables:

```
MONGODB_URI=your_mongodb_connection_string
TMDB_KEY=your_tmdb_api_key
PORT=3000
```

## ▶️ Running the App
```
npm start
```

## 📡 API Endpoints
| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | /            | List all movies    |
| POST   | /new         | Add a new movie    |
| GET    | /movies/\:id | Get movie by ID    |
| PUT    | /movies/\:id | Update movie by ID |
| DELETE | /movies/\:id | Delete movie by ID |


## 📄 License
This project is licensed under the [MIT](LISENCE.txt) License.