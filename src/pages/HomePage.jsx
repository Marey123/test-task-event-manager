import React from 'react';
import EventList from '../components/EventList';

const HomePage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <div className="p-4 bg-transparent border-4 border-purple-700 rounded-xl flex justify-center">
        <h1 className="text-xl md:text-3xl font-bold text-purple-700 uppercase text-center">📣 Event Management 📣</h1>
        </div>
        <EventList />
      </div>
    </div>
  );
};

export default HomePage;
