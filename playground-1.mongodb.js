// db.tasks.find({ status: "pending", user: ObjectId("666704cdf494cf6baad9b5f7") });
db.tasks.aggregate([
    {$match: {user: ObjectId("666704cdf494cf6baad9b5f7")}},
    {$group: {_id: "$status", sum: {$count:{}}}}
  ])
