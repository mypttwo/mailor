import React, { Component } from 'react';
import cssClasses from './Signin.css';
import GmailManager from '../../utils/GmailManager';
import ContactUtil from '../../utils/ContactUtil';
import ContactsStore from '../../utils/ContactsStore';

class SignIn extends Component {
    onSignIn = (GoogleAuth, googleUser) => {
        let gm = new GmailManager();

        this.getConnections(gm);
        
        gm.checkIfRegistered().then((response) => {
            if (response.messages && response.messages.length > 0) {
                console.log('Registered earlier');
            } else {
                gm.registerUser(googleUser, this.onRegistrationComplete);
            }

        })
               
        this.props.isSignedIn(true, GoogleAuth, googleUser);
    }

    getConnections = (gmailMgr) => {
        gmailMgr.getConnections().then((response) => {
            let contactUtil = new ContactUtil();
            let contacts = contactUtil.sortContacts(response.result.connections);
            
            ContactsStore.sortedContacts =  contacts.sortedContacts;
            ContactsStore.noPhoneList = contacts.noPhoneList;
            ContactsStore.noEmails = contacts.noEmails;
            ContactsStore.nonGmailList = contacts.nonGmailList;
            ContactsStore.gmailList = contacts.gmailList;
            ContactsStore.initialized = true;
            
            console.log(ContactsStore.gmailList);

            ContactsStore.getEmailSuggestions();
            
            

        });
    }    

    onRegistrationComplete = () => {
        console.log('Registration completed');
        //this.props.history.push('/welcome');
    }
    
    onSignInFailure = () => {
        console.log('User sign in failed.');
    }

    componentDidMount = () => {
        this.loadGoogleAPI().then((resolve) => {
            //console.log("Gmail API loaded...");
        }, () => {
            console.log('Gmail API failed...');
        });

    }

    initGapi = (googleUser) => {
        let GoogleAuth = null;
        window.gapi.load('client:auth2', () => {
            // console.log('loaded auth2');
            window.gapi.auth2.init({
                client_id: '556628769119-bkl81otpdh9bjapjsv8pd3popt2nhef5.apps.googleusercontent.com'
            }).then(() => {
                GoogleAuth = window.gapi.auth2.getAuthInstance();

                // var user = GoogleAuth.currentUser.get();
                this.onSignIn(GoogleAuth, googleUser);
            });
        });
    }

    addSignInButton = () => {
        //Add signin button
        let btn = document.createElement('div');
        btn.setAttribute('class', 'g-signin2');
        btn.id = 'g-signin2';
        let signinBtnPlaceholder = document.getElementById('signinBtnPlaceholder');
        signinBtnPlaceholder.appendChild(btn);
    }

    loadGoogleAPI = () => {
        return new Promise((resolve, reject) => {
            this.addSignInButton();
            //Add script tag 
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/client.js?onload=renderButton';
            //Specify callback
            window.renderButton = () => {

                let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

                window.gapi.signin2.render('g-signin2', {
                    'scope': 'profile email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://mail.google.com/',
                    'onsuccess': this.initGapi,
                    'onfailure': this.onSignInFailure,
                    'discoveryDocs': DISCOVERY_DOCS,

                });

                resolve();
            }
            document.body.appendChild(script);
        });
    }

    render() {
        return (
            <div className={cssClasses.signInContainer}>
                <div id="signinBtnPlaceholder"></div>
            </div>
        );
    }
}

export default SignIn;