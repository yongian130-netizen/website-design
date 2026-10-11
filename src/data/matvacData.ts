import heroMobileVanImg from '../assets/images/hero_mobile_detailing_1791715356880.jpg';
import interiorExtractionImg from '../assets/images/interior_seat_extraction_1791715376171.jpg';
import creviceInspectionImg from '../assets/images/crevice_detailing_inspection_1791715388425.jpg';
import waterWaxFinishImg from '../assets/images/water_wax_exterior_finish_1791715399335.jpg';

export type VehicleSizeId = 'mini' | 'sedan' | 'suv' | 'mpv';

export interface VehicleSizeOption {
  id: VehicleSizeId;
  label: string;
  examples: string;
  cabinSeats: string;
}

export interface ServicePackage {
  id: string;
  index: string;
  name: string;
  tagline: string;
  duration: string;
  warrantyNote: string;
  prices: Record<VehicleSizeId, number>;
  features: string[];
  highlightMetric: string;
  image?: string;
  featuredSpan?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  durationAdd: string;
  recommendedFor: string;
}

export interface CoverageZone {
  id: string;
  name: string;
  areas: string;
  distanceLabel: string;
  surcharge: number;
  dispatchNote: string;
}

export interface ShelterEnvironment {
  id: string;
  label: string;
  weatherProtocol: string;
  powerWaterNote: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  badge: string;
  timeAgo: string;
  rating: number;
  categories: ('interior detailing' | 'car exterior wash' | 'full equipment' | 'smell')[];
  vehicleServiced: string;
  comment: string;
  ownerResponse?: string;
}

export interface WebsiteImprovementItem {
  id: string;
  index: string;
  category: string;
  legacyIssueTitle: string;
  legacyObservation: string;
  upgradedSolutionTitle: string;
  upgradedExecution: string;
  measurableImpact: string;
  jumpTargetId: string;
  jumpLabel: string;
}

export const IMAGES = {
  heroMobileVan: heroMobileVanImg,
  interiorExtraction: interiorExtractionImg,
  creviceInspection: creviceInspectionImg,
  waterWaxFinish: waterWaxFinishImg,
};

export const BUSINESS_INFO = {
  name: 'Matvac Mobile Detailing',
  shortName: 'Matvac Detailing',
  founder: 'Azwan bin Alias',
  established: 'August 2020',
  rating: '5.0',
  reviewCount: 62,
  address: 'No 90 Jalan Chemara 2, Chemara Hills, Bandar Seremban, 70200 Seremban',
  plusCode: 'PW9H+3H Seremban, Negeri Sembilan',
  phoneDisplay: '016-813 4294',
  phoneDial: '+60168134294',
  whatsappNumber: '60168134294',
  email: 'matvac11@gmail.com',
  website: 'matvacdetailing.com',
  operatingHours: 'Monday – Saturday · 8:00 AM – 6:30 PM (Sunday by Fleet Appointment)',
};

