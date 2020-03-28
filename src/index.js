require("dotenv").config();
require("./utils/db");
const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
