# Data Migration Guide

## For Users with Existing Registrations in registrations.json

If you already have registrations saved in `backend/storage/registrations.json` and want to migrate them to MongoDB, follow these steps:

### Step 1: Backup Your Current Data
```bash
cp backend/storage/registrations.json backend/storage/registrations.json.backup
```

### Step 2: Create Migration Script

Create a file `backend/migrate.js`:

```javascript
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Registration = require("./models/Registration");
const { connectDB } = require("./config/database");

async function migrate() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Read old JSON file
    const jsonPath = path.join(__dirname, "storage", "registrations.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    
    console.log(`Found ${jsonData.length} registrations to migrate...`);

    // Insert into MongoDB
    for (const record of jsonData) {
      const existing = await Registration.findOne({ id: record.id });
      if (!existing) {
        await Registration.create(record);
        console.log(`✓ Migrated: ${record.fullName}`);
      }
    }

    console.log("✓ Migration complete!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("✗ Migration failed:", err.message);
    process.exit(1);
  }
}

migrate();
```

### Step 3: Run Migration

```bash
cd backend
node migrate.js
```

You should see output like:
```
Connect to MongoDB
Found 15 registrations to migrate...
✓ Migrated: John Doe
✓ Migrated: Jane Smith
...
✓ Migration complete!
```

### Step 4: Verify in MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Click your cluster → "Browse Collections"
3. You should see your data under `nexx-esports` → `registrations`

### Step 5: Delete Old JSON File (Optional)

Once verified, you can delete the old file:
```bash
rm backend/storage/registrations.json
```

---

**Note**: The registrations will continue working in the new MongoDB without the JSON file.
