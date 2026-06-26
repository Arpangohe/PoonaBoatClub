export interface Milestone {
  id: string;
  year: number;
  title: string;
  category: "foundation" | "royal" | "infrastructure" | "boating" | "modern";
  description: string;
  detail: string;
  imageUrl?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: "boating" | "sports" | "dining" | "leisure";
  description: string;
  details: string[];
  imageUrl: string;
  historyNote: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  category: "charter" | "photography" | "logbook" | "correspondence";
  author: string;
  summary: string;
  transcript?: string;
  imageUrl: string;
  tags: string[];
}

export interface ReciprocalClub {
  name: string;
  city: string;
  stateCountry: string;
  established?: number;
  accommodation?: "Yes" | "No" | "Contact Admin" | "Limited";
  phone?: string;
}

export const CLUB_HISTORY_SUMMARY = {
  name: "Royal Connaught Boat Club",
  shortName: "RCBC",
  location: "7, Boat Club Road, Pune - 411001, Maharashtra, India",
  established: 1868,
  originalName: "Poona Boat Club",
  river: "Mula-Mutha River",
  patron: "Duke of Connaught (Prince Arthur)",
  overview: "Founded in 1868, the Royal Connaught Boat Club stands as one of the oldest and most prestigious heritage institutions in India. Located on the serene banks of the Mula-Mutha River in Pune, it has preserved the noble traditions of rowing, yachting, and sportsmanship for over a century and a half. Renamed in 1889 after the visiting Duke of Connaught, the club seamlessly blends British colonial elegance with modern state-of-the-art recreation, serving as an elite meeting ground for sports enthusiasts and Pune's distinguished families.",
  stats: [
    { label: "Years of Heritage", value: "158" },
    { label: "Elite Members", value: "3,500+" },
    { label: "Reciprocal Clubs", value: "120+" },
    { label: "Riverfront Length", value: "400m" }
  ]
};

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    id: "m1",
    year: 1868,
    title: "Foundation of Poona Boat Club",
    category: "foundation",
    description: "Established on the scenic banks of the Mula-Mutha river by British officers and local elites.",
    detail: "Initially operating as the 'Poona Boat Club', the institution was established to promote rowing and water sports among British military officers and civil servants stationed in the monsoon capital of the Bombay Presidency. The first fleet consisted of six wooden clinker-built sculls imported directly from London.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m2",
    year: 1879,
    title: "First Annual Monsoon Regatta",
    category: "boating",
    description: "The inauguration of Pune's legendary inter-club water tournament.",
    detail: "The Monsoon Regatta became a fixture on the social calendar of the Bombay Presidency. Competitors arrived from Madras, Bombay, and Calcutta to row in the demanding water conditions of the Mula-Mutha River during the seasonal swells.",
    imageUrl: "https://images.unsplash.com/photo-1505235687559-28b5f546a5b7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m3",
    year: 1889,
    title: "The Duke's Visit & Royal Charter",
    category: "royal",
    description: "Renamed in honor of Prince Arthur, Duke of Connaught, who consented to serve as its royal patron.",
    detail: "During his stay as Commander-in-Chief of the Bombay Army, Prince Arthur, Duke of Connaught (the third son of Queen Victoria), became an active rower and patron of the club. His royal consent renamed the institution to the 'Royal Connaught Boat Club', granting it the royal coat of arms.",
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m4",
    year: 1914,
    title: "Grand Edwardian Clubhouse Inauguration",
    category: "infrastructure",
    description: "Construction of the iconic riverfront heritage pavilion with its soaring teak rafters.",
    detail: "A grand colonial-style clubhouse was built, designed with wrap-around verandas to offer panoramic views of the river. Featuring imported teakwood floors, high ceilings, and a dedicated billiard room, it remains the architectural core of the club to this day.",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m_court",
    year: 1947,
    title: "The Great Custody Battle & Receivership",
    category: "foundation",
    description: "A pivotal legal custody battle that secured the transitional preservation of the Club's assets.",
    detail: "Following India's independence, a legal battle emerged over the control and custody of the club's valuable riverfront properties and archives. Civil Suit No. 776 of 1947 was instituted in the Poona Civil Court. To prevent arbitrary disruption of operations, the court appointed two military officers, Lt. Col. C.T. Honeyborne and Lt. Col. G.H. Wotton, as joint court receivers. They held custody of the club's keys and asset ledgers, successfully ensuring the transition of power to the first Indian managing committee without the loss of a single historic document.",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m5",
    year: 1968,
    title: "Centennial Jubilee Celebration",
    category: "modern",
    description: "Commemorating 100 years of historical boating legacy and sporting excellence.",
    detail: "The club celebrated its centenary by modernizing its boat fleet. Traditional wooden sculls were systematically restored, and the first fiberglass rowing shells in India were introduced under the guidance of national coaches.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m6",
    year: 1990,
    title: "Expanding the Riverfront Infrastructure",
    category: "infrastructure",
    description: "Introduction of modern concrete boat jetties, a swimming pool, and athletic courts.",
    detail: "To adapt to modern recreational expectations, the club built an Olympic-size swimming pool alongside tennis and squash facilities. The old wooden boat slipways were converted into robust, stable concrete floating jetties capable of safely securing the expanded vessel fleet.",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "m7",
    year: 2018,
    title: "Sesquicentennial Celebration (150 Years)",
    category: "royal",
    description: "150 years of uninterrupted sporting heritage, documented in archival prints.",
    detail: "A landmark moment celebrated with a grand parade of boats on the Mula-Mutha River. A commemorative coffee-table book and a state-of-the-art digital historical archive room were unveiled to safeguard the club's treasured letters and photos.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: "a1",
    name: "Classic Rowing & Sculling",
    category: "boating",
    description: "The spiritual heart of RCBC. Access a high-performance fleet of training and racing boats on our dedicated river strip.",
    details: [
      "Fleet of single sculls, double sculls, and coxed fours",
      "Professional coaching for junior and senior members",
      "Dedicated wooden pontoons for seamless river launching",
      "Weekly intrasport club races and morning time trials"
    ],
    imageUrl: "https://images.unsplash.com/photo-1471440671318-55ddd5754ee1?q=80&w=1200&auto=format&fit=crop",
    historyNote: "The rowing division still utilizes the traditional terminology and safety logs established under British rowing directives in 1889."
  },
  {
    id: "a2",
    name: "Leisure Kayaking & Canoeing",
    category: "boating",
    description: "Explore the Mula-Mutha riverbed at your own pace in our stable, premium single and tandem touring kayaks.",
    details: [
      "Sturdy rotomolded ocean kayaks and traditional open canoes",
      "Rigid safety guidelines with full-time motorized rescue patrols",
      "Sunset and sunrise paddle schedules",
      "Beginner-friendly orientation courses for family members"
    ],
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    historyNote: "Punts and flat-bottomed pleasure boats were originally the favorite leisure craft of ladies and children in the late 19th century."
  },
  {
    id: "a3",
    name: "The Royal Teak Billiards Room",
    category: "leisure",
    description: "An elegant, wood-paneled salon featuring two championship-sized slate tables dating back to the Edwardian era.",
    details: [
      "Exquisite Burmese teak tables and custom cue racks",
      "Soft overhead green-canopy lighting",
      "Surrounded by historic trophies and portrait frames of past presidents",
      "Strict dress code to maintain traditional gaming etiquette"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    historyNote: "The primary table was shipped from Burroughs & Watts of London in 1904, surviving multiple floods and carefully restored over the decades."
  },
  {
    id: "a4",
    name: "Riverview Dining & The Duke's Bar",
    category: "dining",
    description: "Savor gourmet cuisine and historic cocktail mixes on our sweeping lawns overlooking the shimmering river waters.",
    details: [
      "Multi-cuisine fine dining featuring Indian, Continental, and Pan-Asian menus",
      "The Duke's Bar, offering historical signature cocktail recipes and premium spirits",
      "Sunset river deck with live acoustic evenings",
      "A heritage indoor dining hall displaying Victorian porcelain and brass dinnerware"
    ],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    historyNote: "Originally, the dining hall had a dedicated silver-service pantry that only served classic English roasts and high tea at exactly 4:15 PM daily."
  },
  {
    id: "a5",
    name: "Riverfront Pools & Tennis Arena",
    category: "sports",
    description: "Maintain peak fitness inside our Olympic-sized swimming pool and professional floodlit clay tennis courts.",
    details: [
      "Half-Olympic swimming pool with a secure shallow kids' wading pool",
      "Three clay tennis courts with professional ball-boy services",
      "Modern temperature-controlled gymnasium with personal trainers",
      "Air-conditioned squash courts with maple-wood flooring"
    ],
    imageUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=1200&auto=format&fit=crop",
    historyNote: "The first tennis lawn was seeded in 1892, using specialized grass strains imported from Rye, Sussex."
  }
];

