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
            sentData: [],
            draftData: [],
            trashData: [],
            detailData: [],
            isUnread: 0,
            swtichFlag: [true, false, false, false]
        };
    }

    componentDidMount() {
        axios
            .get("http://api.haochuan.io/emails")
            .then(res => {
                this.setState({
                    ...this.state,
                    inboxData: res.data.emailData.filter((ele, index) => ele.tag === "inbox"),
                    trashData: res.data.emailData.filter((ele, index) => ele.tag === "deleted"),
                    isUnread: res.data.emailData.filter((ele, index) => ele.read === "false").length
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleShowDetail = (dataID, id) => {
        switch (dataID) {
            case 0:
                /* For further use, even though it's not nessessary now */
                const updatedInboxData = this.state.inboxData.map((e, index) => {
                    if (index === id) {
                        /* DONT DO e.read = "true", immutable of state is broken if you do so */
                        return { ...e, read: "true" };
                    }
                    return e;
                });
                /* Even though we can just check ele.read === false then put isUnread - 1.
                   But to maintain clear pysical meanning of isUnread, we calculate the length again.
                   Not sure if this performs good under heavy load */
                this.setState({
                    ...this.state,
                    inboxData: updatedInboxData,
                    detailData: updatedInboxData.filter((ele, index) => index === id),
                    isUnread: updatedInboxData.filter((e, index) => e.read === "false").length
                });
                break;
            case 3:
                this.setState({
                    ...this.state,
                    detailData: this.state.trashData.filter((e, index) => index === id)
                })
                break;
            default:
                // hard code now since test data has no sent/drafts data
                break;
        }
    }

    handleParseDetailTime = time => {
        const arr = new Date(time).toString().split(" ");
        console.log(arr);
        return `${arr[1]} ${arr[2]}, ${arr[3]} • ${arr[4]}`;
    }

    handleClickNav = id => {
        const updatedSwtichFlag = this.state.swtichFlag.map((e, index) => {
            if (index === id) {
                return true;
            }
            return false;
        });
        this.setState({
            ...this.state,
            detailData: [],
            swtichFlag: updatedSwtichFlag
        });
    }

    render() {
        const inboxData = this.state.inboxData;
        const sentData = this.state.sentData;
        const draftData = this.state.draftData;
        const trashData = this.state.trashData;
        const detailData = this.state.detailData;
        const isUnread = this.state.isUnread;
        const trashCount = this.state.trashData.length;
        const swtichFlag = this.state.swtichFlag;
        return (
            <div className="email-client-container">
                <nav className="nav-bar-container">
                    <div className="compose-section">
                        <span>Compose</span>
                        <span><Create /></span>
                    </div>

                    <div className="direct-button-section">

                        <div className="inbox-button" onClick={() => this.handleClickNav(0)}>
                            <span className="direct-button-span"><Inbox /></span>
                            <span className="direct-button-span">Inbox</span>
                            <span className="direct-button-showNumber">{isUnread}</span>
                        </div>

                        <div className="sent-button" onClick={() => this.handleClickNav(1)}>
                            <span className="direct-button-span"><Send /></span>
                            <span className="direct-button-span">Sent</span>
                            <span className="direct-button-showNumber">0</span>
                        </div>

                        <div className="drafts-button" onClick={() => this.handleClickNav(2)}>
                            <span className="direct-button-span"><Drafts /></span>
                            <span className="direct-button-span">Drafts</span>
                            <span className="direct-button-showNumber">0</span>
                        </div>

                        <div className="trash-button" onClick={() => this.handleClickNav(3)}>
                            <span className="direct-button-span"><Trash /></span>
                            <span className="direct-button-span">Trash</span>
                            <span className="direct-button-showNumber">{trashCount}</span>
                        </div>
                    </div>
                </nav>

                <div className="snap-bar-container">
                    {swtichFlag[0] && (inboxData.length === 0 ? <EmptyPage /> : <SnapContent targetData={[inboxData, 0]} showDetail={this.handleShowDetail} />)}
                    {swtichFlag[1] && (sentData.length === 0 ? <EmptyPage /> : <SnapContent targetData={[sentData, 1]} showDetail={this.handleShowDetail} />)}
                    {swtichFlag[2] && (draftData.length === 0 ? <EmptyPage /> : <SnapContent targetData={[draftData, 2]} showDetail={this.handleShowDetail} />)}
                    {swtichFlag[3] && (trashData.length === 0 ? <EmptyPage /> : <SnapContent targetData={[trashData, 3]} showDetail={this.handleShowDetail} />)}
                </div>

                <div className="detail-bar-container">
                    {detailData.map((ele, index) => {
                        return (
                            <div key={index} className="detail-box">
                                <div className="detail-box-header-container">
                                    <div className="detail-box-header">
                                        <h2 className="detail-box-subject">{ele.subject}</h2>
                                        {ele.tag === "inbox" && <div className="detail-box-icon-container"><span className="detail-box-icon"><Trash /></span></div>}
                                    </div>
                                    <div className="detail-box-footer">
                                        <div className="detail-box-from">{ele.from}</div>
                                        <div className="detail-box-time">{this.handleParseDetailTime(ele.time)}</div>
                                    </div>
                                </div>
                                <div className="detail-box-msg-container">
                                    <div className="detail-box-msg">{ele.message}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const SnapContent = ({ targetData, showDetail }) => {
    return (
        targetData[0].map((ele, index) => {
            return (
                <div key={index}
                    className={index !== targetData[0].length - 1 ? "snap-box" : "snap-box-tail"}
                    onClick={() => showDetail(targetData[1], index)}>
                    <div className="snap-bar-box-header">
                        <div className="snap-bar-box-subject">{ele.subject}</div>
                        {ele.read === "false" && <div className="snap-bar-box-readFlag"><span className="snap-bar-box-dot"></span></div>}
                    </div>
                    <div className="snap-bar-box-footer">
                        <div className="snap-bar-box-from">{ele.from}</div>
                        <div className="snap-bar-box-time">{handleParseTime(ele.time)}</div>
                    </div>
                </div>
            );
        })
    );
}

const EmptyPage = () => {
    return (
        <div className="snap-empty-msg">Nothing to see here, great job!</div>
    );
}

const handleParseTime = time => {
    const arr = new Date(time).toString().split(" ");
    return `${arr[1].toUpperCase()} ${arr[2]}, ${arr[3]}`;
}

export default EmailClient;