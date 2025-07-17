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
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 pr-2 pb-2 text-transparent bg-clip-text capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground pl-1">
            (
            {account.type.charAt(0).toUpperCase() +
              account.type.slice(1).toLowerCase()}{" "}
            Account)
          </p>
        </div>
        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground text-center">
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