export const ARCHIVE_MATERIALS: ArchiveItem[] = [
  {
    id: "arc_001",
    title: "1889 Royal Charter Consent Letter",
    date: "1889-10-14",
    category: "charter",
    author: "Sir Charles Colville (on behalf of Prince Arthur)",
    summary: "The official letter from the secretary of the Duke of Connaught conveying His Royal Highness's pleasure in granting patronage to the Poona Boat Club.",
    transcript: "To the Committee of the Poona Boat Club,\n\nGentlemen,\nI am commanded by His Royal Highness, Prince Arthur, Duke of Connaught, to inform you that he is graciously pleased to accept the patronage of your distinguished Association, and consents that it henceforth be designated as the 'Royal Connaught Boat Club'. His Royal Highness wishes to express his admiration for the skill of your oarsmen on the Mula-Mutha River.\n\nI remain, Gentlemen,\nYour Obedient Servant,\nC. Colville, Colonel.",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop",
    tags: ["Royal", "Teak", "Founding Documents", "Duke of Connaught"]
  },
  {
    id: "arc_002",
    title: "Monsoon Regatta Logbook Entries",
    date: "1902-08-22",
    category: "logbook",
    author: "F. W. Arbuthnot, Honorary Boating Secretary",
    summary: "Handwritten registry logs logging the extreme weather conditions, boat classes, and speed timings of the 23rd Monsoon Regatta.",
    transcript: "August 22, 1902.\nWater level high, current flowing at 4 knots. Strong headwind from the South-West.\nEvent: Men's Double Sculls. Winners: Poona Garrison Team (Oarsmen: Lt. Smith, Capt. Rogers) in 4 minutes, 12 seconds. Beats Madras Boat Club by two lengths.\nVessel used: 'The Victoria' clinker scull. No damages recorded despite choppy waters near the Bund.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
    tags: ["Regatta", "Rowing Logs", "Historical Scores", "Mula-Mutha"]
  },
  {
    id: "arc_003",
    title: "Teak Billiard Salon Blueprints",
    date: "1912-04-05",
    category: "charter",
    author: "Messrs. Stevens & Sons, Architects (Bombay)",
    summary: "Original architectural hand-drawn blueprints outlining the extension of the main Edwardian pavilion to house the imported slate billiard tables.",
    transcript: "Scale: 1 inch to 8 feet.\nStructure to be erected utilizing finest seasoned Burma Teakwood for trusses. Roof to be tiled with Mangalore tiles to match existing boathouse. Foundation reinforced with local basalt stone. Floor layout optimized to permit a minimum of 6 feet clearance around all sides of two standard Burroughs & Watts billiard tables.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop",
    tags: ["Architecture", "Blueprints", "Teak Salon", "Colonial Style"]
  },
  {
    id: "arc_court",
    title: "Court Decree of 1947: Civil Suit No. 776 Registry Record",
    date: "1947-09-12",
    category: "correspondence",
    author: "Registrar, Poona Civil Court",
    summary: "Court notification of civil suit 776 of 1947 regarding the custody and preservation of Royal Connaught Boat Club properties during political transition.",
    transcript: "IN THE CIVIL COURT OF POONA\nCivil Suit No. 776 of 1947\n\nDecree Order of Interim Receivership:\nIt is hereby ordered that Lt. Col. C.T. Honeyborne and Lt. Col. G.H. Wotton be appointed joint Court Receivers of all immovable property, boat warehouses, bank reserves, and historical ledger scrolls of the Royal Connaught Boat Club. The Receivers shall maintain the keys and authorize operations of the rowing docks under direct supervision of this Court pending transition of power to the newly selected Indian Board of Trustees.\n\nGiven under my seal,\nJudge of the Poona Civil Court.",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop",
    tags: ["Court Case", "1947 Dispute", "Legal Registry", "Transition Documents"]
  },
  {
    id: "arc_004",
    title: "Vintage Photographic Print: Ladies on the Riverbank",
    date: "1895-11-03",
    category: "photography",
    author: "Raja Deen Dayal & Sons, Official Photographers",
    summary: "A beautiful black-and-white silver gelatin print showing club families boarding leisure punts and flat pleasure boats by the old wooden slipway.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    tags: ["Vintage Photo", "River Life", "Victorian Era", "Punts"]
  },
  {
    id: "arc_005",
    title: "Duke of Connaught Portrait & Frame Guide",
    date: "1890-01-12",
    category: "photography",
    author: "Royal Garrison Studio",
    summary: "An archival portrait of Prince Arthur in full ceremonial military attire, which has hung at the center of the main ballroom since the renaming of the club.",
    imageUrl: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=600&auto=format&fit=crop",
    tags: ["Duke of Connaught", "Portrait", "Royal", "Ballroom"]
  },
  {
    id: "arc_006",
    title: "Official Correspondence: 1947 Power Transition Minutes",
    date: "1947-09-01",
    category: "correspondence",
    author: "Governing Committee, RCBC",
    summary: "Meeting minutes detailing the transition of club leadership from British administrators to the newly appointed Indian governing committee post-independence.",
    transcript: "Minutes of the Emergency General Meeting held on September 1, 1947.\nResolved that the transition of all club properties, boats, and registries be conducted with the highest professional decorum. Mr. S. L. Kirloskar is elected as the first Indian Vice President, with a mandate to preserve the sporting regulations and extend membership to national athletes of distinction.",
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop",
    tags: ["Independence", "Transition", "Minutes", "Teak Room"]
  }
];

