import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import MailList from '../../containers/MailList/MailList';
import Compose from '../../containers/Compose/Compose';
import Welcome from '../Welcome';
import Suggestion from '../../containers/Suggestion/Suggestion';
import ContactListWrapper from '../../containers/ContactList/ContactListWrapper';

let naveBar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand " href="/">{props.googleUser.getBasicProfile().getName()}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <NavLink to={{pathname:'/welcome'}} className="nav-link" > Welcome </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={{pathname:'/contacts'}} className="nav-link" > Contacts </NavLink>
                    </li>                      
                    <li className="nav-item">
                    <NavLink to={{pathname:'/suggestion'}} className="nav-link" > Suggestions </NavLink>
                    </li> 
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                </ul>
                {/* <form className="form-inline my-2 my-lg-0 mr-1">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>  */}
                <div className="mt-1">
                    {props.children}
                </div>
                
            </div>
        </nav>
    <div className="nav-scroller bg-light box-shadow">
    <nav className="nav nav-underline">
                <NavLink to={{pathname:'/maillist'}} className="nav-link active " > Messages </NavLink>

      {/* <NavLink className="nav-link" to={{pathname:'/contacts'}} >
        Contacts
        <span className="badge badge-pill bg-light align-text-bottom">27</span>
      </NavLink> */}
      <NavLink className="nav-link" to={{pathname:'/compose'}} href="/compose">Compose</NavLink>
    </nav>
  </div>
  {/* <Route path="/" exact component={Welcome} /> */}
  <Route path="/maillist" exact component={MailList} />
  <Route path="/compose" exact component={Compose} />
  <Route path="/welcome" exact component={Welcome} />
  <Route path="/suggestion" exact component={Suggestion} />
  <Route path="/contacts" exact component={ContactListWrapper} />
  
  </div>   
  
    );
}

export default naveBar;