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

export default function EmailTemplate({
  userName = "User",
  type = "budget-alert",
  data = {
    percentageUsed: 85,
    budgetAmount: 4000,
    totalExpenses: 3400,
  },
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
        <Preview>{data.percentageUsed}% of your monthly budget used</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            {/* Header */}
            <Section style={styles.header}>
              <Heading style={styles.heading}>Budget Alert</Heading>
              <Text style={styles.subtext}>
                Hi {userName}, you’ve used{" "}
                <strong>{data.percentageUsed.toFixed(1)}%</strong> of your
                monthly budget.
              </Text>
            </Section>

            {/* Stats */}
            <Section style={styles.stats}>
              <Text>
                <strong>Monthly Budget:</strong> $
                {data.budgetAmount.toLocaleString()}
              </Text>
              <Text>
                <strong>Total Spent:</strong> $
                {data.totalExpenses.toLocaleString()}
              </Text>
              <Text>
                <strong>{isOverBudget ? "Over Budget:" : "Remaining:"}</strong>{" "}
                <span style={{ color: isOverBudget ? "#ef4444" : "#10b981" }}>
                  ${Math.abs(remaining).toLocaleString()}
                </span>
              </Text>
            </Section>

            {/* Progress Bar */}
            <Section style={{ margin: "24px 0" }}>
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

  return null; // fallback for unknown types
}

const styles = {
  body: {
    backgroundColor: "#f8fafc",
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
    margin: 0,
    padding: 0
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
