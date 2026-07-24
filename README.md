# 🚀 CPlayground

> A modern competitive programming analytics platform built with Next.js, TypeScript, MongoDB, and NextAuth.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![NextAuth](https://img.shields.io/badge/Authentication-NextAuth-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Overview

CPlayground helps competitive programmers track their Codeforces performance through an intuitive dashboard.

Users can connect their Codeforces account, sync their contest history and submissions, and visualize their progress with real-time analytics.

---

## ✨ Features

### 🔐 Authentication
- Secure authentication with NextAuth
- User registration & login
- Protected dashboard routes

### 👤 Codeforces Integration
- Connect Codeforces account
- Sync profile
- Sync contest history
- Sync submissions

### 📊 Dashboard
- Current Rating
- Max Rating
- Contest Count
- Solved Problems
- Success Rate
- Total Submissions
- Rating Progress
- Profile Overview

### 📈 Analytics
- Contest history
- Rating progression
- Recent submissions
- Performance insights
- Ready for future heatmaps & topic analytics

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- NextAuth
- MongoDB
- Mongoose

### APIs
- Codeforces API

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── connect/
│   │   ├── dashboard/
│   │   └── sync/
│   │
│   ├── dashboard/
│   ├── sign-in/
│   └── sign-up/
│
├── components/
│
├── model/
│
├── lib/
│
└── data/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Pankaj862/CPlayground.git
```

### Install dependencies

```bash
npm install
```

### Create `.env.local`

```env
MONGODB_URI=your_mongodb_uri

NEXTAUTH_SECRET=your_secret

NEXTAUTH_URL=http://localhost:3000
```

### Start development server

```bash
npm run dev
```

---

## 📡 API Endpoints

### Authentication

```
POST /api/sign-up
POST /api/auth/[...nextauth]
```

### Dashboard

```
GET /api/dashboard/profile
GET /api/dashboard/stats
GET /api/dashboard/contests
GET /api/dashboard/submissions
```

### Codeforces

```
POST /api/connect/codeforces

POST /api/sync/codeforces/profile

POST /api/sync/codeforces/contests

POST /api/sync/codeforces/submissions
```

---

## 📷 Screenshots

> Add screenshots here after deployment.

- Landing Page
- Dashboard
- Profile
- Contest History
- Analytics

---

## 🎯 Future Improvements

- Heatmap Calendar
- Topic-wise Analysis
- CodeChef Integration
- LeetCode Integration
- Contest Reminders
- Leaderboard
- Friend Comparison
- Bookmark Problems
- AI Performance Insights

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit changes

```bash
git commit -m "Add New Feature"
```

4. Push

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Pankaj Bisht**

GitHub: https://github.com/Pankaj862

---

⭐ If you found this project helpful, consider giving it a star!
