const express = require('express')
const amqp = require('amqplib')
const app = express()

app.use(express.json())

let channel, connection

connect()
async function connect() {
  try {
    const rabbit = "amqp://rabbitmq:5672"
    connection = await amqp.connect(rabbit)
    channel = await connection.createChannel()
    await channel.assertQueue("rabbit")
  } catch(err) {
    console.log(err)
  }
}

app.get('/health', (req, res) => res.json({ health:"OK" }).status(200))

app.post('/payload', async (req, res) => {
  let payload = req.body

  await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(payload)))
  // await channel.close()
  // await connection.close()

  res.json({ info: "SENT" })
  console.log(`I: Received following payload and was passed onto queue`)
  console.log(payload)
  console.log("-------------\n")
})
app.listen(1111, '0.0.0.0', () => console.log(`Listening on 1111`))

