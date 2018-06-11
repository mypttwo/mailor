import React from 'react';

let contactListEntry = (props) => {
    let contact = props.contact;
    let names = [];
    let phones = [];
    let emails = [];
    let className = "card bg-light";
    names = contact.names.map((name) => name.displayName);
    if (contact.phoneNumbers) {
        phones = contact.phoneNumbers.map((phone, index) => <p key={phone.value + index} >{phone.value}</p>)
        //className = "card bg-light";
    }
    if (contact.emailAddresses) {
        emails = contact.emailAddresses.map((email, index) => <p key={email.value + index} >{email.value}</p>)
        //className = "card bg-light";
    }
    return (
        <div className="card mb-3" key={contact.resourceName.replace('people/', '')}>
            <div className={className} >
                <div className="card-body">
                <img src={contact.photos[0].url} alt={contact.names[0].displayName} />
                    <h5 className="card-title mt-2">{contact.names[0].displayName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{names.join(', ')}</h6>
                    <div className="card-text">{phones}</div>
                    <div className="card-text">{emails}</div>
                    {/* <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a> */}
                </div>
            </div>
        </div>

    );
}

export default contactListEntry;