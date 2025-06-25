# Service Review System (Frontend)

## Live Website

🌐 [Live Site URL Here](https://services-store-app.web.app/)

## Project Overview

The **Service Review System** is a full-stack web application where users can add services, view details, and post reviews on different services. Users can manage their added services and posted reviews. This project demonstrates CRUD operations, secure authentication, and a professional UI using modern frontend tools and best practices.

---

## Key Features

✅ User Authentication (Email/Password & Google Login)
✅ Add / Update / Delete Services (Private Routes)
✅ Add / Update / Delete Reviews (Only by logged-in users)
✅ Service Details page with all related reviews
✅ “My Services” page for user’s added services
✅ “My Reviews” page with update/delete options
✅ Search services by title, category or company name
✅ Filter services by category (e.g., Food, IT, Transport)
✅ Mobile/Tablet/Desktop Responsive
✅ Dynamic Title for each route
✅ 404 Not Found Page
✅ Sweet Alert / Toast messages for feedback
✅ React CountUp for showing stats
✅ Framer Motion animations

---

## Technologies Used

### 🌟 Frontend Stack

- React.js (with Vite)
- React Router DOM v6
- Tailwind CSS
- DaisyUI / ShadCN (any Tailwind component library used)
- Firebase Authentication
- Framer Motion
- React CountUp
- React Rating
- Axios / Fetch
- SweetAlert2

---

## Environment Variables

Create a `.env` file at the root of the frontend project and add:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://services-code-server.vercel.app/



***

Installation & Run
Clone the Repository:

bash
Copy code
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-developerTamanna
cd service-review-frontend
Install Dependencies:

bash
Copy code
npm install
Run the Project:

bash
Copy code
npm run dev
Folder Structure
css
Copy code
src/
├── assets/
├── components/
├── context/
├── hooks/
├── layout/
├── pages/
├── router/
└── App.jsx
Authentication
Firebase authentication system used.

Users can login/register using email & password.

Google login is integrated.

JWT token is received and stored in cookies for protected API access.

Pages & Routes
/ → Home Page (Public)

/login → Login Page

/register → Register Page

/services → All Services Page

/services/:id → Service Details Page

/add-service → Add New Service (Private)

/my-services → My Services (Private)

/my-reviews → My Reviews (Private)

* → 404 Not Found Page

Credits
Created by Tamanna Akter
📧 Email: astamanna57@gmail.com
🌍 GitHub: developertamanna
