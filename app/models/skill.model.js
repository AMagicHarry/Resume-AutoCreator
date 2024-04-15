module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      skill: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Skill = mongoose.model("Skill", schema);
  return Skill;
};