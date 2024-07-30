# Easy Mail

The Easy Mail is a web-based tool designed to handle email functionalities securily. It offers a user-friendly interface and a robust backend for efficient email operations.

## Features

- **Email Viewing:** View a list of emails categorized by status (Inbox, Sent, Starred, Spam, Bin, Drafts).
- **Email Management:** Star, mark as spam, delete, and restore emails.
- **Draft Management:** Save and manage draft emails.
- **Maintain Contacts:** Save your contact email ids for quick and easy accessing.
- **User Interface:** Responsive design using React and Tailwind CSS for an optimal user experience.
  
## Screenshots
![Inbox](https://github.com/GauravSingh-2001/EasyMail/public/assets/Screenshot (224).png)
![mail preview](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/e4784825-eae2-491e-9067-ba9256ebbda3)
![Sent Mail](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/7ef2f5aa-bd26-4227-a92a-11c1d39ac8c2)
![Sent Mail Preview](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/3a012aa3-a1a2-419e-98ca-d49a1a968993)
![Compose Dialogue Box](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/391fb75d-46bb-46d0-97e4-1e410e3ae83d)
![Contacts](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/fb6c6481-76b3-4ba7-b10d-ef1e1e9465af)
![Drafts](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/a79e72be-a94f-4b49-9163-fedc6ee7299d)

![Bin](https://github.com/GauravSingh-2001/EasyMail/assets/105958066/79a07e54-a174-47b7-95c0-9bd51d10ef61)

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **Other Tools:**
  - Git

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GauravSingh-2001/EasyMail.git
   cd EasyMail
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Usage

- Navigate through different email categories using the sidebar.
- Use compose button to compose and send email.
- Click on an email to view its details.
- Use the action buttons (Star, Spam, Bin) to manage your emails.

## Dependencies

Here are the main dependencies used in this project:

- **[axios](https://www.npmjs.com/package/axios)** (^1.7.2): Promise-based HTTP client for the browser and Node.js.
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** (^2.4.3): Library to hash passwords.
- **[body-parser](https://www.npmjs.com/package/body-parser)** (^1.20.2): Node.js body parsing middleware.
- **[cors](https://www.npmjs.com/package/cors)** (^2.8.5): Cross-Origin Resource Sharing middleware for Express.js.
- **[dotenv](https://www.npmjs.com/package/dotenv)** (^16.4.5): Loads environment variables from a .env file into process.env.
- **[express](https://www.npmjs.com/package/express)** (^4.19.2): Fast, unopinionated, minimalist web framework for Node.js.
- **[express-validator](https://www.npmjs.com/package/express-validator)** (^7.1.0): Middleware for validating incoming request bodies in Express.js.
- **[gapi-script](https://www.npmjs.com/package/gapi-script)** (^1.2.0): Google API Client Library for browser JavaScript.
- **[hamburger-react](https://www.npmjs.com/package/hamburger-react)** (^2.5.1): React component for animated hamburgers.
- **[http-server](https://www.npmjs.com/package/http-server)** (^14.1.1): Simple HTTP server for serving static files.
- **[imap-simple](https://www.npmjs.com/package/imap-simple)** (^5.1.0): IMAP client library for Node.js.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** (^9.0.2): JSON Web Token implementation for Node.js.
- **[mailparser](https://www.npmjs.com/package/mailparser)** (^3.7.1): Node.js email parser.
- **[mongodb](https://www.npmjs.com/package/mongodb)** (^6.6.2): MongoDB driver for Node.js.
- **[mongoose](https://www.npmjs.com/package/mongoose)** (^8.4.0): MongoDB object modeling tool for Node.js.
- **[node-cron](https://www.npmjs.com/package/node-cron)** (^3.0.3): Cron-like job scheduler for Node.js.
- **[nodemailer](https://www.npmjs.com/package/nodemailer)** (^6.9.13): Node.js library for sending emails.
- **[react](https://www.npmjs.com/package/react)** (^18.3.1): JavaScript library for building user interfaces.
- **[react-dom](https://www.npmjs.com/package/react-dom)** (^18.3.1): DOM-specific methods for React.
- **[react-icons](https://www.npmjs.com/package/react-icons)** (^5.2.1): Popular icon library for React applications.
- **[react-quill](https://www.npmjs.com/package/react-quill)** (^2.0.0): React wrapper for Quill rich text editor.
- **[react-router-dom](https://www.npmjs.com/package/react-router-dom)** (^6.23.1): DOM bindings for React Router.

## Dev Dependencies

Here are the main dev dependencies used for development:

- **[@types/react](https://www.npmjs.com/package/@types/react)** (^18.2.66): TypeScript type definitions for React.
- **[@types/react-dom](https://www.npmjs.com/package/@types/react-dom)** (^18.2.22): TypeScript type definitions for ReactDOM.
- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)** (^4.2.1): Vite plugin for React support.
- **[autoprefixer](https://www.npmjs.com/package/autoprefixer)** (^10.4.19): PostCSS plugin to parse CSS and add vendor prefixes.
- **[eslint](https://www.npmjs.com/package/eslint)** (^8.57.0): JavaScript and JSX linter.
- **[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)** (^7.34.1): React specific linting rules for ESLint.
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** (^4.6.0): ESLint rules for React Hooks.
- **[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)** (^0.4.6): ESLint plugin for React Fast Refresh.
- **[postcss](https://www.npmjs.com/package/postcss)** (^8.4.38): Tool for transforming CSS with JavaScript plugins.
- **[tailwindcss](https://www.npmjs.com/package/tailwindcss)** (^3.4.3): Utility-first CSS framework for rapidly building custom designs.
- **[vite](https://www.npmjs.com/package/vite)** (^5.2.0): Next generation frontend tooling system.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

