module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      subtitle: String,
      description: String,
      skill: String,
      url: String,
      image: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", schema);
  return User;
};