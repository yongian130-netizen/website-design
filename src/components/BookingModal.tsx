import React, { useState } from 'react';
import { X, Check, MessageSquare, Copy, Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';
import {
  BUSINESS_INFO,
  VehicleSizeOption,
  ServicePackage,
  AddonItem,
  CoverageZone,
  ShelterEnvironment,
} from '../data/matvacData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleSize: VehicleSizeOption;
  selectedPackage: ServicePackage;
  selectedAddons: AddonItem[];
  coverageZone: CoverageZone;
  shelter: ShelterEnvironment;
  basePrice: number;
  addonsTotal: number;
  discountAmount: number;
  finalTotal: number;
  isMonthlySub: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  vehicleSize,
  selectedPackage,
  selectedAddons,
  coverageZone,
  shelter,
  basePrice,
  addonsTotal,
  discountAmount,
  finalTotal,
  isMonthlySub,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-12');
  const [preferredSlot, setPreferredSlot] = useState('08:00 AM (Morning Cool-Porch Slot)');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

  if (!isOpen) return null;

  const addonsSummary =
    selectedAddons.length > 0
      ? selectedAddons.map((a) => `${a.name} (+RM ${a.price})`).join(', ')
      : 'None selected';

  const buildWhatsAppMessage = () => {
    const lines = [
      `Hello Matvac Mobile Detailing (${BUSINESS_INFO.phoneDisplay}), I would like to book a mobile detailing slot:`,
      ``,
      `Customer: ${customerName.trim() || 'Prospective Client'}`,
      `Phone: ${customerPhone.trim() || 'Provided via WhatsApp'}`,
      `Vehicle: ${carModel.trim() || vehicleSize.label} (${vehicleSize.label})`,
      `Package: ${selectedPackage.name} (RM ${basePrice})`,
      `Add-Ons: ${addonsSummary}`,
      `Plan Type: ${isMonthlySub ? 'Monthly Subscription (-15% Base Package)' : 'Single Session'}`,
      `Location Zone: ${coverageZone.name} (+RM ${coverageZone.surcharge})`,
      `Address / Area: ${addressLine.trim() || coverageZone.areas.split(',')[0]}`,
      `Parking Shelter: ${shelter.label}`,
      `Preferred Date & Time: ${preferredDate} at ${preferredSlot}`,
      `Estimated Total: RM ${finalTotal}`,
      ``,
      `Please confirm van availability and 12-Point Crevice Inspection sign-off.`,
    ];
    return lines.join('\n');
  };

  const validateForm = () => {
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage('Please enter your name so our dispatch team can address your booking.');
      return false;
    }
    const cleanedPhone = customerPhone.replace(/[\s-]/g, '');
    if (!/^\+?[\d]{9,13}$/.test(cleanedPhone)) {
      setErrorMessage('Please enter a valid Malaysian phone number (e.g. 012-345 6789).');
      return false;
    }
    if (!carModel.trim()) {
      setErrorMessage('Please specify your car make and model (e.g. Honda City / Perodua Myvi).');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmittedSuccess(true);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(buildWhatsAppMessage());
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const whatsappHref = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-8">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 id="booking-modal-title" className="text-lg font-display font-bold tracking-tight">
              Dispatch Mobile Detailing Van
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Chemara Hills HQ · Direct WhatsApp &amp; Online Slot Reservation ({BUSINESS_INFO.phoneDisplay})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          {/* Configured Summary Strip */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <p className="text-xs text-slate-500">
                  {vehicleSize.label} · {selectedPackage.duration}
                </p>
                <p className="text-base font-display font-bold text-slate-900">
                  {selectedPackage.name}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Estimated Total</span>
                <span className="text-xl font-mono-num font-bold text-sky-700">
                  RM {finalTotal}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <span className="text-slate-400">Base Package:</span>{' '}
                <span className="font-mono-num font-medium text-slate-800">RM {basePrice}</span>
                {discountAmount > 0 && (
                  <span className="text-emerald-700 font-mono-num ml-1">
                    (-RM {discountAmount} Monthly Plan)
                  </span>
                )}
              </div>
              <div>
                <span className="text-slate-400">Add-Ons:</span>{' '}
                <span className="font-mono-num font-medium text-slate-800">
                  +RM {addonsTotal}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Zone Dispatch:</span>{' '}
                <span className="font-mono-num font-medium text-slate-800">
                  {coverageZone.surcharge === 0
                    ? 'RM 0 (Free ≤30km)'
                    : `+RM ${coverageZone.surcharge}`}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Shelter Protocol:</span>{' '}
                <span className="font-medium text-slate-800">{shelter.label}</span>
              </div>
            </div>
          </div>

          {submittedSuccess ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-slate-900">
                    Dispatch Ticket Prepared for {customerName}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Your vehicle configuration ({carModel}) for{' '}
                    <span className="font-mono-num font-medium text-slate-900">{preferredDate}</span> at{' '}
                    <span className="font-medium text-slate-900">{preferredSlot}</span> is ready. Send it
                    directly to Azwan &amp; the Matvac dispatch desk via WhatsApp or copy the ticket below.
                  </p>
                </div>
              </div>

              <pre className="p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono-num text-slate-700 whitespace-pre-wrap leading-relaxed">
                {buildWhatsAppMessage()}
              </pre>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp ({BUSINESS_INFO.phoneDisplay})
                </a>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  {copiedTicket ? 'Dispatch Ticket Copied' : 'Copy Dispatch Ticket'}
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-4" noValidate>
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-800"
                >
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Amirul Hakim / Melissa Tan"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 016-813 4294"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 font-mono-num"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-car"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Vehicle Make, Model &amp; Color *
                  </label>
                  <input
                    id="booking-car"
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="e.g. White Honda Civic FE / Proton X70"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-address"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Street / Taman / Condo Name
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="booking-address"
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="e.g. Chemara Hills / Seremban 2"
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Preferred Service Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="booking-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 font-mono-num"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-slot"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Preferred Van Arrival Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      id="booking-slot"
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
                    >
                      <option value="08:00 AM (Morning Cool-Porch Slot)">
                        08:00 AM (Morning Cool-Porch Slot)
                      </option>
                      <option value="11:30 AM (Midday Covered Slot)">
                        11:30 AM (Midday Covered Slot)
                      </option>
                      <option value="02:30 PM (Afternoon Sheltered Slot)">
                        02:30 PM (Afternoon Sheltered Slot)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
                <span>
                  Every booking includes our mandatory{' '}
                  <strong className="font-semibold text-slate-900">
                    12-Point Crevice &amp; Weather Inspection
                  </strong>{' '}
                  (door handle gaps, gear knob gaiters, and zero rain-rush guarantee).
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4"
                >
                  Skip form &amp; open pre-filled WhatsApp now
                </a>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Generate Dispatch Ticket
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
