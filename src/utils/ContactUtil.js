class ContactUtil {
    sortContacts = (contacts) => {
        let noPhoneList = [];
        let noEmails = [];
        let nonGmailList = [];
        let gmailList = [];

        if (contacts) {
            contacts.map((contact) => {
                if (contact.emailAddresses) {
                    let hasGmail = false;
                    contact.emailAddresses.map((email) => {
                        if (email.value.search('gmail.com') !== -1) {
                            hasGmail = true;
                        }
                        return null;
                    });
                    if (hasGmail) {
                        gmailList.push(contact);
                    } else {
                        nonGmailList.push(contact);
                    }
                    return contact;
                }
                if (contact.phoneNumbers) {
                    noEmails.push(contact);
                } else {
                    noPhoneList.push(contact);
                }
                return contact;
            });
        }

        let sortedContacts = gmailList.concat(nonGmailList).concat(noEmails).concat(noPhoneList);
        return {
            sortedContacts,
            gmailList,
            nonGmailList,
            noEmails,
            noPhoneList
        }
    }    
}

export default ContactUtil;