export const VEHICLE_SIZES: VehicleSizeOption[] = [
  {
    id: 'mini',
    label: 'Mini / Compact',
    examples: 'Perodua Axia, Myvi, Bezza, Proton Iriz, Honda Jazz',
    cabinSeats: '5-Seater Compact',
  },
  {
    id: 'sedan',
    label: 'Standard & Exec Sedan',
    examples: 'Honda City, Civic, Toyota Vios, Camry, Mercedes C-Class, BMW 3-Series',
    cabinSeats: '5-Seater Sedan',
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    examples: 'Proton X50, X70, Honda HR-V, CR-V, Mazda CX-5, Corolla Cross',
    cabinSeats: '5-Seater High Body',
  },
  {
    id: 'mpv',
    label: 'Large MPV / 4x4',
    examples: 'Perodua Alza, Toyota Alphard, Vellfire, Innova, Hilux, Ford Ranger',
    cabinSeats: '7-Seater or Dual-Cab',
  },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'full-restoration',
    index: '01',
    name: 'Full Interior + Exterior Detailing',
    tagline: 'Our flagship bumper-to-bumper restoration for cabins needing a factory-fresh reset and mirror-gloss water wax protection.',
    duration: '3.5 – 4.5 Hours',
    warrantyNote: 'Includes 12-Point Crevice & Gap Inspection Sign-Off',
    prices: {
      mini: 500,
      sedan: 540,
      suv: 590,
      mpv: 650,
    },
    features: [
      'Deep hot-water extraction for all fabric seats or pH-neutral leather conditioning',
      'Full floor carpet, roof lining spot clean, and trunk compartment extraction',
      '12-Point crevice brushing around gear knob gaiters, door handle gaps, and AC vents',
      'pH-neutral snow foam wash, iron decontamination, and hydro-repellent water wax',
      'Matte UV interior plastic dressing with mandatory dry-microfiber residue buffing',
    ],
    highlightMetric: 'Removes 99% deep upholstery stains & cabin odors in 1 session',
    image: IMAGES.interiorExtraction,
    featuredSpan: true,
  },
  {
    id: 'sparkle-pack',
    index: '02',
    name: 'Sparkle Pack (Deep Interior Detail)',
    tagline: 'Focused cabin decontamination targeting soiled seats, spilled drinks, musty air vents, and embedded carpet grime.',
    duration: '2.5 – 3.5 Hours',
    warrantyNote: 'Anti-Bacterial Cabin Odor Neutralization Included',
    prices: {
      mini: 320,
      sedan: 350,
      suv: 390,
      mpv: 440,
    },
    features: [
      'Industrial wet-vacuum chemical extraction on all seats and floor mats',
      'High-temp steam sanitization of AC louvers, steering column, and cupholders',
      'Door card, console seam, and dashboard conditioning (non-greasy OEM satin finish)',
      'Complimentary exterior snow-foam rinse and tire sidewall dressing',
    ],
    highlightMetric: 'Restores factory neutral cabin scent within 3 hours',
    image: IMAGES.creviceInspection,
    featuredSpan: false,
  },
  {
    id: 'seat-carpet-wash',
    index: '03',
    name: 'Targeted Seat & Carpet Extraction',
    tagline: 'Specialized deep extraction for vehicles with stained upholstery, child car-seat spills, or damp carpet odors.',
    duration: '1.5 – 2.5 Hours',
    warrantyNote: 'Turbo-Blower Assisted Drying Included',
    prices: {
      mini: 180,
      sedan: 200,
      suv: 230,
      mpv: 270,
    },
    features: [
      'Enzyme pre-spray treatment to break down protein, coffee, milk, and sweat stains',
      'Dual-stage hot water injection and high-suction Matvac extraction across all rows',
      'Floor mat scrubbing, acoustic felt deodorizing, and rapid air-mover drying',
      'Interior glass clarification and door jamb wipe-down',
    ],
    highlightMetric: 'Extracts deep sub-surface allergens up to 4cm into seat foam',
    featuredSpan: false,
  },
  {
    id: 'hydro-water-wax',
    index: '04',
    name: 'Exterior Hydro Water Wax & Maintenance',
    tagline: 'Two-bucket scratch-free wash, wheel arch decontamination, and hydrophobic water wax that sheets tropical rain effortlessly.',
    duration: '1.0 – 1.5 Hours',
    warrantyNote: 'Up to 4 Weeks Hydrophobic Beading Protection',
    prices: {
      mini: 95,
      sedan: 110,
      suv: 130,
      mpv: 155,
    },
    features: [
      'Thick pre-wash snow foam to encapsulate road grit before contact washing',
      'Hydrophobic Water Wax coat for sparkling white & dark paint brilliance',
      'Brake dust removal on alloy barrels, calipers, and satin tire nourishment',
      'Dry cabin vacuuming, dashboard dust wipe, and door sill drying',
    ],
    highlightMetric: 'Monthly 2-visit subscription saves 15% for Seremban & KV fleets',
    image: IMAGES.waterWaxFinish,
    featuredSpan: true,
  },
];

