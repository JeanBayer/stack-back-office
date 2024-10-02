import { toast } from "sonner";

export class ErrorUtil {
  public static handleError(message: string) {
    console.error(message);
    toast.error(message);
  }
}