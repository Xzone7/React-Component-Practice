import React from "react";
import MaterialUINavBar from '../../Material-UI-NavBar';
import MuiPhoneNumber from 'material-ui-phone-number';
import { DropzoneArea } from 'material-ui-dropzone';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControllLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import './EditSoldierPage.css';
import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/armyTableActionCreator';
import * as avatars from '../default_icon';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
import LoadingPage from '../../Project-1/components/LoadingPage';

class EditSoldierPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            rank: "",
            sex: "",
            start_date: null,
            phone: "",
            email: "",
            superior: "none,none",
            nameErrorFlag: false,
            rankErrorFlag: false,
            dateErrorFlag: false,
            phoneErrorFlag: false,
            emailErrorFlag: false,
            avatar: null,
            preview_avatar: null,
            openUpload: false
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        const data = this.props.data;
        data.forEach((ele, index) => {
            for (let key in ele) {
                if (key === "_id" && ele[key] === userId) {
                    this.setState({
                        ...this.state,
                        name: ele.name,
                        rank: ele.rank,
                        sex: ele.sex,
                        start_date: new Date(ele.start_date),
                        phone: ele.phone,
                        email: ele.email,
                        superior: `${ele.superior.name ? ele.superior.name : "none"},${ele.superior._id ? ele.superior._id : "none"}`,
                        avatar: `data:image/jpeg;base64,${atob(base64ArrayBuffer(ele.avatar_img.data))}`,
                    });
                }
            }
        });
        this.props.getNoCircleSuperiorData(userId);
    }

    handlePreImgUpload = file => {
        if (file[0]) {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    ...this.state,
                    preview_avatar: reader.result
                });
            }

            reader.readAsDataURL(file[0]);
        } else {
            // delete preview in dropzone
            this.setState({
                ...this.state,
                preview_avatar: null
            });
        }
    }

    handleRealImgUpload = () => {
        const preview_avatar = this.state.preview_avatar;
        this.setState({
            ...this.state,
            avatar: preview_avatar ? preview_avatar : avatars.default_avatar,
            openUpload: false
        });
    }

    handleNameChange = e => {
        const regex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/g;
        const inputName = e.target.value;
        if (regex.test(inputName)) {
            this.setState({
                ...this.state,
                name: inputName,
                nameErrorFlag: false
            });
        } else {
            // If user input is not valid, fire flag on
            this.setState({
                ...this.state,
                name: inputName,
                nameErrorFlag: true
            });
        }
    }

    handleRankChange = e => {
        const allowRank = ["General", "Colonel", "Major", "Captain", "Lieutenant", "Warrant Officer", "Sergeant", "Corporal", "Specialist", "Private"];
        const inputRank = e.target.value.replace(/^\w/, c => c.toUpperCase());
        if (allowRank.find(ele => ele === inputRank)) {
            this.setState({
                ...this.state,
                rank: inputRank,
                rankErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                rank: inputRank,
                rankErrorFlag: true
            });
        }
    }

    handleSexChange = sexData => {
        this.setState({
            ...this.state,
            sex: sexData
        });
    }

    handleStartDateChange = date => {
        if (date) {
            this.setState({
                ...this.state,
                start_date: date,
                dateErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                start_date: date,
                dateErrorFlag: true
            })
        }
    }

    handlePhoneChange = value => {
        const regex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
        const americanPhone = value.slice(3);
        if (regex.test(americanPhone)) {
            this.setState({
                ...this.state,
                phone: value,
                phoneErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                phone: value,
                phoneErrorFlag: true
            });
        }
    }

    handleEmailChange = e => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const inputEmail = e.target.value;
        if (regex.test(inputEmail)) {
            this.setState({
                ...this.state,
                email: inputEmail,
                emailErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                email: inputEmail,
                emailErrorFlag: true
            })
        }
    }

    handleSuperiorChange = e => {
        this.setState({
            ...this.state,
            superior: e.target.value
        });
    }

    handleClickUploadandCancel = () => {
        this.setState({
            ...this.state,
            openUpload: !this.state.openUpload,
            preview_avatar: null
        });
    }

    handleClickCanclePage = () => {
        this.props.resetPage();
        this.props.history.push('/project-2');
    }

    handleSubmit = () => {
        const formCorrectFlag = (
            this.state.name.length > 0 && !this.state.nameErrorFlag &&
            this.state.rank.length > 0 && !this.state.rankErrorFlag &&
            this.state.sex.length > 0 &&
            this.state.start_date.toString() !== "Invalid Date" && !this.state.dateErrorFlag &&
            !this.state.phoneErrorFlag &&
            this.state.email.length > 0 && !this.state.emailErrorFlag);

        if (!formCorrectFlag) {
            alert("Please fill out required area!");
        } else {
            // serveral checks here: start_date --> convert to string, 
            //                       superior --> convert to object,
            //                       avatar --> convert to pure base64, remove data:*/*;base64, from the result. 
            const superiorRaw = this.state.superior.split(",");
            const superiorName = superiorRaw[0] === "none" ? null : superiorRaw[0];
            const superiorId = superiorRaw[1] === "none" ? null : superiorRaw[1];

            const editSoldierData = {
                avatar_img: this.state.avatar.split(",")[1],
                name: this.state.name,
                rank: this.state.rank,
                sex: this.state.sex,
                start_date: this.state.start_date.toLocaleDateString(),
                phone: this.state.phone,
                email: this.state.email,
                superior: { name: superiorName, _id: superiorId }
            };

            this.props.updateSoldier(this.props.match.params.userId, editSoldierData, this.props.history);
        }
    }

    render() {
        const name = this.state.name;
        const rank = this.state.rank;
        const start_date = this.state.start_date;
        const email = this.state.email;
        const superior = this.state.superior;
        const phone = this.state.phone;
        const sex = this.state.sex;
        const nameErrorFlag = this.state.nameErrorFlag;
        const rankErrorFlag = this.state.rankErrorFlag;
        const dateErrorFlag = this.state.dateErrorFlag;
        const phoneErrorFlag = this.state.phoneErrorFlag;
        const emailErrorFlag = this.state.emailErrorFlag;
        const openUpload = this.state.openUpload;
        const avatar = this.state.avatar;
        const allowSuperiorData = this.props.allowSuperiorData;
        const isLoad = this.props.isLoad;
        return (
            <div>
                <div>
                    <MaterialUINavBar />
                </div>
                {isLoad && <LoadingPage />}
                <div className="project-2-newuser-container">

                    <header className="project-2-mainpage-header">
                        <img src="/armyLogo.png" alt="logo" className="project-2-mainpage-header-logo" />
                        <h2><span>Update Soldier</span></h2>
                    </header>

                    <div className="project-2-newuser-form-container">
                        <div className="project-2-newuser-header">
                            <h2 id="chenxu-1993">Public profile</h2>
                            <div className="project-2-submit-button">
                                <button onClick={this.handleClickCanclePage}>Cancle</button>
                                <button onClick={this.handleSubmit}>Save profile</button>
                            </div>
                        </div>
                        <form>

                            <div className="project-2-newuser-input-area">
                                <div id="b-1988">
                                    <label>Name</label>
                                    <input id={nameErrorFlag ? "b-1998-error-input" : "1988"} value={name} onChange={this.handleNameChange}></input>
                                    {nameErrorFlag && <p className="b-1998-name-error">Invalid Name Format</p>}
                                </div>

                                <div id="b-1988">
                                    <label>Rank</label>
                                    <input id={rankErrorFlag ? "b-1998-error-input" : "1988"} list="rankname" value={rank} onChange={this.handleRankChange} />
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
                                    {rankErrorFlag && <p className="b-1998-name-error">Invalid Rank</p>}
                                </div>

                                <div id="b-1988">
                                    <label>Sex</label>
                                    <RadioGroup aria-label="sex" name="customized-radios" style={{ flexDirection: "row" }}>
                                        <FormControllLabel checked={sex === "Male" ? true : false} value="Male" control={<StyledRadio />} label="Male" onChange={() => this.handleSexChange("Male")} />
                                        <FormControllLabel checked={sex === "Female" ? true : false} value="Female" control={<StyledRadio />} label="Female" onChange={() => this.handleSexChange("Female")} />
                                    </RadioGroup>
                                </div>

                                <div id="c-1993">
                                    <label>Start Date</label>
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
                                    {dateErrorFlag && <p className="b-1998-name-error">Please enter your start date</p>}
                                </div>

                                <div id="c-1993">
                                    <label>Office Phone</label>
                                    <MuiPhoneNumber defaultCountry={'us'} disableAreaCodes onChange={this.handlePhoneChange} value={phone} />
                                    {phoneErrorFlag && <p className="b-1998-name-error">Invalid Phone number</p>}
                                </div>

                                <div id="b-1988">
                                    <label>Email</label>
                                    <input id={emailErrorFlag ? "b-1998-error-input" : "1988"} value={email} onChange={this.handleEmailChange} />
                                    {emailErrorFlag && <p className="b-1998-name-error">Invalid Email</p>}
                                </div>

                                <div id="b-1988">
                                    <label>Superior</label>
                                    <select onChange={this.handleSuperiorChange} value={superior}>
                                        <option value="none,none">None</option>
                                        {allowSuperiorData.map((ele, index) => {
                                            return (
                                                <option key={index} value={[ele.name, ele._id]}>{ele.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="cx-1993-p-container">
                                    <p className="cx-1993-p">All of the fields on this page are critical and can be deleted at any time,
                                        and by filling them out,
                                        you're giving us consent to share this data wherever your user profile appears.
                                        Please see our <a href="https://help.github.com/en/articles/github-privacy-statement">privacy statement</a> to learn more about how we use this information.
                                    </p>
                                </div>
                            </div>

                            <div className="project-2-newuser-img-area">
                                <div className="project-2-newuser-img-header-container">
                                    <label>Profile picture {avatar === avatars.default_avatar && "(default)"}</label>
                                    <img className="project-2-newuser-avatar-preview" src={avatar} alt="logo" />
                                </div>
                                <div>
                                    {!openUpload && <UploadButton onClose={this.handleClickUploadandCancel} />}
                                    {openUpload && <SaveAndCancleButton onCancle={this.handleClickUploadandCancel}
                                        onSave={this.handleRealImgUpload}
                                        preview_avatar={this.state.preview_avatar} />}
                                </div>
                                {openUpload &&
                                    <DropzoneArea
                                        open={openUpload}
                                        onChange={this.handlePreImgUpload}
                                        filesLimit={1}
                                        acceptedFiles={['image/*']}
                                        maxFileSize={10000000} />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div >
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

const UploadButton = ({ onClose }) => {
    const classes = useStyles();

    return (
        <div className="project-2-upload-button-container" >
            <Button variant="contained" color="default" size="small" className={classes.button} onClick={onClose}>
                Upload
            <CloudUploadIcon className={classes.rightIcon} />
            </Button>
        </div>
    );
}

const SaveAndCancleButton = ({ onCancle, onSave, preview_avatar }) => {
    const classes = useStyles();

    return (
        <div className="project-2-upload-button-container">
            <Button variant="contained" size="small" className={classes.button} onClick={onSave} disabled={!preview_avatar}>
                <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                Save
            </Button>
            <Button variant="contained" size="small" className={classes.button} onClick={onCancle}>
                Cancle
            </Button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
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
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

const base64ArrayBuffer = (arrayBuffer) => {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

const mapStateToProps = state => {
    return {
        data: state.armyTable.data,
        isLoad: state.armyTable.isLoad,
        allowSuperiorData: state.armyTable.allowSuperior
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getNoCircleSuperiorData: (id) => dispatch(actions.getNoCircleSuperiorData(id)),
        updateSoldier: (id, data, event) => dispatch(actions.putData(id, data, event)),
        resetPage: () => dispatch(actions.resetPage())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSoldierPage));
