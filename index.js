const { addContact, removeContact, listContacts, getContactById } = require("./db/contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "add":
            console.log("invoke add");
            await addContact(name, email, phone);
            break;
        case "remove":
            console.log("invoke remove");
            await removeContact(id);
            break;
        case "list":
            console.log("invoke list Contacts");
            const contacts = await listContacts();
            console.table(contacts);
            break;
        case "get":
            console.log("invoke get Contact By Id");
            const contact = await getContactById(id);
            console.log(contact);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv); 
