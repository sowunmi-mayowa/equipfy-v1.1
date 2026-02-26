const Contact = require("../models/contact");

const createContact = async (req, res) => {
  const { name, email, phone_number, state } = req.body;

  if (!name || !email || !phone_number || !state) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const contact = await Contact.create({ name, email, phone_number, state });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact };
