# TIM – Teacher-In-Machine (Phase 1)

A complete full-stack system for converting textbooks into interactive quizzes with AI-powered question generation and evaluation for primary education.

---

## 📁 Project Structure

```
TIM-Teacher-In-Machine/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileSelector.jsx
│   │   │   ├── UnitsList.jsx
│   │   │   ├── PassagesView.jsx
│   │   │   ├── PracticeQuiz.jsx
│   │   │   └── ResultPage.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── data/
│   └── (place your PDF textbooks here)
├── scripts/
│   ├── pdf_to_sqlite.py
│   ├── gen_questions.js
│   └── evaluate_attempt.js
├── tim.db
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- SQLite3
- OpenAI API Key (for LLM features)

---

## 1️⃣ PDF → SQLite Loader

### Setup
1. Install Python dependencies:
```bash
cd scripts
pip install PyPDF2
```

2. Place your textbook PDFs in the `data/` folder

3. Run the extraction script:
```bash
python pdf_to_sqlite.py
```

This script will:
- Extract text from all PDFs
- Clean and organize content
- Split into units and passages
- Create SQLite database (`tim.db`) with all data

### Database Schema
The script creates the following tables:
- **units**: Stores unit information (class, subject, title)
- **passages**: Stores text passages from textbooks
- **questions**: Stores quiz questions
- **users**: Stores user profiles (students, parents, teachers)
- **attempts**: Stores student quiz attempts and scores

---

## 2️⃣ Express Backend

### Setup
```bash
cd backend
npm install
```

### Run the backend
```bash
node server.js
```

Backend runs at `http://localhost:5000`

### API Endpoints
- `GET /api/units` - Get all units
- `GET /api/units/:id/passages` - Get passages for a unit
- `GET /api/units/:id/questions` - Get questions for a unit
- `POST /api/attempts` - Submit quiz attempt

---

## 3️⃣ React Frontend

### Setup
```bash
cd frontend
npm install
```

### Run the frontend
```bash
npm start
```

Frontend runs at `http://localhost:3000`

### Features
- **Profile Selection**: Choose between Student, Parent, or Teacher
- **Units List**: Browse available textbook units
- **Passage View**: Read textbook content
- **Practice Quiz**: Interactive quiz interface
- **Results**: View quiz results and correct answers

### UI Design
- Simple interface for 1st standard students
- Large, colorful buttons
- Audio-first approach (planned)
- Age-appropriate design

---

## 4️⃣ LLM Question Generation

### Setup
1. Set your OpenAI API key:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

2. Install dependencies:
```bash
cd scripts
npm install openai sqlite3
```

### Generate Questions
```bash
node gen_questions.js
```

This script will:
- Read passages from the database
- Use GPT to generate 3-5 questions per passage
- Create MCQ and short answer questions
- Insert questions into the database

### Question Types
- **MCQ**: Multiple choice with 4 options
- **Short Answer**: Open-ended questions
- **Oral**: Keyword-based questions (planned)

---

## 5️⃣ LLM Answer Evaluation

### Evaluation Logic
The system evaluates answers based on question type:

- **MCQ**: Exact match comparison
- **Short Answer**: Semantic similarity using LLM
- **Oral**: Keyword matching

### Run Evaluation
```bash
node evaluate_attempt.js
```

Results are stored in the `attempts` table with:
- Score (0-1)
- Correctness flag
- Detailed feedback

---

## 🔧 Development

### Backend Development
```bash
cd backend
node server.js
```

### Frontend Development
```bash
cd frontend
npm start
```

### Database Management
View database contents:
```bash
sqlite3 tim.db
.tables
SELECT * FROM units;
```

---

## 📝 Git Commands to Upload

If you're setting up a new repository:

```bash
# Navigate to project directory
cd TIM-Teacher-In-Machine

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Complete TIM Task 1: Full-stack implementation with PDF extraction, backend API, React UI, and LLM integration"

# Set main branch
git branch -M main

# Add remote (replace with your repository URL)
git remote add origin https://github.com/Koushik926/TIM-Teacher-In-Machine.git

# Push to GitHub
git push -u origin main
```

### Update existing repository:
```bash
git add .
git commit -m "Update: Add new features or fixes"
git push
```

---

## 🎯 Features Implemented

✅ PDF text extraction and cleaning  
✅ SQLite database with complete schema  
✅ Express backend with REST API  
✅ React frontend with 3 user profiles  
✅ LLM-based question generation  
✅ LLM-based answer evaluation  
✅ Complete folder structure  
✅ Comprehensive documentation  

---

## 🔮 Future Enhancements

- Audio playback for text passages
- Speech-to-text for oral answers
- Progress tracking dashboard
- Parent monitoring features
- Teacher admin panel
- Multi-language support
- Offline mode

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for educational purposes.

---

## 👤 Author

**Koushik926**

- GitHub: [@Koushik926](https://github.com/Koushik926)

---

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for primary education**
