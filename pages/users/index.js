import { getSession } from "next-auth/react";
import UsersList from "@/components/Users/Following";

export default function UsersPage() {
  return (
    <div>
        <UsersList/>
    </div>
  );
}

