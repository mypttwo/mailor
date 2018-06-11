import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';
import ContactsStore from "../../utils/ContactsStore";
import Mask from '../../utils/Mask';
import AES256 from '../../utils/AES256';
import tracker from '../../utils/Utils';
import GmailManager from '../../utils/GmailManager';


let emails = ContactsStore.getEmailSuggestions();

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : emails.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <p className="text-left font-weight-light small">{suggestion.name}</p>
);

class Compose extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  loadGmailApi = () => {
    return new Promise((resolve) => {
      window.gapi.client.load('gmail', 'v1', () => {
        resolve();
      });
    })
  }

  onClickHandler = () => {
    let to = document.getElementById('to').value;
    let subject = document.getElementById('subject').value;
    let visiblemessage = document.getElementById('visiblemessage').value;
    let hiddenmessage = tracker + document.getElementById('hiddenmessage').value;
    let hiddenpwd = document.getElementById('hiddenpwd').value;

    if (!to || !subject || !visiblemessage) {
      console.log('validation error');
      return;
    }

    let sendBtn = document.getElementById('sendBtn');
    sendBtn.setAttribute("disabled", 'true');

    let finalMessage = visiblemessage;

    if (hiddenpwd) {
      let encryptor = new AES256();
      hiddenmessage = encryptor.encrypt(hiddenpwd, hiddenmessage);
      if (hiddenmessage) {
        let mask = new Mask();
        finalMessage = mask.encrypt(visiblemessage, hiddenmessage);
      }
    }
    let gm = new GmailManager();

    gm.loadGmailApi().then(() => {
      this.sendMessage({
        'To': to,
        'Subject': subject
      }, finalMessage + '\n\n\n\n\n sent by the mail ninja https://mailor-204416.firebaseapp.com/', this.sentMessageHandler);
    });
  }

  sentMessageHandler = () => {
    this.props.history.push('/maillist');
  }

  sendMessage = (headers_obj, message, callback) => {
    var email = '';

    for (var header in headers_obj)
      email += header += ": " + headers_obj[header] + "\r\n";

    email += "\r\n" + message;

    var sendRequest = window.gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });
    /*
  https://content.googleapis.com/gmail/v1/users/me/messages/send?alt=json 
    */

    return sendRequest.execute(callback);
  }



  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    emails = ContactsStore.getEmailSuggestions();
    console.log(emails);

    const { value, suggestions } = this.state;

    let required = 'required';

    const inputProps = {
      placeholder: 'To',
      value,
      onChange: this.onChange,
      className: 'form-control',
      required,
      id: 'to'
    };

    return (
      <main className="container">
        <div className="my-3 p-3 bg-white rounded box-shadow">
          <h6 className="border-bottom border-gray pb-2 mb-0">Compose</h6>
          <form className="needs-validation">
            <div className="mb-3">
              {/* <input type="email" className="form-control" id="to" placeholder="To" required /> */}
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <div className="invalid-feedback">
                Please enter a valid email address.
                      </div>
            </div>

            <div className="mb-3">
              <input type="text" className="form-control" id="subject" placeholder="Subject" required />
              <div className="invalid-feedback">
                Please type in your subject.
                      </div>
            </div>

            <div className="mb-3">
              <textarea rows="5" className="form-control" id="visiblemessage" placeholder="This is your visible message" required ></textarea>
              <div className="invalid-feedback">
                Please type in your message.
                      </div>
            </div>

            <div className="mb-3">
              <button className="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#hidden" aria-expanded="false" aria-controls="hidden">
                Add Hidden Message
                      </button>
            </div>

            <div className="collapse" id="hidden">
              <div className="mb-3">
                <textarea rows="5" className="form-control" id="hiddenmessage" placeholder="This is your hidden message" ></textarea>
              </div>

              <div className="mb-3">
                <input type="password" className="form-control" id="hiddenpwd" placeholder="Password to reveal hidden" />
              </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block" id="sendBtn" onClick={this.onClickHandler}>Send</button>
          </form>
        </div>
      </main>
    );

  }
}

export default EmailAutoSuggest;