export const RECIPROCAL_CLUBS: ReciprocalClub[] = [
  { name: "Madras Boat Club", city: "Chennai", stateCountry: "Tamil Nadu, India", established: 1867, accommodation: "Yes", phone: "+91 44 2435 6789" },
  { name: "Bombay Gymkhana", city: "Mumbai", stateCountry: "Maharashtra, India", established: 1875, accommodation: "No", phone: "+91 22 2207 0311" },
  { name: "The Cricket Club of India (CCI)", city: "Mumbai", stateCountry: "Maharashtra, India", established: 1933, accommodation: "Yes", phone: "+91 22 2280 1313" },
  { name: "Calcutta Rowing Club", city: "Kolkata", stateCountry: "West Bengal, India", established: 1858, accommodation: "No", phone: "+91 33 2463 3658" },
  { name: "Royal Calcutta Turf Club", city: "Kolkata", stateCountry: "West Bengal, India", established: 1847, accommodation: "Yes", phone: "+91 33 2248 1111" },
  { name: "Secunderabad Club", city: "Hyderabad", stateCountry: "Telangana, India", established: 1878, accommodation: "Yes", phone: "+91 40 2780 4840" },
  { name: "Royal Bombay Yacht Club", city: "Mumbai", stateCountry: "Maharashtra, India", established: 1846, accommodation: "Yes", phone: "+91 22 2202 0803" },
  { name: "Lake Club Chandigarh", city: "Chandigarh", stateCountry: "Chandigarh, India", established: 1961, accommodation: "Limited", phone: "+91 172 274 0122" },
  { name: "The Saturday Club", city: "Kolkata", stateCountry: "West Bengal, India", established: 1878, accommodation: "Yes", phone: "+91 33 2287 5411" },
  { name: "Bangalore Club", city: "Bengaluru", stateCountry: "Karnataka, India", established: 1868, accommodation: "Yes", phone: "+91 80 4022 0000" },
  { name: "Ootacamund Club", city: "Ooty", stateCountry: "Tamil Nadu, India", established: 1841, accommodation: "Yes", phone: "+91 423 244 2354" },
  { name: "The Royal Singapore Yacht Club", city: "Singapore", stateCountry: "Singapore", established: 1826, accommodation: "Yes", phone: "+65 6768 9288" },
  { name: "Royal Colombo Yacht Club", city: "Colombo", stateCountry: "Sri Lanka", established: 1898, accommodation: "Contact Admin", phone: "+94 11 245 4321" },
  { name: "Phnom Penh Sports Club", city: "Phnom Penh", stateCountry: "Cambodia", established: 1995, accommodation: "No", phone: "+855 23 211 445" }
];

export const MEMBERSHIP_TYPES = [
  {
    type: "Permanent (Life) Membership",
    description: "The most prestigious and secure tier of membership, offering lifetime voting rights, complete access to all sporting and leisure amenities, and reciprocal club access globally.",
    eligibility: "Open to citizens of high social, professional, or athletic standing. Applications require proposer and seconder signatures from active life members of over 10 years standing, followed by a formal committee interview.",
    perks: [
      "Unrestricted lifetime access to rowing, pool, gyms, and dining",
      "Full family voting rights and constitutional say",
      "Complimentary access to over 120 reciprocal premium clubs globally",
      "Priority booking for riverfront banquet lawns and private cabins"
    ]
  },
  {
    type: "Service / Defence Membership",
    description: "Dedicated, highly subsidized short-term and long-term membership tiers designed specifically for serving officers of the Indian Armed Forces (Army, Navy, Air Force) stationed in Pune.",
    eligibility: "Serving Commissioned Officers of the Indian Armed Forces on active duty. Stationed or residing within the Pune Cantonment or nearby metropolitan limits.",
    perks: [
      "Subsidized monthly subscription charges and zero security deposits",
      "Full access to specialized rowing equipment and athletic coaches",
      "Family inclusion with active sport coaching slots",
      "Immediate activation upon deployment verification"
    ]
  },
  {
    type: "Corporate Membership",
    description: "Multi-nominee membership designed for multinational corporations, conglomerates, and consular offices looking to offer premium recreational benefits to their C-level executives.",
    eligibility: "Available to registered private or public limited companies. Corporate entities can nominate up to three senior executives, with flexible nomination transfer rights.",
    perks: [
      "Transferable nominee slots to accommodate executive relocation",
      "Access to premium meeting chambers and boardroom dining options",
      "Corporate event sponsorships and lawn priority rates",
      "Direct VIP guest entry quotas for national business delegates"
    ]
  },
  {
    type: "Temporary / Associate Membership",
    description: "Designed for visiting professionals, researchers, or seasonal sport enthusiasts seeking short-term access to specialized river training or local club networking.",
    eligibility: "Valid for durations between 1 month and 1 year. Requires proof of temporary residency in Pune and verification of rowing/sporting background if seeking water access.",
    perks: [
      "Access to standard boathouse services and trainers",
      "Pay-per-use dining, billiards, and court rentals",
      "Invites to select weekend cultural programs and matches",
      "Upgrade path to permanent category upon vetting"
    ]
  }
];

export interface SportRate {
  sport: string;
  memberFee: string;
  guestFee: string;
  description: string;
}

export const SPORTS_RATES: SportRate[] = [
  { sport: "Rowing & Sculling", memberFee: "Rs. 500 / month", guestFee: "Rs. 2,500 / month", description: "Unlimited access to clinker and racing hulls with dedicated pontoon marshals." },
  { sport: "Swimming Pool", memberFee: "Rs. 400 / month", guestFee: "Rs. 1,800 / month", description: "Temperature-regulated half-Olympic pool access. Kids fee is Rs. 300 / month." },
  { sport: "Lawn Tennis", memberFee: "Rs. 800 / month", guestFee: "Rs. 3,000 / month", description: "Clay courts with floodlights, custom ball-boy services and professional markers." },
  { sport: "Gymnasium", memberFee: "Rs. 300 / month", guestFee: "Rs. 2,000 / month", description: "State-of-the-art weights and cardio fitness stations with personal trainers." },
  { sport: "Burmese Billiards", memberFee: "Rs. 50 / hour", guestFee: "Rs. 150 / hour", description: "Burroughs & Watts Edwardian slate tables. Guests must be accompanied by members." }
];

