import React                  from 'react';
import {Well} from 'react-bootstrap';

export default
class HomeView extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.state.message = [];
    }

    componentDidMount() {
        let me = this;
        $.getJSON('/api/message', function(message, success) {
           if (success === 'success') {
               me.setState({message: message});
           }
        });
    }

    render() {
        let message = this.state.message;
        return (
            <Well className='gab-message'>
                {message.map((p, i) => {
                    return <p key={i}>{p}</p>
                })}
            </Well>
        );
    }
}