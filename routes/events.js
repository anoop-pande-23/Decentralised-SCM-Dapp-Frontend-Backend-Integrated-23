// routes/events.js
const express = require("express");
const router = express.Router();
const { contractInstance } = require("../contract");

// ---------------------- Helpers ----------------------

// Format a single event with block timestamp
async function formatEvent(e, action = undefined) {
  const block = await e.getBlock();
  return {
    id: e.args.id.toNumber(),
    name: e.args.name || undefined,
    price: e.args.price ? e.args.price.toNumber() : undefined,
    quantity: e.args.quantity ? e.args.quantity.toNumber() : undefined,
    action: action, // optional, only for history
    txHash: e.transactionHash,
    blockNumber: e.blockNumber,
    timestamp: block.timestamp,
  };
}

// Format an array of events
async function formatEvents(events, action = undefined) {
  return await Promise.all(events.map(e => formatEvent(e, action)));
}

// ---------------------- Routes ----------------------

// GET /events/product-added
router.get("/product-added", async (req, res) => {
  try {
    const events = await contractInstance.queryFilter("ProductAdded");
    const formatted = await formatEvents(events);
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching ProductAdded events:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET /events/product-updated
router.get("/product-updated", async (req, res) => {
  try {
    const events = await contractInstance.queryFilter("ProductUpdated");
    const formatted = await formatEvents(events);
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching ProductUpdated events:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET /events/product-deleted
router.get("/product-deleted", async (req, res) => {
  try {
    const events = await contractInstance.queryFilter("ProductDeleted");
    const formatted = await Promise.all(
      events.map(async (e) => {
        const block = await e.getBlock();
        return {
          id: e.args.id.toNumber(),
          action: "Deleted",
          txHash: e.transactionHash,
          blockNumber: e.blockNumber,
          timestamp: block.timestamp,
        };
      })
    );
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching ProductDeleted events:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------------------- Product History / Audit Trail ----------------------

// GET /events/products/:id/history
router.get("/products/:id/history", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Fetch all relevant events
    const [addedEvents, updatedEvents, deletedEvents] = await Promise.all([
      contractInstance.queryFilter("ProductAdded"),
      contractInstance.queryFilter("ProductUpdated"),
      contractInstance.queryFilter("ProductDeleted"),
    ]);

    // Filter by productId and format
    const history = [];

    for (const e of addedEvents) {
      if (e.args.id.toNumber() === productId) history.push(await formatEvent(e, "Added"));
    }
    for (const e of updatedEvents) {
      if (e.args.id.toNumber() === productId) history.push(await formatEvent(e, "Updated"));
    }
    for (const e of deletedEvents) {
      if (e.args.id.toNumber() === productId) history.push({
        id: e.args.id.toNumber(),
        action: "Deleted",
        txHash: e.transactionHash,
        blockNumber: e.blockNumber,
        timestamp: (await e.getBlock()).timestamp,
      });
    }

    // Sort chronologically by timestamp, then blockNumber
    history.sort((a, b) => a.timestamp - b.timestamp || a.blockNumber - b.blockNumber);

    res.json(history);
  } catch (err) {
    console.error("Error fetching product history:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
