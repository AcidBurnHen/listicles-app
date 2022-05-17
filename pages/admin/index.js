import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <div>super secret dashboard</div>
    </div>
  );
}

AdminDashboard.auth = true;
