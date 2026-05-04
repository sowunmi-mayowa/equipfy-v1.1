import LazyLoad from "@/componennts/LazyLoad";
import React, { useState } from "react";
import {
  SpareHero,
  Notes,
  Worker,
  Cubes,
  PreFooter,
  Hammer,
  Car,
  UserSettings,
  Glass,
  Fuel,
  FIlter,
  Hose,
  Rings,
  Cabs,
  Platform,
  Parts,
  Spanner,
} from "@/assets";
import ButtonBlack from "@/componennts/ButtonBlack";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { createPartRequest } from "@/api/service";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  machineType: yup.string().required("Machine is required"),
  partNumber: yup.string().required("Part number is required"),
  description: yup.string().required("Part description is required"),
  quantity: yup.number().required("Quantity is required"),
  priority: yup.string().required("Priority is required"),
  message: yup.string().required("Message is required"),
});

const Sparepart = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { priority: "normal" },
  });

  const services = [
    {
      name: "Parts Ordering",
      text: "Simplify parts sourcing for your fleet. We help quarries, mines, and projects get what they need without the usual delays.",
      icon: Notes,
      id: 1,
    },
    {
      name: "Technician Requests",
      text: "Request repair and maintenance through eQuipfy. No more machines rotting on site for want of a technician you can trust.",
      icon: Worker,
      id: 2,
    },
    {
      name: "Uptime Infrastructure",
      text: "We're building the support layer so contractors and operators across West Africa can focus on their business, not the machine.",
      icon: Cubes,
      id: 3,
    },
  ];

  const onSUbmitHandler = async (data) => {
    try {
      const res = await createPartRequest(data);
      console.log("Part request created successfully:", res);
      toast.success("Part request submitted — we'll be in touch.");
    } catch (err) {
      console.error("Error creating part request:", err);
      toast.error("Failed to submit part request. Please try again.");
    }
  };

  const [trackQuery, setTrackQuery] = useState("");
  const handleTrack = () => {
    if (!trackQuery || !trackQuery.trim()) {
      // toast.error("Enter Request ID or phone number");
      return;
    }
    // Replace with real tracking API call as needed
    console.log("Track query:", trackQuery);
    // toast.info("Searching for request: " + trackQuery);
  };
  const handleCancelTrack = () => setTrackQuery("");

  // icons to show in the category circles (12 total)
  const icons = [
    Car,
    Fuel,
    Hammer,
    Glass,
    UserSettings,
    FIlter,
    Hose,
    Rings,
    Parts,
    Cabs,
    Platform,
    Spanner,
  ];

  return (
    <div>
      <div className="mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <div className="mb-12 lg:mb-16 flex flex-col items-start md:items-center justify-center">
          <h1 className="font-aeonik font-medium text-4xl lg:text-6xl mt-12">
            Parts & Service. No More Downtime.
          </h1>
          <p className="font-aeonik text-xl mt-4 md:mt-6 max-w-5xl md:text-center">
            We want to end the days of machines rotting on site. Order genuine
            parts and request trusted technicians for construction, mining, oil
            & gas, agriculture, aggregate, and quarry across West Africa.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <ButtonBlack
              rounded={false}
              name={"Get Spare Part"}
              showIcon={false}
            />
            <ButtonBlack
              rounded={false}
              name={"Get Technician"}
              showIcon={false}
              variant={"outlined"}
            />
          </div>
        </div>
      </div>

      <LazyLoad image={SpareHero} alt={"heroimg"} />
      <div className="mt-16">
        <div className="flex justify-center items-center flex-col mb-8 gap-2 ">
          <h3 className="text-2xl mx-4 md:text-3xl lg:text-5xl font-aeonik font-bold">
            Parts & Serivces
          </h3>
          <p className="font-light text-gray-500 max-w-lg md:mt-4 text-center mx-auto">
            End downtime. From quarries and mines to oil & gas and construction
            sites, order parts and request trusted technicians when you need
            them.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#F7F7F6] p-4 rounded-lg h-full flex flex-col justify-between"
          >
            <div className="flex gap-4 items-center">
              <img src={service.icon} alt={`${service.name} icon`} />
              <h3 className="text-xl font-aeonik font-medium">
                {service.name}
              </h3>
            </div>
            <p className="mt-4 text-base">{service.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center flex-col mb-8 gap-2 mt-16">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-aeonik font-bold">
          Parts{" "}
          <span className="bg-gradient-to-r from-black/90 to-yellow-400 text-transparent bg-clip-text inline-block">
            Categories
          </span>
        </h3>
        <p className="font-light text-gray-500 max-w-xs md:mt-4 text-center mx-auto">
          Browse by category. Order parts or request a technician for your
          machine.
        </p>
      </div>

      <div className="flex gap-8 items-center justify-between flex-wrap mt-8 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        {icons.map((icon, i) => (
          <div
            key={i}
            className="rounded-full w-36 h-36 bg-[#F7F7F6] flex items-center justify-center overflow-hidden"
          >
            <img
              src={icon}
              alt={`category-${i}`}
              className="w-12 h-12 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="bg-[#F7F7F6] mt-16">
        <div className="flex flex-col">
          <div className="flex justify-center items-center flex-col mb-8 mt-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-aeonik font-bold">
              Create a Parts request
            </h3>
            <p className="font-light text-gray-500 max-w-md md:mt-2 text-center mx-auto">
              Submit your request and we’ll get back to you with availability
              and pricing. Track status in real time below.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSUbmitHandler)}
            className="mx-8 md:mx-12 xl:mx-auto xl:max-w-4xl py-8"
          >
            <FieldGroup>
              <Field>
                <FieldLabel>Full Name *</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Full Name"
                    className="bg-white"
                    {...register("fullName")}
                  />
                  <FieldError>{errors?.fullName?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Email *</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Email"
                    className="bg-white"
                    {...register("email")}
                  />
                  <FieldError>{errors?.email?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Phone Number *</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Phone Number"
                    className="bg-white"
                    {...register("phone_number")}
                  />
                  <FieldError>{errors?.phone_number?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>
                  Machine (make, model, year or description) *
                </FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="e.g John Deera 135G 2017"
                    className="bg-white"
                    {...register("machineType")}
                  />
                  <FieldError>{errors?.machineType?.message}</FieldError>
                  <FieldError>{errors?.machineType?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Part number</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="e.g QW2346758"
                    className="bg-white"
                    {...register("partNumber")}
                  />
                  <FieldError>{errors?.partNumber?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Part Description</FieldLabel>
                <FieldContent>
                  <textarea
                    placeholder="Add any additional comments"
                    {...register("description")}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-28 resize-y bg-white"
                  />
                </FieldContent>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Quantity *</FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      min={1}
                      {...register("quantity")}
                      className="bg-white"
                    />
                    <FieldError>{errors?.quantity?.message}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Priority</FieldLabel>
                  <FieldContent>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Normal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="bg-white">
                              <SelectLabel>Priority</SelectLabel>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Urgent">Urgent</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError>{errors?.priority?.message}</FieldError>
                  </FieldContent>
                </Field>
              </div>

              <Field>
                <FieldLabel>Additional Message</FieldLabel>
                <FieldContent>
                  <textarea
                    placeholder="Add any additional comments"
                    {...register("message")}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-28 resize-y bg-white"
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="font-aeonik text-sm capitalize font-medium px-4 py-2 flex items-center justify-center text-white bg-eBlack rounded-md"
              >
                Submit Request
              </button>
              <button
                type="button"
                className="font-aeonik text-sm capitalize font-medium px-4 py-2 flex items-center justify-center text-black bg-transparent border border-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="py-16">
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-aeonik font-bold">
            <span className="italic font-medium">Track</span> your request
          </h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Enter your request ID or phone number to see status and updates in
            real time.
          </p>

          <div className="max-w-xl mx-auto flex flex-col gap-3 items-center">
            <Input
              placeholder="Request ID / Phone Number"
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
            />
            <div className="flex mt-4 gap-6">
              <button
                onClick={handleTrack}
                className="font-aeonik text-sm capitalize font-medium px-4 py-2 flex items-center justify-center text-white bg-eBlack rounded-md"
              >
                Track Now
              </button>
              <button
                onClick={handleCancelTrack}
                type="button"
                className="font-aeonik text-sm capitalize font-medium px-4 py-2 flex items-center justify-center text-black bg-transparent border border-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${PreFooter})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black/40 px-6 py-24 md:py-40 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-aeonik font-bold text-white">
              Built for <span className="italic">West African Sites</span>
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mt-4">
              Whether it's a quarry in Abuja, a mine in the Delta, or a
              government project in Lagos, downtime is the enemy. We're building
              the uptime infrastructure so you can focus on your business, not
              the machine.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <ButtonBlack
                className="bg-white text-black"
                rounded={false}
                name={"Browse Equipment"}
                showIcon={false}
                variant="bgWhite"
              />
              <ButtonBlack
                rounded={false}
                name={"Contact on Whatapp"}
                showIcon={false}
                variant={"outlinedWhite"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sparepart;
