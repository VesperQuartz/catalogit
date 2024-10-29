import { config } from "@/lib/config";
import ky from "ky";

export const api = ky.extend({
  prefixUrl: `${config.apiUrl}`,
  credentials: "include",
});
