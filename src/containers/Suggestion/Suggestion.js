import React, {Component} from 'react';
import GmailManager from '../../utils/GmailManager';

class Suggestion extends Component{

    onClickHandler = () => {
        let subject = 'Suggestion';
        let visiblemessage = document.getElementById('visiblemessage').value;

        if(!visiblemessage){    
            console.log('validation error');
            return;
        }

        let sendBtn = document.getElementById('sendBtn');
        sendBtn.setAttribute("disabled", 'true'); 

        let gm = new GmailManager();

        gm.sendAdminMail(subject, visiblemessage, this.sentMessageHandler);
    }

    sentMessageHandler = () => {
        this.props.history.push('/');
    }

    render(){
        return (
            <main className="container">
                <div className="my-3 p-3 bg-white rounded box-shadow">
                <h6 className="border-bottom border-gray pb-2 mb-0">Cool Features and Suggestions</h6>
                        <form className="needs-validation">
                            <div className="mb-3">
                            <textarea rows="5" className="form-control" id="visiblemessage" placeholder="Here is a cool feature..." required ></textarea>
                            <div className="invalid-feedback">
                                Please type in your message.
                            </div>
                            </div>
                            
                            <button className="btn btn-primary btn-lg btn-block" id="sendBtn" onClick={this.onClickHandler}>Send</button>
                        </form>
                    </div>
                </main>
    
        );
    }
}

export default Suggestion;