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