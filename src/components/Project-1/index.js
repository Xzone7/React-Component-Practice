import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin';

class Project_1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const authentication = this.props.authentication;
        return (
            authentication ?
                <div>Hello</div>
                :
                <RedirectToLogin />
        );
    }
}

export default connect(mapStateToProps)(Project_1);