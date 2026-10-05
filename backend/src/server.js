import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = 5001;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => console.log('Server started on PORT: ', PORT));
  } catch (err) {
    console.log('Server failed to start: ', err);
    process.exit(1);
  }
})();