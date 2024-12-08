import SignupClient from "./client";
import { Message } from "@/components/form-message";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Message;
}) {
  return <SignupClient searchParams={searchParams} />;
}
