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

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/maileroo.git
   cd maileroo
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the frontend directory:
   ```bash
   cd frontend
   echo "GOOGLE_API_KEY=your_google_api_key_here" > .env.local
   ```

4. **Set up the database**
   ```bash
   cd backend
   npm run migrate
   ```

## 🚀 Development

### Start both frontend and backend
```bash
npm run dev
```

### Start only frontend
```bash
npm run dev:frontend
```

### Start only backend
```bash
npm run dev:backend
```

## 🏗️ Build

### Build both applications
```bash
npm run build
```

### Build only frontend
```bash
npm run build:frontend
```

### Build only backend
```bash
npm run build:backend
```

## 🎯 Usage

1. **Start the development servers**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

3. **Generate AI emails**
   - Click "Generate with AI ✨" button
   - Enter your prompt (e.g., "Meeting request for Tuesday")
   - AI will classify and generate appropriate email content
   - Edit the generated content as needed

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language generation
- Next.js team for the amazing React framework
- Material-UI for beautiful React components
- AI SDK for seamless AI integration