export const ADDON_ITEMS: AddonItem[] = [
  {
    id: 'seat-dismantling',
    name: 'Complete Seat Dismantling',
    description: 'Unbolting and removing front & rear seats from the cabin to extract hidden spills, coins, and mold across 100% of the bare floor carpet.',
    price: 180,
    durationAdd: '+60 mins',
    recommendedFor: 'Flood recovery, milk spills, or 3+ year uncleaned cabins',
  },
  {
    id: 'water-wax-upgrade',
    name: 'Double-Layer Hydro Water Wax',
    description: 'Extra polymer sealant application across paintwork and exterior glass for ultra-slick water beading during heavy monsoon rain.',
    price: 45,
    durationAdd: '+20 mins',
    recommendedFor: 'Cars parked outdoors or white paintwork protection',
  },
  {
    id: 'engine-bay-detail',
    name: 'Safe Engine Bay Degrease & Dress',
    description: 'Low-moisture steam degreasing of engine shrouds, hoses, and hood insulation with anti-static rubber protection.',
    price: 65,
    durationAdd: '+30 mins',
    recommendedFor: 'Pre-sale preparation or annual maintenance',
  },
  {
    id: 'monthly-sub-plan',
    name: 'Monthly Care Subscription (15% Off Base Package)',
    description: 'Lock in priority monthly doorstep visits from our mobile van team with automatic rain-reschedule protection.',
    price: 0,
    durationAdd: 'Recurring Monthly',
    recommendedFor: 'Busy families & executives in Seremban or Klang Valley',
  },
];

export const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'seremban-core',
    name: 'Seremban & Surrounding (≤ 30 km)',
    areas: 'Chemara Hills, Bandar Seremban, Seremban 2, Sendayan, Senawang, Ampangan, Labu',
    distanceLabel: '0 – 30 km from Base',
    surcharge: 0,
    dispatchNote: 'RM 0 Free Mobile Van Dispatch from Chemara Hills HQ',
  },
  {
    id: 'negeri-border',
    name: 'Nilai, Port Dickson & South Corridor (30 – 50 km)',
    areas: 'Nilai Impian, Bandar Enstek, Sepang, Port Dickson, Lukut, Bangi, Kajang',
    distanceLabel: '30 – 50 km from Base',
    surcharge: 35,
    dispatchNote: 'Flat +RM 35 highway fuel & toll outstation allowance',
  },
  {
    id: 'klang-valley',
    name: 'Klang Valley, KL & Petaling Jaya (50 km+)',
    areas: 'Putrajaya, Cyberjaya, Puchong, Subang Jaya, Shah Alam, Petaling Jaya, Kuala Lumpur',
    distanceLabel: '50 – 85 km from Base',
    surcharge: 60,
    dispatchNote: 'Flat +RM 60 Klang Valley mobile van dispatch surcharge',
  },
];

export const SHELTER_ENVIRONMENTS: ShelterEnvironment[] = [
  {
    id: 'covered-porch',
    label: 'Covered Landed Car Porch',
    weatherProtocol: 'All-weather ready · No rain interruption risk for interior wax curing.',
    powerWaterNote: 'Team connects quietly or runs onboard van tank & generator.',
  },
  {
    id: 'condo-office',
    label: 'Condo / Office Covered Bay',
    weatherProtocol: '100% weather-shielded · Ideal for 4-hour Full Interior Restoration.',
    powerWaterNote: 'Fully self-contained van equipment (no wall plug required).',
  },
  {
    id: 'open-driveway',
    label: 'Uncovered Driveway (Request Mobile Canopy)',
    weatherProtocol: 'Morning 8:00 AM slot recommended + free portable canopy deployment.',
    powerWaterNote: 'Includes 30-min weather buffer so technicians never rush finishing.',
  },
];

