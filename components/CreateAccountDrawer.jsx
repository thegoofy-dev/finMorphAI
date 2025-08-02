"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountScehma } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import useFetch from "@/hooks/user-fetch";
import { createAccount } from "@/actions/dashboard";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { editAccount } from "@/actions/accounts";

const CreateAccountDrawer = ({
  children,
  mode = "create",
  account,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false);
  const isEdit = mode === "edit" && account;
  const actualOpen = controlledOpen !== undefined ? controlledOpen : open;
  const setActualOpen = onOpenChange || setOpen;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountScehma),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (isEdit && account) {
      setValue("name", account.name || "");
      setValue("type", account.type || "CURRENT");
      setValue("balance", account.balance?.toString() || "");
      setValue("isDefault", account.isDefault || false);
    } else {
      reset();
    }
  }, [isEdit, account, reset, setValue]);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setActualOpen(false);
    }
  }, [createAccountLoading, newAccount, reset, setActualOpen]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  const onSubmit = async (data) => {
    if (isEdit) {
      // Only update name and type
      const result = await editAccount(account.id, {
        name: data.name,
        type: data.type,
      });
      if (result.success) {
        toast.success("Account updated successfully");
        setActualOpen(false);
      } else {
        toast.error(result.error || "Failed to update account");
      }
    } else {
      await createAccountFn(data);
    }
  };

  return (
    <Drawer open={actualOpen} onOpenChange={setActualOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEdit ? "Edit Account" : "Create New Account"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Account Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                {...register("name")}
                disabled={isEdit && !account}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
                disabled={isEdit && !account}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">CURRENT</SelectItem>
                  <SelectItem value="SAVINGS">SAVINGS</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Initial Balance */}
            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
                disabled={isEdit}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* Default Account Switch */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <label
                  htmlFor="isDefault"
                  className="cursor-pointer text-sm font-medium"
                >
                  Set as Default
                </label>
                <p className="text-muted-foreground text-sm">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
                disabled={isEdit}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEdit ? "Saving..." : "Creating..."}
                  </>
                ) : isEdit ? (
                  "Update Account"
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
