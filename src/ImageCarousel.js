import { Carousel } from 'react-responsive-carousel';

// ----------------component for carousel------------------
export function ImageCarousel() {
  return (
    <div className='carousel-images'>
      <Carousel autoPlay={true} interval={6000} infiniteLoop={true} swipeable={true} showThumbs={false}>
        <div>
          <img src='https://superkicks.in/wp-content/uploads/2022/04/space-hippie-web.jpg' alt='some-shoe' />
        </div>

        <div>
          <img src='https://superkicks.in/wp-content/uploads/2022/04/BANNER-PARLEY-WRB-1.jpg' alt='some-shoe' />
        </div>

        <div>
          <img src='https://superkicks.in/wp-content/uploads/2022/05/DESKTOP-LEBRO-BANNER.jpg' alt='some-shoe' />
        </div>
      </Carousel>
    </div>

  );
}
