import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

const CreatePage = () => {
  const navigate = useNavigate();
  const handleCreateEvent = (data) => {
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
      id: Date.now(),
      ...data,
    };
    existingEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(existingEvents));
    navigate("/");
    navigate(0);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-purple-700 uppercase mb-4">Create Event ✍</h1>
        <EventForm onSubmit={handleCreateEvent} submitButtonLabel="Create Event" />
      </div>
    </div>
  );
};

export default CreatePage;
