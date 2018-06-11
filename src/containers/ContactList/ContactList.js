import React, { Component } from 'react';
import ContactListEntry from '../ContactListEntry/ContactListEntry';

class ContactList extends Component{

  constructor(){
    super();
    this.state = {
      sortedContacts: [],
      noPhoneList: [],
      noEmails: [],
      nonGmailList: [],
      gmailList: [],
      selected: 'gmailList'
    }
  }

  componentWillMount(){
    this.setState({
      sortedContacts: this.props.lists.sortedContacts,
      noPhoneList: this.props.lists.noPhoneList,
      noEmails: this.props.lists.noEmails,
      nonGmailList: this.props.lists.nonGmailList,
      gmailList: this.props.lists.gmailList,
      selected: 'gmailList'
    });
  }

  getContactArrayJSX = (filter) => {
    let sortedContacts = this.state;

    let contactArray = [];
    if (filter === 'gmailList') {
      contactArray = sortedContacts.gmailList;
    }
    if (filter === 'nonGmailList') {
      contactArray = sortedContacts.nonGmailList;
    }
    if (filter === 'noEmails') {
      contactArray = sortedContacts.noEmails;
    }

    let contactArrayJSX = contactArray.map((contact, index) => {
      if (contact.names) {
        return (
          <div key={index}>
            {<ContactListEntry contact={contact} />}
          </div>
        )
      }
      return '';
    });
    return contactArrayJSX;

  }

  handleSelectedList = (selected) => {
    this.setState({
      selected : selected
    })
  }

  render(){
    return (
      <main role="main" className="container">
        <div className="my-3 p-4 bg-white rounded box-shadow">
          <div className="btn-group mb-3" role="group" aria-label="filter contacts">
            <button type="button" className="btn btn-secondary" onClick={() => this.handleSelectedList('gmailList')}>Gmail</button>
            <button type="button" className="btn btn-secondary" onClick={() => this.handleSelectedList('nonGmailList')}>Email</button>
            <button type="button" className="btn btn-secondary" onClick={() => this.handleSelectedList('noEmails')}>Phones</button>
          </div>
          {this.getContactArrayJSX(this.state.selected)}
        </div>
      </main>
    );
  }

}

export default ContactList;