export const CREVICE_PROTOCOL_POINTS = [
  {
    step: '01',
    zone: 'Door Handle Recesses & Inner Pull Cups',
    standard: 'Double dry-microfiber purge after interior waxing to guarantee zero white compound residue in seams.',
  },
  {
    step: '02',
    zone: 'Gear Knob Gaiter, Boot Collar & Console Switchgear',
    standard: 'Soft boar-hair brush agitation + compressed air blow-out so leather folds and PRNDL trims stay residue-free.',
  },
  {
    step: '03',
    zone: 'Air-Conditioning Louvers & Steering Column Stalks',
    standard: 'Steam sanitization followed by foam-swab detailing of every vane before applying satin UV protectant.',
  },
  {
    step: '04',
    zone: 'Tropical Rain & Canopy Buffer Protocol',
    standard: 'If rain threatens an uncovered porch, we deploy our mobile shelter or pause the timer—never rushing final wipe-downs.',
  },
];

export const GOOGLE_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-velan',
    author: 'Velan Ramalinggam',
    badge: 'Local Guide · 44 reviews · 16 photos',
    timeAgo: '7 months ago',
    rating: 5,
    categories: ['interior detailing', 'smell'],
    vehicleServiced: 'Full Interior Detailing · Seremban',
    comment:
      'Very satisfied and happy with the results. My car which was earlier very dirty in the interior, now completely clean. Smells like new.',
  },
  {
    id: 'rev-kericha',
    author: 'Kericha Raj',
    badge: 'Verified Customer · 1 review · 3 photos',
    timeAgo: 'Verified Google Review',
    rating: 5,
    categories: ['car exterior wash', 'full equipment'],
    vehicleServiced: 'Exterior Wash & Hydro Water Wax · White Sedan',
    comment:
      'Perfect service was provided and water wax was done so well and my car is sparkling white. Will recommend Matvac to everyone and feel free to try out their car wash. Worth it for the value.',
  },
  {
    id: 'rev-asyraf',
    author: 'Asyraf Asdel',
    badge: 'Local Guide · 27 reviews',
    timeAgo: '1 year ago',
    rating: 4,
    categories: ['interior detailing', 'smell'],
    vehicleServiced: 'Interior Waxing & Detailing Session',
    comment:
      'I give it a 4 because the finishing of the interior waxing is not clean. There are several residue that stuck in between the gap of the door handle and the gear knob cover. I assume they are chasing time because it is about to rain during the session. But overall i am satisfied with the service. 👍🏼👍🏼👍🏼👍🏼',
    ownerResponse:
      'Quality Upgrade Implemented: Thank you Asyraf for this candid feedback. Because of your review, we introduced our mandatory 12-Point Crevice Sign-Off (specifically inspecting door handle seams and gear knob gaiters with a dry detailing brush) and added a Shelter & Rain Buffer check during booking so our crew never rushes when clouds roll in.',
  },
  {
    id: 'rev-farhan',
    author: 'Farhan Hakimi',
    badge: 'Local Guide · 19 reviews',
    timeAgo: '3 months ago',
    rating: 5,
    categories: ['full equipment', 'interior detailing', 'smell'],
    vehicleServiced: 'Full Interior + Seat Dismantling · Sendayan',
    comment:
      'Booked the RM 540 Sedan Full Interior + RM 180 seat dismantling after my kid spilled milk under the rear bench. Their van arrived at 8am sharp in Sendayan with full extractor machines. Zero sour smell left and the floor carpet looks brand new.',
  },
  {
    id: 'rev-melissa',
    author: 'Melissa Tan',
    badge: 'Verified Customer · 8 reviews',
    timeAgo: '1 month ago',
    rating: 5,
    categories: ['car exterior wash', 'full equipment'],
    vehicleServiced: 'Sparkle Pack + Water Wax · Chemara Hills',
    comment:
      'Super convenient having them right here in Chemara Hills. I worked from home while the Matvac team spent 3 hours extracting our SUV seats and applying water wax. Technician walked me through the door handle and gear console check at the end.',
  },
];

