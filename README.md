## 📚 Tutorly

An all-in-one tutoring platform that connects students with tutors through a modern, responsive web interface.  
It features authentication, session management, dynamic rendering, and prepares for AI integration. 🧠✨

---

### 🚀 Tech Stack

<div align="center">

<!-- Skillicons -->
<img src="https://skillicons.dev/icons?i=js,nodejs,express,mongodb,css" alt="Tech Stack Icons" />

<!-- Custom EJS Badge -->
<br/>
<img src="https://img.shields.io/badge/EJS-8C8C8C?style=for-the-badge&logo=javascript&logoColor=white" alt="EJS Badge"/>

</div>

---

## 👨‍💻 Authors
 
- **Arsheet** – Frontend Developer 
- **Dhiraj** – Backend Developer  
- **Nebin** – AI Integration Lead

> 💬 Built with teamwork, late nights, and way too much console logging. 😂

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/your-username/tutorly.git]
cd tutorly
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Arsheet, Nebin msg me i'll send .env file
Create a `.env` file in the root directory and add:

```env
MONGO_URL=your_mongo_connection_string 
SECRET="mySuperSecretCodeForThisProject"
```

### 4️⃣ Start the Server

```bash
npm start
```

🔗 Then open your browser at: `http://localhost:8080`

---

## 🗂️ Project Folder Structure

```plaintext
tutorly/
│
├── controllers/
│   └── authController.js       # Handles authentication logic
│
├── models/
│   └── User.js                 # User schema using Mongoose
│
├── public/
│   ├── css/                    # CSS stylesheets
│   ├── js/                     # Client-side JavaScript
|   └── images/                 # Images                  
|
├── routes/
│   └── authRoutes.js           # Routes for login, register, logout
│
├── utils/
│   ├── ExpressError.js         # Custom error class
│   └── wrapAsync.js            # Utility for async error handling
│
├── views/
│   
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── flash.ejs
│   │   ├── chatroomHeader.ejs
│   │   └── footer.ejs          
│   │   
│   └── layout/
│   │    ├── loginBoilerplate.ejs
│   │    ├── registerBoilerplate.ejs
│   │    ├── chatroomBoilerplate.ejs
│   │    └── homeBoilerplate.ejs
│   │
│   │
│   └──pages/                    # EJS Files
│        ├── chatroom.ejs
│        ├── error.ejs            
│        ├── home.ejs
│        ├── login.ejs
│        └── register.ejs
|
│
├── middlewares.js             # Custom middleware functions
├── server.js                  # Entry point of the app
├── .gitignore                 # Ignored files/folders
└── README.md                  # You're here now!
│.....

```

---

## 📸 Screenshots

# Comming Soon....!!!

---

## 📌 Notes

* Don't commit your `.env` file! It's ignored by `.gitignore`.

---

## 🌟 Like this project?

Star it ⭐ | Fork it 🍴 | Share it 💬

We’re continuously improving — contributions and feedback are welcome!

````

