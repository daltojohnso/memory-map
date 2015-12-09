import React from 'react';
import 'styles/core.scss';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavbarBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import loginActions         from 'actions/login';
import {deleteUser} from '../utils';

const mapStateToProps = (state) => ({
  user : state.login.user,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(loginActions, dispatch)
});
export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render () {
    const location = window.location.pathname;
    let user;
    if (this.props.user)
      user = this.props.user.user;
    return (
      <div className='page-container'>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to='/' activeStyle={{color: '#33e0ff'}}>
                <div className='' />
                <span>GABGAB</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to='/mapview'>
                <NavItem eventKey={1}>Map</NavItem>
              </LinkContainer>

              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={2}>Login</NavItem>
              </LinkContainer>}
            </Nav>
            {user &&
                <Nav pullRight>
                  <NavItem eventKey={3}>{user}</NavItem>
                  <NavItem eventKey={4} onClick={::this.handleLogout}>Log Out</NavItem>

                </Nav>
                }
          </Navbar.Collapse>
        </Navbar>

        <div className='view-container'>
          {this.props.children}
        </div>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
