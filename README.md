
 **Jumia Scraper**

A simple web scraper built with Puppeteer and Express to scrape product data from the Jumia Nigeria website based on user input.

### Usage Instructions:

1. **Installation:**
   - Clone this repository to your local machine.
   - Navigate to the project directory in your terminal.

2. **Install Dependencies:**
   - Ensure you have Node.js installed on your machine.
   - Run `npm install` to install the required dependencies.

3. **Running the Scraper:**
   - Start the server by running `npm start`.
   - Open your web browser and navigate to `http://localhost:3000`.
   - Enter a keyword in the input field and click the "Scrape Data" button to initiate the scraping process.

### Project Structure:

- **`public` Directory:**
  - Contains the HTML file (`index.html`) with the frontend code for user interaction.

- **`server.js` File:**
  - Entry point for the Express server.
  - Defines the `/scrape` route to handle POST requests for scraping data.

- **`scraper.js` File:**
  - Contains the Puppeteer script for scraping product data from the Jumia website.
  - Utilizes async functions to interact with the website, search for products, and extract relevant information.

### Dependencies:

- **Express:** A fast, unopinionated web framework for Node.js, used for building the server and handling HTTP requests.

- **Puppeteer:** A Node library which provides a high-level API over the Chrome DevTools Protocol, used for automating web browsing tasks, such as scraping data.

### Notes:

- The scraper is designed to work specifically with the Jumia Nigeria website. Adjustments may be required for compatibility with other websites or regions.
- Ensure proper error handling and validation are implemented for production use.
- This README serves as a basic guide. Further documentation and improvements can be made based on project requirements and feedback.

Feel free to explore, modify, and enhance this project according to your needs!
