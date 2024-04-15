module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      keyword: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Keyword = mongoose.model("Keyword", schema);
  return Keyword;
};