import express from "express";
const router = express.Router();

router.get("/authors", (req, res) => {
  res.send("GET /authors");
});

router.post("/authors", (req, res) => {
  res.send("POST /authors");
});

router.get("/authors/:id", (req, res) => {
  res.send("GET /authors/:id");
});

router.put("/authors/:id", (req, res) => {
  res.send("PUT /authors/:id");
});

router.delete("/authors/:id", (req, res) => {
  res.send("DELETE /authors/:id");
});

export default router;
