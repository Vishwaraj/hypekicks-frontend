import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faHeart, faTruck } from '@fortawesome/free-solid-svg-icons';

// ----------------component for stats------------------
export function Services() {

  //fontawesome icons
  const boxIcon = <FontAwesomeIcon icon={faBox} size='7x' />;
  const heartIcon = <FontAwesomeIcon icon={faHeart} size='7x' />;
  const truckIcon = <FontAwesomeIcon icon={faTruck} size='7x' />;


  return (
    <section className="info-blocks">
      <div className="block">
        {boxIcon}
        <h4>
          Our products are 100% genuine and arrive well cushioned in a sealed
          box.
        </h4>
      </div>
      <div className="block">
        {heartIcon}
        <h4>
          Browse through a massive catalog of our sneakers & find your own fit &
          vibe.
        </h4>
      </div>
      <div className="block">
        {truckIcon}
        <h4>
          We deliver your sneakers at the speed of light. Also, the easy return
          process is a breeze.
        </h4>
      </div>
    </section>
  );
}
