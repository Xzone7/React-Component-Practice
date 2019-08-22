import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordHidden: true,
            authentication: false
        };
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
        console.log(`set username to: ${e.target.value}`);
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
        console.log(`set password to: ${e.target.value}`);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const username = this.state.username;
        const password = this.state.password;
        const passwordCheck = this.getDate();
        if (username === "today" && password === passwordCheck[0]) {
            this.setState({ authentication: true });
        } else if (username === "tomorrow" && password === passwordCheck[1]) {
            this.setState({ authentication: true });
        } else if (username === "yesterday" && password === passwordCheck[2]) {
            this.setState({ authentication: true });
        } else {
            alert("username or password is wrong!");
        }
    }

    handleLogout = () => {
        this.setState({
            authentication: false,
            password: ""
        });
    }

    getDate = () => {
        const today = new Date();
        const tomorrow = new Date();
        const yesterday = new Date();
        tomorrow.setDate(today.getDate() + 1);
        yesterday.setDate(today.getDate() - 1);
        const todayStr = today.toISOString().slice(0, 10).replace(/-/g, "");
        const tomorrowStr = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");
        const yesterdayStr = yesterday.toISOString().slice(0, 10).replace(/-/g, "");
        return [todayStr, tomorrowStr, yesterdayStr];
    }

    handlerPasswordHidden = () => {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    render() {
        if (this.state.authentication) {
            return (
                <div className="logout-page">
                    <h1>Welcome {this.state.username}</h1>
                    <button onClick={this.handleLogout}>logout</button>
                </div>
            );
        } else {
            return (
                <div className="login-page">
                    <div className="form">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <div>
                                <input type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange} />
                                <input className="password-input"
                                    type={this.state.passwordHidden ? "password" : "text"}
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange} />
                                <i className={this.state.passwordHidden ? "fa fa-eye" : "fa fa-eye-slash"}
                                    onClick={this.handlerPasswordHidden}></i>
                            </div>
                            <button type="submit" value="Submit">login</button>
                            <p className="message">
                                Not registered?
                            <a href="#" onClick={() => alert("Oops, this feature is not complete yet!")}>Create an account</a>
                            </p>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default LoginForm;