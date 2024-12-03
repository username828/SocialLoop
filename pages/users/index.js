import { getSession } from "next-auth/react";
import UsersList from "@/components/Users/Following";

export default function UsersPage() {
  return (
    <div>
      <h1>Users Page</h1>
      <UsersList  />
    </div>
  );
}

