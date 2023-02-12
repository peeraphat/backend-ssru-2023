const mongoose = require('mongoose')

async function main () {
  await mongoose.connect(process.env.MONGO_URI)
}

main().catch((e) => console.error(e))
