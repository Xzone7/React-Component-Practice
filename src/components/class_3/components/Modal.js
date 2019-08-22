import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = { showModal: false };
    }

    onShowModal = () => {
        this.setState({ showModal: true });
    }

    onCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const props = this.props;
        return (
            <div className="modal-display">
                {this.state.showModal &&
                    <ModalBody
                        cancelButtonText={props.cancelButtonText}
                        content={props.content}
                        width={props.width}
                        onClose={this.onCloseModal} />}
                <button className="open-button" onClick={this.onShowModal}>{props.buttonText || "OpenByDefault"}</button>
            </div>
        );
    }
}

function ModalBody(props) {
    const widthStyle = { width: props.width || 500 };
    return (
        <div className="modal-main">
            <div className="modal" style={widthStyle}>
                <h2>Modal Title</h2>
                {props.content || <div className="content">Default modal text</div>}
                <div className="actions">
                    <button className="toggle-button" onClick={props.onClose}>{props.cancelButtonText || "CloseByDefault"}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;