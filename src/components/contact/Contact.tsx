"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact as ContactProps, initialValues, schema } from "./helpers";
import { useState } from "react";
import { fireEvent } from "@/config/mixpanel.config";

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
    <section id="contact" className="py-20 bg-gray-100 shadow-md">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Get in Touch
        </h2>

        <div className="mb-4">
          <p className="text-slate-700 text-lg mb-4 bg-white p-4 rounded-lg shadow border border-slate-300">
            If you’re ready to start your next construction or renovation
            project, we would love to hear from you. Contact us today to
            schedule a consultation and learn more about how we can help bring
            your vision to life. Our team is standing by, ready to provide the
            expert construction services you need to bring your dream home to
            life.
          </p>
          <div className="bg-[#1e293b] rounded-md py-3 px-4 text-amber-500 font-semibold w-full text-center">
            You can reach us directly with any questions at
            <br />
            <span className="text-amber-500 text-center">
              <a
                className="hover:text-emerald-500 text-emerald-600"
                href="tel:+12015460083"
              >
                (201) 546-0083
              </a>{" "}
              or{" "}
              <a
                className="hover:text-emerald-500 text-emerald-600"
                href="tel:+12144679319"
              >
                (214) 467-9319
              </a>
            </span>
            <br />
            Or use the form below
          </div>
        </div>

        <form
          className="bg-white p-8 rounded-xl shadow-xl space-y-6 border border-slate-300"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Full Name"
                    className={`border ${
                      error ? "border-[#f43f5e]" : "border-slate-300"
                    } px-4 py-2 rounded-lg w-full`}
                  />
                  {error && (
                    <p className="text-sm text-[#f43f5e]">{error.message}</p>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    className={`border ${
                      error ? "border-[#f43f5e]" : "border-slate-300"
                    } px-4 py-2 rounded-lg w-full`}
                  />
                  {error && (
                    <p className="text-sm text-[#f43f5e]">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  {...field}
                  type="tel"
                  placeholder="Phone Number"
                  className={`border ${
                    error ? "border-[#f43f5e]" : "border-slate-300"
                  } px-4 py-2 rounded-lg w-full`}
                />
                {error && (
                  <p className="text-sm text-[#f43f5e]">{error.message}</p>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="workType"
            render={({ field, fieldState: { error } }) => (
              <>
                <select
                  {...field}
                  className={`border ${
                    error ? "border-[#f43f5e]" : "border-slate-300"
                  } px-4 py-2 rounded-lg w-full`}
                >
                  <option value={""}>Work Type</option>
                  <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                  <option value="Bathroom Renovation">
                    Bathroom Renovation
                  </option>
                  <option value="Home Addition">Home Addition</option>
                  <option value="General Contracting">
                    General Contracting
                  </option>
                  <option value="Custom Carpentry">Custom Carpentry</option>
                  <option value="Painting">Painting</option>
                  <option value="Other">Other</option>
                </select>
                {error && (
                  <p className="text-sm text-[#f43f5e]">{error.message}</p>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field, fieldState: { error } }) => (
              <>
                <textarea
                  {...field}
                  rows={4}
                  placeholder="Message"
                  className={`border ${
                    error ? "border-[#f43f5e]" : "border-slate-300"
                  } px-4 py-2 rounded-lg w-full`}
                ></textarea>
                {error && (
                  <p className="text-sm text-[#f43f5e]">{error.message}</p>
                )}
              </>
            )}
          />

          {isSuccess !== null &&
            (isSuccess ? (
              <p className="bg-[#10b981] text-white p-4 rounded">
                Message sent! We will contact you shortly.
              </p>
            ) : (
              <p className="bg-[#fef2f2] text-[#f43f5e] p-4 rounded border border-[#f43f5e]">
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
                          onClick={()=>{fireEvent("Clicked Send Mail Button")}}

            >
              {isLoading ? "Sending information..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
