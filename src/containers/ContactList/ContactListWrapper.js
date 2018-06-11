import React, { Component } from 'react';
import GmailManager from '../../utils/GmailManager';
import ContactList from './ContactList';
import ContactUtil from '../../utils/ContactUtil';
import ContactsStore from '../../utils/ContactsStore';

class ContactListWrapper extends Component {
    state = {
        sortedContacts: [],
        noPhoneList: [],
        noEmails: [],
        nonGmailList: [],
        gmailList: []
    };

    handleContactClick = (contact) => {
        console.log(contact);
    }

    getConnections = () => {
        let gmailMgr = new GmailManager();
        gmailMgr.getConnections().then((response) => {
            let contactUtil = new ContactUtil();
            let contacts = contactUtil.sortContacts(response.result.connections);
            this.setState({
                sortedContacts: contacts.sortedContacts,
                noPhoneList: contacts.noPhoneList,
                noEmails: contacts.noEmails,
                nonGmailList: contacts.nonGmailList,
                gmailList: contacts.gmailList
            });
            //also initialize ContactsStore
            ContactsStore.sortedContacts = contacts.sortedContacts;
            ContactsStore.noPhoneList = contacts.noPhoneList;
            ContactsStore.noEmails = contacts.noEmails;
            ContactsStore.nonGmailList = contacts.nonGmailList;
            ContactsStore.gmailList = contacts.gmailList;
        });
    }

    componentDidMount() {
        if(ContactsStore.initialized){
            console.log('Initializing from ContactsStore');
            this.setState({
                sortedContacts: ContactsStore.sortedContacts,
                noPhoneList: ContactsStore.noPhoneList,
                noEmails: ContactsStore.noEmails,
                nonGmailList: ContactsStore.nonGmailList,
                gmailList: ContactsStore.gmailList
            });
        } else {
            this.getConnections();
        }
    }



    render() {
        console.log(this.state);
        
        if (this.state.sortedContacts.length > 0) {
            return (
                <ContactList lists={this.state} />                
            );
        } else {
            return ('');
        }
    }
}

export default ContactListWrapper;
