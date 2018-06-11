import React, {Component} from 'react';
import MailReader from '../utils/MailReader';
import Mask from '../utils/Mask';
import { TRACKER_AND_URL, TRACKER } from '../utils/Utils';
let dateformat = require('dateformat');

class MailListEntry extends Component {

    makeSnippet = (str) => {
        let arr = [];
        arr = str.split(' ');
        arr = arr.slice(0, 10);
        str = arr.join(' ');
        return str;
    }


    render(){
        console.log(this.props.message);


        let reader = new MailReader();

        let to = 'To : ' + reader.getHeader(this.props.message, 'To');
        let from = 'From : ' + reader.getHeader(this.props.message, 'From');
        let subject = reader.getHeader(this.props.message, 'Subject');
        
        let date = reader.getHeader(this.props.message, 'Date');
        date = date.split('-')[0];

        
        //let body = reader.getBody(this.props.message.payload).replace("sent by the mail ninja https://mailor-204416.firebaseapp.com/","");
        let body = reader.getBody(this.props.message.payload).replace(TRACKER_AND_URL,"");
        if(body){
            //body = body.replace('sent by the mail ninja',"");
            body = body.replace(TRACKER,"");
            let mask = new Mask();
            body = this.makeSnippet(mask.getOriginal(body));
        }
        
        let outerDivClassName = 'media pt-3 alert alert-warning'; //SENT
        let receiver = to;
        let label = 'SENT';

        if(this.props.message.labelIds.includes('INBOX')){ //INBOX
            outerDivClassName = 'media pt-3 alert alert-primary';
            receiver = from;
            label = 'INBOX';
        } 
        
        return(
                <div className={outerDivClassName} >
                    <div className="media-body pb-2 mb-0 lh-125">
                        <strong className="d-block">{subject} <span className="badge badge-secondary">{label}</span></strong>
                        <small className="text-primary">{receiver}</small>
                        <div className="small">{body}</div>
                        <div className="small text-secondary">{date}</div>
                    </div>
            </div>
        );       
    }
}

export default MailListEntry;

