/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");
const { write } = require('fs');

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;

  // const text = await fs.readFile(filePath, {encoding: "utf8"});e.log(text);
}

async function listContacts() {
  const db = await readContacts();
  return db;
}

async function getContactById(contactId) {
  const db = await readContacts(contactId);
  const contact = db.find((cont) => cont.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  // ...твой код
  const db = await readContacts();
  const updateContacts = db.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
}

async function addContact(name, email, phone) {
  // ...твой код
  const id = nanoid();
  const contact = { id, name, email, phone };
 
  const contacts = await readContacts(contactsPath); 
  contacts.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}