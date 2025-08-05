import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import TransactionTable from "../components/TransactionTable";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import AccountChart from "../components/AccountChart";

const AccountPage = async ({ params }) => {
  const resolvedParams = await params;
  const accountsData = await getAccountWithTransactions(resolvedParams.id);
  if (!accountsData) {
    notFound();
  }

  const { transactions, ...account } = accountsData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="gradient-color bg-clip-text pr-2 pb-2 font-bold text-transparent capitalize sm:text-6xl">
            {account.name}
          </h1>
          <p className="text-muted-foreground pl-1">
            (
            {account.type.charAt(0).toUpperCase() +
              account.type.slice(1).toLowerCase()}{" "}
            Account)
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-zinc-300 sm:text-2xl">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transaction Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
