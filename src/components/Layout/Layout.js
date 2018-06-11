import React from 'react';
import Aux from '../../hoc/Aux';

let layout = (props) => (
    <Aux>
        <main>
            {props.children}
        </main>
    </Aux>    
    );

export default layout;