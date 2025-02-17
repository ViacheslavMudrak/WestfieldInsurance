const jssConfig = require('./src/temp/config');
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const getPages = require('./src/lib/getPages');
const plugins = require('./src/temp/next-config-plugins') || {};
const spgTimeout = '6000';
const publicUrl = getPublicUrl();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  // we need XMC_DEFAULT_RH = true as sitecore rendering host env variable, otherwise vercel needs relative urls so proper urls are used
  assetPrefix: process.env.XMC_DEFAULT_RH === 'true' ? publicUrl : undefined,

  staticPageGenerationTimeout: spgTimeout,
  //disable for vercel, eslint is run on commit
  eslint: { ignoreDuringBuilds: true },

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  images: {
    domains: ['picsum.photos', 'xmcloudcm.localhost', 'localhost'],
  },

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
    CUT_PAGES: process.env.ENABLE_CUTS === 'true' ? getPages('/pages/cuts/') : [],
  },

  webpack5: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
  },

  // Enable React Strict Mode
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
        ],
      },
      {
        // matching all routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/system/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/system/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/2022-mclean-county-ag-fair",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/about-us/become-a-westfield-agency",
        destination: "/become-an-agent",
        permanent: true
      },
      {
        source: "/about-us/become-a-westfield-agency/connect-with-a-relationship-manager",
        destination: "/become-an-agent-form",
        permanent: true
      },
      {
        source: "/about-us/board-of-directors",
        destination: "/about-us/leadership",
        permanent: true
      },
      {
        source: "/about-us/community",
        destination: "/about-us/corporate-responsibility/community-investment",
        permanent: true
      },
      {
        source: "/about-us/community/disaster-recovery",
        destination: "/about-us/corporate-responsibility/community-investment",
        permanent: true
      },
      {
        source: "/about-us/community/family-stability",
        destination: "/about-us/corporate-responsibility/community-investment",
        permanent: true
      },
      {
        source: "/about-us/community/safety",
        destination: "/about-us/corporate-responsibility/community-investment",
        permanent: true
      },
      {
        source: "/about-us/company",
        destination: "/about-us",
        permanent: true
      },
      {
        source: "/about-us/company/independent-agency-partners",
        destination: "/about-us",
        permanent: true
      },
      {
        source: "/about-us/company/the-westfield-story",
        destination: "/about-us",
        permanent: true
      },
      {
        source: "/about-us/company/we-hurt-we-feel-we-care",
        destination: "/about-us/corporate-responsibility/diversity-equity-and-inclusion",
        permanent: true
      },
      {
        source: "/about-us/contact-us",
        destination: "/contact-us",
        permanent: true
      },
      {
        source: "/about-us/inclusion-statement",
        destination: "/about-us/corporate-responsibility/diversity-equity-and-inclusion",
        permanent: true
      },
      {
        source: "/about-us/press-room/all-news",
        destination: "/about-us/press-room",
        permanent: true
      },
      {
        source: "/about-us/press-room/industry-experts",
        destination: "/about-us/press-room/talk-with-an-expert",
        permanent: true
      },
      {
        source: "/about-us/press-room/public-relations-team",
        destination: "/about-us/press-room",
        permanent: true
      },
      {
        source: "/about-us/westfield-hospitality",
        destination: "/about-us/hospitality",
        permanent: true
      },
      {
        source: "/about-us/westfield-hospitality/blair-center",
        destination: "/about-us/hospitality",
        permanent: true
      },
      {
        source: "/about-us/westfield-hospitality/westfield-inn",
        destination: "/about-us/hospitality",
        permanent: true
      },
      {
        source: "/additional-agent-information",
        destination: "/become-an-agent",
        permanent: true
      },
      {
        source: "/agency-news/agency-events",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/2021-accelerate-insights",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/2024-propel-agencies",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/20-in-20",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/3-simple-ways-to-tighten-up-your-wi-fi-router-security",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/42578-opportunities",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/a-closer-look-at-workers-comp",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/agency-dei---embracing-the-community-you-insure",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/agency-engagement-survey",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/agency-revolution---empowering-you-to-grow",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/agency-revolution-webinar-invitation",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/agency-specialist-whos-where",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/alert--advanced-phishing-attempts-are-surging",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/a-positive-spin-on-doom",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/a-share-an-invitation",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/a-simple-move",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/at-your-service",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resource-page",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resources",
        destination: "/agency-news/awp-resources",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resources/awp-launch-redesigned-with-you-in-mind",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resources/awp-surety-contacts-and-bond-forms",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resources/easily-find-contacts",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/awp-launch-resources/the-improved-search-capability-on-the-new-awp",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/bait-and-steal",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/banking-inspired-by-insurance-heritage",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/be-our-guest",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/big-i-2020-capitol-hill-legislative-conference",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/big-i-conference-2024",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/billing-fee-changes",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/carrier-management---ed-largent",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/ccc-open-shop-replaces-westfield-preferred-provider-program",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/chestnuts-roasting-on-a-well-ventilated-safe-open-fire",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/claims-enhancements-july-2024",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/claims-the-power-of-people",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/co-brand-with-westfield",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/coming-soon-ting-electrical-fire-monitoring-service",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/companion-car-discount-update",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/customer-workspace",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/digital-appetite-guide",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/digital-claims-payments-are-here",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/direct-reporting-can-give-you-more-time-to-grow-your-business",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/ed-largent-hosts-agency-nation-on-our-campus",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/extending-premium-relief-to-new-customers",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/former-westfield-board-chair-and-ceo-cary-blair-passes-away",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/get-estimates-pronto",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/got-air",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/got-swag",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/go-virtual",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/harness-the-power-of-digital",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/high-value-assist---exterior-plus",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/ill-be-there-for-you",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/improved-claims-inquiry-tool-now-available-on-awp",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/input-equals-results",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/inside-our-workers-compensation-coverage-return-to-work-program",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/insurance-marketing-for-agencies-and-brokers",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/its-risky-business",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/make-your-voice-heard",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/manufacturing-an-economic-backbone",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/my-westfield-adds-more-value-for-customers",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/mywestfield---hello-freedom",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/net-promoter-score",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/new-and-improved-email-encryption-from-westfield",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/new-for-you-and-your-customers-autos",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/new-for-you-live-chat-with-customer-care",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/old-macdonald-doesnt-just-drive-tractors",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/personal-cyber-protection",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/personal-lines-down-payment",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/read-all-about-it",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/read-it-and-eat",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/remaining-equipped",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/remove-yourself-from-the-premium-refund-process",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/share-your-insight-on-our-new-personal-lines-project",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/sharing-knowledge-series-westfield-bank-podcast-and-video-series",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/small-business-transfer-books",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/spotlight-preferred-class",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/take-a-bite-out-of-our-appetite",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/the-american-farmer-and-covid-19",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/the-art-of-the-pivot",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/the-dawn-of-a-new-day",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/theres-more-where-that-came-from",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/the-westfield-appetite-guide-is-better-than-ever",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/think-differently",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/time-for-our-annual-customer-survey",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/transfer-books---a-simple-move",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/updated-process-for-westfield-appointments--system-access",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/western-reserve-historical-society-100-year-induction",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/westfield-auto-claims-to-spring-ahead-with-new-tools",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/westfield-provides-premium-relief-for-personal-insurance-auto-customers",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/westfield-sales-invitational",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/westfield-specialty---making-an-impact",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/win-with-westfield-workers-compensation",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/agency-news/articles/women-in-agribusiness-and-westfield",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/ag-progress-days-2023",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/art-of-the-pivot--are-you-ready-for-more",
        destination: "/",
        permanent: true
      },
      {
        source: "/art-of-the-pivot--content-for-all",
        destination: "/",
        permanent: true
      },
      {
        source: "/art-of-the-pivot--personal-lines",
        destination: "/home-and-auto",
        permanent: true
      },
      {
        source: "/art-of-the-pivot--small-business",
        destination: "/",
        permanent: true
      },
      {
        source: "/awp-selection-page",
        destination: "/",
        permanent: true
      },
      {
        source: "/billing/billing-faq",
        destination: "/billing",
        permanent: true
      },
      {
        source: "/billing/understanding-your-bill",
        destination: "/billing",
        permanent: true
      },
      {
        source: "/billing/understanding-your-bill/version-1",
        destination: "/billing",
        permanent: true
      },
      {
        source: "/billing/understanding-your-bill/version-2",
        destination: "/billing",
        permanent: true
      },
      {
        source: "/bridgestone-2022",
        destination: "/",
        permanent: true
      },
      {
        source: "/careers/culture",
        destination: "/careers",
        permanent: true
      },
      {
        source: "/careers/diversity-and-inclusion",
        destination: "/about-us/corporate-responsibility/diversity-equity-and-inclusion",
        permanent: true
      },
      {
        source: "/careers/find-your-path",
        destination: "/careers/career-opportunities",
        permanent: true
      },
      {
        source: "/careers/notices",
        destination: "/careers",
        permanent: true
      },
      {
        source: "/careers/why-westfield",
        destination: "/careers",
        permanent: true
      },
      {
        source: "/cheers-to-local-farmers",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/claims/claims-checklists",
        destination: "/claims",
        permanent: true
      },
      {
        source: "/claims/claims-checklists/insurance-claims-checklist",
        destination: "/about-us/articles/property-insurance-claims-checklist",
        permanent: true
      },
      {
        source: "/claims/claims-checklists/steps-to-take-after-a-car-accident",
        destination: "/about-us/articles/what-to-do-after-a-car-accident",
        permanent: true
      },
      {
        source: "/claims/claims-checklists/steps-to-take-if-you-get-sued",
        destination: "/claims",
        permanent: true
      },
      {
        source: "/claims/claims-checklists/workers-compensation-claims-checklist",
        destination: "/about-us/articles/workers-comp-claims-process",
        permanent: true
      },
      {
        source: "/claims/how-to-report-a-claim",
        destination: "/claims",
        permanent: true
      },
      {
        source: "/claims/report-an-auto-glass-claim",
        destination: "/claims/personal-auto",
        permanent: true
      },
      {
        source: "/claims/surety-claims",
        destination: "/claims/surety",
        permanent: true
      },
      {
        source: "/claims/testimonials",
        destination: "/about-us",
        permanent: true
      },
      {
        source: "/claims/workers-compensation-claims",
        destination: "/claims/workers-compensation",
        permanent: true
      },
      {
        source: "/commodity-classic",
        destination: "/",
        permanent: true
      },
      {
        source: "/covid-19",
        destination: "/",
        permanent: true
      },
      {
        source: "/covid-19/covid-19-faq",
        destination: "/",
        permanent: true
      },
      {
        source: "/csc-talking-points-and-frequently-asked-questions",
        destination: "/",
        permanent: true
      },
      {
        source: "/custom-comp---opt-in",
        destination: "/",
        permanent: true
      },
      {
        source: "/denver-westfield-event",
        destination: "/",
        permanent: true
      },
      {
        source: "/earthquake-alerts",
        destination: "/",
        permanent: true
      },
      {
        source: "/executive-resources",
        destination: "/",
        permanent: true
      },
      {
        source: "/executive-resources/this-is-westfield",
        destination: "/",
        permanent: true
      },
      {
        source: "/find-an-agent",
        destination: "https://my.westfieldinsurance.com/AgentLocator/AgenciesEntry.aspx",
        permanent: true
      },
      {
        source: "/founders-day",
        destination: "/about-us/history",
        permanent: true
      },
      {
        source: "/awp-selection-page",
        destination: "https://agent.westfieldinsurance.com",
        permanent: true
      },
      {
        source: "/home/awp-selection-page",
        destination: "https://agent.westfieldinsurance.com",
        permanent: true
      },
      {
        source: "/home/awp%20selection%20page",
        destination: "https://agent.westfieldinsurance.com",
        permanent: true
      },
      {
        source: "/home/awp selection page",
        destination: "https://agent.westfieldinsurance.com",
        permanent: true
      },
      {
        source: "/home/awp-selection-page",
        destination: "https://agent.westfieldinsurance.com",
        permanent: true
      },
      {
        source: "/improvements-to-the-westfield-automated-phone-menu",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/insurance",
        destination: "/",
        permanent: true
      },
      {
        source: "/insurance/business-insurance",
        destination: "/business",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/how-to-avoid-a-salary-dispute",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/why-you-struggle-at-delegating-tasks-and-8-things-you-can-do-about-it",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages",
        destination: "/business",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/auto",
        destination: "/business/commercial-auto-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/business-interruption",
        destination: "/business/business-interruption-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/business-owners-policy-bop",
        destination: "/business/business-owners-policy",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/commercial-package",
        destination: "/business",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/crime",
        destination: "/business/crime-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/cyber-suite",
        destination: "/business/commercial-cyber-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/equipment-breakdown",
        destination: "/business/equipment-breakdown-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/inland-marine",
        destination: "/business/inland-marine-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/liability",
        destination: "/business/general-liability-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/property",
        destination: "/business/commercial-property-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/umbrella",
        destination: "/business/commercial-umbrella-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/coverages/workers-compensation",
        destination: "/business/workers-comp-insurance",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/custom-billing",
        destination: "/billing",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/premium-audit",
        destination: "/business/premium-audit",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/premium-audit/frequently-asked-questions",
        destination: "/business/premium-audit",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/premium-audit/glossary-of-terms",
        destination: "/business/premium-audit",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/premium-audit/preparing-for-your-audit",
        destination: "/business/premium-audit",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products",
        destination: "/business",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/contractors",
        destination: "/business/contractors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/contractors/5-star-construction-award",
        destination: "/business/contractors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/contractors/contractor-insights",
        destination: "/business/contractors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/contractors/what-does-risk-mean-to-you",
        destination: "/business/contractors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/distributors",
        destination: "/business/distributors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/health-care",
        destination: "/business/healthcare",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/health-care/medical-diagnostic-laboratories",
        destination: "/business/healthcare",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/health-care/medical-offices",
        destination: "/business/healthcare",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/health-care/outpatient-care-centers",
        destination: "/business/healthcare",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/hospitality",
        destination: "/business/hospitality",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/hospitality/golf-courses",
        destination: "/business/hospitality/golf-courses",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/hospitality/hotels",
        destination: "/business/hospitality/hotels",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/hospitality/restaurants",
        destination: "/business/hospitality/restaurants",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/manufacturers",
        destination: "/business/manufacturers",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/products/real-estate",
        destination: "/business/real-estate",
        permanent: true
      },
      {
        source: "/insurance/farm-and-agribusiness",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/insurance/farm-and-agribusiness/agribusiness-network",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/insurance/farm-and-agribusiness/agribusiness-network/safeguarding-your-future",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/insurance/farm-and-agribusiness/agribusiness-network/safeguarding-your-future/farmowners-identity-theft-protection",
        destination: "/business/agribusiness/",
        permanent: true
      },
      {
        source: "/insurance/farm-and-agribusiness/poultry",
        destination: "/business/agribusiness/farm-insurance/livestock",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance",
        destination: "/home-and-auto/",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages",
        destination: "/home-and-auto/",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/cyber-security",
        destination: "/home-and-auto/homeowners-insurance/cyber",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/flood",
        destination: "/home-and-auto/homeowners-insurance/inland-flood",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/gap-coverage",
        destination: "/home-and-auto/auto-insurance/loan-gap-coverage",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/home-equipment-breakdown",
        destination: "/home-and-auto/homeowners-insurance/home-equipment-breakdown",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/identity-theft",
        destination: "/home-and-auto/homeowners-insurance/identity-theft",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/liability",
        destination: "/home-and-auto/homeowners-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/property",
        destination: "/home-and-auto/homeowners-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/replacement-cost",
        destination: "/home-and-auto/homeowners-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/service-lines",
        destination: "/home-and-auto/homeowners-insurance/service-line-coverage",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/umbrella",
        destination: "/home-and-auto/homeowners-insurance/personal-umbrella",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/coverages/uninsured-motorist",
        destination: "/home-and-auto/auto-insurance/uninsured-motorist",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products",
        destination: "/home-and-auto/homeowners-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products/condos",
        destination: "/home-and-auto/homeowners-insurance/condo-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products/high-value-homes-package",
        destination: "/home-and-auto/wespak-estate",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products/renters",
        destination: "/home-and-auto/homeowners-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products/ting-electrical-fire-prevention",
        destination: "/ting",
        permanent: true
      },
      {
        source: "/home-and-auto/homeowners-insurance/ting",
        destination: "/ting",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/home-products/wespak",
        destination: "/home-and-auto/wespak",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products",
        destination: "/home-and-auto/auto-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/auto",
        destination: "/home-and-auto/auto-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/auto/missionsafe",
        destination: "/home-and-auto/auto-insurance/missionsafe",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/auto/missionsafe/missionsafe-terms-and-conditions",
        destination: "/home-and-auto/auto-insurance/missionsafe/terms-and-conditions",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/boat",
        destination: "/home-and-auto/auto-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/motorcycle",
        destination: "/home-and-auto/auto-insurance",
        permanent: true
      },
      {
        source: "/insurance/personal-insurance/vehicle-products/rv-camper",
        destination: "/home-and-auto/auto-insurance",
        permanent: true
      },
      {
        source: "/specialty",
        destination: "https://www.westfieldspecialty.com/",
        permanent: true
      },
      {
        source: "/insurance/specialty",
        destination: "https://www.westfieldspecialty.com/",
        permanent: true
      },
      {
        source: "/insurance/specialty/graham-evans",
        destination: "https://westfieldspecialty.com/About-Us/Our-Team/Graham-Evans",
        permanent: true
      },
      {
        source: "/specialty/westfield-specialty-environmental-claims",
        destination: "https://www.westfieldspecialty.com/Claims/environmental-claims",
        permanent: true
      },
      {
        source: "/specialty/westfield-specialty-cyber-claims",
        destination: "https://www.westfieldspecialty.com/Claims/cyber-claims",
        permanent: true
      },
      {
        source: "/insurance/specialty/westfield-specialty-environmental-claims",
        destination: "https://www.westfieldspecialty.com/Claims/environmental-claims",
        permanent: true
      },
      {
        source: "/insurance/specialty/westfield-specialty-cyber-claims",
        destination: "https://www.westfieldspecialty.com/Claims/cyber-claims",
        permanent: true
      },
      {
        source: "/specialty-privacy-promise",
        destination: "/privacy-promise",
        permanent: true
      },
      {
        source: "/insurance/surety",
        destination: "/business/surety-bonds",
        permanent: true
      },
      {
        source: "/insurance/surety/commercial-surety",
        destination: "/business/surety-bonds/commercial-surety",
        permanent: true
      },
      {
        source: "/insurance/surety/contract-surety",
        destination: "/business/surety-bonds/contract-surety",
        permanent: true
      },
      {
        source: "/insurance/surety/contract-surety/wesexpress",
        destination: "/business/surety-bonds/contract-surety",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation",
        destination: "/business/workers-comp-insurance",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/nurse-triage",
        destination: "/business/workers-comp-insurance/nurse-triage",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/pharmacy-benefit-program",
        destination: "/business/workers-comp-insurance/pharmacy-benefits",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/physician-and-medical-directories",
        destination: "/business/workers-comp-insurance/medical-provider-network",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/return-to-work",
        destination: "/business/workers-comp-insurance/return-to-work",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/wescare",
        destination: "/business/workers-comp-insurance/wescare-programs",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/wesworks",
        destination: "/business/workers-comp-insurance/return-to-work",
        permanent: true
      },
      {
        source: "/insurance/workers-compensation/workers-compensation-services",
        destination: "/business/workers-comp-insurance/wescare-programs",
        permanent: true
      },
      {
        source: "/insure-your-possibilities",
        destination: "/",
        permanent: true
      },
      {
        source: "/insure-your-possibilities-thank-you-for-your-submission",
        destination: "/",
        permanent: true
      },
      {
        source: "/jabber-mobile-landing-page",
        destination: "/",
        permanent: true
      },
      {
        source: "/jabber-mobile-landing-page/bold-penguin",
        destination: "/",
        permanent: true
      },
      {
        source: "/legacy-of-caring/legacy-of-caring-submission",
        destination: "/legacy-of-caring",
        permanent: true
      },
      {
        source: "/legacy-of-caring/nominate-a-partner-non-profit",
        destination: "/legacy-of-caring",
        permanent: true
      },
      {
        source: "/legacy-of-caring/nominate-your-non-profit",
        destination: "/legacy-of-caring",
        permanent: true
      },
      {
        source: "/legacy-of-caring/nomination",
        destination: "/legacy-of-caring",
        permanent: true
      },
      {
        source: "/mywestfieldprivacypolicy",
        destination: "/privacy-promise",
        permanent: true
      },
      {
        source: "/my-westfield---unsubscribe",
        destination: "/",
        permanent: true
      },
      {
        source: "/my-westfield---updates-unsubscribe",
        destination: "/",
        permanent: true
      },
      {
        source: "/power-of-inclusion",
        destination: "/agency-news",
        permanent: true
      },
      {
        source: "/required-software-and-hardware",
        destination: "/",
        permanent: true
      },
      {
        source: "/resources",
        destination: "/",
        permanent: true
      },
      {
        source: "/resources/articles",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/6-steps-to-take-after-a-car-accident",
        destination: "/about-us/articles/what-to-do-after-a-car-accident",
        permanent: true
      },
      {
        source: "/resources/articles/how-citrus-fruit-grows-in-the-winter",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-grapes-grow-from-vine-to-wine",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-learn-about-insurance-and-money-from-board-games",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-wrap-your-pipes-and-winterize-them-safely",
        destination: "/about-us/articles/5-steps-to-prevent-frozen-pipes",
        permanent: true
      },
      {
        source: "/resources/articles/learn-how-corn-goes-from-a-field-to-your-home",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-are-the-main-uses-of-corn",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-to-do-after-property-damage-from-a-natural-disaster",
        destination: "/about-us/articles/how-to-prepare-your-home-and-family-for-a-spring-thunderstorm",
        permanent: true
      },
      {
        source: "/resources/articles/workers-comp-claims-checklist",
        destination: "/about-us/articles/workers-comp-claims-process",
        permanent: true
      },
      {
        source: "/resources/efficiency-first-tool",
        destination: "/business/efficiency-first-tool",
        permanent: true
      },
      {
        source: "/resources/mywestfield",
        destination: "/mywestfield",
        permanent: true
      },
      {
        source: "/save-energy-and-money-with-efficiency-first",
        destination: "/",
        permanent: true
      },
      {
        source: "/scam-alert",
        destination: "/",
        permanent: true
      },
      {
        source: "/small-business",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/appetite",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/contact-us",
        destination: "/contact-us",
        permanent: true
      },
      {
        source: "/small-business/conversion",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/conversion/billing",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/conversion/erisa-coverage",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/conversion/policy-and-customer-impact",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/conversion/schedule",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/marketing",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/platform-enhancements",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/platform-enhancements/platform-launch",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/products",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/products/contractors-professional-and-pollution-legal-liability",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business/products/surestep",
        destination: "/business/business-owners-policy",
        permanent: true
      },
      {
        source: "/small-business/products/workers-compensation",
        destination: "/business/workers-comp-insurance",
        permanent: true
      },
      {
        source: "/small-business/readiness-resources",
        destination: "/business",
        permanent: true
      },
      {
        source: "/small-business-resources",
        destination: "/business",
        permanent: true
      },
      {
        source: "/well-health-safety-rated",
        destination: "/",
        permanent: true
      },
      {
        source: "/westfield-careers-privacy-promise",
        destination: "/privacy-promise",
        permanent: true
      },
      {
        source: "/westfield-customer-panel",
        destination: "/privacy-promise/customer-panel-terms-of-use-and-privacy-promise",
        permanent: true
      },
      {
        source: "/youve-made-the-first-move",
        destination: "/",
        permanent: true
      },
      {
        source: "/resources/articles/5-most-common-causes-of-reported-house-fires",
        destination: "/about-us/articles/common-causes-of-house-fires",
        permanent: true
      },
      {
        source: "/resources/articles/do-i-need-a-battery-backup-or-insurance-for-a-sump-pump-failure",
        destination: "/about-us/articles/sump-pump-failure-insurance-coverage",
        permanent: true
      },
      {
        source: "/resources/articles/2023-hurricane-season-preparedness",
        destination: "/about-us/articles/how-to-prepare-for-a-hurricane",
        permanent: true
      },
      {
        source: "/resources/articles/car-theft-prevention",
        destination: "/about-us/articles/car-theft-prevention",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/abd-17_footprintmapflyer.pdf",
        destination: "/business/agribusiness",
        permanent: true
      },
      {
        source: "/-/media/files/westfield-specialty/ws-72-0123-why-westfield-specialty-final.pdf",
        destination: "https://www.westfieldspecialty.com/",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/specialty-insurance/ws-32-0922-financial-institutions.pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/Financial-Institutions",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/specialty-insurance/westfield-specialty_excess-casualty_ws14_0922.pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/ES-Excess-Casualty",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/specialty-insurance/westfield-specialty_professional-liability_ws12_091721_digital-(1).pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/Professional-Liability",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/specialty-insurance/westfield-specialty_cyber-and-professional_ws11_091721_digital-(1).pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/Professional-Liability",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/specialty-insurance/westfield-specialty_mgmt-liability_ws13_091721_digital.pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/Management-Liability",
        permanent: true
      },
      {
        source: "/-/media/files/westfield-specialty/ws-85-environmental_sales-sheet-0523.pdf",
        destination: "https://westfieldspecialty.com/Westfield-Specialty-Insurance-Solutions/Environmental",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/distracted-driving.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/driver-qualifications.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/driver-training.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---construction---hand-and-power-tool-safety-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---hazardous-chemical-safety-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---lock-out_tag-out-safety-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---machine-guarding-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---osha-electrical-safety-checklist_0723.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---osha-emergency-action-plan-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/employee-safety---permit-required-confined-space-safety-checklist.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/motor-vehicle-record-driver-eligibility-criteria.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/permitted-use-of-company-vehicle-policy.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/-/media/project/westfield/westfieldinsurance/documents/risk-control-forms/vehicle-post-accident-investigation.pdf",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/insurance/specialty-leadership-team",
        destination: "https://www.westfieldspecialty.com/",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/a-first-of-its-kind-cybersecurity-solution-designed-specifically-for-insurance-agents",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/healthy-ohio-business-council-honors-employers-for-healthy-practices",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/top-challenges-small-business-owners-face",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-helps-provide-400000-meals-to-local-families-in-need",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-insurance-announces-new-partnership-with-lytx-drivecam-safety-program",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-insurance-donates-bait-cars-to-patrol",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-insurance-foundation-awards-1-3-million-benefitting-communities-across-15-states",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-insurance-launches-digital-tool-giving-small-business-owners-a-competitive-edge",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-insurance-selects-duck-creeks-software-as-a-service-policy-administration-solution",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-invests-in-small-business-names-robyn-hahn-president-small-business",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-recognized-as-founding-partner-of-2019-bridgestone-senior-players-championship",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-recognizes-top-performing-independent-agencies",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfield-welcomes-greg-garrett-as-diversity-inclusion-operations-leader",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/about-us/press-room/press-releases/westfields-chief-insurance-operations-officer-named-as-namics-new-vice-chair",
        destination: "/about-us/press-room/press-releases",
        permanent: true
      },
      {
        source: "/resources/articles/10-tech-innovations-that-have-improved-driving-safety",
        destination: "/about-us/articles/10-tech-innovations-that-have-improved-driving-safety-is-your-car-equipped",
        permanent: true
      },
      {
        source: "/resources/articles/hurricanes-preparedness-is-key",
        destination: "/about-us/articles/how-to-prepare-for-a-hurricane",
        permanent: true
      },
      {
        source: "/resources/articles/2023-hurricane-season-preparedness",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/3-ways-to-protect-your-home-from-burglars",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/4-reasons-an-umbrella-policy-is-essential-protection",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/4-ways-big-data-can-help-small-businesses-grow",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-affordable-ways-to-make-your-small-business-run-more-smoothly",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-food-truck-operator-insurance-coverages",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-holiday-online-shopping-safety-tips",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-reasons-to-write-workers-compensation-with-westfield-in-2024",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-safe-driving-tips-to-protect-you-on-the-road",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-shop-safety-tips-to-manage-holiday-crowds",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-signs-of-fraudulent-contractors",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-summer-projects-to-prevent-damage-to-your-home",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-trends-that-are-reshaping-the-beauty-industry",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/5-ways-to-avoid-the-most-common-types-of-car-accidents",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/6-safety-tips-to-help-avoid-expensive-claims-this-fall",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/above-normal-atlantic-hurricane-season-predicted",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/and-the-oscar-goes-to-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/are-pools-covered-by-homeowners-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/arson-awareness-week-preparing-and-protecting-your-business-from-arson",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/attitude-what-matters-most-to-customers-in-insurance-claims",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/a-winter-checklist-to-get-your-home-ready-for-the-cold",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/before-buying-and-insuring-a-used-car-make-sure-you-follow-these-tips",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/benefits-of-cloud-computing-the-small-business-starter-guide",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/beyond-peace-of-mind-why-small-business-insurance-is-a-smart-bet",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/business-insurance-for-beauty-salon-contractors",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/can-you-get-workers-compensation-if-you-work-from-home",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/can-your-business-withstand-a-cyber-attack",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/changes-in-consumer-tastes-impacting-dairy-farms",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/construction-in-quarantine-easy-diy-projects-you-can-tackle-now",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/cyberattacks-on-the-rise-10-easy-ways-small-businesses-can-prevent-them",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/cyberbullying-is-serious-heres-how-you-can-prevent-it",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/dairy-farm-equipment-insurance-101",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/debunking-four-common-myths-about-hand-sanitizer",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/deer-hazard-what-drivers-need-to-know-about-collisions-and-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/digging-up-dirt-this-spring-here-is-what-you-need-to-know",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/direct-reporting-saves-you-time",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/does-rental-insurance-cover-theft",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/do-you-need-to-cover-your-rv-boat-or-motorcycle-year-round",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/drive-through-disaster-how-this-building-owner-navigated-his-insurance-claim",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/easy-fixes-for-some-of-your-homes-biggest-hazards",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/entrepreneurship-comes-with-risks-heres-how-to-mitigate-them",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/falls-bumps-and-bruises-oh-my-test-your-injury-iq",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/farming-news-update-climate-change-supply-chains-present-obstacles-for-farmers",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/farm-safety-for-kids",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/fire-pit-safety-what-you-need-to-know",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/five-password-best-practices-keeping-cyber-criminals-at-bay",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/heres-how-the-food-in-your-winter-stew-grows",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/home-fire-safety-how-to-optimize-your-smoke-detector-for-maximum-efficiency",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-can-travelers-insure-their-skis",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-do-pumpkins-grow",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-do-strawberries-and-blueberries-grow",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-do-watermelons-grow",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-insurance-saves-the-big-game",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-it-grows-winter-greens",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-avoid-distracted-driving",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-eat-drink-and-be-merry-the-survival-of-restaurants-in-a-post-pandemic-world",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-get-your-chimney-ready-for-the-winter",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-to-prepare-your-home-for-fall",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/how-traffic-has-changed-since-the-pandemic",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/if-contractors-want-to-build-will-workers-come",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/impact-of-high-end-home-improvements-on-your-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/ins-and-outs-of-a-contract-surety-claim",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/insurance-101-for-beauty-pros-on-the-go",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/insurance-fraud-what-does-it-mean-for-consumers",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/insuring-your-collectibles",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/is-there-a-difference-between-being-an-independent-contractor-and-being-self-employed",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/is-your-business-prepared-for-natural-disasters",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/is-your-insurance-as-ready-as-you-are",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/key-tax-tips-for-independent-contractors",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/look-for-a-surety-company-willing-to-invest-in-you",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/make-warehouse-distribution-center-safety-a-priority",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/new-ohio-distracted-driving-law-may-impact-insurance-rates",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/personal-insurance-coverage-test",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/phishing-dont-get-caught-in-an-online-scam",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/railroad-crossing-safety-tips-for-drivers/data/articledetailpage-1",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/renovating-your-home-first-renovate-your-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/renting-this-type-of-insurance-is-a-must-have",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/revisit-the-pivot-5-things-small-businesses-should-do-now",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/risks-of-taking-out-a-small-business-loan",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/running-a-home-based-business-take-this-insurance-iq-test-now",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/safety-and-risk-management-education-for-healthcare-businesses",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/small-businesses-need-new-skills-and-resources-for-evolving-times",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/small-business-insurance-101",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/smart-home-devices",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/social-media-strategy-whats-your-plan-to-bump-up-business",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/spray-finishing-with-flammable-liquids---fire-hazard",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/spring-cleaning-your-money",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/states-with-some-of-the-strictest-distracted-driving-laws",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/strategies-to-manage-a-remote-workforce",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/strategy-sessions-how-contractors-can-survive-and-thrive-in-a-post-pandemic-world",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/strategy-sessions-retail-shifts-in-the-pandemic-economy-and-beyond",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/survival-strategy-sessions-business-service-offices",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/technology-helps-but-the-human-touch-is-irreplaceable",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/the-insurance-policy-of-love",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/the-right-business-insurance-for-salon-owners",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/the-secret-to-happiness",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/the-state-of-the-dairy-industry-in-2020",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/this-year-the-great-american-road-trip-is-making-a-comeback",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/through-the-looking-glass----livestock-safety-tips",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/tips-for-owning-a-vacation-rental-property",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/to-buy-or-to-lease---that-is-the-question",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/understanding-renters-insurance-in-three-minutes",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/was-our-dinner-3d-printed",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/westfield-claims---we-were-there",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-costs-less---insuring-used-cars-or-new-cars",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-crop-shortages-mean-for-local-farmers-and-your-wallet",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-is-liability-auto-insurance",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-to-know-about-hiring-seasonal-employees",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/what-we-learned-from-this-years-wildfire-season",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/why-are-lumber-prices-so-high-and-how-its-impacting-home-construction",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/why-individuals-should-consider-an-insurance-agent",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/why-small-business-owners-need-insurance-agents",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/why-you-need-additional-insurance-coverage-for-your-high-value-home",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/will-your-homeowners-policy-cover-a-holiday-disaster",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/root/pg.jsp",
        destination: "/",
        permanent: true
      },
      {
        source: "/about-us/leadership-team",
        destination: "/about-us/leadership",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/ed-largent",
        destination: "/about-us/leadership/ed-largent",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/frank-carrino",
        destination: "/about-us/leadership/frank-carrino",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/jack-kuhn",
        destination: "/about-us/leadership/jack-kuhn",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/jennifer-palmieri",
        destination: "/about-us/leadership/jennifer-palmieri",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/joe-kohmann",
        destination: "/about-us/leadership/joe-kohmann",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/kathy-golovan",
        destination: "/about-us/leadership/kathy-golovan",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/kristine-neate",
        destination: "/about-us/leadership/kristine-neate",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/stuart-rosenberg",
        destination: "/about-us/leadership/stuart-rosenberg",
        permanent: true
      },
      {
        source: "/about-us/leadership-team/:slug*",
        destination: "/about-us/leadership",
        permanent: true
      },
      {
        source: "/co-branded-marketing-program/:slug*",
        destination: "/",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/risk-control/risk-control-forms",
        destination: "/business/risk-control/forms",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/risk-control/:slug*",
        destination: "/business/risk-control",
        permanent: true
      },
      {
        source: "/risk-control-resources/:slug*",
        destination: "/business/risk-control",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/3-mobile-apps-for-small-business-success",
        destination: "/about-us/articles/3-mobile-apps-for-small-business-success",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/5-restaurant-liabilities-that-could-stem-from-food-delivery-apps",
        destination: "/about-us/articles/5-restaurant-liabilities-that-could-stem-from-food-delivery-apps",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/creating-an-employee-training-program-7-tips-for-building-a-dream-team",
        destination: "/about-us/articles/creating-an-employee-training-program-7-tips-for-building-a-dream-team",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/facial-recognition-in-retail---what-are-the-benefits",
        destination: "/about-us/articles/facial-recognition-in-retail---what-are-the-benefits",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/fore-golf-course-property-liabilities-every-owner-should-address",
        destination: "/about-us/articles/fore-golf-course-property-liabilities-every-owner-should-address",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/how-to-handle-hotel-insurance-claims-caused-by-unruly-guests",
        destination: "/about-us/articles/how-to-handle-hotel-insurance-claims-caused-by-unruly-guests",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/how-to-protect-intellectual-property-from-your-competitors",
        destination: "/about-us/articles/how-to-protect-intellectual-property-from-your-competitors",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/protect-your-bottom-line-5-hidden-costs-that-could-break-your-business",
        destination: "/about-us/articles/protect-your-bottom-line-5-hidden-costs-that-could-break-your-business",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/risk-transfer-best-practices",
        destination: "/about-us/articles/risk-transfer-best-practices",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/the-pros-and-cons-of-each-business-structure",
        destination: "/about-us/articles/the-pros-and-cons-of-each-business-structure",
        permanent: true
      },
      {
        source: "/insurance/business-insurance/business-insights/:slug*",
        destination: "/about-us/articles",
        permanent: true
      },
      {
        source: "/resources/articles/:slug*",
        destination: "/about-us/articles/:slug*",
        permanent: true
      },
      {
        source: "/about-us/press-room/all-news/:slug*",
        destination: "/about-us/press-room",
        permanent: true
      },
    ];
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
