var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017"

MongoClient.connect(url, function(err, db) {
  if (err) console.log(err)
  console.log("Database created!")

  dbo = db.db("myDB")
  dbo.createCollection("names", (err, res) => {
    console.log("Collection created!")

    let coll = dbo.collection("names")

    let myObj = {name: "Anthony", school: "UNIZIK"}
    let manyObj = [
      {name: "Ken", school: "MIT"},
      {name: "Chris", school: "ASA"}
    ]

    coll.insertOne(myObj, (err, res) => {
      console.log("Record inserted!")
    })

    coll.insertMany(manyObj, (err, res) => {
      console.log("Records inserted!")
      db.close()
    })
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")

  coll.findOne({}, (err, res) => {
    if (err) throw err
    console.log(res.name)

    db.close()
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")

  coll.find({}, {projection: {_id: 0, school: 1}}).toArray((err, res) => {
    if (err) throw err
    console.log(res)

    db.close()
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")
  let query = {name: "Anthony"}

  coll.find(query, {projection: {_id: 0, school: 1}}).toArray((err, res) => {
    if (err) throw err
    console.log(res)

    db.close()
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")
  let sort = {name: 1}

  coll.find({}, {projection: {_id: 0, name: 1}})
  .sort(sort)
  .toArray((err, res) => {
    if (err) throw err
    console.log(res)

    db.close()
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")
  let query = {name: "Anthxony"}

  coll.deleteOne(query, (err, res) => {
    if (err) throw err
    console.log(res)

    db.close()
  })
})

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")
  let query = {name: "Anthxony"}

  coll.deleteMany(query, (err, res) => {
    if (err) throw err
    console.log(res)

    db.close()
  })
})

// MongoClient.connect(url, (err, db) => {
//   let dbo = db.db("myDB")
//   let coll = dbo.collection("names")
//   let query = {name: "Anthuiony"}

//   coll.drop((err, res) => {
//     if (err) throw err
//     console.log(res)

//     db.close()
//   })
// })

MongoClient.connect(url, (err, db) => {
  let dbo = db.db("myDB")
  let coll = dbo.collection("names")
  let query = {name: "Anthony"}
  let newVal = {$set: {name: "Melchizedek"}}

  coll.updateOne(query, newVal, (err, res) => {
    if (err) throw err
    console.log(res.modifiedCount)

    db.close()
  })
})