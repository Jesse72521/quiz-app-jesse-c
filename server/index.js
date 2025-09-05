const express = require('express')
const cors = require('cors')
const OpenAI = require('openai')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Quiz endpoint with OpenAI API
app.post('/api/quiz', async (req, res) => {
  try {
    const { topic = 'general knowledge', difficulty = 'medium' } = req.body
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate 5 quiz questions about ${topic} with ${difficulty} difficulty. Return a JSON array where each question has: question (string), options (array of 4 strings), answer (string - the correct option), and explanation (string).`
        },
        {
          role: "user",
          content: `Create 5 quiz questions about ${topic} with ${difficulty} difficulty level.`
        }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content
    let questions
    
    try {
      questions = JSON.parse(response)
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Could not parse quiz questions from OpenAI response')
      }
    }

    res.json({ questions })
  } catch (error) {
    console.error('Error generating quiz:', error)
    res.status(500).json({ 
      error: 'Failed to generate quiz questions',
      message: error.message 
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})