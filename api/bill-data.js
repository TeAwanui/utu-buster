// Wellington household bill comparison data — updated quarterly
// Last updated: April 2026 (Q2 2026)
// Sources: MBIE QSDEP, provider websites, public pricing pages

export const QUARTER = 'Q2 2026';
export const LAST_UPDATED = '2026-04-04';

// ─── POWER ───────────────────────────────────────────────
// Source: MBIE Quarterly Survey of Domestic Electricity Prices
// + provider websites for Wellington-specific plans
// Average Wellington household uses ~7,000 kWh/year (~580 kWh/month)
export const POWER = {
  avgMonthlyKwh: 580,
  providers: [
    {
      name: 'Contact Energy',
      plan: 'Good Nights (free power 9pm–12am)',
      monthlyEstimate: 165,
      centsPerKwh: 28.5,
      dailyCharge: 1.15,
      note: 'Free power 9pm–midnight, great for families doing laundry/dishes at night',
      url: 'https://contact.co.nz/personal/all-plans',
      pick: true
    },
    {
      name: 'Electric Kiwi',
      plan: 'Stay Ahead 200 (1 free hour/day)',
      monthlyEstimate: 155,
      centsPerKwh: 27.8,
      dailyCharge: 1.30,
      note: 'Choose 1 free hour daily — stack your heavy usage then',
      url: 'https://www.electrickiwi.co.nz/plans',
      pick: true
    },
    {
      name: 'Mercury',
      plan: 'Freestyle',
      monthlyEstimate: 180,
      centsPerKwh: 30.1,
      dailyCharge: 1.20,
      note: 'No fixed term, Airpoints earn',
      url: 'https://www.mercury.co.nz/electricity'
    },
    {
      name: 'Genesis',
      plan: 'Energy Basic',
      monthlyEstimate: 185,
      centsPerKwh: 31.2,
      dailyCharge: 1.15,
      note: 'Dual fuel discount if you add gas',
      url: 'https://www.genesisenergy.co.nz/power'
    },
    {
      name: 'Meridian',
      plan: 'Simple',
      monthlyEstimate: 178,
      centsPerKwh: 29.8,
      dailyCharge: 1.25,
      note: 'Certified carbon zero electricity',
      url: 'https://www.meridianenergy.co.nz/for-home/pricing-rates'
    },

  ]
};

// ─── BROADBAND ───────────────────────────────────────────
// Source: Provider websites, Glimp.co.nz
export const BROADBAND = {
  providers: [
    {
      name: 'Skinny',
      plan: 'Unlimited Fibre',
      speed: '100/20 Mbps',
      monthly: 63,
      note: 'Cheapest unlimited fibre in NZ, no contract',
      url: 'https://www.skinny.co.nz/broadband/',
      pick: true
    },
    {
      name: '2degrees',
      plan: 'Broadband Fibre',
      speed: '100/20 Mbps',
      monthly: 85,
      note: 'Bundle discount with mobile',
      url: 'https://www.2degrees.nz/broadband'
    },
    {
      name: 'Spark',
      plan: 'Home Fibre',
      speed: '100/20 Mbps',
      monthly: 90,
      note: '12-month contract',
      url: 'https://www.spark.co.nz/shop/internet/'
    },
    {
      name: 'One NZ',
      plan: 'Unlimited Fibre',
      speed: '100/20 Mbps',
      monthly: 95,
      note: 'Bundle with mobile for discount',
      url: 'https://www.one.nz/broadband/'
    },
    {
      name: 'Now',
      plan: 'Naked Fibre 300',
      speed: '300/100 Mbps',
      monthly: 69,
      note: 'No home phone needed, fast speeds for the price',
      url: 'https://www.nownz.co.nz/personal/',
      pick: true
    }
  ]
};

