import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import dotenv from 'dotenv'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { readFile } from 'fs/promises'

const artWorksKarlstad = JSON.parse(
  await readFile(
    new URL('./data/karlstad.json', import.meta.url)
  )
)

const artWorksUppsala = JSON.parse(
  await readFile(
    new URL('./data/uppsala.json', import.meta.url)
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
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  resolvedKarlstad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtWorkKarlstad",
    unique: true
  },
  resolvedUppsala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtWorkUppsala",
    unique: true
  }
})

const User = mongoose.model('User', userSchema)

const artWorkSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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
    type: [],
    required: true
  },
  clue: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isResolved: {
    type: Boolean,
    required: true
  }
})


const ArtWorkKarlstad = mongoose.model('ArtWorkKarlstad', artWorkSchema)
const ArtWorkUppsala = mongoose.model('ArtWorkUppsala', artWorkSchema)

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
    await ArtWorkKarlstad.deleteMany()
    await ArtWorkUppsala.deleteMany()

    artWorksKarlstad.forEach((artWorkData) => {
      new ArtWorkKarlstad(artWorkData).save()
    })

    artWorksUppsala.forEach((artWorkData) => {
      new ArtWorkUppsala(artWorkData).save()
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
app.get('/artworks/Karlstad', async (req, res) => {
  const artWorks = await ArtWorkKarlstad.find()
  res.json(artWorks)
})

app.get('/artworks/Uppsala', async (req, res) => {
  const artWorks = await ArtWorkUppsala.find()
  res.json(artWorks)
})

app.get('/artworks/Karlstad/:id', async (req, res) => {
  const { id } = req.params
  const selectedArtwork = await ArtWorkKarlstad.findById(id)
  if (selectedArtwork) {
    res.json(selectedArtwork)
  } else {
    res.status(404).json({ error: 'Konstverket du söker finns inte i databasen.' })
  }
})

app.get('/artworks/Uppsala/:id', async (req, res) => {
  const { id } = req.params
  const selectedArtwork = await ArtWorkUppsala.findById(id)
  if (selectedArtwork) {
    res.json(selectedArtwork)
  } else {
    res.status(404).json({ error: 'Konstverket du söker finns inte i databasen.' })
  }
})

app.post('/users/:id', async (req, res) => {
  const { id } = req.params
  const { artworkId, userId, currenCity } = req.body
  try {
    if (currentCity = "Karlstad") {
      const resolvedArtwork = await User.findById(id).populate({ path: 'resolvedKarlstad', select: ['_id', 'title', 'id', 'location', 'isResolved'] }).findOneAndUpdate({ resolvedKarlstad, _id: artworkId }, { $set: { isResolved: true } })
    } else {
      const resolvedArtwork = await User.findById(id).populate({ path: 'resolvedUppsala', select: ['_id', 'title', 'id', 'location', 'isResolved'] }).findOneAndUpdate({ resolvedKarlstad, _id: artworkId }, { $set: { isResolved: true } })
    }
  } catch (err) {
    res.status(400).json({ success: false, message: 'Kunde inte hitta användare', error: err })
  }
})

app.post('/users', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.json({
      success: true,
      userId: newUser._id,
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
        userId: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(404).json({ success: false, message: 'Invalid request', error: error })
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})