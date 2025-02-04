Weather Application with Authentication

Overview

This is a full-featured weather application that provides hyperlocal forecasts, severe weather alerts, air quality index, UV index, marine and agricultural weather data. The app includes user authentication with name, email, password, city, and date registration, allowing personalized weather insights.

Features

Hyperlocal Forecasts: Accurate weather updates for specific neighborhoods.

Severe Weather Alerts: Real-time notifications for storms, floods, and other hazards.

Air Quality Index: Pollution level updates for health precautions.

UV Index: Ultraviolet radiation levels to prevent skin damage.

Marine Weather Data: Wind speed, wave height, and tidal currents.

Agricultural Weather Data: Optimized weather-based planning for farmers.

Long-range Forecasts: Future climate trends for preparedness.

Personalized Recommendations: Activity suggestions based on weather conditions.

Integration with Smart Devices: Connects with home automation and travel apps.

Multilingual Support: Supports English, Tamil, Telugu, Bhojpuri, and Maithili.

Responsive UI: Designed for all screen sizes with an eye-catching interface.

Tech Stack

Frontend

HTML, CSS, JavaScript

Tailwind CSS for styling

Responsive and interactive UI components

Backend

Node.js with Express.js

MongoDB for user authentication data

bcrypt.js for password encryption

JSON Web Tokens (JWT) for secure authentication

Installation

Clone the repository:

git clone https://github.com/vikassharma809070/weather-app.git
cd weather-app

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:

npm start

The server will start on http://localhost:5000

API Endpoints

Authentication

POST /register - Registers a new user

POST /login - Logs in an existing user

Weather Data

GET /weather?city={city_name}&pincode={pincode} - Fetches weather details for a given location

Future Enhancements

AI-powered weather insights

Crowdsourced real-time weather updates

Gamification for increased user engagement

License

This project is licensed under the MIT License.

Made with ❤️ by Vikas Sharma