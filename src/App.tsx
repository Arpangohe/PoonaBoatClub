import React, { useState, useEffect, useMemo } from "react";
import { 
  Anchor, 
  Search, 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  MapPin, 
  Mail, 
  ArrowRight, 
  ChevronRight, 
  Filter, 
  Clock, 
  Compass, 
  FileText, 
  Camera, 
  X, 
  Menu, 
  CheckCircle2, 
  Building, 
  ExternalLink, 
  ShieldCheck,
  ChevronDown,
  Info,
  Layers,
  History,
  Database,
  Calculator,
  Utensils,
  Sparkles,
  Printer,
  UserCheck,
  TrendingUp,
  FileCheck,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CLUB_HISTORY_SUMMARY, 
  TIMELINE_MILESTONES, 
  ARCHIVE_MATERIALS, 
  RECIPROCAL_CLUBS, 
  MEMBERSHIP_TYPES,
  SPORTS_RATES,
  ROOM_ACCOMMODATIONS,
  ACCOMMODATION_POLICIES,
  BANQUET_VENUES,
  DINING_OUTLETS,
  CLUB_REGULATIONS,
  DIGITAL_PORTAL_INFO,
  Milestone,
  ArchiveItem,
  ReciprocalClub,
  FACILITIES_LIST,
  SPORTS_ACADEMIES_LIST,
  EXACT_REPORTS_LIST,
  Facility,
  SportsAcademy,
  ExactReport
} from "./data";

