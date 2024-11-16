import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ fields, onSubmit,header }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="form-container p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {header}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {fields.map((field) => (
          <div key={field.name} className="form-group mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}:
            </label>
            <input
              id={field.name}
              type={field.type || "text"}
              {...register(field.name, field.validation)}
              className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors[field.name]
              }`}
            />
            {errors[field.name] && (
              <p className="error text-red-600 text-sm mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
