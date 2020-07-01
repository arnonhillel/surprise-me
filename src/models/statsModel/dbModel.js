module.exports = mongoose => {
  const apiEventItem = mongoose.Schema({
    type: String
  })

  const Stats = mongoose.model(
    "stats",
    apiEventItem
  );

  return Stats;
};


// {
//   "requests": 27,
//   "distribution": [
//       {
//           "type": "chuck-norris-joke",
//           "count": 12
//       },
//       {
//           "type": "kanye-quote",
//           "count": 9
//       },
//       {
//           "type": "name-sum",
//           "count": 6
//       }
//   ]
