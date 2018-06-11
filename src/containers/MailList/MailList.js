import React, { Component } from 'react';
import MailListEntry from '../MailListEntry';
import View from '../View/View';
import GmailManager from '../../utils/GmailManager';

class MailList extends Component {
  state = {
    messages: [],
    messageToBeDisplayed: null
  };

  handleMessageClick = (message) => {
    this.setState({
      messageToBeDisplayed: message
    })
  }

  handleMessageCloseClick = () => {
    this.setState({
      messageToBeDisplayed: null
    })
  }

  handleMessageDeleteClick = (messageId) => {
    let gmailMgr = new GmailManager();
    gmailMgr.deleteMessage(messageId).then((resp) => {
      this.setState({
        messageToBeDisplayed: null
      })
      this.getMessages();
    });
  }

  getMessages = () => {
    let gmailMgr = new GmailManager();
    gmailMgr.getMessages().then((messages) => {
      this.setState({
        messages: messages
      });
    });
  }

  componentDidMount() {
    this.getMessages();
  }

  render() {
    console.log('messageToBeDisplayed : ', this.state.messageToBeDisplayed);

    if (this.state.messageToBeDisplayed) {
      return this.renderSpecificMessage();
    } else {
      return this.renderMessages();
    }
  }

  renderSpecificMessage = () => {
    return (
      <View message={this.state.messageToBeDisplayed} handleMessageDeleteClick={this.handleMessageDeleteClick} handleMessageCloseClick={this.handleMessageCloseClick} />
    );
  }

  renderMessages = () => {
    let messageArrayJSX = '';
    if (this.state.messages && this.state.messages.length > 0) {
      messageArrayJSX = this.state.messages.map((message) => {
        return (
          <div onClick={() => this.handleMessageClick(message)} key={message.id}>
            <MailListEntry message={message} />
          </div>
        )
      });
    } else {
      return ('');
    }

    return (
      <main role="main" className="container">
        <div className="my-3 p-3 bg-white rounded box-shadow">
          <h6 className="pb-2 mb-0">Recent</h6>
          {messageArrayJSX}
        </div>
      </main>
    );
  }
}

export default MailList;
