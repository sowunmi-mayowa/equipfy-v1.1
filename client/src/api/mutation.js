import { useMutation } from "@tanstack/react-query";
import { createContact } from "./service";

export const useCreateContact = () => {
  return useMutation(createContact, {}); // Second argument is options object
};
