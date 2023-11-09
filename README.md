---
## Deployed Link
⭐ [Live Demo](https://654cea3277617b580a0c32cd--joyful-lily-4c6d28.netlify.app/)
---

# WordCounter

## Introduction

The Word Count Tracker is a straightforward web application designed to empower users to effortlessly check the word count of any website while maintaining a record of their search history. The application boasts a clean and user-friendly interface.

## Key Features

- Word Count Checking
- Search History
- Favorite Marking

## Tech Stack

- Frontend: HTML | CSS | JavaScript | Bootstrap
- Backend: Node.js | Express.js
- Database: MongoDB Atlas

## Backend

The backend is built on Node.js.

## Getting Started

### Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/Manideep-0164/word-counter.git

   ```

2. **Install Dependencies:**

   ```shell
   cd word-counter/backend
   npm install
   ```

3. **Set Environmental Variables(.env)**

   ```shell
   MONGO_URL=your_mongodb_url
   PORT=your_port_number

   Change the URL to localhost in script/*.js files
   ```

4. **Start the backend server**

   ```shell
   node index.js
   # or
   nodemon index.js
   # or
   npm run start
   # or
   npm run dev

   run index.html with live server
   ```

### Endpoints

- _POST /insights_: Get the insights of a URL.
- _POST /insights-history_: Retrieve a list of insights.
- _PATCH /insights/:id_: Add to favourite or remove from favourite.
- _DELETE /insights/:id_: Delete a specific insight by its ID.
- _POST /users_: Register a new user.

### Usage

- Registration is a one-time process and is crucial for accessing the Word Count Tracker.
- If the user is already registered, clicking the "Register" button will seamlessly redirect them to the Insights page
- Enter the desired domain/website URL in the input field to check the word count and other Media/Web URLs.
- Explore the search history table to review and compare word counts for different domains.
- Optionally mark favorite domains for quick access.
- Remove unwanted domains from the search history by using the delete feature.

### Contact Information

For any queries and feedback, please contact me at [peddaboinimanideep03@gmail.com](mailto:peddaboinimanideep03@gmail.com).

---

<h1 align="center">✨Thank You✨</h1>
