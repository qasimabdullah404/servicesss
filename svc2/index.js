const express = require('express')
const amqp = require('amqplib')
const app = express()

let channel, connection

connect()
async function connect() {
  try {
    const rabbit = "amqp://rabbitmq:5672"
    connection = await amqp.connect(rabbit)
    channel = await connection.createChannel()
    await channel.assertQueue("rabbit")

    channel.consume("rabbit", data => {
      console.log(`Received ${Buffer.from(data.content)}`)
      channel.ack(data)
    })
  } catch(err) {
    console.log(err)
  }
}

app.listen(2222, '0.0.0.0', () => console.log(`Listening on 2222`))

