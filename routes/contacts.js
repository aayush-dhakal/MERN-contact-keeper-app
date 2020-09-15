const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Contact = require("../models/Contact");

// @route    POST api/contacts
// @desc     Add new contacts
// @access   private
router.post("/", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    const contact = await newContact.save();

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    GET api/contacts
// @desc     get all contacts of a spercific user
// @access   private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    PUT api/contacts/:id
// @desc     update contact
// @access   private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findOne({ _id: req.params.id });

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route     DELETE api/contacts/:id
// @desc      delete a contact
// @access    private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
