"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skelton from "../../components/Skelton";
import toast, { Toaster } from 'react-hot-toast';

const AssingneeSelect = ({issue}: {issue: Issue}) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
      queryKey: ["users"],
      queryFn: () => axios.get("/api/users").then((res) => res.data),
      retry: 3,
    });

  const assignedUser = (userId: string) => {
    try{
      axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: (userId === "unassigned" ? null : userId) || null
      }).catch(() => toast.error("Changes could not be saved."))
    }catch{
      console.log(error);
      
    }
  }

  if (isLoading) return <Skelton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root 
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => assignedUser(userId)} >
      <Select.Trigger placeholder="Assign ..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">
            Unassigned
          </Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
      <Toaster />
    </Select.Root>
  );
};

export default AssingneeSelect;
