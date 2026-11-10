export const pricingData = {
  badge: "Core Benefits for Every Plan",
  heading: "What’s included in every plan",
  plans: {
    basic: {
      name: "Basic",
      price: "$19",
      description: "One time payment plus local taxes",
      ctaText: "Get Started",
    },
    enterprise: {
      name: "Enterprise",
      price: "$49",
      description: "One time payment plus local taxes",
      ctaText: "Get Started",
    },
  },
  blocks: [
    {
      id: 1,
      rows: [
        { name: "Smart Discount Suggestions", basic: "10", enterprise: "25" },
        { name: "AI-Driven Revenue Forecasting", basic: true, enterprise: true },
        { name: "Competitive Price Tracking", basic: true, enterprise: true },
        { name: "Customer Behavior Analysis", basic: false, enterprise: true },
        { name: "Intelligent Pricing Strategies", basic: false, enterprise: true },
      ],
    },
    {
      id: 2,
      rows: [
        { name: "Rule-based Automation", basic: "5 Rules", enterprise: "Unlimited Rules" },
        { name: "Custom Pricing Rules", basic: true, enterprise: true },
        { name: "Bulk Price Updates", basic: true, enterprise: true },
        { name: "Scheduled Adjustments", basic: false, enterprise: true },
        { name: "Fail-safe Price Limits", basic: false, enterprise: true },
      ],
    },
    {
      id: 3,
      rows: [
        { name: "Performance Analyticsv", basic: "Basic Reports", enterprise: "Advanced Reports" },
        { name: "Revenue Impact Tracking", basic: true, enterprise: true },
        { name: "Competitor Price Monitoring", basic: true, enterprise: true },
        { name: "Historical Price Reports", basic: false, enterprise: true },
        { name: "Exportable Data Insights", basic: false, enterprise: true },
      ],
    },
  ],
};
