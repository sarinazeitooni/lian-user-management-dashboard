import { Suspense } from "react";
import { UserDetailsPage } from "@/components/users/user-details-page";
import { LoadingState } from "@/components/ui/loading-state";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

async function UserDetailsContent({ params }: UserPageProps) {
  const { id } = await params;
  return <UserDetailsPage id={id} />;
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <Suspense fallback={<div className="px-4 py-6 sm:px-6 lg:px-8"><LoadingState label="Loading user details…" /></div>}>
      <UserDetailsContent params={params} />
    </Suspense>
  );
}
