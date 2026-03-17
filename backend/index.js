require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const tournaments = require("./data/tournaments");
const { readAll, addRegistration, updateRegistration } = require("./utils/storage");
const { appendRegistrationToSheet } = require("./utils/sheets");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

function isFull(eventId) {
  const regs = readAll();
  const total = regs.filter((r) => r.eventId === eventId && r.status === "approved").length;
  const max = tournaments[eventId]?.slots || 50;
  return total >= max;
}

app.get("/api/registrations/counts", (req, res) => {
  const regs = readAll();
  const counts = regs.reduce((acc, reg) => {
    if (reg.status === "approved") {
      acc[reg.eventId] = (acc[reg.eventId] || 0) + 1;
    }
    return acc;
  }, {});
  res.json(counts);
});

app.get("/api/registrations", (req, res) => {
  const regs = readAll();
  res.json(regs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.get("/api/registrations/:eventId", (req, res) => {
  const { eventId } = req.params;
  const regs = readAll().filter((r) => r.eventId === eventId);
  res.json(regs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.post("/api/registrations/:eventId", upload.single("screenshot"), async (req, res) => {
  const { eventId } = req.params;
  const { fullName, inGameName, uid, phone, email, txnId } = req.body;

  if (!tournaments[eventId]) {
    return res.status(400).json({ message: "Unknown event." });
  }

  if (isFull(eventId)) {
    return res.status(400).json({ message: "Registration closed. Tournament full." });
  }

  const regs = readAll();
  const duplicate = regs.find((r) => r.eventId === eventId && r.uid === uid);
  if (duplicate) {
    return res.status(400).json({ message: "This UID has already been registered." });
  }

  const screenshotUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : "";

  const record = {
    id: uuidv4(),
    eventId,
    fullName,
    inGameName,
    uid,
    phone,
    email,
    txnId,
    screenshotUrl,
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  addRegistration(record);
  appendRegistrationToSheet(record).catch(() => {});

  res.json({ success: true, record });
});

app.patch("/api/registrations/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = updateRegistration(id, updates);
  if (!updated) {
    return res.status(404).json({ message: "Not found." });
  }
  res.json(updated);
});

app.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`NEXX Esports backend running on http://localhost:${PORT}`);
});
