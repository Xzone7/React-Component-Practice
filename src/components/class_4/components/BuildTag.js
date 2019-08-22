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
            <div>
                {tagList.length > 0 &&
                    <ul>
                        {tagList.map((ele, index) => {
                            return <li key={index}>{ele}</li>;
                        })}
                    </ul>
                }
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        placeholder="Add a tag..."
                        value={userInput}
                        onChange={this.handleInputChange} />
                </form>
            </div>
        );
    }
}

export default BuildTag;