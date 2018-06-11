class ContactsStore {
    constructor() {
        if (!ContactsStore.instance) {
            ContactsStore.instance = this;
            this.sortedContacts = [];
            this.noPhoneList = [];
            this.noEmails = [];
            this.nonGmailList = [];
            this.gmailList = [];
            this.initialized = false;
        }
        return ContactsStore.instance;
    }

    populateEmailsFromContacts = (emails, contactList) => {
        contactList.map((contact) => {
            return contact.emailAddresses.map((contactAddress) => {
                let address = {
                    name : contact.names[0].displayName,
                    address : contactAddress.value
                }
                emails.push(address);
                return address;
            });
        });
    }

    getEmailSuggestions = () => {
        let emails = [];
        this.populateEmailsFromContacts(emails, this.gmailList);
        this.populateEmailsFromContacts(emails, this.nonGmailList);
        console.log(emails);
        return emails;
    }
}

let instance = new ContactsStore();

export default instance;