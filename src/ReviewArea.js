import { Carousel } from 'react-responsive-carousel';

export function ReviewArea() {
  return (

    <div className='review-carousel'>
      <Carousel autoPlay={true} interval={2000} infiniteLoop={true} swipeable={true} showThumbs={false}>

        <div class="review">
          <h4>I am so satisfied with my sneakers, they got delivered sooner than I imagined! They have a huge variety of sneakers, will definitely buy some more!</h4>
          <h5>- Naruto</h5>
        </div>

        <div class="review">
          <h4>I am so satisfied with my sneakers, they got delivered sooner than I imagined! They have a huge variety of sneakers, will definitely buy some more!</h4>
          <h5>- Jiraiya</h5>
        </div>

        <div class="review">
          <h4>I am so satisfied with my sneakers, they got delivered sooner than I imagined! They have a huge variety of sneakers, will definitely buy some more!</h4>
          <h5>- Obito</h5>
        </div>

      </Carousel>
    </div>

  );
}
