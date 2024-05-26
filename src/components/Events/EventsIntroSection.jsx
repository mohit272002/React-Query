import { Link } from "react-router-dom";

import meetupImg from "../../assets/meetup.jpg";

export default function EventsIntroSection() {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>create a new passion</strong>
      </h2>
      <p>Anyone can advertise and join events on Third Party Creative UI!</p>
      <p>
        <Link to="/events/new" className="button">
          Add Your First Creative
        </Link>
      </p>
    </section>
  );
}
