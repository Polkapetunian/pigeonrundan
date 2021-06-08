import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { readFile } from 'fs/promises'

const artWorks = JSON.parse(
  await readFile(
    new URL('./data/artworks.json', import.meta.url)
  )
)

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/konstrundan"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const User = mongoose.model('User', userSchema)

const artWorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  location: {
    type: {
      type: String },
      coordinates: []
  },
  clue: {
    type: String,
    required: false
  } 
})

//artWorkSchema.index({ "location":"2dsphere" })

const ArtWork = mongoose.model('ArtWork', artWorkSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
}

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await ArtWork.deleteMany()

    artWorks.forEach((artWorkData) => {
      new ArtWork(artWorkData).save()
    })
  }
  seedDatabase()
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//Should we add authenticateUser to this?
app.get('/artworks', async (req, res) => {
  const artWorks = await ArtWork.find()
  res.json(artWorks)
})

app.get('/artworks/:id', async (req, res) => { const {id} = req.params
const selectedArtwork= await ArtWork.findOne({id: +id})
  if (selectedArtwork) {
    res.json(selectedArtwork)
  } else {
    res.status(404).json({ error: 'Konstverket du söker finns inte i databasen.'})
  }
})

app.post('/users', async (req, res) => {
  const { username, password, email } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid request", error })
  }
})

app.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        userName: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error: error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