// ─── MOBILE ──────────────────────────────────────────────
// Source: Provider websites
// Compared on: ~6-10GB data, unlimited calls/texts
export const MOBILE = {
  providers: [
    {
      name: 'Skinny',
      plan: 'Prepay $27/4wk',
      data: '4GB + Endless',
      monthly: 27,
      type: 'Prepay',
      note: 'Endless = slower data after cap, never cut off. Best budget option.',
      url: 'https://www.skinny.co.nz/pricing/plans/',
      pick: true
    },
    {
      name: 'Skinny',
      plan: 'Prepay $40/4wk',
      data: '10GB + Endless',
      monthly: 40,
      type: 'Prepay',
      note: 'Best value for moderate data users',
      url: 'https://www.skinny.co.nz/pricing/plans/'
    },
    {
      name: 'Warehouse Mobile',
      plan: '$29 Combo',
      data: '6GB',
      monthly: 29,
      type: 'Prepay',
      note: 'Skinny network, slightly more data per $',
      url: 'https://www.warehousemobile.co.nz/plans'
    },
    {
      name: 'One NZ',
      plan: 'Prepay $40',
      data: '10GB + Endless',
      monthly: 40,
      type: 'Prepay',
      note: 'Good regional coverage, 5G in cities',
      url: 'https://www.one.nz/plans/'
    },
    {
      name: '2degrees',
      plan: 'Pay Monthly $40',
      data: '8GB + Carryover',
      monthly: 40,
      type: 'Contract',
      note: 'Data rolls over month to month',
      url: 'https://www.2degrees.nz/mobile'
    },
    {
      name: 'Spark',
      plan: 'No Limit $50',
      data: 'Unlimited',
      monthly: 50,
      type: 'Contract',
      note: 'Truly unlimited but pricey',
      url: 'https://www.spark.co.nz/shop/mobile/plans'
    },
    {
      name: 'Kogan Mobile',
      plan: '365-day 500GB',
      data: '500GB/year',
      monthly: 25,
      type: 'Prepay (annual)',
      note: 'Buy 365 days upfront ~$300/yr. Uses Vodafone/One NZ network.',
      url: 'https://www.kogan.com/nz/kogan-mobile/',
      pick: true
    },
    {
      name: 'Mighty Mobile',
      plan: 'Fast (unlimited @ 10Mbps)',
      data: 'Unlimited',
      monthly: 40,
      type: 'Prepay',
      note: 'Unlimited data at 10Mbps, no throttling. One NZ network.',
      url: 'https://www.mightymobile.co.nz/'
    },
    {
      name: 'Mighty Mobile',
      plan: 'Faster (unlimited full speed)',
      data: 'Unlimited',
      monthly: 50,
      type: 'Prepay',
      note: 'Unlimited full-speed 5G. $41.58/mo with $499 annual upfront.',
      url: 'https://www.mightymobile.co.nz/'
    }
  ]
};

// ─── STREAMING ───────────────────────────────────────────
// Source: Provider websites (NZ pricing)
export const STREAMING = {
  providers: [
    {
      name: 'TVNZ+',
      plan: 'Free',
      monthly: 0,
      note: 'Free with ads. NZ shows, some international. No account needed.',
      url: 'https://www.tvnz.co.nz/',
      pick: true
    },
    {
      name: 'Netflix',
      plan: 'Standard with Ads',
      monthly: 7.99,
      note: 'Cheapest Netflix tier. Most content, some ads.',
      url: 'https://www.netflix.com/nz/'
    },
    {
      name: 'Netflix',
      plan: 'Standard',
      monthly: 18.49,
      note: 'No ads, 2 screens, 1080p',
      url: 'https://www.netflix.com/nz/'
    },
    {
      name: 'Disney+',
      plan: 'Standard with Ads',
      monthly: 7.99,
      note: 'Disney, Marvel, Star Wars, Pixar',
      url: 'https://www.disneyplus.com/en-nz'
    },
    {
      name: 'Disney+',
      plan: 'Standard',
      monthly: 13.99,
      note: 'No ads, downloads, 2 screens',
      url: 'https://www.disneyplus.com/en-nz'
    },
    {
      name: 'Neon',
      plan: 'Basic',
      monthly: 12.99,
      note: 'HBO content (House of the Dragon, Last of Us). NZ-owned (Sky).',
      url: 'https://www.neontv.co.nz/'
    },
    {
      name: 'Apple TV+',
      plan: 'Monthly',
      monthly: 12.99,
      note: 'Small but quality library. Often free trial with Apple devices.',
      url: 'https://tv.apple.com/nz'
    },
    {
      name: 'Prime Video',
      plan: 'Monthly',
      monthly: 8.99,
      note: 'Rings of Power, The Boys, Thursday Night Football',
      url: 'https://www.primevideo.com/',
      pick: true
    }
  ]
};

// ─── BUNDLE TIPS ─────────────────────────────────────────
export const BUNDLES = [
  {
    title: 'The Budget Whānau Stack',
    monthly: 253,
    breakdown: 'Electric Kiwi $155 + Skinny Fibre $63 + Skinny Mobile $27×2 + TVNZ+ free + Netflix Ads $8',
    note: 'Absolute minimum for a connected household. Two phones, good internet, free-to-air + Netflix.',
    savingsVsAvg: 147
  },
  {
    title: 'The Smart Saver Stack',
    monthly: 310,
    breakdown: 'Contact Good Nights $165 + Now Fibre 300 $69 + Kogan Mobile $25×2 + Netflix $18 + Disney+ Ads $8',
    note: 'Fast internet, free power at night for laundry, annual mobile for best rates.',
    savingsVsAvg: 90
  },
  {
    title: 'NZ Average Household',
    monthly: 400,
    breakdown: 'Power ~$185 + Broadband ~$90 + Mobile ~$45×2 + Streaming ~$35',
    note: 'Based on MBIE data and industry averages. Most families are paying around this.',
    savingsVsAvg: 0
  }
];
