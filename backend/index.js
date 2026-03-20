require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const tournaments = require("./data/tournaments");
const { readAll, addRegistration, updateRegistration, countApprovedByEvent } = require("./utils/storage");
const { appendRegistrationToSheet } = require("./utils/sheets");
const { sendApprovalEmail, sendDeclineEmail } = require("./utils/email");
const { connectDB } = require("./config/database");

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

async function isFull(eventId) {
  const total = await countApprovedByEvent(eventId);
  const max = tournaments[eventId]?.slots || 50;
  return total >= max;
}

app.get("/api/registrations/counts", async (req, res) => {
  try {
    const regs = await readAll();
    const counts = regs.reduce((acc, reg) => {
      if (reg.status === "approved") {
        acc[reg.eventId] = (acc[reg.eventId] || 0) + 1;
      }
      return acc;
    }, {});
    res.json(counts);
  } catch (err) {
    console.error("Error in /api/registrations/counts:", err);
    res.status(500).json({ message: "Failed to fetch counts" });
  }
});

app.get("/api/registrations", async (req, res) => {
  try {
    const regs = await readAll();
    res.json(regs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (err) {
    console.error("Error in /api/registrations:", err);
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
});

app.get("/api/registrations/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const regs = await readAll();
    const filtered = regs.filter((r) => r.eventId === eventId);
    res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (err) {
    console.error("Error in /api/registrations/:eventId:", err);
    res.status(500).json({ message: "Failed to fetch event registrations" });
  }
});

app.post("/api/registrations/:eventId", upload.single("screenshot"), async (req, res) => {
  try {
    const { eventId } = req.params;
    const { fullName, inGameName, uid, phone, email, txnId } = req.body;

    if (!tournaments[eventId]) {
      return res.status(400).json({ message: "Unknown event." });
    }

    if (await isFull(eventId)) {
      return res.status(400).json({ message: "Registration closed. Tournament full." });
    }

    const regs = await readAll();
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

    await addRegistration(record);
    appendRegistrationToSheet(record).catch(() => {});

    res.json({ success: true, record });
  } catch (err) {
    console.error("Error in POST /api/registrations:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.patch("/api/registrations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateRegistration(id, updates);
    if (!updated) {
      return res.status(404).json({ message: "Not found." });
    }

    // Send email based on status update
   // Send email based on status update
try {
  if (updates.status === "approved") {
    await sendApprovalEmail(updated);
  } else if (updates.status === "declined") {
    await sendDeclineEmail(updated);
  }
} catch (err) {
  console.log("Email failed but continuing...", err.message);
}
    res.json(updated);
  } catch (err) {
    console.error("Error in PATCH /api/registrations:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Start server with DB connection
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✓ NEXX Esports backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
