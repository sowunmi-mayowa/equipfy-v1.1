import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { convertEURtoNGN } from "@/utils/currencyConverter";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContact } from "@/api/service";
import { Success } from "@/assets";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.number().required("Phone number is required"),
  state: yup.string().required("State is required"),
});

const ContactModal = ({ equipment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createContact(data);
      toast.success("Your details has been saved successfully!");
      // Close the contact dialog and show the success modal
      setOpen(false);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("An error occured while creating your contact");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="font-aeonik ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full h-12 text-center text-white bg-eBlack mb-2">
          Buy Now
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll h-[90dvh]">
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Contact Sales
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Fill the form and our partners to contact you by text/calls 
            </DialogDescription>
          </DialogHeader>
          <div>
            <img
              src={equipment?.all_images?.[0]}
              alt={equipment?.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg text-eBlack font-bold mt-4">
              {equipment?.name}
            </h3>
            <ConvertedPrice
              amount={equipment.average_market_price ?? equipment.price}
              currency={equipment.currency}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input
                        id="name"
                        placeholder="Joh Doe"
                        required
                        {...register("name")}
                      />
                      <p className="text-xs text-red-500">
                        {errors.name?.message}
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="phone_number">
                        Phone Number
                      </FieldLabel>
                      <Input
                        id="phone_number"
                        placeholder="123 456 7890"
                        required
                        {...register("phone_number")}
                      />
                      <p className="text-xs text-red-500">
                        {errors.phone_number?.message}
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        placeholder="Johndoe@email.com"
                        required
                        {...register("email")}
                      />
                      <p className="text-xs text-red-500">
                        {errors.email?.message}
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="state">State</FieldLabel>
                      <Input
                        id="state"
                        placeholder="Lagos"
                        required
                        {...register("state")}
                      />
                      <p className="text-xs text-red-500">
                        {errors.state?.message}
                      </p>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
              <button
                type="submit"
                className="w-full h-12 text-center text-white bg-eBlack mt-4"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success modal shown after form submission */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-eBlack outline-none border-none text-white w-full max-w-sm ">
          <DialogHeader className="flex flex-col items-center">
            <img src={Success} alt="check icon" className="w-12" />
            <DialogTitle className="font-bold text-2xl ">Success!</DialogTitle>
            <DialogDescription className="text-sm text-white text-center mt-2">
              Thank you! our partners will contact you by text/calls soon.
            </DialogDescription>
          </DialogHeader>
          <div className=" w-24 mx-auto">
            <button
              className="w-full h-12 text-center bg-white text-eBlack rounded-full mt-4"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactModal;

const ConvertedPrice = ({ amount, currency }) => {
  const [price, setPrice] = useState(
    amount ? `${currency} ${Number(amount).toLocaleString()}` : "",
  );

  useEffect(() => {
    let mounted = true;
    const doConvert = async () => {
      if (amount === null || amount === undefined || amount === "") {
        if (mounted) setPrice("");
        return;
      }

      // If the source currency is EUR, convert to NGN; otherwise show native price
      const normalized = String(currency || "").toUpperCase();
      if (normalized === "EUR" || normalized === "€") {
        try {
          const result = await convertEURtoNGN(amount);
          if (mounted) setPrice(result);
        } catch (e) {
          if (mounted)
            setPrice(`${currency} ${Number(amount).toLocaleString()}`);
        }
      } else {
        if (mounted) setPrice(`${currency} ${Number(amount).toLocaleString()}`);
      }
    };

    doConvert();
    return () => {
      mounted = false;
    };
  }, [amount, currency]);

  return <p className="font-semibold text-xl text-eBlack mb-6">{price}</p>;
};
