class GmailManager {

    loadGmailApi = () => {
        return new Promise(function(resolve, reject){
            window.gapi.client.load('gmail', 'v1', () => {
                resolve();
            });
        })
    }

    processMessageListResponse = (response) => {
        return new Promise(function(resolve, reject){
            let loadMessagePromiseArray = [];
            if (response.messages) {
                loadMessagePromiseArray = response.messages.map((message, index) => {
                    var getMailMessageRequest = window.gapi.client.gmail.users.messages.get({
                        'userId': 'me',
                        'id': message.id
                    });
                    return new Promise(function(resolve, reject){
                        getMailMessageRequest.execute((msg) => {
                            resolve(msg);
                        });
                    });
                });
            }
            resolve(loadMessagePromiseArray);
        });
    }

    

    executeMessageListRequest = () => {
        return new Promise(function(resolve, reject){
           
            let request = window.gapi.client.gmail.users.messages.list({
                'userId': 'me',
                'maxResults': 100,
                'q': '"sent by the mail ninja"'
            });

            request.execute((response) => {
                resolve(response);
            });
        });
    }


    getMessages = () => {
        console.log('Getting messages');
        
        return new Promise((resolve, reject) => {
            let messages = [];
            this.loadGmailApi().then(this.executeMessageListRequest)
            .then(this.processMessageListResponse)
            .then((loadMessagePromiseArray) => {
                Promise.all(loadMessagePromiseArray)
                    .then((responses) => {
                        responses.forEach(response => {
                            messages.push(response);
                        }
                    )
                    resolve(messages);
                }
                );
            })
        });
    }

    checkIfRegistered = () => {
        // " sent to the mail ninja" + subject:Registration 
        return new Promise((resolve, reject) => {
            this.loadGmailApi().then(() => {
                let request = window.gapi.client.gmail.users.messages.list({
                    'userId': 'me',
                    'maxResults': 1,
                    'q': '"sent to the mail ninja" + subject:Registration'
                });
    
                request.execute((response) => {
                    resolve(response);
                });                                
            })

        });
    }

    executeDeleteMessage = (messageId) => {
        return new Promise((resolve, reject) => {
          let request = window.gapi.client.gmail.users.messages.delete({
            'userId': 'me',
            'id': messageId
          });
          request.execute((resp) => { 
              console.log(resp);
              resolve(resp);
            });
        })
      }    

    deleteMessage = (messageId) => {
        return this.loadGmailApi()
            .then(() => this.executeDeleteMessage(messageId));
            
    }

    sendMessage = (headers_obj, message, callback) => {
        var email = '';
      
        for(var header in headers_obj)
          email += header += ": " + headers_obj[header]+"\r\n";
      
        email += "\r\n" + message;
      
        var sendRequest = window.gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
            'raw': window.btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_')
          }
        });
      
        return sendRequest.execute(callback);
      }

    sendAdminMail = (subject, message, callback) => {
        let to = 'mypt.infinity@gmail.com';
        this.loadGmailApi().then(() => {
            this.sendMessage({
                'To': to,
                'Subject': subject                
            }, message + '\n\n\n\n\n sent to the mail ninja', callback);
        });
    }

    registerUser = (googleUser, callback) => {
        this.sendAdminMail('Registration', '', callback);
    }

    loadGooglePeopleApi = () => {
        return new Promise(function(resolve, reject){
            window.gapi.client.load('people', 'v1', () => {
                resolve();
            });
        })
    }

    getConnections = () => {
        return this.loadGooglePeopleApi().then(this.listConnectionNames);
    }

    listConnectionNames = () => {
        return window.gapi.client.people.people.connections.list({
               'resourceName': 'people/me',
               'pageSize': 1000,
               'personFields': 'names,emailAddresses,phoneNumbers,photos',
             });
      }
}

export default GmailManager;