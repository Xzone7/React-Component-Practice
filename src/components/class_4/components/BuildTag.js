import React, { Component } from 'react';
import './BuildTag.css';

class BuildTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagList: [],
            userInput: ""
        };
    }

    handleInputChange = e => {
        this.setState({ userInput: e.target.value });
    }

    handleTagClose = id => {
        const newList = this.state.tagList.filter((ele, index) => index !== id);
        this.setState({
            tagList: newList
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            tagList: [...this.state.tagList, this.state.userInput],
            userInput: ""
        });
    }

    render() {
        const tagList = this.state.tagList;
        const userInput = this.state.userInput;
        return (
            <div className="tag-container-wrapper">
                {tagList.length > 0 &&
                    <div>
                        <ul className="tag-list">
                            {tagList.map((ele, index) => {
                                return (
                                    <li className="tag" key={index}>
                                        {ele}
                                        <span className="tag-close" onClick={() => this.handleTagClose(index)}>
                                            x
                                    </span>
                                    </li>);
                            })}
                        </ul>
                    </div>
                }
                <div>
                    <form className="tag-form" onSubmit={this.handleSubmit}>
                        <input className="tag-input"
                        type="text"
                            placeholder="Add a tag..."
                            value={userInput}
                            onChange={this.handleInputChange} />
                    </form>
                </div>
            </div>
        );
    }
}

export default BuildTag;