export interface RoomAccommodation {
  id: string;
  name: string;
  memberRate: string;
  guestRate: string;
  description: string;
  amenities: string[];
}

export const ROOM_ACCOMMODATIONS: RoomAccommodation[] = [
  {
    id: "suite",
    name: "Riverside Executive Suite",
    memberRate: "Rs. 4,500 / night",
    guestRate: "Rs. 7,500 / night",
    description: "Our premier suite featuring a colonial teak wood balcony with immediate, unobstructed panoramas of the Mula-Mutha rivercourse.",
    amenities: ["King-size Poster Bed", "Riverfront Balcony", "Ensuite Bath with Victorian Clawfoot Tub", "Complementary High Tea", "Mini-bar & Wi-Fi"]
  },
  {
    id: "royal",
    name: "Royal Edwardian Guestroom",
    memberRate: "Rs. 3,500 / night",
    guestRate: "Rs. 6,000 / night",
    description: "Elegantly retrofitted high-ceiling room featuring period furniture, colonial brass fittings, and plush upholstery.",
    amenities: ["Queen Bed", "High Ceiling & Chandelier", "Premium Writing Desk", "In-room Safe", "Teak Cupboards"]
  },
  {
    id: "deluxe",
    name: "Garden Deluxe Room",
    memberRate: "Rs. 2,800 / night",
    guestRate: "Rs. 4,800 / night",
    description: "Modernized room looking onto the manicured South Lawn tennis arena, fully air-conditioned with modern plumbing.",
    amenities: ["Twin or Double Bed", "Lawn View", "LED Television", "Tea & Coffee Maker", "High-speed Internet"]
  }
];

export const ACCOMMODATION_POLICIES = {
  extraMattressFee: "Rs. 800 / night per additional guest",
  cancellationTerms: "Cancellations made within 48 hours of scheduled check-in are subject to a retention charge equivalent to one full night room rent.",
  depositBankName: "Axis Bank",
  depositBranch: "Camp Branch, Pune",
  depositAccountName: "Royal Connaught Boat Club",
  depositAccountNumber: "914010023456789",
  depositIFSC: "UTIB0000037",
  confirmationGuideline: "To confirm any suite or guestroom booking, the advance deposit must be credited to our official Axis Bank Camp Pune account. Members or reciprocal delegates must transmit the digital deposit transaction receipt to billing@rcbcpune.com within 24 hours."
};

export interface BanquetVenue {
  name: string;
  capacity: string;
  rate: string;
  description: string;
}

export const BANQUET_VENUES: BanquetVenue[] = [
  { name: "Whole Day Pocha Hall", capacity: "250 guests", rate: "Rs. 25,000 / day", description: "Grand high-ceiling banqueting hall with powerful central air conditioning, custom chandeliers, and modular stages." },
  { name: "Pool Side Lawn", capacity: "150 guests", rate: "Rs. 18,000 / evening", description: "Breathtaking open-air poolside deck decorated with heritage lamps. Ideal for receptions and cocktail dinners." },
  { name: "Sunset Riverside Terrace", capacity: "80 guests", rate: "Rs. 12,000 / evening", description: "Sweeping elevated rooftop terrace offering panoramic sunset views of the river current and rowing boats." },
  { name: "Connaught Conference Chamber", capacity: "40 guests", rate: "Rs. 8,000 / day", description: "Air-conditioned meeting boardroom equipped with high-definition AV projectors, surround speakers, and ergonomic teak seating." }
];

export interface DiningOutlet {
  name: string;
  type: string;
  signature: string;
  ambiance: string;
}

export const DINING_OUTLETS: DiningOutlet[] = [
  { name: "Voyage Multi-cuisine Restaurant", type: "Fine Dining", signature: "RCBC Special Butter Chicken, Fish & Chips, Continental Roast Lamb", ambiance: "Refined indoor salon featuring historic silver plates and photographs." },
  { name: "The Royal Deck", type: "Al-Fresco Grill", signature: "Tandoori Pomfret, Riverside Grilled Basa, Spicy Seekh Kebab", ambiance: "Sweeping riverfront lawn deck with cool breezes and acoustic guitar events." },
  { name: "The Anchorage Bar", type: "Vintage Pub", signature: "Prince Arthur's Gin Gimlet, Planter's Punch, Single Malt Selection", ambiance: "Colonial wood paneling, leather armchairs, and strict formal dress guidelines." },
  { name: "Sundown High Tea Lounge", type: "Bistro Cafe", signature: "Earl Grey Tea, Fresh Scones, Pune Shrewsbury Biscuits", ambiance: "Bright Edwardian glass veranda overlooking the clay tennis arena." }
];

export const CLUB_REGULATIONS = {
  dressCodeDay: "Smart Casuals are permitted until 7:00 PM. Collar shirts, trousers or styled denim, and neat footwear.",
  dressCodeEvening: "Strict Formals required after 7:00 PM in the Anchorage Bar, Teak Billiard Salon, and Main Lounge. Collar shirts must be tucked in. Full trousers are mandatory. Closed leather shoes or loafers required. Gym jerseys, athletic shorts, collarless T-shirts, rubber slippers, and sandals are strictly prohibited.",
  curfewMidnight: "Club main gates close strictly at 12:00 Midnight. All recreational fields, courts, and dining outlets close billing operations at 11:30 PM.",
  paanGutkhaFine: "Paan, Gutkha, chewing tobacco, and spitting are strictly prohibited inside all heritage chambers and lawns. Violations incur a direct administrative fine of Rs. 2,000.",
  carStickers: "All member-owned vehicles must permanently display the validated RCBC car sticker on the windshield. Unmarked vehicles must register in the guest logbook and park in the peripheral lot.",
  guestPolicy: "Members are permitted a maximum of 4 guests per visit. Guests must sign the visitor ledger at the lobby and pay the guest entry fee of Rs. 100 on weekdays and Rs. 200 on weekends."
};

export const DIGITAL_PORTAL_INFO = {
  portalURL: "mem.boatclubpune.com",
  portalSystem: "ClubLekka Integrated Club Management Engine",
  guideline: "Members can easily view monthly statements, update contact credentials, book tennis courts, and clear outstanding subscription fees online via the secure web link: mem.boatclubpune.com or by installing the ClubLekka mobile app available on iOS and Android. Enter your 4-digit Member ID to sign in."
};

// ==================== NEW EXPANDED STRUCTURES ====================

