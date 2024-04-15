module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      country: String,
      company: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongoose.model("Company", schema);
  return Company;
};