import { useState, useEffect, useRef } from "react";
import { logo } from "../assets";
import { Link, NavLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { PiPhoneThin } from "react-icons/pi";
import ButtonBlack from "./ButtonBlack";

const CATEGORIES = [
  { emoji: "🏗", name: "Excavators", slug: "excavators" },
  { emoji: "🚜", name: "Wheel Loaders", slug: "wheel-loaders" },
  { emoji: "🛤", name: "Bulldozers", slug: "bulldozers" },
  { emoji: "🚛", name: "Dump Trucks", slug: "dump-trucks" },
  { emoji: "🏛", name: "Cranes", slug: "cranes" },
  { emoji: "📦", name: "Forklifts", slug: "forklifts" },
  { emoji: "⚡", name: "Generators", slug: "generators" },
  { emoji: "🔩", name: "Compactors", slug: "compactors" },
  { emoji: "🏢", name: "Aerial Lifts", slug: "aerial-lifts" },
  { emoji: "🛣", name: "Motor Graders", slug: "motor-graders" },
];

const QUICK_FILTERS = [
  { label: "Recently added", slug: "recent" },
  { label: "Low hours (<2,000)", slug: "low-hours" },
  { label: "Good condition", slug: "condition-good" },
];
const navLinks = [
  { name: "Buy", link: "/buy" },
  { name: "Services", link: "/service" },
  { name: "Finance", link: "/finance" },
  { name: "About", link: "/about" },
];

const COUNTRIES = [
  "All Africa",
  "Nigeria",
  "Ghana",
  "South Africa",
  "Kenya",
  "Egypt",
  "Tanzania",
];

const SELL_LINKS = [
  {
    label: "List your equipment",
    desc: "Free listing, reach buyers across Africa",
    href: "/sell/new",
  },
  {
    label: "How selling works",
    desc: "Simple 3-step process",
    href: "/sell/guide",
  },
  {
    label: "Seller dashboard",
    desc: "Manage your listings",
    href: "/dashboard",
  },
  {
    label: "Get a free valuation",
    desc: "Know what your equipment is worth",
    href: "/valuation",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("buy");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Africa");
  const [countryOpen, setCountryOpen] = useState(false);
  const searchRef = useRef(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 300);
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setSearch("");
    setCountryOpen(false);
  };

  const filteredCategories = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#F0EEE8] shadow-[0_1px_0_rgba(0,0,0,0.05)] py-2">
        <div className="flex items-center justify-between h-14 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <img src={logo} alt="eQuipfy" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-8 font-aeonik">
            {[
              { name: "Home", link: "/" },
              { name: "Buy", link: "/buy" },
              { name: "Services", link: "/service" },
              { name: "Finance", link: "/finance" },
              { name: "About", link: "/about" },
              { name: "Call Us: 0812345676899", link: "tel:+2347026701092" },
            ].map((l) => (
              <NavLink
                key={l.name}
                to={l.link}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${isActive ? "text-black border-b-black border-b-2" : "  hover:border-b-black hover:border-b-2"}`
                }
              >
                {l.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <a
              href="tel:+2347026701092"
              className="flex items-center gap-2 text-base"
            >
              <PiPhoneThin className="text-xl" />
              <span className="font-medium">+234-702-670-1092</span>
            </a> */}
            {/* <a
              href="https://wa.me/+2347026701092"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white bg-[#25D366] px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-colors"
            >
              <FaWhatsapp className="text-base" />
              WhatsApp
            </a> */}
            <ButtonBlack
              name={"Buy Equipments"}
              link={"/buy"}
              showIcon={false}
              variant="outlined"
            />
          </div>

          {/* Mobile right side: WhatsApp icon + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* <a
              href="https://wa.me/+2347026701092"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-9 h-9 rounded-[10px] bg-[#25D366] flex items-center justify-center"
            >
              <FaWhatsapp className="text-white text-base" />
            </a> */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="w-9 h-9 rounded-[10px] border border-[#E5E2D8] flex flex-col items-center justify-center gap-[5px] bg-white"
            >
              <span className="block w-[18px] h-[1.5px] bg-[#1A1A1A] rounded-sm" />
              <span className="block w-[13px] h-[1.5px] bg-[#1A1A1A] rounded-sm self-start ml-[9px]" />
              <span className="block w-[18px] h-[1.5px] bg-[#1A1A1A] rounded-sm" />
            </button>
          </div>
        </div>
      </header>

      {/* ── OVERLAY ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/45 lg:hidden"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={closeMenu}
        />
      )}

      {/* ── DRAWER ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 bottom-0 z-[70] flex flex-col bg-white lg:hidden
          w-[88vw] max-w-[360px] shadow-[4px_0_24px_rgba(0,0,0,0.12)]
          transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0EEE8] sticky top-0 bg-white z-10">
          <span className="font-bold text-sm text-[#1A1A1A]">Menu</span>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-[30px] h-[30px] rounded-[7px] border border-[#E5E2D8] flex items-center justify-center"
          >
            <GrFormClose className="text-base text-[#1A1A1A]" />
          </button>
        </div>

        {/* Buy / Sell tabs */}
        <div className="flex mx-4 mt-3 bg-[#F5F3ED] rounded-[10px] p-[3px]">
          {["buy", "sell"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-8 rounded-[7px] text-[13px] capitalize transition-all duration-150
                ${
                  tab === t
                    ? "bg-white font-semibold text-[#1A1A1A] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    : "bg-transparent text-[#6B6860]"
                }`}
            >
              {t === "buy" ? "🔍 Browse" : "📋 Sell"}
            </button>
          ))}
        </div>

        {/* ── BUY PANEL ── */}
        {tab === "buy" && (
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-[#F5F3ED] rounded-[10px] px-3 mb-3">
              <svg
                width="13"
                height="13"
                viewBox="0 0 15 15"
                fill="none"
                className="opacity-40 flex-shrink-0"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="#1A1A1A"
                  strokeWidth="1.3"
                />
                <path
                  d="M10 10l3 3"
                  stroke="#1A1A1A"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="bg-transparent h-10 text-[13px] text-[#1A1A1A] outline-none w-full placeholder:text-[#9B9890]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[#9B9890] text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Country filter */}
            {/* <div className="mb-3">
              <p className="text-[10px] font-semibold text-[#9B9890] uppercase tracking-[0.06em] mb-2">
                Country
              </p>
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-[8px] border border-[#E5E2D8] bg-white text-[13px] text-[#1A1A1A]"
              >
                <span>🌍 {country}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-150 ${countryOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="#6B6860"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
              {countryOpen && (
                <div className="border border-[#E5E2D8] border-t-0 rounded-b-[8px] overflow-hidden">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCountry(c);
                        setCountryOpen(false);
                      }}
                      className={`flex items-center w-full text-left px-3 py-[10px] text-[13px] border-b border-[#F0EEE8] last:border-0 transition-colors
                        ${country === c ? "bg-[#FEF6F0] text-[#E85D1A]" : "bg-white text-[#1A1A1A]"}`}
                    >
                      {country === c && <span className="mr-2">✓</span>}
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {/* nav links */}
            <div className="flex flex-col gap-3 mb-4">
              {navLinks.map((link) => (
                <div className="flex justify-between text-[13px] font-medium text-[#1A1A1A] no-underline bg-gray-200/70 px-3 py-2 rounded-[4px] hover:bg-gray-200 transition-colors">
                  <Link key={link.name} to={link.link} onClick={closeMenu}>
                    {link.name}
                  </Link>
                  <FiArrowUpRight />
                </div>
              ))}
            </div>

            {/* Quick filters */}
            {!search && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-[#9B9890] uppercase tracking-[0.06em] mb-2">
                  Quick filters
                </p>
                <div className="flex flex-wrap gap-[7px]">
                  {QUICK_FILTERS.map((f) => (
                    <Link
                      key={f.slug}
                      to={`/buy?filter=${f.slug}`}
                      onClick={closeMenu}
                      className="text-[12px] px-3 py-[5px] rounded-full border border-[#E5E2D8] text-[#1A1A1A] bg-white"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category grid */}
            <div>
              <p className="text-[10px] font-semibold text-[#9B9890] uppercase tracking-[0.06em] mb-2">
                {search
                  ? `Results (${filteredCategories.length})`
                  : "Browse by category"}
              </p>
              {filteredCategories.length === 0 ? (
                <p className="text-[13px] text-[#9B9890] py-3">
                  No categories match "{search}"
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/buy?category=${cat.slug}`}
                      onClick={closeMenu}
                      className="flex items-center gap-2 px-3 py-[9px] rounded-[9px] border border-[#F0EEE8] bg-[#FAFAF7] no-underline"
                    >
                      <span className="text-lg leading-none">{cat.emoji}</span>
                      <span className="text-[12px] font-medium text-[#1A1A1A] leading-tight">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to="/buy"
                onClick={closeMenu}
                className="flex items-center justify-center mt-3 py-[10px] rounded-[9px] border border-dashed border-[#D5D2C8] text-[12px] text-[#6B6860] no-underline"
              >
                View all equipment →
              </Link>
            </div>
          </div>
        )}

        {/* ── SELL PANEL ── */}
        {tab === "sell" && (
          // <div className="flex-1 overflow-y-auto px-4 py-4">
          //   {/* Hero */}
          //   <div className="rounded-[12px] p-4 mb-4 bg-gradient-to-br from-[#FEF0E6] to-[#FDF6EE] border border-[#F5DDD0]">
          //     <p className="text-[13px] font-semibold text-[#E85D1A] mb-1">
          //       List your equipment free
          //     </p>
          //     <p className="text-[12px] text-[#7A5540] leading-relaxed mb-3">
          //       Reach serious buyers across Africa. Free listing, secure
          //       payments.
          //     </p>
          //     <Link
          //       to="/sell/new"
          //       onClick={closeMenu}
          //       className="inline-block bg-[#E85D1A] text-white text-[13px] font-semibold px-4 py-2 rounded-[8px] no-underline"
          //     >
          //       Post equipment
          //     </Link>
          //   </div>

          //   {/* Sell links */}
          //   {SELL_LINKS.map((link) => (
          //     <Link
          //       key={link.href}
          //       to={link.href}
          //       onClick={closeMenu}
          //       className="flex items-center justify-between py-3 border-b border-[#F0EEE8] no-underline group"
          //     >
          //       <div>
          //         <p className="text-[13px] font-medium text-[#1A1A1A] mb-[2px]">
          //           {link.label}
          //         </p>
          //         <p className="text-[11px] text-[#9B9890]">{link.desc}</p>
          //       </div>
          //       <svg
          //         width="14"
          //         height="14"
          //         viewBox="0 0 16 16"
          //         fill="none"
          //         className="opacity-30 flex-shrink-0 group-hover:opacity-60 transition-opacity"
          //       >
          //         <path
          //           d="M6 3l5 5-5 5"
          //           stroke="#1A1A1A"
          //           strokeWidth="1.3"
          //           strokeLinecap="round"
          //           strokeLinejoin="round"
          //         />
          //       </svg>
          //     </Link>
          //   ))}

          //   {/* Phone */}
          //   <div className="mt-4 flex items-center gap-3 text-[13px] text-[#6B6860]">
          //     <PiPhoneThin className="text-lg flex-shrink-0" />
          //     <div>
          //       <p className="font-medium text-[#1A1A1A]">Need help? Call us</p>
          //       <a href="tel:+2347026701092" className="text-[#E85D1A]">
          //         +234-702-670-1092
          //       </a>
          //     </div>
          //   </div>
          // </div>
          <p className="text-center text-gray-500 mt-6">Coming Soon..</p>
        )}

        {/* Drawer footer: Login / Sign up */}
        {/* <div className="flex gap-2 px-4 py-3 border-t border-[#F0EEE8] sticky bottom-0 bg-white">
          <Link
            to="/login"
            onClick={closeMenu}
            className="flex-1 text-center py-[9px] rounded-[8px] border border-[#E5E2D8] text-[13px] font-medium text-[#1A1A1A] no-underline"
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="flex-1 text-center py-[9px] rounded-[8px] bg-[#1A1A1A] text-[13px] font-medium text-white no-underline"
          >
            Sign up
          </Link>
        </div> */}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </>
  );
};

export default Navbar;
