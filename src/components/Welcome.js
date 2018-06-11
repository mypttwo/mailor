import React from 'react';
import { Link } from 'react-router-dom';

let welcome = () => {
    return (
        <main role="main" className="container">
        <div className="my-3 p-3 rounded box-shadow">
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Hi!</strong> Email apps are usually boring. Why use email anyway? - Unless you like promotions, official (yawn!) boring mails and spam.😒
        <p><strong>Good news :  this isn't another email app.</strong> Couple of things straight off - </p>
          <p><strong>mailor does not list any email that has not been sent by the mailor app.</strong> Which is why you arent seeing your other emails. <Link to={{pathname:'/compose'}}>Try sending a mail to a friend to begin with</Link></p>
          <p><strong>mailor only works with Gmail.</strong> We dont support other providers - for now.</p>
          <p><strong>mailor does not store any data on its servers.</strong> Every mail you send is stored only on your Gmail inbox.</p>
          <p><strong>This is work in progress.</strong> All normal email features are not available - and may not be in the future. However we will try to put in more interesting stuff - different from other email providers 😎. <Link to={{pathname:'/suggestion'}}>Go ahead and suggest a cool feature if you have one!</Link></p>
            {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>         */}
      </div>
      </div>
      </main>
    );
}

export default welcome;