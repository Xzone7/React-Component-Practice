import React, { Component } from 'react';
import axios from 'axios';
import './EmailClient.css';
import Create from '@material-ui/icons/Create';
import Inbox from '@material-ui/icons/Inbox';
import Send from '@material-ui/icons/Send';
import Drafts from '@material-ui/icons/Drafts';
import Trash from '@material-ui/icons/Delete';


class EmailClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxData: [],
            trashData: [],
            detailData: [],
            isUnread: 0
        };
    }

    componentDidMount() {
        axios
            .get("http://api.haochuan.io/emails")
            .then(res => {
                this.setState({
                    ...this.state,
                    inboxData: res.data.emailData.filter((ele, index) => ele.tag === "inbox"),
                    isUnread: res.data.emailData.filter((ele, index) => ele.read === "false").length
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleParseTime(time) {
        const arr = new Date(time).toString().split(" ");
        return `${arr[1].toUpperCase()} ${arr[2]}, ${arr[3]}`;
    }

    handleShowDetail = (ele, id) => {
        /* For further use, even though it's not nessessary now */
        const updatedInboxData = this.state.inboxData.map((e, index) => {
            if (index === id) {
                /* DONT DO e.read = "true", immutable of state is broken if you do so */
                return {...e, read: "true"};
            }
            return e;
        });
        /* Even though we can just check ele.read === false then put isUnread - 1.
           But to maintain clear pysical meanning of isUnread, we calculate the length again.
           Not sure if this performs good under heavy load */
        this.setState({
            ...this.state,
            inboxData: updatedInboxData,
            detailData: this.state.inboxData.filter((ele, index) => index === id),
            isUnread: updatedInboxData.filter((e, index) => e.read === "false").length
        });
    }

    render() {
        console.log(this.state);
        const inboxData = this.state.inboxData;
        const trashData = this.state.trashData;
        const detailData = this.state.detailData;
        const isUnread = this.state.isUnread;
        const trashCount = this.state.trashData.length;
        return (
            <div className="email-client-container">
                <nav className="nav-bar-container">
                    <div className="compose-section">
                        <span>Compose</span>
                        <span><Create /></span>
                    </div>

                    <div className="direct-button-section">

                        <div className="inbox-button">
                            <span className="direct-button-span"><Inbox /></span>
                            <span className="direct-button-span">Inbox</span>
                            <span className="direct-button-showNumber">{isUnread}</span>
                        </div>

                        <div className="sent-button">
                            <span className="direct-button-span"><Send /></span>
                            <span className="direct-button-span">Sent</span>
                            <span className="direct-button-showNumber">0</span>
                        </div>

                        <div className="drafts-button">
                            <span className="direct-button-span"><Drafts /></span>
                            <span className="direct-button-span">Drafts</span>
                            <span className="direct-button-showNumber">0</span>
                        </div>

                        <div className="trash-button">
                            <span className="direct-button-span"><Trash /></span>
                            <span className="direct-button-span">Trash</span>
                            <span className="direct-button-showNumber">{trashCount}</span>
                        </div>
                    </div>
                </nav>

                <div className="snap-bar-container">
                    {inboxData.map((ele, index) => {
                        return (
                            <div key={index}
                                className={index !== inboxData.length - 1 ? "snap-box" : "snap-box-tail"}
                                onClick={() => this.handleShowDetail(ele, index)}>
                                <div className="snap-bar-box-header">
                                    <div className="snap-bar-box-subject">{ele.subject}</div>
                                    {ele.read === "false" && <span className="snap-bar-box-readFlag">.</span>}
                                </div>
                                <div className="snap-bar-box-footer">
                                    <div className="snap-bar-box-from">{ele.from}</div>
                                    <div className="snap-bar-box-time">{this.handleParseTime(ele.time)}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="detail-bar-container">
                    {detailData.map((ele, index) => {
                        return (
                            <div key={index}>
                                {ele.subject}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const Detail = () => {
    return (
        <div className="detail-box-container">

        </div>
    );
}

export default EmailClient;