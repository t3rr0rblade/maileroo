# Maileroo - AI-Powered Email Generation System

A monorepo containing an AI-powered email generation and management system with a Next.js frontend and Node.js backend.

## 🏗️ Project Structure

```
maileroo/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js backend API
├── package.json       # Root monorepo configuration
└── README.md         # This file
```

## 🚀 Features

### Frontend (Next.js)
- **Email Dashboard** - Apple Mail-style interface with sidebar email list
- **Email Composition** - Rich email editor with To, CC, BCC, Subject, and Body fields
- **AI-Powered Generation** - Generate email content using AI with specialized assistants:
  - **Sales Assistant** - Generates compelling sales emails (max 40 words)
  - **Follow-up Assistant** - Creates polite follow-up emails
- **Real-time Streaming** - Watch AI generate content in real-time
- **Modern UI** - Built with Material-UI for a professional look

### Backend (Node.js)
- **Email Management** - Store and retrieve emails with SQLite database
- **AI Classification** - Route user prompts to appropriate AI assistants
- **Email Generation** - Stream AI-generated email content
- **RESTful API** - Clean API endpoints for frontend integration

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Material-UI, AI SDK
- **Backend**: Node.js, Express, Knex.js, SQLite
- **AI**: Google Gemini 2.5 Flash
- **Monorepo**: npm workspaces, concurrently

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Google AI API key

## 🔑 API Endpoints

### Frontend API Routes
- `POST /api/ai/classify` - Classify email type
- `POST /api/ai/generate` - Generate email content
- `GET /api/emails` - Get all emails
- `POST /api/emails` - Save new email

### Backend API Routes
- `GET /emails` - Get all emails
- `POST /emails` - Create new email

## 🧪 AI Features

### Email Classification
The system automatically classifies user prompts into:
- **Sales emails** - Product promotion, lead generation, cold outreach
- **Follow-up emails** - Meeting follow-ups, status updates, thank you messages

### Content Generation
- **Sales emails**: Max 40 words, professional tone, clear call-to-action
- **Follow-up emails**: Max 25 words, warm tone, concise and helpful

## 📝 Environment Variables

### Frontend (.env.local)
```
GOOGLE_API_KEY=your_google_api_key_here
```

### Backend (.env)
```
BACKEND_URL=http://localhost:3001
```