export interface Facility {
  name: string;
  category: "dining" | "banquet" | "conference" | "leisure" | "rooms";
  description: string;
  capacity?: string;
  amenities: string[];
  historyNote: string;
  imageUrl: string;
}

export const FACILITIES_LIST: Facility[] = [
  {
    name: "Restaurant & Bar",
    category: "dining",
    description: "Our premier fine-dining culinary wing combining the Voyage Multi-cuisine Restaurant and the legendary wood-paneled Anchorage Bar. Serving classic Continental roasts, fresh fish and chips, and signature cocktails such as Prince Arthur's Gin Gimlet.",
    capacity: "150 guests",
    amenities: ["Centralized Air Conditioning", "Sweeping River View Deck", "Burmese Teak Paneling", "Premium Spirit Cellar"],
    historyNote: "The Anchorage Bar features original Edwardian teak sideboards shipped directly from London in 1912.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pocha Hall",
    category: "banquet",
    description: "The grand high-ceiling banqueting hall of the club. Perfectly air-conditioned, featuring sweeping chandeliers, modular acoustic partitions, and professional stages for wedding receptions and corporate galas.",
    capacity: "250 - 300 guests",
    amenities: ["Championship AV System", "Acoustic Wall Paneling", "Modular Grand Stage", "Dedicated VIP Holding Suite"],
    historyNote: "Originally constructed in 1914 as the main social ballroom, hosting annual imperial banquets.",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Terrace Garden",
    category: "dining",
    description: "A beautifully landscaped open-air rooftop garden offering spectacular panoramas of the Mula-Mutha river. Styled with warm fairy lights and classic wrought-iron seating, serving tandoori grills and live pizzas.",
    capacity: "120 guests",
    amenities: ["Fairy Light Canopies", "Panoramic River Views", "Live BBQ Station", "Ambient Soft Music"],
    historyNote: "Seedlings for the terrace garden ivy were originally presented by the Royal Botanical Society of Calcutta in 1922.",
    imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Conference Hall 1",
    category: "conference",
    description: "A state-of-the-art executive meeting room tailored for corporate nominees, board presentations, and formal administrative convocations. Fully soundproofed.",
    capacity: "35 guests",
    amenities: ["Ultra-HD Laser Projector", "Wireless Presentation System", "Ergonomic High-back Seating", "High-speed Wi-Fi"],
    historyNote: "Stands on the old colonial records treasury room, completely fortified and sound-shielded.",
    imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Conference Hall 2",
    category: "conference",
    description: "A versatile seminar hall configured for training sessions, press releases, and club sub-committee debates. Equipped with flexible seating layouts and dual display screens.",
    capacity: "50 guests",
    amenities: ["Interactive Smartboards", "Dual-Channel Cordless Mics", "Adjustable LED Task Lighting", "Coffee & Beverage Station"],
    historyNote: "The walls of Hall 2 display restored newspaper clippings of national sports regattas since 1950.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pool View Conference Hall",
    category: "conference",
    description: "A picturesque meeting hall featuring double-glazed glass walls looking onto our serene Olympic swimming pool. Merges business meetings with the tranquil luxury of a resort setting.",
    capacity: "45 guests",
    amenities: ["Full Pool View Glass Wall", "Surround Sound Audio System", "Motorized Blackout Drapes", "Private Entry Gate"],
    historyNote: "Inaugurated during the centennial celebrations in 1968 to host national aquatic federation meetings.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Board Room",
    category: "conference",
    description: "The peak of executive privacy. Built around an antique Burmese teak conference table, this room is reserved for high-stakes C-level discussions, managing committee sessions, and confidential negotiations.",
    capacity: "16 guests",
    amenities: ["Burmese Teak Table", "Plush Leather Executive Chairs", "Integrated Table Mic Arrays", "Confidentiality Sound Dampening"],
    historyNote: "The board table was hand-carved in Pune in 1915 from a single solid block of old Burma teak.",
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Boat House",
    category: "leisure",
    description: "The historical and athletic core of the club. Home to our high-performance rowing fleet (single sculls, double sculls, coxed fours) and pleasure canoes, leading directly to our concrete floating jetties.",
    capacity: "Unlimited storage & access",
    amenities: ["Custom Boat Clamps", "Direct Concrete Floating Jetty", "Vessel Repair & Maintenance Bay", "Oars & Safety Gear Lockers"],
    historyNote: "Stores original brass-plated steering wheels and oars used in the legendary Monsoon Regatta of 1902.",
    imageUrl: "https://images.unsplash.com/photo-1471440671318-55ddd5754ee1?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pool Side",
    category: "dining",
    description: "An open-air relaxation oasis bordering our Olympic-sized swimming pool. Perfect for family evening tea, health smoothies, and casual snack service, set under rustling palm canopies.",
    capacity: "100 guests",
    amenities: ["Loungers & Parasols", "Poolside Smoothie Bar", "Secure Kids' Wading Area", "Live Acoustic Music Stages"],
    historyNote: "The palm trees lining the pool deck were hand-planted by the members of the 1968 Centennial Board.",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Old Terrace",
    category: "leisure",
    description: "The historic Edwardian viewing deck of the main clubhouse. Completely shaded by Burma teak rafters, it offers the absolute best vantage point to watch rowers race down the Mula-Mutha River.",
    capacity: "60 guests",
    amenities: ["Historic Viewing Deck", "Burmese Teak Rafters", "Vintage Wrought-Iron Railings", "Traditional Tea Service"],
    historyNote: "British governors of the Bombay Presidency sat on this exact terrace to witness the historic regattas starting in 1914.",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Rooms",
    category: "rooms",
    description: "Premium overnight accommodations on the riverfront. Includes our premier Riverside Executive Suites, Royal Edwardian Rooms, and Garden Deluxe Rooms, fully retrofitted with period furniture.",
    capacity: "12 premium keys",
    amenities: [" Victorian Poster Beds", "River-view Balconies", "Clawfoot Bath Tubs", "Complementary Butler Service"],
    historyNote: "Our suites have hosted international dignitaries, sports legends, and pioneering industrialists since the 1930s.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
  }
];

export interface SportsAcademy {
  name: string;
  description: string;
  coaches: string[];
  schedule: string;
  memberRate: string;
  guestRate: string;
  amenities: string[];
  imageUrl: string;
}

