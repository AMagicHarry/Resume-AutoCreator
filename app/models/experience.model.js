module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      level: String,
      experience: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Experience = mongoose.model("Experience", schema);
  return Experience;
};