import React from 'react';
import Aux from '../../hoc/Aux';

let signInLayout = (props) => (
    <Aux>
        <div className="text-center">
        <h1>mailor</h1>
            <img src="favicon.ico" className="rounded mx-auto d-block" alt=""/>
        
            <main>
            
            <p className="lead">Do more with your Gmail</p>
            {props.children}
            </main>
            <div className="mx-auto pt-100">
                <a href="https://mailor-204416.firebaseapp.com/privacy-policy.html">Privacy Policy</a>
            </div> 
        </div>
    </Aux>    
    );

export default signInLayout;