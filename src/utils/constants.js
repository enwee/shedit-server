const corsOptions = {
  origin: [process.env.FRONTEND_LOCALHOST, process.env.EDITOR_NETLIFY_URL],
  credentials: true
};

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useCreateIndex: true, // for creating index with unique
  useFindAndModify: false, // For find one and update
  serverSelectionTimeoutMS: 5000
};

const mongo_IdField = "_id";
const titleUuidOnly = `title uuid -${mongo_IdField}`;
const topicArrayOnly = `topicArray -${mongo_IdField}`;

module.exports = {
  corsOptions,
  mongoOptions,
  titleUuidOnly,
  topicArrayOnly
};
