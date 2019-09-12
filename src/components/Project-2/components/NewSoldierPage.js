import React from "react";
import MaterialUINavBar from '../../Material-UI-NavBar';
import MuiPhoneNumber from 'material-ui-phone-number';
import { DropzoneArea } from 'material-ui-dropzone'
import './NewSoldierPage.css';

class NewSoldierPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleImageUpload = file => {
        console.log(file);
    }

    render() {
        return (
            <div>
                <div>
                    <MaterialUINavBar />
                </div>
                <div className="project-2-newuser-container">

                    <header className="project-2-mainpage-header">
                        <img src="/armyLogo.png" alt="logo" className="project-2-mainpage-header-logo" />
                        <h2><span>New Soldier</span></h2>
                    </header>

                    <div className="project-2-newuser-form-container">
                        <form>
                            <div className="project-2-newuser-img-area">
                                <DropzoneArea onChange={this.handleImageUpload}
                                    filesLimit={1} />
                            </div>

                            <div className="project-2-newuser-input-area">
                                <div id="b-1988">
                                    <label>Name:</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Rank:</label>
                                    <input></input>
                                </div>

                                <div>
                                </div>

                                <div>
                                    <label>Start Date:</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Office Phone:</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Email:</label>
                                    <input></input>
                                </div>

                                <div>
                                    <label>Superior:</label>
                                    <input></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewSoldierPage;
