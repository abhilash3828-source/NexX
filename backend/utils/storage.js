const fs = require("fs");
const path = require("path");

const REG_PATH = path.join(__dirname, "..", "storage", "registrations.json");

function readAll() {
  try {
    const content = fs.readFileSync(REG_PATH, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
}

function writeAll(registrations) {
  fs.writeFileSync(REG_PATH, JSON.stringify(registrations, null, 2), "utf-8");
}

function addRegistration(record) {
  const items = readAll();
  items.push(record);
  writeAll(items);
  return record;
}

function updateRegistration(id, updates) {
  const items = readAll();
  const idx = items.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  writeAll(items);
  return items[idx];
}

module.exports = {
  readAll,
  addRegistration,
  updateRegistration
};
