import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SaveAlt from '@material-ui/icons/SaveAlt';
import * as actions from '../../../redux/actions/userTableActionCreator';

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            sex: "",
            age: "",
            password: "",
            repeat: ""
        };
    }

    componentDidMount = () => {
        const userId = this.props.match.params.userId;
        const data = this.props.data;
        data.forEach((ele, index) => {
            for (let key in ele) {
                if (key === "_id" && ele[key] === userId) {
                    this.setState({
                        ...this.state,
                        firstname: ele.firstname,
                        lastname: ele.lastname,
                        sex: ele.sex,
                        age: ele.age,
                        password: ele.password
                    });
                }
            }
        });
    }

    handleOnChangeFirstname = e => {
        this.setState({
            ...this.state,
            firstname: e.target.value
        });
    }

    handleOnChangeLastname = e => {
        this.setState({
            ...this.state,
            lastname: e.target.value
        });
    }

    handleOnChangeSex = e => {
        this.setState({
            ...this.state,
            sex: e.target.value
        });
    }

    handleOnChangeAge = e => {
        this.setState({
            ...this.state,
            age: e.target.value
        });
    }

    handleOnChangePassword = e => {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    }

    handleOnChangeRepeat = e => {
        this.setState({
            ...this.state,
            repeat: e.target.value
        });
    }

    handleSaveUser = e => {
        e.preventDefault();
        const newUserData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            sex: this.state.sex,
            age: this.state.age,
            password: this.state.password
        }
        this.props.putData(this.props.match.params.userId, newUserData);
        this.props.history.push('/project-1');
    }

    render() {
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const sex = this.state.sex;
        const age = this.state.age;
        const password = this.state.password;
        const repeat = this.state.repeat;
        const enableFlag = firstname.length > 0 && lastname.length && sex.length > 0 &&
            age.length > 0 && password.length > 0 && repeat.length > 0 &&
            (password === repeat)
        return (
            <div className="project-1-newuser-container">
                <div className="project-1-newuser-wrapper">
                    <h1 className="project-1-newuser-title">Edit User:</h1>
                    <form onSubmit={this.handleSaveUser}>
                        <div className="project-1-newuser-fillarea">
                            <div>
                                <label>First Name:</label>
                                <input type="text"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={this.handleOnChangeFirstname} />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <input type="text"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={this.handleOnChangeLastname} />
                            </div>
                            <div>
                                <label>Sex:</label>
                                <input type="text"
                                    placeholder="Sex"
                                    value={sex}
                                    onChange={this.handleOnChangeSex} />
                            </div>
                            <div>
                                <label>Age:</label>
                                <input type="text"
                                    placeholder="Age"
                                    value={age}
                                    onChange={this.handleOnChangeAge} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleOnChangePassword} />
                            </div>
                            <div>
                                <label>Repeat:</label>
                                <input type="password"
                                    placeholder="Repeat Password"
                                    value={repeat}
                                    onChange={this.handleOnChangeRepeat} />
                            </div>
                        </div>
                        <div className="project-1-newuser-button-container">
                            <Button variant="contained"
                                id="project-1-save-newuser-button"
                                disabled={!enableFlag}
                                type="submit"
                                value="submit">
                                <span>
                                    <SaveAlt />
                                </span>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.userTable.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putData: (id, data) => dispatch(actions.putData(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);