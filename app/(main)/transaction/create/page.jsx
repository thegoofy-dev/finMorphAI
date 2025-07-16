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
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-5xl mb-8 bg-gradient-to-br from-blue-600 to-purple-600 font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text">
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
