import { redirect } from "next/navigation";

export default function SponsorSuccessPage() {
  redirect("/?sponsor_success=true");
}
