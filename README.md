# EcoVacation - Sustainability NGO Platform

EcoVacation is a premium, full-stack platform for a Sustainability NGO. It enables organizations to showcase their ongoing environmental projects, manage volunteers, and track global impact. Built with the MERN stack and a high-end, responsive design.

## ✨ Features

- **Impactful Landing Page**: High-resolution visuals, mission statements, and live global impact counters.
- **Projects Hub**: A dedicated space for ongoing sustainability initiatives with progress tracking and donation goals.
- **Volunteer Portal (Auth)**: Secure user authentication (Login/Register) using JWT, allowing volunteers to create profiles and track their contributions.
- **Impact Dashboard**: Personalized dashboard for members to see their "Eco Points" and recent activities.
- **Premium Aesthetics**: Sophisticated typography (Playfair Display & Outfit), Glassmorphism, and smooth animations powered by Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Framer Motion (Animations), Lucide React (Icons), React Router (Navigation).
- **Backend**: Node.js, Express.js, JWT (Authentication), BcryptJS (Security).
- **Database**: MongoDB (Mongoose).
- **Styling**: Vanilla CSS with a custom, earth-toned design system.

## 🚀 Getting Started

### Prerequisites

- Node.js & MongoDB installed.

### Installation

1. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   - Create `.env`:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/eco_lumina
     JWT_SECRET=your_jwt_secret
     ```
   - Run: `npm run dev`

2. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   ```
   - Run: `npm run dev`

3. **Explore**:
   - Access the platform at `http://localhost:5173`.
   - Register as a new volunteer to unlock your Impact Dashboard.

---

EcoLumina - Technology for a greener tomorrow. 🌍✨
