import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import url from './authenticationServerConfig.js';
import LoginError from './components/LoginError/LoginError.js';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordHidden: true,
            showModal: false,
            err: false
        };
    }

    componentDidMount = () => {
        /* Once logged in, '/login' page will never show  */
        if (this.props.authentication) {
            this.props.history.push("/");
        }
    }

    handleUsernameChange = e => {
        this.setState({ username: e.target.value });
        console.log(`set username to: ${e.target.value}`);
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
        console.log(`set password to: ${e.target.value}`);
    }

    handlePasswordHidden = () => {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    handleForgetPsw = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    handleCloseError = () => {
        this.setState({ err: false });
    }

    /* Ask server for authentication check */
    handleSubmit = e => {
        e.preventDefault();
        const postBody = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(url, postBody)
        .then(res => {
            /* if authentication passed, header status is 200 */
            // set redux store authentication to true to unlock other pages
            this.props.dispatch({ type: "ACCEPTED" });
            // Redirect to home page
            this.props.history.push("/");
        })
        .catch(error => {
            /* if authentication failed, header status is 401-Unauthorized */
            console.error(error);
            // set redux store authentication to false to still lock other pages
            this.props.dispatch({ type: "REJECTED" });
            // re-render to send user error massage
            this.setState({ err: true }); 
        });
    }

    render() {
        const username = this.state.username;
        const password = this.state.password;
        const passwordHidden = this.state.passwordHidden;
        const showModal = this.state.showModal;
        const err = this.state.err;
        return (
            <div className="login-page-home">
                <div className="img-display">
                    <img src="https://camo.githubusercontent.com/8fbfafc84953b6588edeedf5c760d51cf47a60fe/687474703a2f2f786168617274732e6f72672f66756e6e792f692f6769746f707573732f69726f6e6d616e5f6f63746f6361742e6a7067"
                        alt="https://camo.githubusercontent.com/8fbfafc84953b6588edeedf5c760d51cf47a60fe/687474703a2f2f786168617274732e6f72672f66756e6e792f692f6769746f707573732f69726f6e6d616e5f6f63746f6361742e6a7067">
                    </img>
                </div>
                <h1 className="login-header">Sign in to XHub</h1>
                {err && <LoginError onClose={this.handleCloseError}/>}
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text"
                                placeholder="username"
                                value={username}
                                onChange={this.handleUsernameChange} />
                            <input type={passwordHidden ? "password" : "text"}
                                placeholder="password"
                                value={password}
                                onChange={this.handlePasswordChange} />
                            <i className={passwordHidden ? "fa fa-eye" : "fa fa-eye-slash"}
                                onClick={this.handlePasswordHidden} />
                        </div>
                        <button type="submit" value="Submit">login</button>
                        <div className="message">
                            <p onClick={this.handleForgetPsw}>Forgot password?</p>
                        </div>
                        {showModal && <div className="message">Try username: today, password: yyyy/mm/dd</div>}
                    </form>
                </div>
                <div>
                    <ul className="footer">
                        <li><a href="https://help.github.com/en/articles/github-terms-of-service">Terms</a></li>
                        <li><a href="https://help.github.com/en/articles/github-privacy-statement">Privacy</a></li>
                        <li><a href="https://github.com/security">Security</a></li>
                        <li onClick={() => alert("Email me: xuchen2019.work@gmail.com")}>Contact Author</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    };
}

export default connect(mapStateToProps)(Login);