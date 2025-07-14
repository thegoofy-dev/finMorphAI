import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "60K+",
    label: "Users Empowered",
  },
  {
    value: "$3B+",
    label: "Financial Activity Tracked",
  },
  {
    value: "99.99%",
    label: "System Reliability",
  },
  {
    value: "4.95/5",
    label: "User Satisfaction",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    title: "Intelligent Dashboards",
    description:
      "Visualize your financial health with interactive and data-rich dashboards.",
  },
  {
    icon: <Receipt className="h-8 w-8 text-purple-600" />,
    title: "AI Receipt Capture",
    description:
      "Scan, parse, and categorize your receipts instantly using smart vision models.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-purple-600" />,
    title: "Automated Budgeting",
    description:
      "Let AI build budgets tailored to your habits and future goals.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: "Unified Account View",
    description:
      "Connect all your bank accounts and cards into one smart interface.",
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-600" />,
    title: "Global Ready",
    description:
      "Monitor your finances across borders with multi-currency tracking.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-600" />,
    title: "Smart Notifications",
    description:
      "Get timely insights, warnings, and reminders — before issues arise.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: "1. Set Up Your Profile",
    description:
      "Sign up securely and personalize your finance tracking experience.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    title: "2. Sync Accounts Instantly",
    description:
      "Connect your bank, credit, and wallet accounts with one click.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-purple-600" />,
    title: "3. Discover Smart Insights",
    description:
      "Receive actionable insights tailored to your financial behavior.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Amit Verma",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "Welth helps me stay on top of every transaction. The analytics are sharp, clear, and way better than spreadsheets.",
  },
  {
    name: "Jessica Lee",
    role: "Digital Nomad",
    image: "https://randomuser.me/api/portraits/women/73.jpg",
    quote:
      "Multi-currency support is a game changer. I travel often and Welth makes managing finances across countries feel effortless.",
  },
  {
    name: "Carlos Mendes",
    role: "Remote Consultant",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    quote:
      "The interface is clean and intuitive. I love how Welth gives insights without overwhelming me with data.",
  },
];
