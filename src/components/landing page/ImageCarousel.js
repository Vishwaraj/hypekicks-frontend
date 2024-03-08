import { Carousel } from 'react-responsive-carousel';

// ----------------component for carousel------------------
export function ImageCarousel() {
  return (
    <div className='carousel-images'>
      <Carousel autoPlay={true} interval={6000} infiniteLoop={true} swipeable={true} showThumbs={false}>
        <div>
          <img
            src="https://i.ibb.co/cLJqpmd/space-hippie-web.jpg"
            alt="some-shoe"
          />
        </div>

        <div>
          <img
            src="https://i.ibb.co/ChHfqkj/DESKTOP-LEBRO-BANNER.jpg"
            alt="some-shoe"
          />
        </div>

        <div>
          <img
            src="https://i.ibb.co/ZY3JSZz/BANNER-PARLEY-WRB-1.jpg"
            alt="some-shoe"
          />
        </div>
      </Carousel>
    </div>

  );
}
