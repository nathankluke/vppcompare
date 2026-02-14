// =============================================================================
// FAQ Data
// =============================================================================
// Questions and answers about Virtual Power Plants.
// Used by the FAQSection component on the homepage.
// =============================================================================

export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: 'What is a Virtual Power Plant (VPP)?',
    answer:
      'A Virtual Power Plant connects thousands of home batteries into a single network. When the electricity grid needs extra power — like during a heat wave — your battery sends energy back to the grid. In return, you get paid. Think of it like Airbnb for your battery: your battery "rents out" its stored energy when demand is high.',
  },
  {
    question: 'How much money can I earn from a VPP?',
    answer:
      'Earnings vary by program and location. Most VPP programs offer a signup bonus ($100–$1,500) plus ongoing payments for energy exported to the grid (typically 20–80 cents per kWh during peak events). Some homeowners report earning $500–$1,000+ per year depending on their battery size and how often events occur.',
  },
  {
    question: 'Do I need a specific battery to join a VPP?',
    answer:
      'Each VPP program supports specific battery brands. Tesla Powerwall is the most widely supported, but many programs also work with Enphase, Sonnen, SolarEdge, Generac, and Franklin batteries. Use our filter above to check which programs support your battery.',
  },
  {
    question: 'Will my battery run out during a VPP event?',
    answer:
      'No. VPP programs always keep a reserve in your battery (usually 20–30%) so you still have backup power. You can also set your own preferences in most programs — for example, keeping 50% reserve if you want extra protection.',
  },
  {
    question: 'Do I need solar panels to join a VPP?',
    answer:
      'Not always. Some VPP programs require solar panels (since they help recharge your battery), but others work with standalone batteries that charge from the grid during off-peak hours. Check each program\'s requirements in our comparison.',
  },
  {
    question: 'Is joining a VPP free?',
    answer:
      'Most VPP programs are free to join — you just need a compatible battery already installed. Some programs like Base Power actually install and maintain the battery for you at a low monthly cost. There are no hidden fees in most programs.',
  },
  {
    question: 'How often does my battery get dispatched?',
    answer:
      'It depends on grid conditions. In most areas, VPP events happen a few times per month during peak demand (hot summer days, cold winter evenings). Each event typically lasts 1–4 hours. You\'ll usually get a notification before it happens.',
  },
  {
    question: 'Which states have VPP programs?',
    answer:
      'VPP programs are expanding rapidly across the US. Currently, states like California, Texas, Colorado, Connecticut, Massachusetts, Rhode Island, New Hampshire, Vermont, and others have active programs. Use our US Map page to see which programs are available in your state.',
  },
]
