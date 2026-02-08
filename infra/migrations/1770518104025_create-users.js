exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      primeraryKey: true,
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
    },
    username: { type: "varchar(30)", notNull: true, unique: true },
    email: { type: "varchar(254)", notNull: true, unique: true },
    password: { type: "varchar(72)", notNull: true },
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
      notNull: true,
    },
  });
};

exports.down = false;
