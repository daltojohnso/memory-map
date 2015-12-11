import React                  from 'react';
import {Well} from 'react-bootstrap';

export default
class HomeView extends React.Component {
    render() {

        let note = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et bibendum mauris, et pellentesque urna. Fusce quam libero, dictum
     quis orci eu, ornare euismod diam. Aliquam quis turpis quis ante placerat dignissim eu vel erat. Pellentesque a sapien at elit ultricies
      eleifend nec ut orci. Mauris aliquam accumsan consectetur. Fusce in mi lectus. Pellentesque elementum enim quis dolor bibendum tincidunt.`,
            `Pellentesque et ante ultrices, pharetra libero vel, placerat nulla. Sed sagittis leo ut ante commodo tincidunt. Suspendisse placerat
         viverra quam nec faucibus. Phasellus maximus nisi sodales laoreet pulvinar. Pellentesque dictum tincidunt mauris, a egestas leo gravida non.
          Nunc sed sapien tincidunt, viverra erat eu, aliquam felis. Donec vitae nibh nec enim pretium tincidunt a eget orci. Suspendisse vulputate
        vestibulum massa, ac malesuada dolor pharetra ut. Praesent gravida odio non nunc maximus, eu sollicitudin urna ornare. Integer porta est non
        arcu egestas maximus. Integer interdum erat sit amet elit posuere dignissim. Vestibulum ante ipsum primis in faucibus orci luctus
         et ultrices posuere cubilia Curae;`,
            `Cras pharetra egestas ultricies. Curabitur imperdiet, lectus in vehicula suscipit, urna purus bibendum nunc, a vulputate mi
         ipsum et risus. Proin hendrerit semper nunc sed dictum. Proin fringilla justo id auctor vehicula. Sed suscipit,
          odio eu placerat maximus, nisi nunc ullamcorper eros, quis lobortis elit purus in mi. Maecenas et tincidunt quam,
           vel sagittis sapien. Vestibulum lobortis dictum enim eget cursus. Nulla imperdiet, velit vitae hendrerit tempor,
            turpis metus condimentum dolor, vitae rutrum eros lectus a metus. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Duis aliquam massa ut enim sollicitudin hendrerit. Sed ullamcorper justo
            et diam egestas, et feugiat purus placerat. Fusce ac facilisis velit. Phasellus congue nulla non elementum ultrices.
            Integer ante justo, sodales vel vestibulum varius, vestibulum sed odio. Aliquam ut ligula volutpat, facilisis nibh eget,
             tempus risus.`];


        return (
            <Well className='gab-message'>
                {note.map((p) => {
                    return <p>{p}</p>
                })}
            </Well>
        );
    }
}