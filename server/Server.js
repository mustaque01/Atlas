const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Configure OpenAI
const openai = new OpenAI({
  apiKey: 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
});

// Configure multer for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Function to extract text from PDF
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Function to analyze text using OpenAI
async function analyzeTextWithOpenAI(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a document analysis expert. Extract key insights, main points, and important information from the following document text. Organize the information in a clear, structured format."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing text with OpenAI:', error);
    throw new Error('Failed to analyze document');
  }
}

// API endpoint for PDF upload and analysis
app.post('/api/analyze-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.buffer);

    // Analyze text using OpenAI
    const analysis = await analyzeTextWithOpenAI(text);

    res.json({ 
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to process PDF' 
    });
  }
});

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});

app.use("/api/auth", router);


app.get('/', (req, res) => {
  res.send('Server is ready');
});


// app.post('/api/signup', (req, res) => {
//     res.send({ message: 'User signed up successfully' });
// });

const PORT = 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:4000`));
  console.log('Connected to DB');
});

