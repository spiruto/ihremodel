"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact as ContactProps, initialValues, schema } from "./helpers";
import { useState } from "react";

// app/components/Contact.tsx
export default function Contact() {
  const { control, handleSubmit, reset } = useForm<ContactProps>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ContactProps> = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setIsSuccess(true);
        reset();
      }
    } catch {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-10">
          Get in Touch
        </h2>
        <form
          className="bg-gray-50 p-8 rounded-xl shadow-xl space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    className={`border ${
                      error ? "border-red-600" : "border-gray-300"
                    } px-4 py-2 rounded-lg w-full`}
                    placeholder="Full Name"
                    type="text"
                  />
                  {error && (
                    <p className="text-sm text-red-500">{error.message}</p>
                  )}
                </>
              )}
              name={"fullName"}
            />
            <Controller
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    className={`border ${
                      error ? "border-red-600" : "border-gray-300"
                    } px-4 py-2 rounded-lg w-full`}
                    placeholder="Email Address"
                    type="email"
                  />
                  {error && (
                    <p className="text-sm text-red-500">{error.message}</p>
                  )}
                </>
              )}
              name="email"
            />
          </div>
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  {...field}
                  className={`border ${
                    error ? "border-red-600" : "border-gray-300"
                  } px-4 py-2 rounded-lg w-full`}
                  placeholder="Phone Number"
                  type="tel"
                />
                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
              </>
            )}
            name="phone"
          />
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <select
                  {...field}
                  className={`border ${
                    error ? "border-red-600" : "border-gray-300"
                  } px-4 py-2 rounded-lg w-full`}
                >
                  <option value={""}>Work Type</option>
                  <option value={"Kitchen Remodeling"}>
                    Kitchen Remodeling
                  </option>
                  <option value={"Bathroom Renovation"}>
                    Bathroom Renovation
                  </option>
                  <option value={"Home Addition"}>Home Addition</option>
                  <option value={"General Contracting"}>
                    General Contracting
                  </option>
                  <option value={"Custom Carpentry"}>Custom Carpentry</option>
                  <option value={"Painting"}>Painting</option>
                  <option value={"Other"}>Other</option>
                </select>
                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
              </>
            )}
            name="workType"
          />
          <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <textarea
                  {...field}
                  className={`border ${
                    error ? "border-red-600" : "border-gray-300"
                  } px-4 py-2 rounded-lg w-full`}
                  rows={4}
                  placeholder="Message"
                ></textarea>
                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
              </>
            )}
            name="message"
          />
          {isSuccess !== null &&
            (isSuccess ? (
              <p className="bg-green-600 text-white p-4 rounded">
                Message sent! We will contact you shortly.
              </p>
            ) : (
              <p className="bg-red-400 text-red-600 p-4 rounded">
                Something went wrong, please try again.
              </p>
            ))}
          <div className="text-center">
            <button
              className={`${
                isLoading
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-amber-500 hover:bg-amber-600"
              }  text-white font-semibold py-3 px-10 rounded-lg shadow-lg text-lg`}
            >
              {isLoading ? "Sending information..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
