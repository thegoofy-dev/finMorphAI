"use client";

import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  MoreVertical,
  PencilIcon,
  Trash,
} from "lucide-react";
import useFetch from "@/hooks/user-fetch";
import { updateDefaultAccount } from "@/actions/accounts";
import { deleteAccount } from "@/actions/accounts";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountCard = ({ account, onEdit }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const [deleting, setDeleting] = useState(false);

  const handleDefaultChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDefault) {
      toast.error("You need atleast 1 default account");
      return; // Don't allow to toggle off default account
    }

    await updateDefaultFn(id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (deleting) return;
    if (
      !window.confirm(
        "Are you sure you want to delete this account? This action cannot be undone."
      )
    ) {
      return;
    }
    setDeleting(true);
    const result = await deleteAccount(id);
    setDeleting(false);
    if (result.success) {
      toast.success("Account deleted successfully!");
      // Optionally, you can refresh the page or remove the card from UI here
    } else {
      console.error(result.error);
      toast.error(result.error || "Failed to delete account");
    }
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <CardHeader
        className={"flex flex-row items-center justify-between space-y-0 pb-2"}
      >
        <Link
          href={`/account/${id}`}
          aria-label={`View details for ${name} account`}
        >
          <CardTitle
            className={"hover:underline text-[20px] font-medium capitalize"}
          >
            {name}
          </CardTitle>
        </Link>

        <div className="flex justify-center items-center">
          <Switch
            className={"mr-2"}
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded p-1 hover:bg-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <PencilIcon /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash />
                {deleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <Link href={`/account/${id}`}>
        <CardContent className={"mb-4"}>
          <div className="text-2xl font-bold">
            &#36; {parseFloat(balance ?? 0).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
