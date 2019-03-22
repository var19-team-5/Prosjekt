import * as React from 'react';
import { Component } from 'react-simplified';
import { Carousel } from 'react-bootstrap';

export class Home extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img src="sykkel0.jpg" alt="First slide" width="100%" height="800" />
          <Carousel.Caption>
            <h3 />
            <p />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="sykkel5.jpg" alt="Second slide" width="100%" height="800" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="sykkel3.jpg" alt="Third slide" width="100%" height="800" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
