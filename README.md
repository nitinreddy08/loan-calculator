Live Project Demo Link : https://loan-calculator-nitin.vercel.app


Loan EMI Calculator Application
This is a Loan EMI Calculator built using React, Material-UI, Context API, and Axios for fetching real-time data from an external API. The main functionality of the app is to calculate the EMI (Equated Monthly Installment) based on the loan amount, interest rate, and loan tenure provided by the user.

Key Features:
Loan EMI Calculation: The core functionality of this app is to calculate the EMI based on the user input, such as loan amount, interest rate, and loan tenure.

Currency Conversion: Using the ExchangeRate API, the EMI is converted into different currencies (USD, EUR, INR, JPY, etc.) for a global user base.

Responsive Design: The app is fully responsive, ensuring a smooth user experience across all devices, whether mobile or desktop.

Light and Dark Mode: The app allows users to toggle between light and dark modes for a comfortable viewing experience.

Error Handling: Graceful error handling is implemented to manage any errors that might arise while fetching data or during user interaction.

Technologies Used:
React: The application is built with React, utilizing functional components and hooks to manage state and side-effects.

Material-UI: Material-UI is used to style the app with a modern, clean, and user-friendly interface.

Context API: The Context API is used to manage global state, such as the theme (light/dark mode) and currency selection, without having to pass props through multiple layers.

Axios: Axios is used to make HTTP requests to the ExchangeRate API to fetch real-time currency conversion data.

GitHub: Version control for the project is done using GitHub, ensuring code is well-managed and tracked over time.

Vercel: The app is deployed on Vercel, which provides a seamless and fast deployment process for React applications.

How It Works:
User Input: The user provides the loan amount, interest rate, and tenure (in years) in the form fields.

EMI Calculation: Upon submitting the form, the app calculates the monthly EMI using the standard EMI formula.

Currency Conversion: The EMI amount is then converted into different currencies using real-time exchange rates from the ExchangeRate API.

Display Results: The EMI amount is displayed along with the converted amounts in different currencies. The user can also view the amortization schedule of their loan.

Setup Instructions:
Clone the Repository:

Clone the repository to your local machine using Git.

bash
Copy
git clone <repo-link>
Install Dependencies:

Navigate into the project directory and install all necessary dependencies.

bash
Copy
cd loan-emi-calculator
npm install
Run the App Locally:

After installing the dependencies, start the development server.

bash
Copy
npm start
This will run the app on http://localhost:3000.

Deploy the App:

Once the app is ready, deploy it using Vercel.

Simply connect your GitHub repository to Vercel, and it will handle the deployment automatically.

API Integration:
The ExchangeRate API is used to fetch real-time currency conversion rates. The application sends a GET request to the API and retrieves the conversion rates for various currencies, including USD, EUR, INR, JPY, etc.

Challenges Faced:
API Integration: Integrating an external API to fetch live exchange rates and handling real-time data was a challenge, but Axios made it simple and straightforward.

State Management: Managing global state such as theme (light/dark mode) and currency selection across different components was achieved using React’s Context API.

Deployment:
The app is deployed on Vercel, making it available for public use.

The live app can be accessed from the link provided in the About section of the GitHub repository.

Future Improvements:
Backend Integration: In the future, we can add a backend to save user data, such as the loan amount, tenure, and EMI calculations, to allow users to track their loan history.

Multiple Loan Types: Add options to calculate different types of loans, such as car loans, home loans, etc.

Enhanced Error Handling: Implement more robust error handling for API failures and other potential issues.

Conclusion:
This project provides a practical tool for users to calculate their loan EMI and view the EMI in multiple currencies. By leveraging modern web technologies like React, Material-UI, and Axios, this app is designed to be responsive and user-friendly. The use of Vercel for deployment ensures that the app is fast and reliable, making it accessible to users around the world.

