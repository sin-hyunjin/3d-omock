import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.send("Hello, TypeScript with Express!!!!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
