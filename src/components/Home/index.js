import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps.js';
import MaterialUINavBar from '../Material-UI-NavBar';
import './index.css';

const Home = (props) => {
    const authentication = props.authentication;
    return (
        <div className="HomePage">
            <MaterialUINavBar />
            {/* <nav className="home-page-nav">
                {authentication ? <div className="welcome-msg"><div>Welcome Guest</div></div> : <LoginNavBar />}
                {authentication && <LogoutNavBar />}
            </nav> */}
            <h1>Xu Chen's React Practice Home Page</h1>
            {authentication ?
                <div>
                    <h2>click the button below to access class practice</h2>
                    <div className="Button-class">
                        <button onClick={() => props.history.push('/class-1')}>class_1(HW 1, 2)</button>
                        <button onClick={() => props.history.push('/class-2')}>class_2(HW 3, 5)</button>
                        <button onClick={() => props.history.push('/class-3')}>class_3(HW 4, 7)</button>
                        <button onClick={() => props.history.push('/class-4')}>class_4(HW route)</button>
                    </div>
                </div>
                :
                <h2 className="login-alert">please sign in to access Xhub</h2>
            }
            {authentication &&
                <iframe title="MangZhong"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/L1mInSrFCm0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            }
        </div>
    );
}

export default connect(mapStateToProps)(Home);