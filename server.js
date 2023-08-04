const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios').default

require('dotenv').config()

const app = express()
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

const openAIApi = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
})

app.use(cors())
app.use(bodyParser.json())

const qbTokenValidation = async (token) => {
  try {
    if (!token) return false

    const { data } = await axios.get('session.json', {
      baseURL: process.env.QUICKBLOX_API_URL,
      headers: {
        'QB-Token': token,
      },
      httpsAgent,
    })

    return Boolean(data.session && data.session.user_id)
  } catch (error) {
    return false
  }
}

app.use(async (req, res) => {
  try {
    const excludedHeaders = [
      'qb-token',
      'accept',
      'host',
      'user-agent',
      'content-length',
    ]
    const headers = { ...req.headers }
    const isValidToken = await qbTokenValidation(headers['qb-token'])

    if (!isValidToken) {
      res.status(403).send({
        error: {
          message: 'Invalid QB-Token header',
        },
      })

      return
    }

    excludedHeaders.forEach((header) => {
      delete headers[header]
    })

    const options = {
      method: req.method,
      url: req.originalUrl,
      headers,
      data: req.body,
      httpsAgent,
    }

    const { data } = await openAIApi.request(options)

    res.send(data)
  } catch (error) {
    let status = 500
    let errorData = {
      error: {
        message: error.message,
      },
    }

    if ('response' in error) {
      status = error.response.status
      errorData = error.response.data
    }

    res.status(status).send(errorData)
  }
})

const runServerListener = () => {
  console.log(`Server is running at port ${process.env.PORT}`)
}

if (process.env.SSL_KEY_FILE && process.env.SSL_CERT_FILE) {
  const certificates = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE),
  }

  https
    .createServer(certificates, app)
    .listen(process.env.PORT, process.env.HOST, runServerListener)
} else {
  app.listen(process.env.PORT, process.env.HOST, runServerListener)
}
