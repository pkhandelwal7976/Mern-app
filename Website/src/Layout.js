import React, { Component } from 'react'
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginForm        from "./component/loginFOrm/loginForm.js"
import SignUpForm       from "./component/signUp/signup.js"
import BlogList         from "./component/blogList/getList.js"
import BlogForm         from "./component/BlogForm/blogForm.js"


export default class Layout extends Component {
    render() {
        return (
            <div>
            <Router>
                <Switch>
                    <Route exact path="/"                component={LoginForm}/>
                    <Route exact path="/signup-form"     component={SignUpForm}/>
                    <Route exact path="/blog-list"       component={BlogList}/>
                    <Route exact path="/blog-form"       component={BlogForm}/>
                    <Route exact path="/blog-form/:id"   component={BlogForm}/>
                </Switch>
            </Router>
                
            </div>
        )
    }
}
