import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import {Well} from 'react-bootstrap';

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
        let height = window.innerHeight - 120 + 'px';
        return (
            <Well className='gab-message'>
                <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et bibendum mauris, et pellentesque urna. Fusce quam libero, dictum quis orci eu, ornare euismod diam. Aliquam quis turpis quis ante placerat dignissim eu vel erat. Pellentesque a sapien at elit ultricies eleifend nec ut orci. Mauris aliquam accumsan consectetur. Fusce in mi lectus. Pellentesque elementum enim quis dolor bibendum tincidunt.
                </p><p>
            Pellentesque et ante ultrices, pharetra libero vel, placerat nulla. Sed sagittis leo ut ante commodo tincidunt. Suspendisse placerat viverra quam nec faucibus. Phasellus maximus nisi sodales laoreet pulvinar. Pellentesque dictum tincidunt mauris, a egestas leo gravida non. Nunc sed sapien tincidunt, viverra erat eu, aliquam felis. Donec vitae nibh nec enim pretium tincidunt a eget orci. Suspendisse vulputate vestibulum massa, ac malesuada dolor pharetra ut. Praesent gravida odio non nunc maximus, eu sollicitudin urna ornare. Integer porta est non arcu egestas maximus. Integer interdum erat sit amet elit posuere dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                </p><p>
            Cras pharetra egestas ultricies. Curabitur imperdiet, lectus in vehicula suscipit, urna purus bibendum nunc, a vulputate mi ipsum et risus. Proin hendrerit semper nunc sed dictum. Proin fringilla justo id auctor vehicula. Sed suscipit, odio eu placerat maximus, nisi nunc ullamcorper eros, quis lobortis elit purus in mi. Maecenas et tincidunt quam, vel sagittis sapien. Vestibulum lobortis dictum enim eget cursus. Nulla imperdiet, velit vitae hendrerit tempor, turpis metus condimentum dolor, vitae rutrum eros lectus a metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis aliquam massa ut enim sollicitudin hendrerit. Sed ullamcorper justo et diam egestas, et feugiat purus placerat. Fusce ac facilisis velit. Phasellus congue nulla non elementum ultrices. Integer ante justo, sodales vel vestibulum varius, vestibulum sed odio. Aliquam ut ligula volutpat, facilisis nibh eget, tempus risus.
                </p>
            </Well>
        );
    }
}

export default connect(mapStateToProps)(HomeView);
