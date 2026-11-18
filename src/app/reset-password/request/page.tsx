import { redirect } from "next/navigation";

// The code is asked for in the login window and on /reset-password now.
export default function RequestPasswordResetPage() {
  redirect("/reset-password");
}
