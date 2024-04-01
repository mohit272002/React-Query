import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [search, setSearch] = useState();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["events", { search: search }],
    queryFn: () => fetchEvents(search),
    enabled: search !== undefined,
  });


  function handleSubmit(event) {
    event.preventDefault();
    setSearch(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        message={error.info?.message || "failed to fetch"}
        title="An error occured"
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-lists">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
