import React, { Component } from 'react';
import MailReader from '../../utils/MailReader';
import Mask from '../../utils/Mask';
import AES256 from '../../utils/AES256';
import {TRACKER, TRACKER_AND_URL} from '../../utils/Utils';


class View extends Component {

  noHiddenMessage = "No hidden message...";

  handleMessageDeleteClick = () => {
    this.props.handleMessageDeleteClick(this.props.message.id);
    this.props.handleMessageCloseClick();
  }

  handleMessageUnhideClick = () => {

    let reader = new MailReader();
    let body = reader.getBody(this.props.message.payload).replace(TRACKER_AND_URL, "");

    let hiddenpwd = document.getElementById('hidden-message-password').value;
    if (hiddenpwd) {

      let mask = new Mask();
      let unmaskedTxt = mask.decrypt(body);

      if (unmaskedTxt) {
        let encryptor = new AES256();
        let hiddenmessage = encryptor.decrypt(hiddenpwd, unmaskedTxt);
        if (!hiddenmessage.startsWith(TRACKER)) {
          hiddenmessage = this.noHiddenMessage;
        } else {
          hiddenmessage = hiddenmessage.replace(TRACKER, '');
        }

        if (hiddenmessage) {
          let hm = document.getElementById('hidden-message');
          hm.innerHTML = hiddenmessage;
        }
      }
    }
  }


  render() {
    let reader = new MailReader();
    let to = 'To : ' + reader.getHeader(this.props.message, 'To');
    let from = 'From : ' + reader.getHeader(this.props.message, 'From');
    let subject = reader.getHeader(this.props.message, 'Subject');
    let date = reader.getHeader(this.props.message, 'Date');
    let body = reader.getBody(this.props.message.payload).replace(TRACKER_AND_URL, "");

    let outerDivClassName = 'card'; //SENT
    let receiver = to;
    let label = 'SENT';

    if (this.props.message.labelIds.includes('INBOX')) { //INBOX
      outerDivClassName = 'card';
      receiver = from;
      label = 'INBOX';
    }

    return (
      <main role="main" className="container my-3">
        <div className={outerDivClassName}>
          <div className="card-header">
            {subject} <span className="badge badge-secondary">{label}</span>
            <div className="btn-group btn-group-sm float-right" role="group" aria-label="mail buttons">
              {/* <button type="button" className="btn btn-light"><i className="fa fa-user-secret"></i></button> */}
              <button type="button" className="btn btn-light" onClick={this.handleMessageDeleteClick}><i className="fa fa-trash-alt" /></button>
              <button type="button" className="btn btn-light" onClick={this.props.handleMessageCloseClick}><i className="fa fa-times"></i></button>
            </div>
          </div>
          <div className="card-body">
            <small className="text-primary">{receiver}</small>
            <h6 className="small text-secondary">{date}</h6>
            <p className="card-text">{body}</p>
            <input type="password" className="form-control form-control-sm mt-3 mb-3" id="hidden-message-password" placeholder="Password" />
            <button onClick={this.handleMessageUnhideClick} className="btn btn-secondary btn-sm" type="button">
              Check Hidden Message
      </button>
          </div>
        </div>
        <div className='media pt-3 alert alert-info mt-3'>
          <div className="media-body pb-3 mb-0 lh-125">
            <span className="mt-3" id="hidden-message">No hidden message...</span>
          </div>
        </div>
      </main>
    );

  }
}

export default View;

