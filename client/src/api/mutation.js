import { useMutation } from "@tanstack/react-query";
import { createContact, createPartRequest } from "./service";

export const useCreateContact = () => {
  return useMutation(createContact, {}); // Second argument is options object
};

export const useCreatePartRequest = () => {
  return useMutation(createPartRequest, {}); // Second argument is options object
};