export const SPORTS_ACADEMIES_LIST: SportsAcademy[] = [
  {
    name: "Boating",
    description: "The premier rowing and sculling academy of Western India. Train under award-winning coaches on the Mula-Mutha river. Covers single sculls, double sculls, coxed fours, and recreational canoeing.",
    coaches: ["Chief Coach Subedar Major S. K. Singh (Retd., Asian Games Gold Medalist)", "Oarsman Coach Nilesh Patil"],
    schedule: "Daily 6:00 AM - 9:00 AM & 4:00 PM - 7:00 PM (Closed on Mondays)",
    memberRate: "Rs. 500 / month",
    guestRate: "Rs. 2,500 / month",
    amenities: ["Carbon-Fiber Racing Shells", "Safety Speed Launches", "Professional Oar Ergometers", "Floating Concrete Jetty"],
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Tennis",
    description: "Championship clay-court tennis training. Perfect your serve and volley under a dedicated team of PTR-certified trainers, featuring three pristine clay courts with world-class floodlighting.",
    coaches: ["Head Trainer Radhika Deshmukh (PTR-Certified)", "Assistant Coach Vikram Jadhav"],
    schedule: "Daily 6:30 AM - 10:00 AM & 3:30 PM - 8:30 PM (Sundays by appointment)",
    memberRate: "Rs. 800 / month",
    guestRate: "Rs. 3,000 / month",
    amenities: ["Three Floodlit Clay Courts", "Automatic Ball Cannon", "Dedicated Ball-boy & Marker Staff", "Resting Pavilion"],
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Swimming",
    description: "Comprehensive swim coaching in our safe, temperature-regulated half-Olympic pool. Programs range from beginner stroke fundamentals for toddlers to elite high-performance racing instruction.",
    coaches: ["Aquatics Director Manoj Ranade", "Assistant Coach Shalini Shinde"],
    schedule: "Daily 6:00 AM - 11:00 AM & 3:00 PM - 9:00 PM",
    memberRate: "Rs. 400 / month",
    guestRate: "Rs. 1,800 / month",
    amenities: ["Temperature-Regulated Pool", "Anti-Wave Lane Dividers", "Dedicated Lifeguards & First Aid", "Private Steam Rooms"],
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Health Club",
    description: "A premium physical conditioning facility equipped with state-of-the-art weights, cardio machines, cross-trainers, and sauna rooms. Offers tailored personal training for active lifestyles.",
    coaches: ["Fitness Specialist Dr. Amit Saxena (Ph.D. Kinesiology)", "Personal Trainer Pooja Nair"],
    schedule: "Daily 5:30 AM - 10:30 PM (Sundays 7:00 AM - 1:00 PM)",
    memberRate: "Rs. 300 / month",
    guestRate: "Rs. 2,000 / month",
    amenities: ["Olympic Squat Racks & Barbells", "TechnoGym Cardio Suite", "Steam, Sauna & Jacuzzi", "Body Mass Composition Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Chess Club",
    description: "Engage in cognitive warfare inside our quiet, intellectual library salon. Hosts weekly chess strategy classes, rating improvement camps, and rapid-chess club challenges under national masters.",
    coaches: ["International Arbiter & FIDE Master Sunil Mehta"],
    schedule: "Wednesdays & Saturdays 5:00 PM - 8:00 PM",
    memberRate: "Free of cost",
    guestRate: "Rs. 500 / month",
    amenities: ["Tournament Weighted Chess Pieces", "DGT Electronic Chessboards", "FIDE Rated Clocks", "Chess Strategy Library"],
    imageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Aqua Aerobics",
    description: "An invigorating, low-impact full-body pool workout set to high-energy rhythm. Extremely beneficial for joints, core stability, cardiac stamina, and physical therapy under expert physical therapists.",
    coaches: ["Water Therapist Ananya Roy (Cert. Aquatics Exercise Assoc.)"],
    schedule: "Tuesdays, Thursdays & Saturdays 8:00 AM - 9:00 AM",
    memberRate: "Rs. 600 / month",
    guestRate: "Rs. 2,200 / month",
    amenities: ["Hydro-Dumbbells & Aquatic Anklets", "Heated Therapy Pool Section", "Surround Sound Water Speakers", "Refreshments & Towels"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Billiards Academy",
    description: "Learn the precision, angles, and discipline of English Billiards and Snooker in our spectacular Edwardian Salon, utilizing championship Burroughs & Watts slate tables dating back to 1904.",
    coaches: ["Billiards Veteran Suresh Kapoor (National Bronze Medalist)"],
    schedule: "Daily 3:00 PM - 11:00 PM",
    memberRate: "Rs. 50 / hour",
    guestRate: "Rs. 150 / hour",
    amenities: ["Burroughs & Watts Slate Tables", "Imported Belgian Aramith Balls", "Teak Cue Racks", "Electronic Board Scorer"],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Table Tennis Academy",
    description: "Fast-paced table tennis coaching inside our air-conditioned indoor sports salon. Tailored to develop razor-sharp reflexes, active footwork, and strategic spin mastery for national levels.",
    coaches: ["Coach Harish Kelkar (Former Maharashtra TT Champion)"],
    schedule: "Daily 4:00 PM - 9:00 PM",
    memberRate: "Rs. 250 / month",
    guestRate: "Rs. 1,200 / month",
    amenities: ["Stiga Tournament Table Tennis Tables", "Automatic TT Serve Robot", "Premium Rubbers & Bat Arsenal", "High-speed Recording Camera"],
    imageUrl: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Out Door Sports Academy",
    description: "Comprehensive youth outdoor conditioning and physical literacy. Training includes multi-sport physical development on our manicured outdoor turf fields, tennis courts, and riverside fitness tracks.",
    coaches: ["Sports Scientist Rohit Deshpande (M.P.Ed)", "Conditioning Coach Snehal Shinde"],
    schedule: "Daily 4:30 PM - 6:30 PM",
    memberRate: "Rs. 600 / month",
    guestRate: "Rs. 2,000 / month",
    amenities: ["Manicured Soccer Turf Lanes", "Agility Ladders & Obstacle Cones", "Heart Rate Monitor Trackers", "Nutritional Advisory Seminars"],
    imageUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=800&auto=format&fit=crop"
  }
];

export interface ExactReport {
  id: string;
  name: string;
  category: "administration" | "financial" | "operations" | "history" | "safety";
  author: string;
  signatories: string[];
  period: string;
  lastUpdated: string;
  keyMetrics: { label: string; value: string }[];
  summary: string;
  sections: { title: string; paragraphs: string[] }[];
}

export const EXACT_REPORTS_LIST: ExactReport[] = [
  {
    id: "rep_mc_admin",
    name: "Managing Committee Annual Administration Report",
    category: "administration",
    author: "Governing Board of Trustees, RCBC Pune",
    signatories: ["President Sanjay Thorat", "Honorary Secretary Lt. Col. R. K. Nair (Retd.)", "Board Registrar Priya Kulkarni"],
    period: "Fiscal Year 2025 - 2026",
    lastUpdated: "2026-04-15",
    keyMetrics: [
      { label: "New Members Vetted", value: "48" },
      { label: "General Meetings Held", value: "6" },
      { label: "Staff Welfare Budget", value: "Rs. 15,00,000" },
      { label: "Constitutional Audits", value: "100% Passed" }
    ],
    summary: "A comprehensive governance and compliance audit documenting the club's administrative integrity, membership vetting rigor, constitutional enforcement, and strategic policy updates.",
    sections: [
      {
        title: "Section I: Executive Leadership & Vetting Process",
        paragraphs: [
          "During the current fiscal period, the Governing Board of Trustees has prioritized absolute transparency in vetting processes. Out of 142 permanent membership candidatures filed, only 48 passed the rigorous double-seconder review and committee viva, safeguarding the exclusive social and athletic integrity of the club.",
          "We have successfully finalized our administrative wage restructure, introducing revised benefits, medical insurance, and safety gear for our 65-strong staff of boatkeepers, markers, and service professionals."
        ]
      },
      {
        title: "Section II: Constitutional Review & Rules Enforcement",
        paragraphs: [
          "Strict enforcement of the evening formal dress code and midnight gate curfews has successfully restored the traditional atmosphere of the Anchorage Bar and Burma Teak salons. Zero security breaches were reported this year.",
          "Our collaboration with Pune Cantonment Board has been renewed, reinforcing our environmental commitment to protect the river banks and maintain buffer zones against urban encroachments."
        ]
      }
    ]
  },
  {
    id: "rep_hon_sec",
    name: "Honorary Secretary's Annual Administrative Report",
    category: "operations",
    author: "Office of the Honorary Secretary, RCBC",
    signatories: ["Honorary Secretary Lt. Col. R. K. Nair (Retd.)", "General Manager Joseph D'Souza"],
    period: "Fiscal Year 2025 - 2026",
    lastUpdated: "2026-05-02",
    keyMetrics: [
      { label: "Daily Footfall Average", value: "340 Members" },
      { label: "Water Safety Drills", value: "12 drills/year" },
      { label: "Fleet Readiness", value: "98.5%" },
      { label: "Government Permits", value: "All Active" }
    ],
    summary: "The operational blueprint outlining club maintenance, river safety compliance, fleet operations, regatta coordination, and daily administrative outcomes.",
    sections: [
      {
        title: "Section I: Boathouse Operations & River Maintenance",
        paragraphs: [
          "Under direct command of the Boating Sub-Committee, the Mula-Mutha boat house completed structural restoration of our vintage wooden storage berths. Our entire rowing fleet, consisting of 24 fiberglass shells and 6 heritage wooden sculls, was certified 100% water-ready.",
          "To counter river current variability and seasonal water hyacinth blooms, we implemented bi-weekly mechanized river weeding and installed extra light markers on the 500-meter racing strip."
        ]
      },
      {
        title: "Section II: General Facilities & Security Protocols",
        paragraphs: [
          "Our security teams conducted 12 mock emergency rescue drills. The floating concrete jetty was retrofitted with rubber non-slip bumpers, eliminating all minor launch slips.",
          "CCTV systems were upgraded along the tennis perimeter, parking bay, and boat docks, guaranteeing real-time monitoring of all water entrances."
        ]
      }
    ]
  },
  {
    id: "rep_treasurer",
    name: "Honorary Treasurer's Financial Statement & Audit Report",
    category: "financial",
    author: "P. G. Shah & Associates, Chartered Accountants",
    signatories: ["Honorary Treasurer Amit Bose", "Auditor Pankaj Shah (FCA)"],
    period: "April 1, 2025 - March 31, 2026",
    lastUpdated: "2026-05-10",
    keyMetrics: [
      { label: "Gross Receipts", value: "Rs. 4,82,50,000" },
      { label: "Net Operational Surplus", value: "Rs. 62,40,000" },
      { label: "Outstanding Dues Cleared", value: "94.2%" },
      { label: "Tax & Compliance Status", value: "Fully Certified" }
    ],
    summary: "The official audited balance sheet, ledger summaries, subscription recoveries, and taxation certifications issued by our external chartered accountant team.",
    sections: [
      {
        title: "Section I: Balance Sheet Summary & Subscription Recovery",
        paragraphs: [
          "We are pleased to report a 14.5% year-on-year growth in Gross Receipts, primarily driven by the high engagement in the Sports Academies and increased occupancy of our Riverside Suites.",
          "The integration of the ClubLekka digital portal resulted in the fastest outstanding subscription recovery in the club's history, reducing old defaults by 94.2%."
        ]
      },
      {
        title: "Section II: Capital Expenditures & Reserve Allocation",
        paragraphs: [
          "Major capital outlays this fiscal year included: Rs. 18,00,000 for swimming pool heat pumps, Rs. 12,00,000 for tennis floodlighting, and Rs. 8,00,000 for restoring the antique Burma teak rafters in the Billiards Salon.",
          "A sum of Rs. 25,00,000 has been transferred to our Reserve Heritage Fund to ensure long-term structural maintenance of our landmark 1914 Edwardian pavilion."
        ]
      }
    ]
  },
  {
    id: "rep_boating",
    name: "Boating & River Safety Committee Annual Report",
    category: "safety",
    author: "Boating Sub-Committee, RCBC",
    signatories: ["Chairman of Boating Rajesh Patwardhan", "Oarsman Coach Nilesh Patil"],
    period: "Monsoon Regatta & Winter Seasons 2025",
    lastUpdated: "2026-03-30",
    keyMetrics: [
      { label: "Regatta Competitors", value: "185 Athletes" },
      { label: "Rescue Speedboats", value: "3 Active" },
      { label: "Life Vests Audited", value: "120 Vests" },
      { label: "Silt Level Average", value: "Safe Range" }
    ],
    summary: "A critical review of the Monsoon Regatta, water quality indices, rowing lane coordinates, rescue speedboat fitness, and safety gear certifications.",
    sections: [
      {
        title: "Section I: Waterway Logistics & Depth Control",
        paragraphs: [
          "Our morning depth sonar scans confirmed that the silt levels near the central rowing channel remained within safe ranges. We have petitioned Pune Municipal Corporation to coordinate silt dredging around the Bund area to prevent siltation risks before the 2026 Monsoon Regatta.",
          "Three high-power Yamaha outboard rescue motors were serviced and stationed at the launch platform, with full-time coxswains on duty during all sports hours."
        ]
      },
      {
        title: "Section II: Safety Rules & Oarsman Guidelines",
        paragraphs: [
          "Wearing certified buoyancy jackets has been made 100% mandatory for all single-scull amateurs and recreational kayakers. The rowing logbooks of 1902 have been cross-verified with modern water parameters to draft a refined water danger-index scale based on current flow speeds."
        ]
      }
    ]
  },
  {
    id: "rep_catering",
    name: "Catering, Restaurant & Bar Sub-Committee Report",
    category: "operations",
    author: "Catering Sub-Committee, RCBC",
    signatories: ["Chairman of Catering Anil Mulgund", "Executive Chef Hemant Raorane"],
    period: "Fiscal Year 2025 - 2026",
    lastUpdated: "2026-04-22",
    keyMetrics: [
      { label: "Kitchen Hygiene Score", value: "98%" },
      { label: "New Dishes Added", value: "15 dishes" },
      { label: "Catering Revenue", value: "Rs. 1,45,00,000" },
      { label: "Vendor Certifications", value: "100% organic" }
    ],
    summary: "An extensive evaluation of food preparation standards, menu revisions, banquet catering performance, hygiene audits, and vendor supply compliance.",
    sections: [
      {
        title: "Section I: Culinary Quality & Menu Reinvention",
        paragraphs: [
          "Under the guidance of Executive Chef Hemant Raorane, our main restaurant introduced a signature heritage menu featuring classic Continental roast dishes, bringing back the silver-service style of the 1920s.",
          "Our supplier auditing was tightened, ensuring 100% of our vegetables and dairy are sourced from local certified pesticide-free farms in Pune district."
        ]
      },
      {
        title: "Section II: Kitchen Infrastructure & Health Compliance",
        paragraphs: [
          "The main kitchen underwent complete ventilation retrofitting, installing modern chimney hoods and stainless-steel cooktops. An independent food safety audit rated the club's kitchen hygiene at an outstanding 98%."
        ]
      }
    ]
  },
  {
    id: "rep_heritage_court",
    name: "Civil Court Joint Receivership Historical Handover Report (Civil Suit No. 776 of 1947)",
    category: "history",
    author: "Poona Civil Court Joint Receivers",
    signatories: ["Lt. Col. C.T. Honeyborne", "Lt. Col. G.H. Wotton", "Court Judge J. D. Shinde"],
    period: "August 15, 1947 - December 31, 1947",
    lastUpdated: "1948-01-05",
    keyMetrics: [
      { label: "Disputed Court Assets", value: "100% Preserved" },
      { label: "Rowing Boats Cataloged", value: "28 Craft" },
      { label: "Original Ledgers Recovered", value: "14 Handbooks" },
      { label: "Valuation of Grounds", value: "Rs. 2,50,000 (1947)" }
    ],
    summary: "The definitive historical document detailing the legal custody of the club's physical assets and archives during the post-colonial transition of 1947.",
    sections: [
      {
        title: "Section I: Interim Neutral Military Guard",
        paragraphs: [
          "Upon the filing of Civil Suit No. 776 of 1947 on August 15, 1947, the Poona Civil Court ordered that the keys to all boathouses, bank accounts, and archives of the Royal Connaught Boat Club be held under joint military receivership. This order successfully prevented any looting of assets during local political adjustments.",
          "We, the appointed Joint Receivers, confirm that every piece of club silver, Burroughs & Watts billiard equipment, and Burmese teakwood furniture was carefully locked and sealed."
        ]
      },
      {
        title: "Section II: Verification of Records & Final Handover",
        paragraphs: [
          "Every historical charter, original photo, and regatta ledger was cross-verified. On January 5, 1948, the Court formally discharged the Receivership, transferring custody of all physical grounds and accounts to the first Indian managing committee, under Vice President S. L. Kirloskar, who guaranteed the continuation of sporting protocols."
        ]
      }
    ]
  },
  {
    id: "rep_structural",
    name: "Structural Safety & Heritage Restoration Committee Report",
    category: "safety",
    author: "Heritage Engineering Consultants, Pune",
    signatories: ["Senior Structural Architect Dr. Nitin Vyas (IIT Bombay)", "General Manager Joseph D'Souza"],
    period: "December 2025 Audit",
    lastUpdated: "2026-01-10",
    keyMetrics: [
      { label: "Teak Roof Deflection", value: "0mm (Stable)" },
      { label: "Basalt Foundation Check", value: "100% Sound" },
      { label: "Concrete Jetty Strength", value: "M35 Grade" },
      { label: "Heritage Preservation Index", value: "Class A" }
    ],
    summary: "The engineering assessment certifying the absolute structural safety of our landmark 1914 clubhouse, its Burma teak roofs, and concrete river docks.",
    sections: [
      {
        title: "Section I: Edwardian Clubhouse & Burma Teak Roofs",
        paragraphs: [
          "A comprehensive laser deflection audit was conducted on the soaring wood trusses of the 1914 pavilion. Our calculations indicate 0mm deflection, certifying that the premium Burma teak wood remains completely healthy and structurally sound, with no dry-rot or pest activity.",
          "The basalt stone foundations lining the riverbank were inspected using sonic testing and certified free of underwater scouring or micro-fractures."
        ]
      },
      {
        title: "Section II: Concrete Jetties & Water Docking Slabs",
        paragraphs: [
          "The main floating concrete jetties built in 1990 were tested for buoyant reserve capacity. Minor tension cracks on the gangway were filled with polymer-modified mortar, certifying the jetties safe for another 25 years of regatta operations."
        ]
      }
    ]
  },
  {
    id: "rep_sports_progress",
    name: "Sports, Tournaments & Academies Progress Report",
    category: "operations",
    author: "Sports Development Committee, RCBC",
    signatories: ["Director of Athletics Radhika Deshmukh", "Chief Coach Subedar Major S. K. Singh (Retd.)"],
    period: "Fiscal Year 2025 - 2026",
    lastUpdated: "2026-04-18",
    keyMetrics: [
      { label: "Academy Enrollments", value: "450 Students" },
      { label: "National Level Athletes", value: "14 rowers" },
      { label: "Gold Medals Won", value: "8 Medals" },
      { label: "Intrasport Tournaments", value: "12 tournaments" }
    ],
    summary: "The athletic performance report detailing student enrollments, inter-club trophies won, coach evaluations, and regional sport development programs.",
    sections: [
      {
        title: "Section I: Rowing and Boating Academy Performance",
        paragraphs: [
          "Our rowing wing witnessed a historic year, sending 14 of our junior and senior scullers to the Indian National Rowing Championship. The coxed-four crew won a spectacular Gold Medal, establishing RCBC as Pune's premier athletic training powerhouse.",
          "Our partnership with regional schools has brought 80 young underprivileged athletes to our morning rowing orientation programs, entirely funded by corporate member sponsorships."
        ]
      },
      {
        title: "Section II: Racket Sports & Cue Sports Academies",
        paragraphs: [
          "The Lawn Tennis Academy hosted the 2025 monsoon clay tournament, drawing 120 competitors from across Western India.",
          "Weekly indoor tournaments at our table tennis and billiards chambers have seen a 35% surge in active participation, showcasing high-performance cue mastery."
        ]
      }
    ]
  }
];

