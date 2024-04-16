module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      country: String,
      name: String,
      city: String,
      state: String,
      address: String,
      zipcode: String,
      phonenumber: String,
      nationalID: String
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