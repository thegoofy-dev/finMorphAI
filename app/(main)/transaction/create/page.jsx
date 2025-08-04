import React from "react";

import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";

import AddTransactionForm from "../components/AddTransactionForm";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();
  const params = await searchParams;
  const editId = params?.edit || null;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="mx-auto max-w-3xl px-5">
      <h1 className="gradient-color mb-8 pr-2 pb-2 text-5xl font-extrabold tracking-tighter">
        {editId ? "Edit" : "Add"} Transaction
      </h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
