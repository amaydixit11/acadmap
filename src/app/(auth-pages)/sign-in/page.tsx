import LoginClient from "./client";
interface PageProps {
  params: Promise<{ searchParams: string }>
}
export default async function LoginPage({ params }: PageProps) {

  return <LoginClient />;
}
