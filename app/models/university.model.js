module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      country: String,
      university: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const University = mongoose.model("University", schema);
  return University;
};