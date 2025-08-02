import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PREVIEW_DATA = {
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

// Add a helper function to capitalize the first letter
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function EmailTemplate({
  userName = "",
  data = {},
  type = "monthly-report",

  // Dummy data for Preview of Budget Alert
  //   userName= "John Doe",
  //   type= "budget-alert",
  // data = {
  //   percentageUsed: 85,
  //   budgetAmount: 4000,
  //   totalExpenses: 3400,
  // },

  // Dummy data for Preview of Monthly Expense Report
  // userName = "John Doe",
  // type = "monthly-report",
  // data = {
  //   month: "December",
  //   stats: {
  //     totalIncome: 5000,
  //     totalExpenses: 3500,
  //     byCategory: {
  //       housing: 1500,
  //       groceries: 600,
  //       transportation: 400,
  //       entertainment: 300,
  //       utilities: 700,
  //     },
  //   },
  //   insights: [
  //     "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
  //     "Great job keeping entertainment expenses under control this month!",
  //     "Setting up automatic savings could help you save 20% more of your income.",
  //   ],
  // },
}) {
  if (type === "budget-alert") {
    const remaining = data.budgetAmount - data.totalExpenses;
    const isOverBudget = remaining < 0;
    const progressColor =
      data.percentageUsed >= 90
        ? "#ef4444"
        : data.percentageUsed >= 75
          ? "#f59e0b"
          : "#10b981";

    return (
      <Html>
        <Head />
        <Preview>
          {data.percentageUsed.toFixed(2)}% of your monthly budget used
        </Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            {/* Header */}
            <Section style={styles.header}>
              <Heading style={styles.heading}>Budget Alert</Heading>
              <Text style={styles.subtext}>
                Hi {userName}, you’ve used{" "}
                <strong>{data.percentageUsed.toFixed(2)}%</strong> of your
                monthly budget.
              </Text>
            </Section>

            {/* Stats */}
            <Section style={styles.stats}>
              <Text>
                <strong>Monthly Budget:</strong> &#36;{" "}
                {data.budgetAmount.toLocaleString()}
              </Text>
              <Text>
                <strong>Total Spent:</strong> &#36;
                {data.totalExpenses.toLocaleString()}
              </Text>
              <Text>
                <strong>{isOverBudget ? "Over Budget:" : "Remaining:"}</strong>{" "}
                <span style={{ color: isOverBudget ? "#ef4444" : "#10b981" }}>
                  &#36;{Math.abs(remaining).toLocaleString()}
                </span>
              </Text>
              {/* Progress Bar */}
              <div style={{ margin: "24px 0" }}>
                <Text style={styles.progressLabel}>Budget Usage</Text>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${Math.min(data.percentageUsed, 100)}%`,
                      backgroundColor: progressColor,
                    }}
                  />
                </div>
              </div>
            </Section>

            {/* Recommendation */}
            <Section style={styles.tipBox}>
              <Text>
                💡{" "}
                {data.percentageUsed >= 90
                  ? "You’re close to exceeding your budget. Consider reducing non-essential expenses."
                  : data.percentageUsed >= 75
                    ? "You’re approaching your budget limit. Stay cautious with your spending."
                    : "You're on track! Keep up the good work managing your finances."}
              </Text>
            </Section>

            {/* CTA */}
            <Section style={{ textAlign: "center", marginTop: "32px" }}>
              <Button style={styles.ctaButton} href={`${baseUrl}/dashboard`}>
                View Dashboard
              </Button>
            </Section>

            <Hr style={styles.divider} />

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerText}>
                This is an automated alert from <strong>FinMorph</strong> to
                help you stay on track with your finances.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  // Future template types like 'monthly-report', 'goal-reminder' can go here
  if (type === "monthly-report" && data?.stats) {
    const { stats, month, insights } = data;
    const savings = stats.totalIncome - stats.totalExpenses;
    const expenseByCategory = Object.entries(stats.byCategory || {}).map(
      ([category, total]) => ({ category, total }),
    );
    const biggestExpense =
      expenseByCategory.length > 0
        ? expenseByCategory.reduce(
            (max, cat) => (cat.total > max.total ? cat : max),
            expenseByCategory[0],
          )
        : null;

    return (
      <Html>
        <Head />
        <Preview>Your {month} Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            {/* Header */}
            <Section style={styles.header}>
              <Heading style={styles.heading}>{month} Report</Heading>
              <Text style={styles.subtext}>
                Hi {userName}, Here’s your financial summary for {month}.
              </Text>
              <Hr style={{ borderColor: "#4b2995" }} />
            </Section>

            {/* Stats */}
            <Section style={{ ...styles.stats, margin: "0px" }}>
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Total Income
                </div>
                <div
                  style={{ fontSize: "24px", fontWeight: 700, color: "#222" }}
                >
                  &#36; {stats.totalIncome.toLocaleString()}
                </div>
              </div>
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Total Expenses
                </div>
                <div
                  style={{ fontSize: "24px", fontWeight: 700, color: "#222" }}
                >
                  &#36; {stats.totalExpenses.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", color: "#666" }}>Savings</div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: savings >= 0 ? "#10b981" : "#ef4444",
                  }}
                >
                  &#36; {Math.abs(savings).toLocaleString()}
                </div>
              </div>
            </Section>

            {/* Biggest Expense & Motivation */}
            {biggestExpense && (
              <Section style={{ textAlign: "center", margin: "0 0 16px 0" }}>
                <Text
                  style={{
                    color: "#111",
                    fontWeight: 600,
                    fontSize: "15px",
                    marginBottom: "4px",
                  }}
                >
                  Biggest Expense:{" "}
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>
                    {capitalize(biggestExpense.category)}: &#36;{" "}
                    {biggestExpense.total.toLocaleString()}
                  </span>
                </Text>
                <Text
                  style={{
                    color: savings >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  {savings >= 0
                    ? "Great job! You saved money this month."
                    : "You spent more than you earned. Review your expenses for next month!"}
                </Text>
              </Section>
            )}

            {/* Expense Breakdown */}
            {expenseByCategory.length > 0 ? (
              <Section
                style={{
                  ...styles.tipBox,
                  marginTop: "20px",
                  marginBottom: "30px",
                  backgroundColor: "#e7ecfd",
                  color: "#3d3d4e",
                  border: "1px solid #b6c6e3",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bolder",
                    color: "#4b2995",
                    fontSize: "16px",
                  }}
                >
                  Expense Breakdown
                </Text>
                <table
                  width="100%"
                  style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
                >
                  <tbody>
                    {expenseByCategory.map((cat) => (
                      <tr key={cat.category}>
                        <td
                          style={{
                            background: "#f3f6fb",
                            color: "#4b2995",
                            borderRadius: "16px 0 0 16px",
                            fontWeight: 500,
                            padding: "10px 0 10px 18px",
                            textAlign: "left",
                            fontSize: "15px",
                            minWidth: "120px",
                          }}
                        >
                          {capitalize(cat.category)}
                        </td>
                        <td
                          style={{
                            background: "#f3f6fb",
                            color: "#3d3d4e",
                            borderRadius: "0 16px 16px 0",
                            fontWeight: 400,
                            padding: "10px 18px 10px 0",
                            textAlign: "right",
                            fontSize: "15px",
                            minWidth: "60px",
                          }}
                        >
                          &#36; {cat.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>
            ) : (
              <Section
                style={{
                  textAlign: "center",
                  margin: "20px 0",
                  fontSize: "14px",
                }}
              >
                <Text>
                  No category-wise expense data available for this month.
                </Text>
              </Section>
            )}

            {/* Insights */}
            {insights?.length > 0 && (
              <Section style={styles.tipBox}>
                <Text style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  FinMorph Insights
                </Text>
                {insights.map((insight, idx) => (
                  <Text key={idx}>💡 {insight}</Text>
                ))}
              </Section>
            )}

            {/* CTA */}
            <Section style={{ textAlign: "center", marginTop: "32px" }}>
              <Button style={styles.ctaButton} href={`${baseUrl}/dashboard`}>
                View Dashboard
              </Button>
            </Section>

            <Hr style={styles.divider} />

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerText}>
                This monthly report was generated by <strong>FinMorph</strong>{" "}
                to help you stay on track.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return null; // fallback for unknown types
}

const styles = {
  body: {
    backgroundColor: "#f8fafc",
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "600px",
    padding: "24px",
    margin: "0 auto",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#111827",
  },
  subtext: {
    fontSize: "16px",
    color: "#4b5563",
  },
  stats: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  progressLabel: {
    fontSize: "14px",
    marginBottom: "8px",
    color: "#374151",
  },
  progressBar: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "8px",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  tipBox: {
    backgroundColor: "#fef3c7",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#92400e",
    border: "1px solid #fcd34d",
  },
  ctaButton: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "14px",
  },
  divider: {
    margin: "24px 0",
    borderColor: "#e5e7eb",
  },
  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
  },
  footerText: {
    margin: 0,
  },
};
