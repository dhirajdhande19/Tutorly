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
git clone git clone [https://github.com/your-username/tutorly.git](https://github.com/dhirajdhande19/Tutorly.git)
cd tutorly
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

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
│   └── js/                     # Client-side JavaScript
|
├── routes/
│   └── authRoutes.js           # Routes for login, register, logout
│
├── utils/
│   ├── ExpressError.js         # Custom error class
│   └── wrapAsync.js            # Utility for async error handling
│
├── views/
│   ├── error.ejs               # Error page
│   ├── includes/
│   │   └── flash.ejs           # Flash messages partial
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
├── .env                       # Environment variables (not committed)
├── .gitignore                 # Ignored files/folders
└── README.md                  # You're here now!
```

---

## 📸 Screenshots

> Add screenshots of login page, registration page, dashboard, or any cool features!


<div align="center">
      <img src="https://github.com/user-attachments/assets/1b98f6d1-7f77-42d6-b60d-2a27b170e227" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/b41da996-1127-4287-a7d1-40f5565b8e07" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/b41da996-1127-4287-a7d1-40f5565b8e07" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/f6fa4158-f545-49a0-8747-f939ac9b0b88" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/1680cace-cc72-4555-bd32-82398b08c800" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/9dced6aa-a27e-43a0-83e4-df7d1c2c6c91" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/c9741ef5-06ce-4b27-a592-dd06abcc8ad8" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/00896235-6034-4a26-a88a-c09af0151a38" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/14d9879a-2c2e-4c26-856c-aa7d95ca3231" width="1000" alt="Screenshot Description"/>
      <img src="https://github.com/user-attachments/assets/6fa0b10f-e819-40f9-b4be-9c83dce27e3d" width="1000" alt="Screenshot Description"/>

</div>

---

## 📌 Notes

* Don't commit your `.env` file! It's ignored by `.gitignore`.

---

## 🌟 Like this project?

Star it ⭐ | Fork it 🍴 | Share it 💬

We’re continuously improving — contributions and feedback are welcome!

````

