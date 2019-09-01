import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/userTableActionCreator';

class UserTableMain extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const data = this.props.data;
        return (
            <div>
                {data.map((ele, index) => {
                    return (
                        <div key={index}>
                            {ele.firstname}
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.userTable.data,
        isLoad: state.userTable.isLoad,
        err: state.userTable.err
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions.getData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTableMain);
