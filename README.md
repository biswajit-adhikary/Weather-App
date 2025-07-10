# Weather App

This is a sleek and modern weather application that provides real-time weather data for any city in the world. It also displays the current time for the searched location and can automatically fetch weather for the user's current location.

**Live Demo:** [https://weather-app-biswajit.vercel.app/](https://weather-app-biswajit.vercel.app/)

## Features

*   **City Search:** Find the current weather for any city.
*   **Geolocation:** Automatically fetch weather data for your current location.
*   **Live Local Time:** Displays the current time for the searched city, updated every second.
*   **Detailed Weather Info:** Shows temperature, a descriptive icon, "feels like" temperature, humidity, and wind speed.
*   **Responsive Design:** Looks great on both desktop and mobile devices.
*   **Secure API Key Handling:** Uses a serverless function to protect the OpenWeatherMap API key.

## Technologies Used

*   **Frontend:** HTML, CSS, JavaScript
*   **API:** [OpenWeatherMap API](https://openweathermap.org/api)
*   **Deployment:** [Vercel](https://vercel.com/)
*   **Backend (Serverless Function):** Node.js

## Getting Started

To run this project locally, you'll need to have Node.js and the Vercel CLI installed.

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd 03-weather-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file:**

    Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

    ```
    API_KEY=your_openweathermap_api_key
    ```

5.  **Start the development server:**

    ```bash
    vercel dev
    ```

    This will start a local server, and you can access the application at `http://localhost:3000`.

## Deployment

This project is optimized for deployment on Vercel. To deploy your own version, follow these steps:

1.  **Push your code to a Git repository** (e.g., GitHub, GitLab).
2.  **Import the project into Vercel.**
3.  **Set the environment variable:**

    In the Vercel project settings, add an environment variable named `API_KEY` with your OpenWeatherMap API key as the value.

4.  **Deploy!** Vercel will automatically build and deploy your application.