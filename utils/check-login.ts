import { toast } from "sonner";

export const checkLogin = (status: boolean) => {
  if (!status) {
    return toast.error("Make Sure to login first");
  }
};
