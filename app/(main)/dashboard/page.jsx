import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import DashboardClient from "./_components/DashboardClient";

export default async function DashboardPage() {
  const { data: accountList } = await getUserAccounts();
  const defaultAccount = accountList?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  const transactions = await getDashboardData();

  return (
    <DashboardClient
      accountList={accountList}
      defaultAccount={defaultAccount}
      budgetData={budgetData}
      transactions={transactions}
    />
  );
}
