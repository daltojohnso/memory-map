import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import loginActions         from 'actions/login';

const mapStateToProps = (state) => ({
    user: state.login.user,
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
        const user = this.props.user;
        let height = window.innerHeight - 70 + 'px';
        return (
            <div style={{height: '250px', marginTop:'100px'}} className='container'>
                <h1>Login</h1>
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
                <div>
                    <p>You're logged in as {user}.</p>
                </div>    }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
