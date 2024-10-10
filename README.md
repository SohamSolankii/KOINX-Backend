# KoinX Backend Internship Assignment

<p>Check the Live API endpoint here: <a href = "https://koinx-backend-3xgn.onrender.com">KOINX</a></p>


## Installation

1. Clone this repository to your local machine using the following command:

   ```
   https://github.com/SohamSolankii/KOINX-Backend.git
   ```

2. Change your current directory to the project folder:

   ```
   cd KOINX-Backend
   ```

3. Run the following command to install the dependencies:

   ```
   npm install
   ```

4. Create the .env file and copy the contents of .env.example into it by typing the following command:
    ```
    cp .env.example .env
    ```

5. Finally start the server by typing the following command:
    ```
    npm run dev
    ```
## Usage

The API is now running at `http://localhost:3000`.

## API Reference

#### Get all cryptocurrencies
Fetches all available API and updates the database.

```http
  GET /api/v1/stats
  GET /api/v1/deviation
```



## API ENDPOINT

1. /stats, that will return the latest data about the requested cryptocurrency. [METHOD:-GET] :-
    ```
    /stats
    ```

    JSON BODY:-
    ```
    {
    	"coin":"bitcoin"
    }
    ```
    
2. /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database. [METHOD:-GET] :-
    ```
    /deviation
    ```

     JSON BODY:-
    ```
    {
    	"coin":"bitcoin"
    }
