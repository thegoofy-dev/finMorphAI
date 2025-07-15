import React from "react";

import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";

import AddTransactionForm from "../components/AddTransactionForm";

const Transaction = async () => {
  const accounts = await getUserAccounts();

  return (
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-5xl mb-8 bg-gradient-to-br from-blue-600 to-purple-600 font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text">
        Add Transaction
      </h1>
      <AddTransactionForm accounts={accounts} categories={defaultCategories} />
    </div>
  );
};

export default Transaction;
