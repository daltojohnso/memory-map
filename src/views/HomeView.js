import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import GabNote from '../components/GabNote';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
    routerState: state.router
});
export class HomeView extends React.Component {
    static propTypes = {
        actions: React.PropTypes.object,
        counter: React.PropTypes.number
    }

    render() {
        return (
            <GabNote />
        );
    }
}

export default connect(mapStateToProps)(HomeView);