export default function App() {
  // Hash Routing State
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Synchronize hash with page state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setMobileMenuOpen(false);
      
      if (hash === "" || hash === "#/" || hash === "#/home") {
        setCurrentPage("home");
      } else if (hash.startsWith("#/facilities")) {
        setCurrentPage("facilities");
      } else if (hash.startsWith("#/sports")) {
        setCurrentPage("sports");
      } else if (hash.startsWith("#/reports")) {
        setCurrentPage("reports");
      } else if (hash.startsWith("#/timeline")) {
        setCurrentPage("timeline");
      } else if (hash.startsWith("#/archives")) {
        setCurrentPage("archives");
      } else if (hash.startsWith("#/portal")) {
        setCurrentPage("portal");
      } else {
        setCurrentPage("home");
      }
      
      // Smooth scroll to top on page transition
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Helper to change page
  const navigateToPage = (pageHash: string) => {
    window.location.hash = pageHash;
  };

  // --- Newsletter States & Logic ---
  const [emailInput, setEmailInput] = useState<string>("visitor@puneheritage.org");
  const [newsletterStatus, setNewsletterStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [savedSubscribers, setSavedSubscribers] = useState<string[]>([]);
  const [showSubscribersLedger, setShowSubscribersLedger] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rcbc_subscribers");
      if (stored) {
        setSavedSubscribers(JSON.parse(stored));
      } else {
        const initial = ["pune.colonel@heritage.org", "rowing.pioneer@mula-mutha.in", "secretary@rcbcpune.com"];
        localStorage.setItem("rcbc_subscribers", JSON.stringify(initial));
        setSavedSubscribers(initial);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setNewsletterStatus({
        success: false,
        message: "Please enter a valid electronic mail address."
      });
      return;
    }

    if (savedSubscribers.includes(emailInput.trim())) {
      setNewsletterStatus({
        success: true,
        message: "You are already recorded in our historical dispatch registry."
      });
      return;
    }

    const updated = [...savedSubscribers, emailInput.trim()];
    setSavedSubscribers(updated);
    try {
      localStorage.setItem("rcbc_subscribers", JSON.stringify(updated));
    } catch (e) {
      console.error("Error writing localStorage", e);
    }

    setNewsletterStatus({
      success: true,
      message: "Subscription registered successfully. You are now tied to our seasonal dispatch."
    });
    setEmailInput("");
    setTimeout(() => setNewsletterStatus(null), 5000);
  };

  // --- Reports Page States & Logic ---
  const [reportsSearchQuery, setReportsSearchQuery] = useState<string>("");
  const [selectedReportCategory, setSelectedReportCategory] = useState<string>("all");
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  const activeReport = useMemo(() => {
    if (!activeReportId) return null;
    return EXACT_REPORTS_LIST.find(r => r.id === activeReportId) || null;
  }, [activeReportId]);

  const filteredReports = useMemo(() => {
    return EXACT_REPORTS_LIST.filter(report => {
      const matchesCategory = selectedReportCategory === "all" || report.category === selectedReportCategory;
      const lowerQuery = reportsSearchQuery.toLowerCase();
      const matchesSearch = 
        report.name.toLowerCase().includes(lowerQuery) ||
        report.author.toLowerCase().includes(lowerQuery) ||
        report.summary.toLowerCase().includes(lowerQuery) ||
        report.signatories.some(sig => sig.toLowerCase().includes(lowerQuery)) ||
        report.sections.some(sec => 
          sec.title.toLowerCase().includes(lowerQuery) || 
          sec.paragraphs.some(p => p.toLowerCase().includes(lowerQuery))
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedReportCategory, reportsSearchQuery]);

  // --- Facilities Page States & Logic ---
  const [selectedRoomId, setSelectedRoomId] = useState<string>("suite");
  const [roomStayType, setRoomStayType] = useState<"member" | "guest">("member");
  const [roomStayNights, setRoomStayNights] = useState<number>(3);
  const [roomStayExtraMattress, setRoomStayExtraMattress] = useState<boolean>(false);

  const selectedRoomDetails = useMemo(() => {
    return ROOM_ACCOMMODATIONS.find(r => r.id === selectedRoomId) || ROOM_ACCOMMODATIONS[0];
  }, [selectedRoomId]);

  const roomStayCostEstimate = useMemo(() => {
    const baseRateStr = roomStayType === "member" ? selectedRoomDetails.memberRate : selectedRoomDetails.guestRate;
    const baseRate = parseInt(baseRateStr.replace(/[^0-9]/g, ""), 10);
    let total = baseRate * roomStayNights;
    if (roomStayExtraMattress) {
      total += 800 * roomStayNights;
    }
    return total;
  }, [selectedRoomDetails, roomStayType, roomStayNights, roomStayExtraMattress]);

  const [selectedBanquetVenueName, setSelectedBanquetVenueName] = useState<string>("Whole Day Pocha Hall");
  const [banquetEventDays, setBanquetEventDays] = useState<number>(1);

  const selectedBanquetDetails = useMemo(() => {
    return BANQUET_VENUES.find(b => b.name === selectedBanquetVenueName) || BANQUET_VENUES[0];
  }, [selectedBanquetVenueName]);

  const banquetCostEstimate = useMemo(() => {
    const rate = parseInt(selectedBanquetDetails.rate.replace(/[^0-9]/g, ""), 10);
    return rate * banquetEventDays;
  }, [selectedBanquetDetails, banquetEventDays]);

  // --- Sports Page States & Logic ---
  const [sportsCalculatorType, setSportsCalculatorType] = useState<"member" | "guest">("member");
  const [selectedSports, setSelectedSports] = useState<string[]>(["Boating", "Tennis"]);

  const handleSportToggle = (sportName: string) => {
    if (selectedSports.includes(sportName)) {
      setSelectedSports(selectedSports.filter(s => s !== sportName));
    } else {
      setSelectedSports([...selectedSports, sportName]);
    }
  };

  const sportsCostEstimate = useMemo(() => {
    let total = 0;
    selectedSports.forEach(sportName => {
      const academy = SPORTS_ACADEMIES_LIST.find(a => a.name === sportName);
      if (academy) {
        const rateStr = sportsCalculatorType === "member" ? academy.memberRate : academy.guestRate;
        const rateVal = parseInt(rateStr.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(rateVal)) {
          total += rateVal;
        }
      }
    });
    return total;
  }, [selectedSports, sportsCalculatorType]);

  // --- Historical Timeline Page States & Logic ---
  const [selectedMilestoneFilter, setSelectedMilestoneFilter] = useState<string>("all");
  const [expandedMilestone, setExpandedMilestone] = useState<Milestone | null>(null);

  const filteredMilestones = useMemo(() => {
    if (selectedMilestoneFilter === "all") return TIMELINE_MILESTONES;
    return TIMELINE_MILESTONES.filter(m => m.category === selectedMilestoneFilter);
  }, [selectedMilestoneFilter]);

  // --- Archives Explorer States & Logic ---
  const [archiveSearchQuery, setArchiveSearchQuery] = useState<string>("");
  const [selectedArchiveCategory, setSelectedArchiveCategory] = useState<string>("all");
  const [selectedArchiveItem, setSelectedArchiveItem] = useState<ArchiveItem | null>(null);

  const filteredArchive = useMemo(() => {
    return ARCHIVE_MATERIALS.filter(item => {
      const matchesCategory = selectedArchiveCategory === "all" || item.category === selectedArchiveCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(archiveSearchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(archiveSearchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(archiveSearchQuery.toLowerCase()) ||
        (item.transcript && item.transcript.toLowerCase().includes(archiveSearchQuery.toLowerCase())) ||
        item.tags.some(tag => tag.toLowerCase().includes(archiveSearchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedArchiveCategory, archiveSearchQuery]);

  // --- Reciprocal Clubs States & Logic ---
  const [clubSearchQuery, setClubSearchQuery] = useState<string>("");

  const filteredReciprocalClubs = useMemo(() => {
    if (!clubSearchQuery) return RECIPROCAL_CLUBS;
    return RECIPROCAL_CLUBS.filter(club => 
      club.name.toLowerCase().includes(clubSearchQuery.toLowerCase()) ||
      club.city.toLowerCase().includes(clubSearchQuery.toLowerCase()) ||
      club.stateCountry.toLowerCase().includes(clubSearchQuery.toLowerCase())
    );
  }, [clubSearchQuery]);

  // --- Members Digital Portal States & Logic ---
  const [portalMemberId, setPortalMemberId] = useState<string>("1024");
  const [portalMemberRecord, setPortalMemberRecord] = useState<{
    found: boolean;
    name: string;
    dues: string;
    lastPayment: string;
    carSticker: string;
    status: string;
  } | null>(null);

  const handlePortalQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const id = portalMemberId.trim();
    if (!id) return;

    // Simulate database lookup based on ID
    if (id === "1024") {
      setPortalMemberRecord({
        found: true,
        name: "Sanjay Thorat (President / Life Member)",
        dues: "Rs. 0 (Fully Cleared)",
        lastPayment: "Rs. 5,400 on 2026-06-10",
        carSticker: "RCBC-ST-1024-ACTIVE",
        status: "Active Life Member"
      });
    } else if (id === "1868") {
      setPortalMemberRecord({
        found: true,
        name: "Capt. Aditya Ranade (Defence Member)",
        dues: "Rs. 1,200 (Quarterly Subscription)",
        lastPayment: "Rs. 3,200 on 2026-05-15",
        carSticker: "RCBC-DF-1868-ACTIVE",
        status: "Active Service Member"
      });
    } else if (id === "4500") {
      setPortalMemberRecord({
        found: true,
        name: "Meera Kirloskar (Associate Member)",
        dues: "Rs. 8,400 (Suite Stay Balance)",
        lastPayment: "Rs. 12,000 on 2026-04-20",
        carSticker: "RCBC-AS-4500-PENDING",
        status: "Active Associate Member"
      });
    } else {
      setPortalMemberRecord({
        found: false,
        name: `Member ID #${id}`,
        dues: "Unknown",
        lastPayment: "N/A",
        carSticker: "N/A",
        status: "Not Found"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#E6D8C2] selection:text-[#563C1E]">
      
      {/* Dynamic Navigation & Multi-page Header */}
      <nav id="navbar" className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6D8C2] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo Brand Frame */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigateToPage("#/home")}
            >
              <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center text-[#D4BD9B] border border-[#BF9E70] transition-transform duration-500 group-hover:rotate-12">
                <Anchor className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <span className="block font-serif text-md md:text-lg tracking-wider font-bold text-stone-900 uppercase">
                  Royal Connaught
                </span>
                <span className="block text-2xs uppercase tracking-widest text-[#A8814D] font-mono font-medium">
                  Boat Club Pune • Est. 1868
                </span>
              </div>
            </div>

            {/* Desktop Navigation Link Menu */}
            <div className="hidden md:flex items-center space-x-1.5 lg:space-x-4">
              {[
                { hash: "#/home", label: "Home" },
                { hash: "#/facilities", label: "Facilities" },
                { hash: "#/sports", label: "Sports Academies" },
                { hash: "#/reports", label: "Research Reports" },
                { hash: "#/timeline", label: "Heritage Timeline" },
                { hash: "#/archives", label: "Archives Explorer" },
                { hash: "#/portal", label: "Members Lounge" },
              ].map((link) => (
                <button
                  key={link.hash}
                  onClick={() => navigateToPage(link.hash)}
                  className={`px-3 py-2 rounded-md font-serif text-xs lg:text-sm tracking-wide transition-all cursor-pointer ${
                    currentPage === link.hash.replace("#/", "")
                      ? "bg-stone-900 text-[#D4BD9B] font-semibold"
                      : "text-stone-600 hover:text-stone-950 hover:bg-[#F3ECE0]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-stone-700 hover:text-stone-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F3ECE0] border-t border-[#E6D8C2]"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {[
                  { hash: "#/home", label: "Home" },
                  { hash: "#/facilities", label: "Facilities" },
                  { hash: "#/sports", label: "Sports Academies" },
                  { hash: "#/reports", label: "Research Reports" },
                  { hash: "#/timeline", label: "Heritage Timeline" },
                  { hash: "#/archives", label: "Archives Explorer" },
                  { hash: "#/portal", label: "Members Lounge" },
                ].map((link) => (
                  <button
                    key={link.hash}
                    onClick={() => {
                      navigateToPage(link.hash);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-serif tracking-wide ${
                      currentPage === link.hash.replace("#/", "")
                        ? "bg-stone-900 text-[#D4BD9B] font-semibold"
                        : "text-stone-700 hover:bg-[#FAF8F5] hover:text-stone-900"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Pages Router Switchboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          
          {/* ==================== PAGE 1: HOME ==================== */}
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              
              {/* Hero Showcase */}
              <div className="relative overflow-hidden bg-stone-950 text-[#FAF8F5] rounded-2xl py-20 md:py-32 px-6 md:px-12 shadow-xl border border-[#A8814D]/40">
                <div className="absolute inset-0 z-0 opacity-20">
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1920&auto=format&fit=crop" 
                    alt="Mula-Mutha River Rowing"
                    className="w-full h-full object-cover grayscale contrast-125 scale-105"
                  />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-950"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto text-center z-10 space-y-8">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FAF8F5]/10 backdrop-blur-md rounded-full border border-[#D4BD9B]/30">
                    <Compass className="w-4 h-4 text-[#D4BD9B] animate-spin-slow" />
                    <span className="text-2xs font-mono uppercase tracking-widest text-[#E6D8C2]">
                      Pune's Riverfront Sovereign Institution
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none text-white">
                    Royal Connaught <br className="hidden sm:block"/>
                    <span className="text-[#D4BD9B] italic font-normal font-serif">Boat Club Pune</span>
                  </h1>

                  <p className="max-w-2xl mx-auto text-stone-300 text-sm md:text-base tracking-wide leading-relaxed">
                    Founded in 1868 on the serene banks of the Mula-Mutha River, RCBC seamlessly blends high-performance rowing academies with sophisticated Edwardian heritage dining and sports fields.
                  </p>

                  {/* Quick Metric Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#A8814D]/30">
                    {CLUB_HISTORY_SUMMARY.stats.map((stat, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-stone-900/60 border border-[#A8814D]/15">
                        <span className="block text-xl md:text-2xl font-serif font-bold text-[#D4BD9B]">
                          {stat.value}
                        </span>
                        <span className="block text-3xs uppercase tracking-wider text-stone-400 font-mono mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      onClick={() => navigateToPage("#/facilities")}
                      className="w-full sm:w-auto bg-[#A8814D] hover:bg-[#8C6636] text-stone-950 font-serif font-semibold px-8 py-4.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <Building className="w-4 h-4" /> Explore 11 Club Facilities
                    </button>
                    <button
                      onClick={() => navigateToPage("#/reports")}
                      className="w-full sm:w-auto border border-[#E6D8C2]/40 hover:bg-[#FAF8F5]/10 text-white font-mono px-8 py-4 rounded-sm transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4 text-[#D4BD9B]" /> Read Audit Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Historical Overview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-semibold block">
                      Est. 1868 • Historical Legacy
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                      The Sovereign Boat Club of Western India
                    </h2>
                  </div>
                  <p className="text-stone-700 text-sm md:text-base leading-relaxed">
                    Initially operating as the <em>Poona Boat Club</em>, the institution was established under the British military high-command of the Bombay Presidency to coordinate rowing, regattas, and seasonal athletics. In 1889, following the visit of Queen Victoria's third son, <strong>Prince Arthur, Duke of Connaught</strong>, the club secured royal patronage, adopting its iconic royal coat of arms.
                  </p>
                  <p className="text-stone-700 text-sm md:text-base leading-relaxed">
                    Following independence in 1947, a critical legal battle (Civil Suit No. 776) secured the preservation of all riverfront lands and ancient logs under a joint court receivership, paving the way for Pune's finest sport captains to guide the club into its contemporary golden age.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigateToPage("#/timeline")}
                      className="inline-flex items-center gap-2 text-[#A8814D] hover:text-[#8C6636] font-serif font-semibold text-sm transition-colors cursor-pointer"
                    >
                      <span>Explore historical milestone timeline</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Visual Artifact Panel */}
                <div className="lg:col-span-5 bg-[#F3ECE0] rounded-xl border border-[#E6D8C2] p-8 space-y-6">
                  <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] block font-bold">
                    Official Registry Profile
                  </span>
                  <div className="space-y-4 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-[#E6D8C2]">
                      <span className="text-stone-500">Corporate Name:</span>
                      <span className="text-stone-900 font-bold">Royal Connaught Boat Club</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E6D8C2]">
                      <span className="text-stone-500">Origin Year:</span>
                      <span className="text-stone-900 font-bold">1868 (Poona Boat Club)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E6D8C2]">
                      <span className="text-stone-500">Royal Patronage Granted:</span>
                      <span className="text-stone-900 font-bold">1889 (Prince Arthur)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E6D8C2]">
                      <span className="text-stone-500">Active Riverway:</span>
                      <span className="text-stone-900 font-bold">Mula-Mutha river basin</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E6D8C2]">
                      <span className="text-stone-500">Administrative Headquarters:</span>
                      <span className="text-stone-900 font-bold text-right">7, Boat Club Road, Pune - 411001</span>
                    </div>
                  </div>
                  <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E6D8C2]/60 text-stone-600 text-2xs leading-relaxed italic">
                    "RCBC operates as an elite non-profit trust dedicated strictly to the promotion of river navigation, athletic sportsmanship, and the preservation of historic archives."
                  </div>
                </div>
              </div>

              {/* Reciprocal Clubs lookup module */}
              <div className="bg-[#F3ECE0]/50 rounded-2xl border border-[#E6D8C2] p-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                    Global Affiliation Net
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">
                    Reciprocal Premium Clubs Network
                  </h3>
                  <p className="text-stone-600 text-xs md:text-sm">
                    Our permanent life members enjoy exclusive access and room accommodation rates at over 120 reciprocal elite clubs in India and globally. Search our ledger database below.
                  </p>
                </div>

                <div className="max-w-md mx-auto relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-stone-400" />
                  </div>
                  <input
                    type="text"
                    value={clubSearchQuery}
                    onChange={(e) => setClubSearchQuery(e.target.value)}
                    placeholder="Search reciprocal clubs by name or city (e.g., Madras, Yacht, Singapore)..."
                    className="block w-full pl-10 pr-3 py-3 border border-[#E6D8C2] rounded-md bg-[#FAF8F5] text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#A8814D] focus:border-[#A8814D]"
                  />
                  {clubSearchQuery && (
                    <button 
                      onClick={() => setClubSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReciprocalClubs.slice(0, 6).map((club, i) => (
                    <div key={i} className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E6D8C2]/60 hover:shadow-xs transition-all space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold">
                          Est. {club.established || "N/A"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-3xs font-mono font-medium ${
                          club.accommodation === "Yes" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-stone-100 text-stone-600 border border-stone-200"
                        }`}>
                          Rooms: {club.accommodation}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-md">{club.name}</h4>
                      <div className="flex items-center text-stone-500 text-xs gap-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#BF9E70]" />
                        <span>{club.city}, {club.stateCountry}</span>
                      </div>
                      {club.phone && (
                        <div className="text-3xs font-mono text-stone-400 pt-1 border-t border-[#E6D8C2]/30 flex justify-between">
                          <span>Phone:</span>
                          <span className="text-stone-700">{club.phone}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredReciprocalClubs.length === 0 && (
                  <div className="text-center text-stone-500 py-6 text-sm">
                    No reciprocal institutions matching your search filter were found in our directory.
                  </div>
                )}
              </div>

              {/* Newsletter Subscription module requested by user */}
              <div id="newsletter-form" className="bg-stone-950 text-[#FAF8F5] rounded-2xl border border-[#A8814D]/40 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#A8814D]/10 to-transparent pointer-events-none rounded-full"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D4BD9B] block">
                      Chronicle Dispatch Registry
                    </span>
                    <h3 className="font-serif text-3xl font-bold tracking-tight text-white">
                      Subscribe to the Heritage Chronicle
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                      Register your electronic mail address below to receive our seasonal heritage bulletin, including rare archival photography uploads, historical reports, and regatta tournament invitations.
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your electronic mail address..."
                        className="bg-[#FAF8F5]/10 border border-[#D4BD9B]/30 rounded-sm px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#D4BD9B] w-full"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#D4BD9B] hover:bg-[#BF9E70] text-stone-950 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer"
                      >
                        Subscribe
                      </button>
                    </form>

                    {newsletterStatus && (
                      <p className={`text-xs font-mono ${newsletterStatus.success ? "text-[#D4BD9B]" : "text-rose-400"}`}>
                        {newsletterStatus.message}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-3xs text-stone-400 font-mono">
                        Secured Registry ledger system
                      </span>
                      <button 
                        onClick={() => setShowSubscribersLedger(!showSubscribersLedger)}
                        className="text-[#D4BD9B] hover:underline text-xs font-mono"
                      >
                        {showSubscribersLedger ? "Hide Dispatch Registry Ledger" : "View Active Dispatch Subscribers Ledger"}
                      </button>
                    </div>

                    {showSubscribersLedger && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#FAF8F5]/5 p-4 rounded border border-[#D4BD9B]/20 text-3xs font-mono text-stone-300 max-h-32 overflow-y-auto space-y-1.5"
                      >
                        <span className="block font-bold text-[#D4BD9B] border-b border-[#D4BD9B]/20 pb-1 mb-2">Registered Receivers List:</span>
                        {savedSubscribers.map((sub, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>#{idx + 1} {sub}</span>
                            <span className="text-[#A8814D]">Tied Ledger</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* ==================== PAGE 2: FACILITIES ==================== */}
          {currentPage === "facilities" && (
            <motion.div
              key="facilities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                  Club Amenities & Venues
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                  Sovereign Recreation & Guest Facilities
                </h1>
                <p className="text-stone-600 text-sm md:text-base">
                  RCBC hosts an array of highly polished recreational wings. Below is the complete, official roster of all our dining, banqueting, conference, and accommodation venues.
                </p>
              </div>

              {/* Roster of 11 Facilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {FACILITIES_LIST.map((facility, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-stone-900">
                        <img 
                          src={facility.imageUrl} 
                          alt={facility.name}
                          className="w-full h-full object-cover grayscale-20 opacity-90 hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-stone-950/80 text-[#D4BD9B] font-mono text-3xs uppercase tracking-widest px-2.5 py-1 rounded border border-[#A8814D]/40">
                          {facility.category}
                        </div>
                        {facility.capacity && (
                          <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/90 text-stone-950 font-mono text-3xs uppercase px-2 py-0.5 rounded font-bold">
                            Cap: {facility.capacity}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-[#E6D8C2] pb-2">
                          {facility.name}
                        </h3>
                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                          {facility.description}
                        </p>
                        
                        <div className="space-y-2">
                          <span className="text-3xs font-mono uppercase text-[#A8814D] font-semibold block">Key Amenities:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {facility.amenities.map((item, i) => (
                              <span key={i} className="text-3xs font-mono bg-[#F3ECE0] text-[#704F27] px-2 py-0.5 rounded border border-[#E6D8C2]/40">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto">
                      <div className="p-3.5 bg-[#F3ECE0]/30 rounded-lg border border-[#E6D8C2]/40 text-3xs italic font-serif text-stone-500">
                        <strong>Heritage Note:</strong> {facility.historyNote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Calculators Block */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                
                {/* 1. Room stay night calculator */}
                <div className="bg-[#F3ECE0]/60 p-6 md:p-8 rounded-2xl border border-[#E6D8C2] space-y-6">
                  <div className="flex items-center gap-2 border-b border-[#E6D8C2] pb-3">
                    <Calendar className="w-5 h-5 text-[#A8814D]" />
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Riverside Rooms Booking Cost Estimator
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-stone-500 mb-1.5 uppercase tracking-wider">Select Room Category:</label>
                      <select
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E6D8C2] rounded p-2 text-xs focus:outline-none"
                      >
                        {ROOM_ACCOMMODATIONS.map(r => (
                          <option key={r.id} value={r.id}>{r.name} - ({roomStayType === "member" ? r.memberRate : r.guestRate})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-500 mb-1.5 uppercase tracking-wider">Stay Tier:</label>
                        <div className="flex rounded border border-[#E6D8C2] overflow-hidden">
                          <button
                            onClick={() => setRoomStayType("member")}
                            className={`flex-1 py-1.5 text-center text-3xs font-mono uppercase transition-colors ${
                              roomStayType === "member" ? "bg-stone-900 text-white font-bold" : "bg-[#FAF8F5] text-stone-600"
                            }`}
                          >
                            Member
                          </button>
                          <button
                            onClick={() => setRoomStayType("guest")}
                            className={`flex-1 py-1.5 text-center text-3xs font-mono uppercase transition-colors ${
                              roomStayType === "guest" ? "bg-stone-900 text-white font-bold" : "bg-[#FAF8F5] text-stone-600"
                            }`}
                          >
                            Reciprocal / Guest
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-500 mb-1.5 uppercase tracking-wider">Number of Nights:</label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={roomStayNights}
                          onChange={(e) => setRoomStayNights(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-[#FAF8F5] border border-[#E6D8C2] rounded p-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="extra-mattress"
                        checked={roomStayExtraMattress}
                        onChange={(e) => setRoomStayExtraMattress(e.target.checked)}
                        className="rounded border-[#E6D8C2] text-[#A8814D] focus:ring-0"
                      />
                      <label htmlFor="extra-mattress" className="text-stone-700 cursor-pointer select-none">
                        Request Extra Mattress ({ACCOMMODATION_POLICIES.extraMattressFee})
                      </label>
                    </div>

                    {/* Cost Result display card */}
                    <div className="bg-stone-950 text-[#FAF8F5] p-5 rounded border border-[#A8814D]/30 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400 text-2xs uppercase tracking-widest">Total Estimated Fee:</span>
                        <span className="text-[#D4BD9B] text-xl font-serif font-bold">Rs. {roomStayCostEstimate.toLocaleString()}</span>
                      </div>
                      <div className="text-3xs text-stone-400 leading-normal font-sans border-t border-[#FAF8F5]/10 pt-2.5">
                        <strong>Bank Deposit Guideline:</strong> All bookings must pre-settle via transfer to {ACCOMMODATION_POLICIES.depositBankName} ({ACCOMMODATION_POLICIES.depositBranch}), A/C: {ACCOMMODATION_POLICIES.depositAccountNumber}, IFSC: {ACCOMMODATION_POLICIES.depositIFSC}. Submit digital receipt to billing@rcbcpune.com.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Banquet event cost estimator */}
                <div className="bg-[#F3ECE0]/60 p-6 md:p-8 rounded-2xl border border-[#E6D8C2] space-y-6">
                  <div className="flex items-center gap-2 border-b border-[#E6D8C2] pb-3">
                    <Calculator className="w-5 h-5 text-[#A8814D]" />
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Banqueting Venues Rent Cost Estimator
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-stone-500 mb-1.5 uppercase tracking-wider">Select Banquet Venue:</label>
                      <select
                        value={selectedBanquetVenueName}
                        onChange={(e) => setSelectedBanquetVenueName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E6D8C2] rounded p-2 text-xs focus:outline-none"
                      >
                        {BANQUET_VENUES.map((b, i) => (
                          <option key={i} value={b.name}>{b.name} - ({b.rate})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-500 mb-1.5 uppercase tracking-wider">Event Duration (Days):</label>
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={banquetEventDays}
                        onChange={(e) => setBanquetEventDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-[#FAF8F5] border border-[#E6D8C2] rounded p-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="p-4 bg-[#FAF8F5] rounded border border-[#E6D8C2]/60 space-y-2 text-stone-700">
                      <div className="flex justify-between border-b border-[#E6D8C2]/40 pb-1.5">
                        <span className="text-stone-500">Maximum Safety Capacity:</span>
                        <span className="font-bold text-stone-900">{selectedBanquetDetails.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Standard Base Fee:</span>
                        <span className="font-bold text-stone-900">{selectedBanquetDetails.rate}</span>
                      </div>
                      <p className="text-2xs text-stone-500 pt-1 leading-normal italic font-serif">
                        Description: {selectedBanquetDetails.description}
                      </p>
                    </div>

                    <div className="bg-stone-950 text-[#FAF8F5] p-5 rounded border border-[#A8814D]/30">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400 text-2xs uppercase tracking-widest">Banquet Rent Cost Estimate:</span>
                        <span className="text-[#D4BD9B] text-xl font-serif font-bold">Rs. {banquetCostEstimate.toLocaleString()}</span>
                      </div>
                      <p className="text-3xs text-stone-400 leading-relaxed font-sans border-t border-[#FAF8F5]/10 pt-2.5 mt-2.5">
                        Catering, decor, lighting setup and sound taxes are billed independently based on custom vendor sub-contracts approved by the committee.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* ==================== PAGE 3: SPORTS ==================== */}
          {currentPage === "sports" && (
            <motion.div
              key="sports"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                  Athletics & Training
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                  Sports Academies & Training Divisions
                </h1>
                <p className="text-stone-600 text-sm md:text-base">
                  RCBC has nurtured generations of national rowing champions and athletic enthusiasts. Browse our specialized sports divisions and calculate your subscription coaching fees below.
                </p>
              </div>

              {/* Roster of 9 Sports Academies */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SPORTS_ACADEMIES_LIST.map((academy, i) => (
                  <div key={i} className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-stone-950">
                        <img 
                          src={academy.imageUrl} 
                          alt={academy.name}
                          className="w-full h-full object-cover grayscale-20 opacity-90"
                        />
                        <div className="absolute top-3 left-3 bg-stone-950/85 text-[#D4BD9B] font-mono text-3xs uppercase tracking-widest px-2 py-0.5 rounded border border-[#A8814D]/40">
                          Active Academy
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-[#E6D8C2] pb-2">
                          {academy.name} Academy
                        </h3>
                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                          {academy.description}
                        </p>

                        <div className="text-xs font-mono space-y-2 text-stone-700 bg-[#F3ECE0]/30 p-4 rounded border border-[#E6D8C2]/40">
                          <div className="flex flex-col border-b border-[#E6D8C2]/40 pb-1.5 mb-1.5">
                            <span className="text-stone-400 text-3xs uppercase tracking-wider">Academy Coaches:</span>
                            <span className="text-stone-900 font-bold font-sans">{academy.coaches.join(", ")}</span>
                          </div>
                          <div className="flex flex-col border-b border-[#E6D8C2]/40 pb-1.5 mb-1.5">
                            <span className="text-stone-400 text-3xs uppercase tracking-wider">Operational Schedule:</span>
                            <span className="text-stone-900 font-semibold">{academy.schedule}</span>
                          </div>
                          <div className="flex justify-between pt-0.5">
                            <div>
                              <span className="text-stone-400 text-3xs block uppercase tracking-wider">Member Sub:</span>
                              <span className="text-stone-900 font-bold">{academy.memberRate}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-stone-400 text-3xs block uppercase tracking-wider">Guest Sub:</span>
                              <span className="text-stone-900 font-bold">{academy.guestRate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto">
                      <div className="space-y-1.5">
                        <span className="text-3xs font-mono uppercase text-[#A8814D] font-semibold block">Training Infrastructure:</span>
                        <div className="flex flex-wrap gap-1">
                          {academy.amenities.map((item, idx) => (
                            <span key={idx} className="text-3xs font-mono bg-stone-900/5 text-stone-700 px-2 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Sports Dues Calculator */}
              <div className="bg-[#F3ECE0]/50 rounded-2xl border border-[#E6D8C2] p-6 md:p-10 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-2.5 border-b border-[#E6D8C2] pb-4">
                  <Calculator className="w-6 h-6 text-[#A8814D]" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Sports Academy Tuition & Fee Estimator
                    </h3>
                    <p className="text-stone-500 text-2xs md:text-xs">
                      Select one or multiple sports academies below and calculate your monthly subscription billing estimated dues.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 space-y-4">
                    <label className="block text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold">Select Active Academies:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SPORTS_ACADEMIES_LIST.map((academy, i) => (
                        <div 
                          key={i}
                          onClick={() => handleSportToggle(academy.name)}
                          className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex justify-between items-center ${
                            selectedSports.includes(academy.name)
                              ? "bg-stone-950 border-stone-950 text-[#D4BD9B] shadow-xs"
                              : "bg-[#FAF8F5] border-[#E6D8C2] text-stone-800 hover:border-stone-400"
                          }`}
                        >
                          <div>
                            <span className="block font-serif font-semibold text-xs md:text-sm">{academy.name} Academy</span>
                            <span className="block text-3xs font-mono opacity-80 mt-0.5">
                              {sportsCalculatorType === "member" ? academy.memberRate : academy.guestRate}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedSports.includes(academy.name)}
                            onChange={() => {}} // Swallowed, parent onClick handles it
                            className="rounded border-[#E6D8C2] text-[#A8814D] focus:ring-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-[#FAF8F5] p-5 rounded-xl border border-[#E6D8C2] flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold mb-2">Membership Status:</label>
                        <div className="flex rounded border border-[#E6D8C2] overflow-hidden text-xs">
                          <button
                            onClick={() => setSportsCalculatorType("member")}
                            className={`flex-1 py-1.5 text-center font-mono uppercase transition-colors ${
                              sportsCalculatorType === "member" ? "bg-stone-900 text-white font-bold" : "bg-white text-stone-600"
                            }`}
                          >
                            Member
                          </button>
                          <button
                            onClick={() => setSportsCalculatorType("guest")}
                            className={`flex-1 py-1.5 text-center font-mono uppercase transition-colors ${
                              sportsCalculatorType === "guest" ? "bg-stone-900 text-white font-bold" : "bg-white text-stone-600"
                            }`}
                          >
                            Guest
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-[#E6D8C2]/60 pt-3 space-y-1.5 text-xs font-mono text-stone-700">
                        <span className="text-3xs text-stone-400 uppercase tracking-wider block">Selected Summary:</span>
                        {selectedSports.length === 0 ? (
                          <p className="italic text-stone-400 text-3xs">No academies selected.</p>
                        ) : (
                          selectedSports.map(s => {
                            const ac = SPORTS_ACADEMIES_LIST.find(a => a.name === s);
                            return (
                              <div key={s} className="flex justify-between text-3xs">
                                <span>• {s} Academy</span>
                                <span>{sportsCalculatorType === "member" ? ac?.memberRate : ac?.guestRate}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="bg-stone-950 text-[#FAF8F5] p-4.5 rounded-lg border border-[#A8814D]/30 mt-6 text-center">
                      <span className="block text-3xs uppercase tracking-widest text-stone-400">Total Monthly Tuition:</span>
                      <span className="block text-2xl font-serif font-bold text-[#D4BD9B] mt-1">Rs. {sportsCostEstimate.toLocaleString()}</span>
                      <span className="block text-3xs text-stone-500 font-mono mt-1.5 border-t border-stone-800 pt-1.5">
                        Billed to member ledger monthly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ==================== PAGE 4: REPORTS HUB ==================== */}
          {currentPage === "reports" && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              
              {!activeReport ? (
                // VIEW A: List of all reports with search and filter
                <div className="space-y-10">
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                      Archival Compliance & Audits
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                      Exact Reports & Operational Statements
                    </h1>
                    <p className="text-stone-600 text-sm md:text-base">
                      Access the official registry of general board, compliance safety, financial audits, and court receivership transition documents of the Royal Connaught Boat Club Pune.
                    </p>
                  </div>

                  {/* Search and Category Filter Panel */}
                  <div className="bg-[#F3ECE0]/50 rounded-2xl border border-[#E6D8C2] p-6 max-w-4xl mx-auto space-y-4 shadow-3xs">
                    <div className="flex flex-col sm:flex-row gap-4">
                      
                      {/* Search box */}
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4.5 w-4.5 text-stone-400" />
                        </div>
                        <input
                          type="text"
                          value={reportsSearchQuery}
                          onChange={(e) => setReportsSearchQuery(e.target.value)}
                          placeholder="Search reports by title, contents, signatories, or text (e.g. Honeyborne, budget, Burma, 1947)..."
                          className="block w-full pl-11 pr-4 py-3 border border-[#E6D8C2] rounded-md bg-[#FAF8F5] text-sm focus:outline-none focus:ring-1 focus:ring-[#A8814D] focus:border-[#A8814D]"
                        />
                        {reportsSearchQuery && (
                          <button 
                            onClick={() => setReportsSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-900"
                          >
                            <X className="w-4.5 h-4.5" />
                          </button>
                        )}
                      </div>

                      {/* Reset button */}
                      {(reportsSearchQuery || selectedReportCategory !== "all") && (
                        <button
                          onClick={() => {
                            setReportsSearchQuery("");
                            setSelectedReportCategory("all");
                          }}
                          className="bg-stone-900 hover:bg-stone-800 text-[#FAF8F5] px-4 py-3 rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6D8C2]/50 text-xs">
                      <span className="font-mono text-stone-400 text-3xs uppercase tracking-widest mr-2">Category:</span>
                      {[
                        { id: "all", label: "All Records" },
                        { id: "administration", label: "Administration" },
                        { id: "financial", label: "Financial Audits" },
                        { id: "operations", label: "Club Operations" },
                        { id: "safety", label: "Safety & Restoration" },
                        { id: "history", label: "Historical Court Cases" },
                      ].map(pill => (
                        <button
                          key={pill.id}
                          onClick={() => setSelectedReportCategory(pill.id)}
                          className={`px-3 py-1.5 rounded-full font-mono text-3xs uppercase tracking-wider transition-all cursor-pointer ${
                            selectedReportCategory === pill.id
                              ? "bg-stone-900 text-[#D4BD9B] font-bold"
                              : "bg-[#FAF8F5] text-stone-600 border border-[#E6D8C2] hover:bg-[#F3ECE0]"
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reports listing grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {filteredReports.map((report) => (
                      <div 
                        key={report.id}
                        onClick={() => setActiveReportId(report.id)}
                        className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] p-6 hover:border-stone-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="bg-stone-900 text-[#D4BD9B] font-mono text-3xs uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                              {report.category}
                            </span>
                            <span className="text-3xs font-mono text-stone-400">
                              Period: {report.period}
                            </span>
                          </div>

                          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#A8814D] transition-colors leading-tight">
                            {report.name}
                          </h3>

                          <p className="text-stone-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                            {report.summary}
                          </p>
                        </div>

                        <div className="pt-5 border-t border-[#E6D8C2]/40 mt-5 space-y-4">
                          {/* Mini metrics bar */}
                          <div className="grid grid-cols-2 gap-2 text-3xs font-mono">
                            {report.keyMetrics.slice(0, 2).map((metric, mi) => (
                              <div key={mi} className="bg-[#F3ECE0]/30 p-2 rounded border border-[#E6D8C2]/30">
                                <span className="text-stone-400 block uppercase">{metric.label}:</span>
                                <span className="text-stone-900 font-bold block mt-0.5">{metric.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-xs font-mono pt-1 text-stone-500 group-hover:text-stone-900">
                            <span className="text-3xs text-stone-400">Auth: {report.author.split(",")[0]}</span>
                            <span className="flex items-center gap-1 text-3xs text-[#A8814D] font-bold uppercase tracking-wider">
                              Open Official Document <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredReports.length === 0 && (
                      <div className="col-span-full bg-[#F3ECE0]/20 rounded-xl border border-[#E6D8C2] py-16 text-center text-stone-500 space-y-2">
                        <Info className="w-8 h-8 text-[#A8814D] mx-auto opacity-70" />
                        <h3 className="font-serif font-bold text-stone-800">No Registry Reports Found</h3>
                        <p className="text-xs max-w-sm mx-auto leading-relaxed">
                          We couldn't locate any records matching your search queries. Try clearing filters or using terms like "Honeyborne" or "teak".
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // VIEW B: Detailed report document reader view (Parchment Styled Layout)
                <motion.div
                  key="active-report"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="max-w-4xl mx-auto space-y-6"
                >
                  
                  {/* Document Back Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-[#E6D8C2]">
                    <button
                      onClick={() => setActiveReportId(null)}
                      className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-950 font-mono text-xs uppercase tracking-wider bg-[#F3ECE0] px-4 py-2 rounded border border-[#E6D8C2] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Reports Registry</span>
                    </button>
                    <span className="text-3xs font-mono text-stone-400 uppercase tracking-widest bg-stone-900 text-[#D4BD9B] px-3 py-1 rounded">
                      Document Ref: RCBC-{activeReport.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Document Body Wrapper */}
                  <div className="bg-[#FAF8F5] rounded-xl border-2 border-[#BF9E70] p-6 md:p-12 shadow-md relative overflow-hidden">
                    
                    {/* Retro seal decorative watermarks */}
                    <div className="absolute inset-8 border border-[#BF9E70]/20 pointer-events-none"></div>
                    <div className="absolute top-12 right-12 opacity-15 pointer-events-none">
                      <Anchor className="w-24 h-24 stroke-[1] text-[#BF9E70]" />
                    </div>

                    <div className="relative z-10 space-y-8">
                      
                      {/* Document Header block */}
                      <div className="text-center space-y-3 pb-6 border-b-2 border-stone-900/10">
                        <div className="flex justify-center">
                          <div className="w-10 h-10 rounded-full border border-[#BF9E70] flex items-center justify-center text-[#A8814D]">
                            <Anchor className="w-5 h-5 stroke-[1.5]" />
                          </div>
                        </div>
                        <span className="block text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold">
                          Royal Connaught Boat Club Pune • Registry Division
                        </span>
                        <h2 className="font-serif text-2xl md:text-4xl font-bold text-stone-950 tracking-tight leading-tight max-w-2xl mx-auto">
                          {activeReport.name}
                        </h2>
                        
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-2xs font-mono text-stone-500 pt-1.5">
                          <span>Author: <strong>{activeReport.author}</strong></span>
                          <span>•</span>
                          <span>Audit Period: <strong>{activeReport.period}</strong></span>
                          <span>•</span>
                          <span>Date Compiled: <strong>{activeReport.lastUpdated}</strong></span>
                        </div>
                      </div>

                      {/* Brief overview executive block */}
                      <div className="space-y-2">
                        <span className="text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold block">
                          I. Executive Statement & Overview:
                        </span>
                        <p className="text-stone-800 text-sm md:text-base leading-relaxed italic bg-[#F3ECE0]/30 p-5 rounded border border-[#E6D8C2]/40 font-serif">
                          "{activeReport.summary}"
                        </p>
                      </div>

                      {/* Key Performance Metrics block */}
                      <div className="space-y-3">
                        <span className="text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold block">
                          II. Audited Performance Metrics Ledger:
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {activeReport.keyMetrics.map((metric, mi) => (
                            <div key={mi} className="bg-[#FAF8F5] p-3.5 rounded border border-[#BF9E70]/30 text-center shadow-2xs">
                              <span className="block text-3xs uppercase font-mono text-stone-400 tracking-wider">
                                {metric.label}
                              </span>
                              <span className="block text-md md:text-lg font-serif font-bold text-[#A8814D] mt-1">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Full Report Text Sections */}
                      <div className="space-y-6 pt-2">
                        <span className="text-3xs font-mono uppercase tracking-widest text-[#A8814D] font-bold block mb-4">
                          III. Paragraph Details & Structural Findings:
                        </span>
                        {activeReport.sections.map((section, si) => (
                          <div key={si} className="space-y-3">
                            <h4 className="font-serif font-bold text-stone-900 text-md md:text-lg border-l-2 border-[#BF9E70] pl-3">
                              {section.title}
                            </h4>
                            <div className="space-y-3 pl-3.5">
                              {section.paragraphs.map((p, pi) => (
                                <p key={pi} className="text-stone-700 text-xs md:text-sm leading-relaxed font-sans">
                                  {p}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Signatories list & Seals */}
                      <div className="pt-8 border-t-2 border-stone-900/10 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                          {activeReport.signatories.map((sig, si) => (
                            <div key={si} className="space-y-4 bg-[#F3ECE0]/20 p-4 rounded border border-[#E6D8C2]/40">
                              <div className="h-10 flex items-center justify-center">
                                <span className="font-serif italic text-stone-400 text-xs tracking-wider font-semibold opacity-70">
                                  [Digital Signature Seal: {sig.split(" ").slice(-1)[0]}]
                                </span>
                              </div>
                              <div className="border-t border-[#E6D8C2] pt-2">
                                <span className="block text-xs font-serif font-bold text-stone-900">{sig}</span>
                                <span className="block text-4xs uppercase tracking-widest font-mono text-stone-400 mt-0.5">Authorised Signatory</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Print and Download notice */}
                      <div className="flex justify-between items-center text-3xs font-mono text-stone-400 pt-4 border-t border-[#E6D8C2]/40">
                        <span>Royal Connaught Archive ID: RCBC-{activeReport.id.toUpperCase()}</span>
                        <button 
                          onClick={() => window.print()}
                          className="flex items-center gap-1 text-[#A8814D] hover:underline cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" /> Print Certified Registry Log
                        </button>
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}

            </motion.div>
          )}

          {/* ==================== PAGE 5: TIMELINE ==================== */}
          {currentPage === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                  Club Milestones
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                  Royal Connaught Heritage Timeline
                </h1>
                <p className="text-stone-600 text-sm md:text-base">
                  Stroll through the chronological journey of the Royal Connaught Boat Club in Pune, beginning from its foundational years in 1868, its royal charters, and up to the present day.
                </p>
              </div>

              {/* Timeline Category Filters */}
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-2xl mx-auto bg-stone-900/5 p-1 rounded-lg border border-[#E6D8C2]/50 text-xs">
                {[
                  { id: "all", label: "All Milestones" },
                  { id: "foundation", label: "Foundations" },
                  { id: "boating", label: "Boating & Regattas" },
                  { id: "royal", label: "Royal Patrons" },
                  { id: "infrastructure", label: "Structural Expansion" },
                  { id: "modern", label: "Modern Jubilees" },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedMilestoneFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-md font-mono text-3xs uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedMilestoneFilter === cat.id
                        ? "bg-stone-900 text-[#D4BD9B] font-semibold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Timeline Card Stack */}
              <div className="max-w-4xl mx-auto relative pl-6 md:pl-10 border-l-2 border-[#BF9E70]/30 space-y-12 py-4">
                {filteredMilestones.map((milestone, idx) => (
                  <div key={milestone.id} className="relative group">
                    
                    {/* Timeline dot */}
                    <div className="absolute -left-10 md:-left-14 top-1.5 w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-[#BF9E70] flex items-center justify-center text-[#A8814D] font-mono text-xs font-bold transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#BF9E70] group-hover:text-stone-950">
                      {idx + 1}
                    </div>

                    <div className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] overflow-hidden hover:shadow-md transition-all p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      <div className="md:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg md:text-xl font-serif font-bold text-[#A8814D] tracking-wide bg-[#F3ECE0] px-3 py-0.5 rounded border border-[#E6D8C2]/60">
                            {milestone.year}
                          </span>
                          <span className="text-3xs uppercase font-mono tracking-wider text-stone-400">
                            Category: {milestone.category}
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                          {milestone.description}
                        </p>

                        {expandedMilestone?.id === milestone.id ? (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-3 border-t border-[#E6D8C2]/40 text-stone-700 text-xs leading-relaxed space-y-2 mt-3 font-sans"
                          >
                            <p>{milestone.detail}</p>
                            <button
                              onClick={() => setExpandedMilestone(null)}
                              className="text-stone-400 hover:text-stone-900 underline text-3xs font-mono block pt-1.5 cursor-pointer"
                            >
                              Close details
                            </button>
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => setExpandedMilestone(milestone)}
                            className="inline-flex items-center gap-1 text-[#A8814D] hover:text-[#8C6636] text-3xs font-mono font-bold uppercase tracking-wider pt-1 cursor-pointer"
                          >
                            Read Full Historical Detail <ChevronDown className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {milestone.imageUrl && (
                        <div className="md:col-span-4 h-36 rounded-lg bg-stone-900 overflow-hidden border border-[#E6D8C2]">
                          <img 
                            src={milestone.imageUrl} 
                            alt={milestone.title}
                            className="w-full h-full object-cover grayscale opacity-85 hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* ==================== PAGE 6: ARCHIVES ==================== */}
          {currentPage === "archives" && (
            <motion.div
              key="archives"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                  Document Explorer
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                  Historical Records & Archival Materials
                </h1>
                <p className="text-stone-600 text-sm md:text-base">
                  Search, verify, and view full transcripts of ancient charters, handwritten regatta logbooks, Edwardian construction blueprints, and transition meeting minutes dating back to 1889.
                </p>
              </div>

              {/* Advanced Archive Search Box */}
              <div className="bg-[#F3ECE0]/50 rounded-2xl border border-[#E6D8C2] p-6 max-w-4xl mx-auto space-y-4 shadow-3xs">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Search className="h-4.5 w-4.5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      value={archiveSearchQuery}
                      onChange={(e) => setArchiveSearchQuery(e.target.value)}
                      placeholder="Search archive transcripts, authors, tags (e.g., Victoria, logbook, blueprints)..."
                      className="block w-full pl-11 pr-4 py-3 border border-[#E6D8C2] rounded-md bg-[#FAF8F5] text-sm focus:outline-none focus:ring-1 focus:ring-[#A8814D] focus:border-[#A8814D]"
                    />
                    {archiveSearchQuery && (
                      <button 
                        onClick={() => setArchiveSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-900"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6D8C2]/50 text-xs">
                  <span className="font-mono text-stone-400 text-3xs uppercase tracking-widest mr-2">Category:</span>
                  {[
                    { id: "all", label: "All Items" },
                    { id: "charter", label: "Royal Charters" },
                    { id: "logbook", label: "Regatta Logs" },
                    { id: "photography", label: "Photographic Prints" },
                    { id: "correspondence", label: "Official Correspondence" },
                  ].map(pill => (
                    <button
                      key={pill.id}
                      onClick={() => setSelectedArchiveCategory(pill.id)}
                      className={`px-3 py-1.5 rounded-full font-mono text-3xs uppercase tracking-wider transition-all cursor-pointer ${
                        selectedArchiveCategory === pill.id
                          ? "bg-stone-900 text-[#D4BD9B] font-bold"
                          : "bg-[#FAF8F5] text-stone-600 border border-[#E6D8C2] hover:bg-[#F3ECE0]"
                      }`}
                    >
                      {cat => cat.label}
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArchive.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden bg-stone-950">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover grayscale opacity-90"
                        />
                        <div className="absolute top-3 left-3 bg-stone-950/80 text-[#D4BD9B] font-mono text-3xs uppercase tracking-widest px-2 py-0.5 rounded border border-[#A8814D]/40">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center text-3xs font-mono text-stone-400">
                          <span>Author: {item.author.split("(")[0]}</span>
                          <span>{item.date}</span>
                        </div>
                        
                        <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto space-y-4">
                      {item.transcript && (
                        <div className="space-y-1.5">
                          {selectedArchiveItem?.id === item.id ? (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="bg-[#F3ECE0]/40 p-4 rounded border border-[#E6D8C2]/60 font-mono text-3xs leading-relaxed text-stone-700 whitespace-pre-line"
                            >
                              <span className="block font-bold text-[#A8814D] uppercase tracking-wider mb-2 border-b border-[#E6D8C2] pb-1">Verbatim Transcript:</span>
                              {item.transcript}
                              <button
                                onClick={() => setSelectedArchiveItem(null)}
                                className="block text-stone-400 hover:text-stone-900 underline text-4xs uppercase tracking-wider mt-3 cursor-pointer"
                              >
                                Hide Transcript
                              </button>
                            </motion.div>
                          ) : (
                            <button
                              onClick={() => setSelectedArchiveItem(item)}
                              className="w-full bg-stone-950 hover:bg-stone-850 text-[#FAF8F5] text-3xs uppercase font-mono tracking-widest py-2 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <BookOpen className="w-3.5 h-3.5" /> Read Archive Transcript
                            </button>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 border-t border-[#E6D8C2]/40 pt-3">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="text-4xs font-mono bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredArchive.length === 0 && (
                  <div className="col-span-full py-12 text-center text-stone-500 text-sm">
                    No ancient records matched your current filtering criteria.
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* ==================== PAGE 7: MEMBERS PORTAL ==================== */}
          {currentPage === "portal" && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                  Interactive Members Room
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900">
                  Members Lounge & Digital Portal
                </h1>
                <p className="text-stone-600 text-sm md:text-base">
                  Simulate outstanding monthly statement dues query, verify car windshield sticker validation status, and read official club regulations on CURFEW and ATTIRE guidelines.
                </p>
              </div>

              {/* Digital Portal Member Statement Query Simulator */}
              <div className="bg-[#FAF8F5] rounded-xl border border-[#E6D8C2] p-6 md:p-10 shadow-sm max-w-4xl mx-auto space-y-8">
                
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-[#E6D8C2] pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#A8814D]" />
                      <span className="text-xs font-mono uppercase tracking-widest font-bold text-stone-500">
                        Portal Link: {DIGITAL_PORTAL_INFO.portalURL}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {DIGITAL_PORTAL_INFO.portalSystem}
                    </h3>
                    <p className="text-stone-500 text-xs max-w-lg leading-normal">
                      {DIGITAL_PORTAL_INFO.guideline}
                    </p>
                  </div>

                  {/* Quick helper tip */}
                  <div className="bg-[#F3ECE0] p-4 rounded-lg border border-[#E6D8C2] text-3xs font-mono text-stone-700 space-y-1 max-w-xs">
                    <span className="font-bold text-[#A8814D] block">Simulation Member IDs:</span>
                    <span className="block">• Enter <strong className="text-stone-900">1024</strong> (Sanjay Thorat, Pres)</span>
                    <span className="block">• Enter <strong className="text-stone-900">1868</strong> (Armed Forces Service)</span>
                    <span className="block">• Enter <strong className="text-stone-900">4500</strong> (Meera Kirloskar, Assoc)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* ID entry form */}
                  <div className="md:col-span-5 space-y-4">
                    <form onSubmit={handlePortalQuery} className="space-y-4">
                      <div>
                        <label className="block text-3xs font-mono uppercase tracking-widest text-stone-400 font-bold mb-1.5">
                          Enter 4-Digit Member ID:
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={portalMemberId}
                            onChange={(e) => setPortalMemberId(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="e.g. 1024, 1868, 4500..."
                            maxLength={4}
                            className="block w-full px-4 py-3 border border-[#E6D8C2] rounded bg-[#FAF8F5] text-sm text-stone-950 font-bold placeholder-stone-300 focus:outline-none focus:ring-1 focus:ring-[#A8814D] focus:border-[#A8814D]"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-stone-950 hover:bg-stone-850 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest py-3.5 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-4 h-4" /> Query Member Ledger & Stickers
                      </button>
                    </form>
                  </div>

                  {/* Simulated Result details */}
                  <div className="md:col-span-7 bg-[#F3ECE0]/30 rounded-xl border border-[#E6D8C2] p-6 min-h-[190px] flex flex-col justify-between">
                    {portalMemberRecord ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="space-y-4 text-xs font-mono"
                      >
                        <div className="flex justify-between border-b border-[#E6D8C2]/80 pb-2">
                          <span className="text-stone-400">Queried Person:</span>
                          <span className="text-stone-900 font-bold font-sans text-sm">{portalMemberRecord.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E6D8C2]/80 pb-2">
                          <span className="text-stone-400">Ledger Membership Tier:</span>
                          <span className="text-stone-900 font-semibold">{portalMemberRecord.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E6D8C2]/80 pb-2">
                          <span className="text-stone-400">Outstanding statements Dues:</span>
                          <span className={`font-bold ${portalMemberRecord.dues.includes("Cleared") ? "text-emerald-700" : "text-rose-600"}`}>
                            {portalMemberRecord.dues}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#E6D8C2]/80 pb-2">
                          <span className="text-stone-400">Last Ledger Settlement:</span>
                          <span className="text-stone-700">{portalMemberRecord.lastPayment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Car Windshield Sticker Verification:</span>
                          <span className={`font-bold ${portalMemberRecord.carSticker.includes("PENDING") ? "text-amber-700" : portalMemberRecord.carSticker.includes("N/A") ? "text-stone-400" : "text-emerald-700"}`}>
                            {portalMemberRecord.carSticker}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center text-stone-400 text-xs py-10 italic space-y-2">
                        <Database className="w-8 h-8 mx-auto opacity-50 text-[#BF9E70]" />
                        <p>No active ledger query has been transmitted yet. Enter one of the sample IDs to pull real-time database results.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Club Regulations & Codes card */}
              <div className="bg-[#F3ECE0]/50 rounded-2xl border border-[#E6D8C2] p-8 space-y-6">
                <div className="border-b border-[#E6D8C2] pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#A8814D]" />
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Sovereign Code of Conduct & Regulations
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-stone-700">
                  <div className="space-y-4">
                    <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E6D8C2]/60 space-y-1.5">
                      <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                        Daytime Attire (Smart Casuals):
                      </span>
                      <p>{CLUB_REGULATIONS.dressCodeDay}</p>
                    </div>
                    <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E6D8C2]/60 space-y-1.5">
                      <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                        Evening Attire (Strict Formals CURFEW):
                      </span>
                      <p className="font-serif italic text-stone-950 font-medium">
                        "{CLUB_REGULATIONS.dressCodeEvening}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E6D8C2]/60 space-y-1.5">
                      <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                        Club Curfew & Operational Midnight Lock:
                      </span>
                      <p>{CLUB_REGULATIONS.curfewMidnight}</p>
                    </div>
                    <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E6D8C2]/60 space-y-1.5">
                      <span className="text-3xs uppercase font-mono tracking-widest text-[#A8814D] font-bold block">
                        Windshield Sticker & Spitting Curbs:
                      </span>
                      <p>{CLUB_REGULATIONS.carStickers} Spitting, Pan, or Gutkha inside club grounds incurs a direct penalty of <strong>{CLUB_REGULATIONS.paanGutkhaFine.split("incurs a direct administrative fine of ")[1]}</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Modern, neutral, highly elegant multi-page footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs font-mono py-12 mt-20 border-t border-[#BF9E70]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-stone-800 pb-8 text-stone-300">
            
            <div className="space-y-3">
              <span className="block font-serif text-sm font-bold text-white uppercase tracking-wider">
                Royal Connaught Boat Club
              </span>
              <p className="text-2xs text-stone-400 font-sans leading-normal">
                Serving Pune's sailing, rowing, and fine al-fresco culinary heritage on the Mula-Mutha riverbank since 1868. Registered under the Cantonments Act of India.
              </p>
            </div>

            <div className="space-y-2">
              <span className="block text-2xs uppercase tracking-widest text-[#D4BD9B] font-bold">
                Navigational Pages
              </span>
              <div className="flex flex-col space-y-1 text-2xs font-sans">
                <button onClick={() => navigateToPage("#/home")} className="text-left text-stone-400 hover:text-white">Home Page</button>
                <button onClick={() => navigateToPage("#/facilities")} className="text-left text-stone-400 hover:text-white">Club Facilities (11)</button>
                <button onClick={() => navigateToPage("#/sports")} className="text-left text-stone-400 hover:text-white">Sports Academies (9)</button>
                <button onClick={() => navigateToPage("#/reports")} className="text-left text-stone-400 hover:text-white">Research & Reports (8)</button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-2xs uppercase tracking-widest text-[#D4BD9B] font-bold">
                Archives & Portal
              </span>
              <div className="flex flex-col space-y-1 text-2xs font-sans">
                <button onClick={() => navigateToPage("#/timeline")} className="text-left text-stone-400 hover:text-white">Heritage Timeline</button>
                <button onClick={() => navigateToPage("#/archives")} className="text-left text-stone-400 hover:text-white">Archive Explorer</button>
                <button onClick={() => navigateToPage("#/portal")} className="text-left text-stone-400 hover:text-white">Members Lounge Portal</button>
              </div>
            </div>

            <div className="space-y-3">
              <span className="block text-2xs uppercase tracking-widest text-[#D4BD9B] font-bold">
                Contact & Registry
              </span>
              <div className="space-y-1 text-2xs font-sans text-stone-400">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#BF9E70]" /> Pune Camp, Maharashtra, India</p>
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#BF9E70]" /> secretary@rcbcpune.com</p>
                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#BF9E70]" /> Docks Open 6:00 AM - Midnight</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-3xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} Royal Connaught Boat Club Pune. All Rights Reserved. Architectural Redesign & Historic Registries.</p>
            <div className="flex gap-4">
              <span className="hover:text-stone-300 cursor-pointer">Constitutional Bylaws</span>
              <span>•</span>
              <span className="hover:text-stone-300 cursor-pointer">Sitemap Ledger</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
