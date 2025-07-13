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
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import useFetch from "@/hooks/user-fetch";
import { updateDefaultAccount } from "@/actions/accounts";
import { toast } from "sonner";
import { useEffect } from "react";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDefault) {
      toast.error("You need atleast 1 default account");
      return; // Don't allow to toggle off default account
    }

    await updateDefaultFn(id);
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
      <Link
        href={`/account/${id}`}
        aria-label={`View details for ${name} account`}
      >
        <CardHeader
          className={
            "flex flex-row items-center justify-between space-y-0 pb-2"
          }
        >
          <CardTitle className={"text-sm font-medium capitalize"}>
            {name}
          </CardTitle>

          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        <CardContent className={"mb-4"}>
          <div className="text-2xl font-bold">
            ${parseFloat(balance ?? 0).toFixed(2)}
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
