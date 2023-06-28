const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("ALL the field are Mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id,
  });
  res.status(201).json({ message: `Contact created for ${name}` });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Dont have permission to update.")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Dont have permission to delete.")
  }
  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
