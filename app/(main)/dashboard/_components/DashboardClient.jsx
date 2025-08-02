"use client";
import React, { useState, Suspense } from "react";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import AccountCard from "./AccountCard";
import BudgetProgress from "./BudgetProgress";
import DashboardOverview from "./DashboardOverview";

export default function DashboardClient({
  accountList,
  defaultAccount,
  budgetData,
  transactions,
}) {
  const [editAccountId, setEditAccountId] = useState(null);

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview */}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
          accounts={accountList}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Add New Account Card */}
        <CreateAccountDrawer mode="create">
          <Card className="cursor-pointer border-dashed transition-shadow hover:shadow-md">
            <CardContent className="text-muted-foreground flex h-full flex-col items-center justify-center pt-5">
              <Plus className="mb-2 h-10 w-10" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {/* List and Edit All Accounts */}
        {accountList.length > 0 &&
          accountList.map((account) => (
            <React.Fragment key={account.id}>
              <CreateAccountDrawer
                mode="edit"
                account={account}
                open={editAccountId === account.id}
                onOpenChange={(open) =>
                  setEditAccountId(open ? account.id : null)
                }
              />
              <AccountCard
                account={account}
                onEdit={() => setEditAccountId(account.id)}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
