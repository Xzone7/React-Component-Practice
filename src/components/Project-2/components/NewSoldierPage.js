import React from "react";
import MaterialUINavBar from '../../Material-UI-NavBar';
import MuiPhoneNumber from 'material-ui-phone-number';
import { DropzoneArea } from 'material-ui-dropzone';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControllLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './NewSoldierPage.css';
import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class NewSoldierPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rank: "",
            sex: "",
            start_date: new Date(),
            phone: "",
            email: "",
            superior: ""
        }
    }

    handleImageUpload = file => {
        console.log(file);
    }

    handleRankChange = e => {
        this.setState({
            ...this.state,
            rank: e.target.value
        });
    }

    handleSexChange = sexData => {
        this.setState({
            ...this.state,
            sex: sexData
        });
    }

    handleStartDateChange = date => {
        this.setState({
            ...this.state,
            start_date: date
        });
    }

    render() {
        const rank = this.state.rank;
        const start_date = this.state.start_date;
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

                            <div className="project-2-newuser-input-area">
                                <div id="b-1988">
                                    <label>Name:</label>
                                    <input></input>
                                </div>

                                <div id="b-1988">
                                    <label>Rank:</label>
                                    <input list="rankname" value={rank} onChange={this.handleRankChange}/>
                                    <datalist id="rankname">
                                        <option value="General" />
                                        <option value="Colonel" />
                                        <option value="Major" />
                                        <option value="Captain" />
                                        <option value="Lieutenant" />
                                        <option value="Warrant Officer" />
                                        <option value="Sergeant" />
                                        <option value="Corporal" />
                                        <option value="Specialist" />
                                        <option value="Private" />
                                    </datalist>
                                </div>

                                <div id="b-1988">
                                    <label>Sex:</label>
                                    <RadioGroup aria-label="sex" name="customized-radios" style={{ flexDirection: "row" }}>
                                        <FormControllLabel value="male" control={<StyledRadio />} label="Male" onChange={() => this.handleSexChange("male")} />
                                        <FormControllLabel value="female" control={<StyledRadio />} label="Female" onChange={() => this.handleSexChange("female")} />
                                    </RadioGroup>
                                </div>

                                <div id="c-1993">
                                    <label>Start Date:</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            value={start_date}
                                            onChange={this.handleStartDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <div id="b-1988">
                                    <label>Office Phone:</label>
                                    <input></input>
                                </div>

                                <div id="b-1988">
                                    <label>Email:</label>
                                    <input></input>
                                </div>

                                <div id="b-1988">
                                    <label>Superior:</label>
                                    <input></input>
                                </div>
                            </div>

                            <div className="project-2-newuser-img-area">
                                <DropzoneArea onChange={this.handleImageUpload}
                                    filesLimit={1}
                                    acceptedFiles={['image/*']}
                                    maxFileSize={10000000} />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const StyledRadio = (props) => {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
});

export default NewSoldierPage;
