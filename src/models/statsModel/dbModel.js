module.exports = mongoose => {
  const apiEventItem = mongoose.Schema({
    type: String,
    userName: String,
    password: String,
    id: String   
  })

  const Stats = mongoose.model(
    "stats",
    apiEventItem
  );

  return Stats;
};