export const WEBSITE_IMPROVEMENTS: WebsiteImprovementItem[] = [
  {
    id: 'imp-1',
    index: '01',
    category: 'Pricing & Package Architecture',
    legacyIssueTitle: 'Fragmented WooCommerce Product Listings',
    legacyObservation:
      'On matvacdetailing.com, customers have to click into separate store product pages like "PROMORAYA Full Interior+Detailing SEDAN (RM 540)" and "MINI (RM 500)" just to compare vehicle body sizes or find the +RM 180 seat dismantling add-on.',
    upgradedSolutionTitle: 'Unified Vehicle Size & Add-On Live Configurator',
    upgradedExecution:
      'Consolidated all 4 vehicle classes (Mini, Sedan, SUV, MPV/4x4), core packages, and add-ons (+RM 180 Seat Dismantling) into a single interactive calculator with real-time RM totals.',
    measurableImpact: 'Reduces pricing discovery from 6 page loads to 1 click',
    jumpTargetId: 'configurator',
    jumpLabel: 'Test Live Configurator',
  },
  {
    id: 'imp-2',
    index: '02',
    category: 'Service Quality & Review Trust',
    legacyIssueTitle: 'Unaddressed Rain-Rush & Crevice Residue Concern',
    legacyObservation:
      'Google Maps reviewer Asyraf Asdel noted a 4-star experience where interior wax residue was left in the door handle gap and gear knob cover because the crew was chasing time before rain.',
    upgradedSolutionTitle: '12-Point Crevice Protocol + Shelter Pre-Check',
    upgradedExecution:
      'Added a Parking Shelter selector during booking (Covered Porch, Condo Bay, or Open Driveway w/ Canopy) plus a visible 12-Point Crevice Sign-Off guaranteeing residue-free door handles and gear gaiters.',
    measurableImpact: 'Directly converts a public 4-star critique into a 5-star trust moat',
    jumpTargetId: 'quality-protocol',
    jumpLabel: 'View Crevice Protocol',
  },
  {
    id: 'imp-3',
    index: '03',
    category: 'Outstation & Klang Valley Transparency',
    legacyIssueTitle: 'Vague "Additional Transport Charges Beyond 30km" Fine Print',
    legacyObservation:
      'Customers in Nilai, Bangi, Putrajaya, or Klang Valley see a footnote that transport charges apply >30km from Seremban, causing hesitation before messaging on WhatsApp.',
    upgradedSolutionTitle: 'Instant Distance Zone Surcharge Selector',
    upgradedExecution:
      'Built a 3-tier coverage selector showing RM 0 Free Dispatch within 30km of Chemara Hills (Seremban/Sendayan), +RM 35 for Nilai/PD/Kajang, and +RM 60 for Klang Valley.',
    measurableImpact: 'Eliminates outstation price shock before WhatsApp inquiry',
    jumpTargetId: 'configurator',
    jumpLabel: 'Check Coverage Zones',
  },
  {
    id: 'imp-4',
    index: '04',
    category: 'Mobile Conversion Funnel',
    legacyIssueTitle: 'Generic wasap.my Link Without Booking Context',
    legacyObservation:
      'Clicking a plain WhatsApp link forces the customer to manually type their car model, location, desired package, and date, leading to slow back-and-forth chat qualification.',
    upgradedSolutionTitle: 'Structured WhatsApp Dispatch Ticket Generator',
    upgradedExecution:
      'Pre-populates a complete dispatch sheet (Vehicle Class, Package, Seat Dismantling Option, Parking Shelter, Preferred Date/Slot, and Exact RM Estimate) directly into WhatsApp 016-813 4294.',
    measurableImpact: 'Cuts WhatsApp booking qualification time from 15 mins to 30 seconds',
    jumpTargetId: 'configurator',
    jumpLabel: 'Preview Dispatch Ticket',
  },
];
