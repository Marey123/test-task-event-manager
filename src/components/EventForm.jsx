import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "./Button";
import { EVENT_CATEGORIES } from "../constants";

const EventForm = ({ onSubmit, initialData = {}, submitButtonLabel }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      date: initialData.date || "",
      location: initialData.location || "",
      category: initialData.category || "",
      tickets: initialData.tickets || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 shadow-md rounded-lg"
    >
      <div>
        <label className="block text-sm font-bold text-gray-700">
          Event Name 🎉
        </label>
        <input
          {...register("name", { required: "Event name is required" })}
          placeholder="Enter event name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700">
          Event Description 📝
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter event description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700">
          Date 📅
        </label>
        <input
          type="date"
          {...register("date", { required: "Date and time are required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.date && (
          <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700">
          Location 📍
        </label>
        <input
          {...register("location", { required: "Location is required" })}
          placeholder="Enter location"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.location && (
          <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700">
          Category 🗂️
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {EVENT_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Tickets 🎟️
          </label>

          <Button
            type={"button"}
            handleClick={() => append({ type: "", quantity: 0, price: 0 })}
            title={"Add Ticket"}
            className="text-sm ml-4"
          />
        </div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 mb-4 p-4 border border-gray-300 bg-violet-300 rounded-xl"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Type ✨
              </label>
              <input
                {...register(`tickets.${index}.type`, {
                  required: "Ticket type is required",
                })}
                placeholder="Ticket type"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.tickets?.[index]?.type && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.tickets[index].type.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Quantity 🧮
              </label>
              <input
                type="number"
                {...register(`tickets.${index}.quantity`, {
                  required: "Quantity is required",
                })}
                placeholder="Quantity"
                min={0}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.tickets?.[index]?.quantity && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.tickets[index].quantity.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Price 💰
              </label>
              <input
                type="number"
                {...register(`tickets.${index}.price`, {
                  required: "Price is required",
                })}
                min={0}
                placeholder="Price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.tickets?.[index]?.price && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.tickets[index].price.message}
                </p>
              )}
            </div>

            <Button
              type={"button"}
              handleClick={() => remove(index)}
              title={"Remove Ticket"}
              className="bg-red-600 hover:bg-red-700 text-sm"
            />
          </div>
        ))}
      </div>

      <Button type={"submit"} title={submitButtonLabel} />
    </form>
  );
};

export default EventForm;
