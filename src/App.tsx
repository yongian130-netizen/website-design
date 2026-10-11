import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  Phone,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  SlidersHorizontal,
  MessageSquare,
  ExternalLink,
  Navigation,
  Share2,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  IMAGES,
  VEHICLE_SIZES,
  SERVICE_PACKAGES,
  ADDON_ITEMS,
  COVERAGE_ZONES,
  SHELTER_ENVIRONMENTS,
  CREVICE_PROTOCOL_POINTS,
  GOOGLE_REVIEWS,
  WEBSITE_IMPROVEMENTS,
  VehicleSizeId,
  CustomerReview,
} from './data/matvacData';
import { ResilientImage } from './components/ResilientImage';
import { BookingModal } from './components/BookingModal';

type ReviewFilterCategory =
  | 'all'
  | 'interior detailing'
  | 'car exterior wash'
  | 'full equipment'
  | 'smell';

export default function App() {
  // Interactive Configurator State
  const [selectedSizeId, setSelectedSizeId] = useState<VehicleSizeId>('sedan');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('full-restoration');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('seremban-core');
  const [selectedShelterId, setSelectedShelterId] = useState<string>('covered-porch');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Interactive Crevice Protocol Inspector State
  const [checkedProtocolSteps, setCheckedProtocolSteps] = useState<string[]>([
    '01',
    '02',
    '03',
    '04',
  ]);

  // Reviews Filter & Interactive Review Submission State
  const [reviewFilter, setReviewFilter] = useState<ReviewFilterCategory>('all');
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(GOOGLE_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewVehicle, setNewReviewVehicle] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewCategory, setNewReviewCategory] =
    useState<'interior detailing' | 'car exterior wash' | 'full equipment' | 'smell'>(
      'interior detailing'
    );
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewFormError, setReviewFormError] = useState('');
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState(false);

  // Share / Copy Address Feedback State
  const [copiedLocation, setCopiedLocation] = useState(false);

  // Derived Configurator Objects
  const currentVehicleSize = useMemo(
    () => VEHICLE_SIZES.find((v) => v.id === selectedSizeId) || VEHICLE_SIZES[1],
    [selectedSizeId]
  );

  const currentPackage = useMemo(
    () => SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0],
    [selectedPackageId]
  );

  const currentZone = useMemo(
    () => COVERAGE_ZONES.find((z) => z.id === selectedZoneId) || COVERAGE_ZONES[0],
    [selectedZoneId]
  );

  const currentShelter = useMemo(
    () => SHELTER_ENVIRONMENTS.find((s) => s.id === selectedShelterId) || SHELTER_ENVIRONMENTS[0],
    [selectedShelterId]
  );

  const selectedAddons = useMemo(
    () => ADDON_ITEMS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  const isMonthlySub = selectedAddonIds.includes('monthly-sub-plan');

  // Price Math
  const basePrice = currentPackage.prices[selectedSizeId];
  const discountAmount = isMonthlySub ? Math.round(basePrice * 0.15) : 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = basePrice - discountAmount + addonsTotal + currentZone.surcharge;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const toggleProtocolStep = (step: string) => {
    setCheckedProtocolSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleSelectPackageFromBento = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredReviews = useMemo(() => {
    if (reviewFilter === 'all') return reviewsList;
    return reviewsList.filter((r) => r.categories.includes(reviewFilter));
  }, [reviewsList, reviewFilter]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || newReviewAuthor.trim().length < 2) {
      setReviewFormError('Please enter your name.');
      return;
    }
    if (!newReviewText.trim() || newReviewText.trim().length < 12) {
      setReviewFormError('Please share at least a brief sentence about your detailing experience.');
      return;
    }
    const created: CustomerReview = {
      id: `rev-custom-${Date.now()}`,
      author: newReviewAuthor.trim(),
      badge: 'Verified Client · Direct Feedback',
      timeAgo: 'Just now',
      rating: newReviewRating,
      categories: [newReviewCategory],
      vehicleServiced: newReviewVehicle.trim() || `${currentVehicleSize.label} Detailing`,
      comment: newReviewText.trim(),
    };
    setReviewsList((prev) => [created, ...prev]);
    setNewReviewAuthor('');
    setNewReviewVehicle('');
    setNewReviewText('');
    setReviewFormError('');
    setShowReviewForm(false);
    setReviewSubmittedNotice(true);
    setTimeout(() => setReviewSubmittedNotice(false), 4000);
  };

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(
      `${BUSINESS_INFO.name} — ${BUSINESS_INFO.address} (${BUSINESS_INFO.plusCode}) | Tel: ${BUSINESS_INFO.phoneDisplay}`
    );
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-display font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Matvac Detailing
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#services"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#configurator"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Price Calculator
            </a>
            <a
              href="#quality-protocol"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Crevice Standard
            </a>
            <a
              href="#reviews"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#site-audit"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Website Audit
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Mobile Van
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* SECTION 1: PROPOSITION (HERO + QUANTITATIVE PROOF STRIP) */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Narrative Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Unboxed regional metadata kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <span>Chemara Hills, Seremban HQ</span>
                    <span aria-hidden="true">·</span>
                    <span>Klang Valley Mobile Fleet</span>
                    <span aria-hidden="true">·</span>
                    <span>Est. August 2020</span>
                  </div>

                  <h1
                    className="font-display font-bold text-slate-900 tracking-tight leading-[1.08] max-w-2xl"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Deep cabin extraction &amp; hydro water wax at your home porch.
                  </h1>

                  <p className="text-base text-slate-600 leading-relaxed max-w-[66ch]">
                    Founded in Seremban by engineering graduate Azwan bin Alias, Matvac Mobile
                    Detailing brings commercial hot-water seat extractors, steam sanitizers, and
                    hydro-repellent water wax directly to your landed driveway, condo bay, or
                    office carpark.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {/* Single Primary CTA + Quiet Secondary Link */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#configurator"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      Configure Vehicle &amp; Instant Quote
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#site-audit"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      See matvacdetailing.com UX Improvements
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>

                  {/* Direct Address & Operating Hours unboxed summary */}
                  <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">Seremban Base Station</p>
                      <p>No 90 Jalan Chemara 2, Chemara Hills, 70200 Seremban</p>
                      <p className="text-slate-400 font-mono-num">
                        Plus Code: {BUSINESS_INFO.plusCode}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">Dispatch Hours &amp; Direct Line</p>
                      <p>Opens 8:00 AM Mon – Sat · Doorstep Mobile Van</p>
                      <p className="font-mono-num text-slate-800 font-medium">
                        Tel / WhatsApp: {BUSINESS_INFO.phoneDisplay}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual Carrier */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative flex-1 min-h-[340px] lg:h-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                  <ResilientImage
                    src={IMAGES.heroMobileVan}
                    alt="Matvac Mobile Detailing technician applying hydro water wax on a white sedan under a residential porch with equipped mobile detailing van"
                    className="w-full h-full lg:h-full object-cover"
                    fallbackTitle="Matvac Mobile Detailing Van Fleet"
                    fallbackSubtitle="Chemara Hills, Seremban · Klang Valley"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-6">
                    <p className="text-xs text-slate-300">
                      On-Site Mobile Van · Full Equipment Onboard
                    </p>
                    <p className="text-base font-display font-semibold text-white mt-1">
                      Sparkling White Water Wax &amp; Full Interior Extraction
                    </p>
                    <p className="text-xs text-slate-300 mt-1 font-mono-num">
                      RM 0 Free Dispatch within 30 km of Bandar Seremban
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-2xl font-display font-bold text-slate-900 font-mono-num">
                  5.0 ★ (62 Reviews)
                </p>
                <p className="text-xs text-slate-500">
                  Verified Google Maps rating for Bandar Seremban mobile crew
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-display font-bold text-slate-900 font-mono-num">
                  30 km Free Zone
                </p>
                <p className="text-xs text-slate-500">
                  Zero transport surcharge across Seremban, Sendayan &amp; Senawang
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-display font-bold text-slate-900 font-mono-num">
                  RM 95 – RM 650
                </p>
                <p className="text-xs text-slate-500">
                  Transparent packages from Hydro Water Wax to Full Cabin Restoration
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-display font-bold text-slate-900 font-mono-num">
                  12-Point Sign-Off
                </p>
                <p className="text-xs text-slate-500">
                  Mandatory door-handle &amp; gear-knob crevice residue inspection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE CAPABILITIES (ASYMMETRIC BENTO GRID) */}
        <section id="services" className="py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  Mobile Service Architecture · Landed Homes, Condos &amp; Offices
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Engineered beyond a standard porch wash.
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                Select any treatment below to load its exact vehicle size pricing and duration into
                the live dispatch calculator.
              </p>
            </div>

            {/* Asymmetric Bento Grid (col-span-2 alongside col-span-1 on lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SERVICE_PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId;
                return (
                  <div
                    key={pkg.id}
                    className={`${
                      pkg.featuredSpan ? 'lg:col-span-2' : 'lg:col-span-1'
                    } bg-white border ${
                      isSelected ? 'border-sky-700' : 'border-slate-200'
                    } rounded-xl overflow-hidden flex flex-col justify-between transition-colors`}
                  >
                    <div>
                      {pkg.image && (
                        <div className="h-52 w-full overflow-hidden border-b border-slate-100 bg-slate-900 relative">
                          <ResilientImage
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-full object-cover"
                            fallbackTitle={pkg.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-4">
                            <p className="text-xs text-slate-200 font-mono-num">
                              {pkg.duration} · {pkg.warrantyNote}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="p-6 space-y-4">
                        {/* Unboxed metadata line */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                          <span>
                            {pkg.index}. {pkg.duration}
                          </span>
                          <span className="font-mono-num font-semibold text-slate-900">
                            Mini RM {pkg.prices.mini} · Sedan RM {pkg.prices.sedan} · SUV RM{' '}
                            {pkg.prices.suv}
                          </span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">
                          {pkg.index}. {pkg.name}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">{pkg.tagline}</p>

                        <ul className="space-y-2 pt-2 border-t border-slate-100">
                          {pkg.features.map((feat, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                            >
                              <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-600 truncate">{pkg.highlightMetric}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectPackageFromBento(pkg.id)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-700 text-white'
                            : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? 'Selected in Calculator' : 'Configure Package'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE VEHICLE SIZE, ADD-ON & DISTANCE CONFIGURATOR */}
        <section
          id="configurator"
          className="py-16 lg:py-20 bg-white border-b border-slate-200"
        >
          <div className="max-w-[1280px] mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  Interactive Rate &amp; Outstation Calculator · Replaces Separate Store Product Pages
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Calculate your exact doorstep detailing rate.
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-mono-num">
                All prices in MYR (RM) · Includes onboard water &amp; electricity where needed
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Controls */}
              <div className="lg:col-span-8 space-y-8">
                {/* Step 1: Vehicle Size Segmented Selector */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      01. Select Vehicle Body Class
                    </h3>
                    <span className="text-xs text-slate-500">{currentVehicleSize.cabinSeats}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {VEHICLE_SIZES.map((size) => {
                      const active = size.id === selectedSizeId;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSizeId(size.id)}
                          className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <p className="text-xs font-semibold whitespace-nowrap">{size.label}</p>
                          <p
                            className={`text-[11px] mt-1 line-clamp-2 ${
                              active ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {size.examples}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Core Package Selector */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      02. Choose Detailing Package
                    </h3>
                    <span className="text-xs text-slate-500 font-mono-num">
                      Duration: {currentPackage.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_PACKAGES.map((pkg) => {
                      const active = pkg.id === selectedPackageId;
                      const priceForSize = pkg.prices[selectedSizeId];
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-4 rounded-lg border text-left transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                            active
                              ? 'bg-white border-sky-700 ring-2 ring-sky-700/20'
                              : 'bg-white border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-medium text-slate-500">
                                Package {pkg.index}
                              </span>
                              <span className="text-base font-mono-num font-bold text-slate-900">
                                RM {priceForSize}
                              </span>
                            </div>
                            <p className="text-sm font-display font-bold text-slate-900">
                              {pkg.name}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500">
                            {pkg.duration} · {pkg.warrantyNote}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Add-Ons (Including +RM 180 Seat Dismantling) */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      03. Optional Restoration Add-Ons &amp; Monthly Plan
                    </h3>
                    <span className="text-xs text-slate-500">
                      Click to toggle · Seat dismantling available (+RM 180)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDON_ITEMS.map((addon) => {
                      const checked = selectedAddonIds.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-lg border text-left transition-colors flex flex-col justify-between gap-2 cursor-pointer ${
                            checked
                              ? 'bg-white border-sky-700 ring-2 ring-sky-700/20'
                              : 'bg-white border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-display font-bold text-slate-900">
                                {addon.name}
                              </span>
                              <span className="text-xs font-mono-num font-semibold text-sky-700 whitespace-nowrap">
                                {addon.price === 0 ? '-15% Base' : `+RM ${addon.price}`}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {addon.description}
                            </p>
                          </div>
                          <p className="text-[11px] text-slate-400 pt-1">
                            {addon.durationAdd} · Best for: {addon.recommendedFor}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Coverage Zone (>30km transparency) & Shelter Check */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      04. Dispatch Zone from Seremban
                    </h3>
                    <div className="space-y-2.5">
                      {COVERAGE_ZONES.map((zone) => {
                        const active = zone.id === selectedZoneId;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setSelectedZoneId(zone.id)}
                            className={`w-full p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                              active
                                ? 'bg-white border-sky-700 ring-2 ring-sky-700/20'
                                : 'bg-white border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-900">
                                {zone.name}
                              </span>
                              <span className="text-xs font-mono-num font-bold text-slate-900 whitespace-nowrap">
                                {zone.surcharge === 0 ? 'RM 0 Free' : `+RM ${zone.surcharge}`}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">{zone.areas}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <h3 className="text-base font-display font-bold text-slate-900">
                      05. Parking Shelter &amp; Weather Buffer
                    </h3>
                    <div className="space-y-2.5">
                      {SHELTER_ENVIRONMENTS.map((env) => {
                        const active = env.id === selectedShelterId;
                        return (
                          <button
                            key={env.id}
                            type="button"
                            onClick={() => setSelectedShelterId(env.id)}
                            className={`w-full p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                              active
                                ? 'bg-white border-sky-700 ring-2 ring-sky-700/20'
                                : 'bg-white border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <p className="text-xs font-semibold text-slate-900">{env.label}</p>
                            <p className="text-[11px] text-slate-600 mt-1">{env.weatherProtocol}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {env.powerWaterNote}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Live Tabular Estimate Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 bg-slate-900 text-white rounded-xl p-6 space-y-6 border border-slate-800">
                <div className="space-y-1 border-b border-slate-800 pb-4">
                  <p className="text-xs text-slate-400">
                    Live Dispatch Estimate · {currentVehicleSize.label}
                  </p>
                  <h3 className="text-xl font-display font-bold tracking-tight text-white">
                    {currentPackage.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono-num">
                    Estimated On-Site Time: {currentPackage.duration}
                  </p>
                </div>

                {/* Line-item breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-slate-200">
                    <span>Base Package ({currentVehicleSize.label})</span>
                    <span className="font-mono-num font-semibold">RM {basePrice}</span>
                  </div>

                  {isMonthlySub && (
                    <div className="flex items-center justify-between text-emerald-400 text-xs">
                      <span>Monthly Subscription Discount (-15%)</span>
                      <span className="font-mono-num font-semibold">-RM {discountAmount}</span>
                    </div>
                  )}

                  {selectedAddons
                    .filter((a) => a.price > 0)
                    .map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between text-slate-300 text-xs"
                      >
                        <span>+ {addon.name}</span>
                        <span className="font-mono-num">RM {addon.price}</span>
                      </div>
                    ))}

                  <div className="flex items-center justify-between text-slate-300 text-xs pt-2 border-t border-slate-800">
                    <span>Dispatch ({currentZone.distanceLabel})</span>
                    <span className="font-mono-num">
                      {currentZone.surcharge === 0 ? 'RM 0 (Free)' : `RM ${currentZone.surcharge}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Parking Environment</span>
                    <span className="truncate max-w-[170px] text-right">
                      {currentShelter.label}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Payable After Inspection</span>
                    <span className="text-[11px] text-slate-400">
                      No deposit required for Seremban zone
                    </span>
                  </div>
                  <span className="text-3xl font-display font-bold font-mono-num text-white">
                    RM {finalTotal}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full py-3 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Lock Slot &amp; Generate WhatsApp Ticket
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneDial}`}
                    className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Direct: {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Includes our 12-Point Gap &amp; Crevice Check (door handles, gear knob cover, and AC
                  vents) before handover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE 12-POINT CREVICE & WEATHER-SAFE PROTOCOL */}
        <section
          id="quality-protocol"
          className="py-16 lg:py-20 bg-slate-900 text-white border-b border-slate-800"
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400">
                  <span>Quality Engineering Response</span>
                  <span aria-hidden="true">·</span>
                  <span>Zero Residue Guarantee</span>
                  <span aria-hidden="true">·</span>
                  <span>Tropical Rain Contingency</span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Why we inspect every door handle gap and gear knob seam before we leave.
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed tracking-[0.01em]">
                  When a customer on Google Maps noted that interior wax residue was left inside a
                  door handle gap and gear knob cover because the crew was racing approaching rain,
                  we redesigned our entire handover workflow. We never rush finishing for weather.
                </p>

                <div className="space-y-3">
                  {CREVICE_PROTOCOL_POINTS.map((item) => {
                    const isChecked = checkedProtocolSteps.includes(item.step);
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => toggleProtocolStep(item.step)}
                        className="w-full p-4 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-left transition-colors flex items-start gap-3.5 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-sky-500 text-slate-950'
                              : 'border border-slate-500 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-display font-semibold text-white">
                            {item.step}. {item.zone}
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed">{item.standard}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-slate-400 font-mono-num">
                  {checkedProtocolSteps.length} of 4 handover checkpoints active on every Matvac
                  dispatch sheet
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <ResilientImage
                    src={IMAGES.creviceInspection}
                    alt="Matvac technician using a soft detailing brush and microfiber cloth to clean gear shift gaiter and interior door handle gaps"
                    className="w-full h-[380px] object-cover"
                    fallbackTitle="12-Point Crevice & Seam Detailing"
                  />
                  <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Boar-Hair Crevice Brush + Dry Microfiber Purge
                      </p>
                      <p className="text-sm font-display font-semibold text-white mt-0.5">
                        Zero White Wax Compound Left in Interior Trim Seams
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(true)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Book With Inspection Guarantee
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: VERIFIED GOOGLE MAPS REVIEWS (5.0 ★ · 62 REVIEWS) */}
        <section id="reviews" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                  <span>Google Maps Review Summary</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num font-semibold text-slate-900">
                    5.0 ★ ({reviewsList.length + 57} Verified Reviews)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Bandar Seremban</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Unfiltered feedback from Seremban &amp; Klang Valley car owners.
                </h2>
              </div>

              {/* Interactive Filter Controls (Functional Buttons Allowed per Design Constitution) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-lg">
                {(
                  [
                    { id: 'all', label: 'All Reviews' },
                    { id: 'interior detailing', label: 'Interior Detailing (3)' },
                    { id: 'car exterior wash', label: 'Car Exterior Wash (2)' },
                    { id: 'full equipment', label: 'Full Equipment (2)' },
                    { id: 'smell', label: 'Smell & Freshness (3)' },
                  ] as { id: ReviewFilterCategory; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      reviewFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {reviewSubmittedNotice && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Thank you! Your review has been added to the Matvac Mobile Detailing customer log.
                </span>
              </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => (
                <article
                  key={rev.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Unboxed static metadata header */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-mono-num font-semibold text-amber-600">
                        {'★'.repeat(rev.rating)}
                        {'☆'.repeat(5 - rev.rating)} · {rev.rating}.0 / 5.0
                      </span>
                      <span>{rev.timeAgo}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-display font-bold text-slate-900">
                        {rev.author}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {rev.badge} · {rev.vehicleServiced}
                      </p>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">“{rev.comment}”</p>

                    {rev.ownerResponse && (
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <p className="text-xs font-semibold text-slate-900">
                          Matvac Engineering Response &amp; Process Upgrade
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rev.ownerResponse}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Unboxed category metadata footer */}
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-400">
                    Topics: {rev.categories.join(' · ')}
                  </div>
                </article>
              ))}
            </div>

            {/* Write a Review Toggle & Validated Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-display font-bold text-slate-900">
                    Had your vehicle detailed by Azwan &amp; the Matvac crew?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Log your feedback on cabin smell, exterior water wax, or our 12-point crevice
                    finishing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewForm((prev) => !prev)}
                  className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showReviewForm ? 'Close Review Form' : 'Write a Customer Review'}
                </button>
              </div>

              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  className="mt-6 pt-6 border-t border-slate-200 space-y-4"
                  noValidate
                >
                  {reviewFormError && (
                    <p className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
                      {reviewFormError}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="rev-author"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="rev-author"
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Hafizul Rahman"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rev-vehicle"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Service &amp; Vehicle
                      </label>
                      <input
                        id="rev-vehicle"
                        type="text"
                        value={newReviewVehicle}
                        onChange={(e) => setNewReviewVehicle(e.target.value)}
                        placeholder="e.g. Full Interior · Mazda CX-5"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          htmlFor="rev-rating"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Rating
                        </label>
                        <select
                          id="rev-rating"
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 font-mono-num"
                        >
                          <option value={5}>5.0 ★</option>
                          <option value={4}>4.0 ★</option>
                          <option value={3}>3.0 ★</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="rev-cat"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Focus Area
                        </label>
                        <select
                          id="rev-cat"
                          value={newReviewCategory}
                          onChange={(e) =>
                            setNewReviewCategory(
                              e.target.value as
                                | 'interior detailing'
                                | 'car exterior wash'
                                | 'full equipment'
                                | 'smell'
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                        >
                          <option value="interior detailing">Interior</option>
                          <option value="car exterior wash">Exterior Wax</option>
                          <option value="full equipment">Equipment</option>
                          <option value="smell">Smell</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="rev-comment"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Your Experience *
                    </label>
                    <textarea
                      id="rev-comment"
                      rows={3}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share how the seat extraction, water wax, or crevice finishing turned out..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 6: WEBSITE & UX IMPROVEMENT AUDIT (BEFORE VS AFTER FOR MATVACDETAILING.COM) */}
        <section id="site-audit" className="py-16 lg:py-20 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  Digital Experience Audit · matvacdetailing.com Analysis &amp; Upgrades
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  What we improved from the original matvacdetailing.com website.
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                We audited Matvac’s existing site structure and Google Maps reviews to solve 4
                critical conversion and operational friction points.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WEBSITE_IMPROVEMENTS.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span>
                        {item.index}. {item.category}
                      </span>
                      <span className="font-mono-num text-sky-700 font-semibold">
                        {item.measurableImpact}
                      </span>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1">
                      <p className="text-xs font-semibold text-rose-700">
                        Legacy Website Friction: {item.legacyIssueTitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.legacyObservation}
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-1">
                      <p className="text-xs font-semibold text-emerald-700">
                        Redesigned Solution: {item.upgradedSolutionTitle}
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.upgradedExecution}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">Implemented live on this page</span>
                    <a
                      href={`#${item.jumpTargetId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap shrink-0"
                    >
                      {item.jumpLabel}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: SEREMBAN BASE STATION, GOOGLE MAPS HUB & DIRECT DISPATCH */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>Headquarters &amp; Fleet Dispatch</span>
                  <span aria-hidden="true">·</span>
                  <span>Bandar Seremban, Negeri Sembilan</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  Ready for a cabin that smells like new and sparkling white paintwork?
                </h2>

                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-1" />
                    <span>
                      <strong className="font-semibold text-slate-900">Address:</strong>{' '}
                      {BUSINESS_INFO.address} ({BUSINESS_INFO.plusCode})
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-1" />
                    <span>
                      <strong className="font-semibold text-slate-900">Hours:</strong>{' '}
                      {BUSINESS_INFO.operatingHours}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-sky-700 shrink-0 mt-1" />
                    <span>
                      <strong className="font-semibold text-slate-900">Direct Line:</strong>{' '}
                      <span className="font-mono-num">{BUSINESS_INFO.phoneDisplay}</span> ·{' '}
                      {BUSINESS_INFO.email}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Schedule Mobile Van Now
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      BUSINESS_INFO.name + ' ' + BUSINESS_INFO.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Google Maps Directions
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLocation}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copiedLocation ? 'Address & Phone Copied' : 'Copy Address & Phone'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-display font-bold text-slate-900">
                  Mobile Van Onboard Equipment Checklist
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether you park at a terrace house in Chemara Hills or a condominium bay in
                  Klang Valley, our van arrives with full commercial utilities:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Commercial hot-water upholstery &amp; carpet extractor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Onboard water tank &amp; mobile generator power supply</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>High-pressure snow foam cannon &amp; Hydro Water Wax system</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Boar-hair crevice brushes &amp; high-velocity air dryers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-display font-bold text-slate-900 text-sm">
              Matvac Mobile Detailing
            </p>
            <p>
              {BUSINESS_INFO.address} · Tel: {BUSINESS_INFO.phoneDisplay}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#services" className="hover:text-slate-900 transition-colors">
              Services
            </a>
            <a href="#configurator" className="hover:text-slate-900 transition-colors">
              Calculator
            </a>
            <a href="#quality-protocol" className="hover:text-slate-900 transition-colors">
              Crevice Standard
            </a>
            <a href="#reviews" className="hover:text-slate-900 transition-colors">
              Reviews
            </a>
            <a href="#site-audit" className="hover:text-slate-900 transition-colors">
              Site Audit
            </a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE WHATSAPP & SLOT BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicleSize={currentVehicleSize}
        selectedPackage={currentPackage}
        selectedAddons={selectedAddons}
        coverageZone={currentZone}
        shelter={currentShelter}
        basePrice={basePrice}
        addonsTotal={addonsTotal}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
        isMonthlySub={isMonthlySub}
      />
    </div>
  );
}
