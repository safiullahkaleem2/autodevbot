import express from "express";
const router = express.Router();

router.get("/books", (req, res) => {
  res.send("GET /books");
});

router.post("/books", (req, res) => {
  res.send("POST /books");
});

router.get("/books/:id", (req, res) => {
  res.send("GET /books/:id");
});

router.put("/books/:id", (req, res) => {
  res.send("PUT /books/:id");
});

router.delete("/books/:id", (req, res) => {
  res.send("DELETE /books/:id");
});

export default router;
