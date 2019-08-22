import React from 'react';
import Table from './components/Table.js';
import Iphone from './components/Iphone.js';
import Counter from './components/Counter.js';
import BackButton from '../BackButton/backButton.js';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin.js';
import mapStateToProps from '../../redux/config/mapStateToProps.js';
import { connect } from 'react-redux';
import './index.css';

const Class_1 = (props) => {
    return props.authentication ?
        <div className="Class-1-Page">
            <BackButton />
            <div className="Container-Table">
                <Table />
            </div>
            <br></br>
            <div className="Container-Iphone">
                <Iphone />
            </div>
            <br></br>
            <div className="Container-Counter">
                <Counter />
            </div>
        </div>
        :
        <RedirectToLogin />
}

export default connect(mapStateToProps)(Class_1);