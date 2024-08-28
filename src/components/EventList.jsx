import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSort from "../hooks/useSort";
import Button from "./Button";

const EventList = () => {
  const events = useSelector((state) => state.events.events);
  const navigate = useNavigate();

  const { sortedData, requestSort, sortConfig } = useSort(events, "name");

  const handleCreateEvent = () => {
    navigate("/create");
  };

  const handleEditEvent = (eventId) => {
    navigate(`/edit/${eventId}`);
  };

  return (
    <div>
      <div className="py-4 flex justify-end items-center">
        <Button
          title={"Create Event ✨"}
          handleClick={handleCreateEvent}
          className="bg-purple-700 hover:bg-purple-800"
        />
      </div>
      <div className=" overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-purple-700">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Event Name{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : null}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("date")}
              >
                Date{" "}
                {sortConfig.key === "date"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : null}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.tickets.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    title={"🖊️"}
                    handleClick={() => handleEditEvent(event.id)}
                    className="bg-transparent text-3xl hover:bg-slate-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
