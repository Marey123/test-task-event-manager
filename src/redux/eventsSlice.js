import { createSlice } from '@reduxjs/toolkit';
import eventsData from '../data/data.json';

const loadInitialEvents = () => {
  const storedEvents = localStorage.getItem('events');
  const parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : [];
  
  const combinedEvents = [...parsedStoredEvents, ...eventsData.events.filter(event => 
    !parsedStoredEvents.some(storedEvent => storedEvent.id === event.id)
  )];

  localStorage.setItem('events', JSON.stringify(combinedEvents));

  return combinedEvents;
};

const initialState = {
  events: loadInitialEvents(),
};

const saveEventsToLocalStorage = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
      saveEventsToLocalStorage(state.events);
    },
    addEvent(state, action) {
      state.events.push(action.payload);
      saveEventsToLocalStorage(state.events);
    },
    updateEvent(state, action) {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
        saveEventsToLocalStorage(state.events);
      }
    },
    addTicket(state, action) {
      const { eventId, ticket } = action.payload;
      const event = state.events.find(event => event.id === eventId);
      if (event) {
        event.tickets.push(ticket);
        saveEventsToLocalStorage(state.events);
      }
    },
    deleteTicket(state, action) {
      const { eventId, ticketId } = action.payload;
      const event = state.events.find(event => event.id === eventId);
      if (event) {
        event.tickets = event.tickets.filter(ticket => ticket.id !== ticketId);
        saveEventsToLocalStorage(state.events);
      }
    }
  }
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  addTicket,
  deleteTicket
} = eventsSlice.actions;

export default eventsSlice.reducer;
