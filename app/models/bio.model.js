module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      bio: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Bio = mongoose.model("Bio", schema);
  return Bio;
};