const mapStateToProps = state => {
    return {
        authentication: state.login.authentication
    };
};

export default mapStateToProps;