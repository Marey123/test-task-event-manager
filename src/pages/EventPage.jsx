import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  const eventToEdit = existingEvents.find(
    (event) => event.id === Number(eventId)
  );

  const handleUpdateEvent = (data) => {
    const updatedEvents = existingEvents.map((event) =>
      event.id === Number(eventId) ? { ...event, ...data } : event
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    navigate("/");
    navigate(0);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-purple-700 uppercase mb-4">
          Edit Event ✍
        </h1>
        <EventForm
          onSubmit={handleUpdateEvent}
          initialData={eventToEdit}
          submitButtonLabel="Update Event"
        />
      </div>
    </div>
  );
};

export default EventPage;
