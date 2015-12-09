import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import loginActions         from 'actions/login';

const mapStateToProps = (state) => ({
    user: state.login.user,
    loggingIn: state.login.loggingIn,
    loginFailed: state.login.loginFailed,
    routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(loginActions, dispatch)
});
export class LoginView extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const user = this.refs.user;
        const password = this.refs.pw;
        this.props.actions.login({user: user.value, password: password.value});
    }

    render () {
        let user;
        if (this.props.user)
            user = this.props.user.user;


        const loggingIn = this.props.loggingIn;
        const loginFailed = this.props.loginFailed;
        let height = window.innerHeight - 70 + 'px';
        return (
            <div style={{height: '250px', marginTop:'100px'}} className='container'>
                <h1>Login</h1>
            {loggingIn &&
                <h2>Logging In...!</h2>
                }

            {loginFailed &&
                <h2>Login Failed :(</h2>
                }
            {!user &&
                <div>
                    <form className='login-form form-inline' onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input type="text" ref="user" placeholder="username" className="form-control"/>
                            <input type="password" ref="pw" placeholder="password" className="form-control"/>
                        </div>
                        <button className='btn btn-primary' onClick={this.handleSubmit}><i className='fa fa-sign-in' />
                            {' '}Log In
                        </button>
                    </form>
                </div>
                } {user &&
                <h3>
                    You're logged in as {user}.
                </h3>    }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
