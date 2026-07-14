import { Product } from "@/types";

/**
 * Mock catalogue for the Aeris showcase.
 * Copy is written to read like a real ergonomic-furniture brand — no lorem ipsum.
 */
export const PRODUCTS: Product[] = [
  {
    name: "Aeris Glide Ergo",
    slug: "glide-ergo",
    category: "ergonomic-chairs",
    price: 24999,
    compareAtPrice: 32999,
    rating: 4.8,
    reviewCount: 512,
    tagline: "Adaptive lumbar that tracks the curve of your spine.",
    description:
      "The Glide Ergo is our most-adjustable task chair. A self-weighing recline reads how you lean and meters resistance automatically, so the chair follows you instead of fighting you. The back is a single sheet of breathable knit tensioned across a flex frame — firm where you need support, forgiving everywhere else.",
    swatch: "#C62828",
    colors: [
      { name: "Graphite", hex: "#2B2B2E" },
      { name: "Fog", hex: "#C9CCD1" },
      { name: "Red Accent", hex: "#C62828" },
    ],
    badges: ["Adaptive lumbar", "Breathable knit", "135° recline"],
    features: [
      {
        title: "Self-weighing recline",
        description:
          "Reads your body weight and sets recline tension automatically — no dials, no guesswork.",
      },
      {
        title: "4D adjustable armrests",
        description:
          "Height, depth, width and pivot all move independently to bring support to your elbows.",
      },
      {
        title: "Breathable flex-knit back",
        description:
          "A single-piece knit dissipates heat and moves with your shoulders through the day.",
      },
      {
        title: "Seat-depth glide",
        description:
          "The cushion slides forward up to 60mm so the seat fits your legs, not the average of everyone's.",
      },
    ],
    benefits: [
      {
        title: "Less end-of-day fatigue",
        description:
          "Continuous lumbar contact keeps your lower back loaded evenly across long working sessions.",
      },
      {
        title: "Cooler, drier seating",
        description:
          "Open knit and a ventilated foam base move heat away instead of trapping it.",
      },
      {
        title: "Fits a range of bodies",
        description:
          "Independent seat, back and arm adjustments suit heights from 5'0\" to 6'4\".",
      },
    ],
    materials: [
      "Recycled PET flex-knit back",
      "High-resilience moulded foam seat",
      "Die-cast aluminium base",
      "PU-coated twin-wheel castors",
    ],
    dimensions: [
      { label: "Seat height", value: "44 – 54 cm" },
      { label: "Seat width", value: "50 cm" },
      { label: "Seat depth", value: "44 – 50 cm" },
      { label: "Back height", value: "62 cm" },
      { label: "Overall height", value: "108 – 118 cm" },
      { label: "Base diameter", value: "68 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "130 kg" },
      { label: "Recline range", value: "95° – 135°" },
      { label: "Tilt mechanism", value: "Self-weighing synchro" },
      { label: "Gas lift", value: "Class 4, certified" },
      { label: "Armrests", value: "4D adjustable" },
      { label: "Assembly time", value: "~10 minutes" },
    ],
    usage:
      "Set the seat height so your feet rest flat and your knees sit just below your hips. Slide the seat depth until two fingers fit behind your knees, then let the self-weighing recline do the rest.",
    warranty: "12-year limited warranty on frame, mechanism and gas lift.",
    care: [
      "Vacuum the knit back monthly with a soft brush head.",
      "Wipe the frame with a damp, lint-free cloth — avoid solvents.",
      "Re-tighten base bolts after the first two weeks of use.",
    ],
    faqs: [
      {
        question: "How adjustable are the armrests?",
        answer:
          "The armrests move in four directions — up/down, forward/back, in/out and rotation — so you can bring support directly under your elbows in any posture.",
      },
      {
        question: "Does the recline lock in position?",
        answer:
          "Yes. Beyond the free-glide range you can lock the recline at four fixed angles between 95° and 135°.",
      },
      {
        question: "Is it suitable for warm climates?",
        answer:
          "The flex-knit back and ventilated seat foam are designed to move heat away, making it well suited to warm rooms and long sittings.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "3.2 MB" },
      { label: "Assembly manual", type: "manual", size: "1.1 MB" },
      { label: "Warranty terms", type: "warranty", size: "220 KB" },
    ],
    relatedSlugs: ["mesh-task-pro", "flow-executive", "orbit-standing-desk"],
    featured: true,
    isNew: true,
  },
  {
    name: "Aeris Mesh Task Pro",
    slug: "mesh-task-pro",
    category: "office-chairs",
    price: 16999,
    compareAtPrice: 21999,
    rating: 4.7,
    reviewCount: 389,
    tagline: "A featherweight daily driver with true all-mesh support.",
    description:
      "Mesh Task Pro strips the task chair back to essentials: a tensioned mesh seat and back on a light aluminium frame, with just the adjustments that matter. It disappears under you and keeps you cool from the first meeting to the last.",
    swatch: "#4B5563",
    colors: [
      { name: "Slate", hex: "#4B5563" },
      { name: "Ivory", hex: "#EDEAE3" },
    ],
    badges: ["All-mesh", "Synchro tilt", "Lightweight"],
    features: [
      {
        title: "Tensioned mesh seat",
        description:
          "A woven seat flexes to your shape and breathes as well as the backrest does.",
      },
      {
        title: "Synchro tilt",
        description:
          "Back and seat recline together at a natural 2:1 ratio to keep your feet planted.",
      },
      {
        title: "Height-adjustable lumbar",
        description:
          "A sliding lumbar pad locks in at the exact height your lower back wants.",
      },
    ],
    benefits: [
      {
        title: "Stays cool all day",
        description: "Full-mesh construction keeps air moving against your back.",
      },
      {
        title: "Effortless to move",
        description: "Under 12 kg, so it glides between desks and rooms with ease.",
      },
    ],
    materials: [
      "6-bar woven polyester mesh",
      "Glass-reinforced nylon frame",
      "Nylon base with soft castors",
    ],
    dimensions: [
      { label: "Seat height", value: "45 – 55 cm" },
      { label: "Seat width", value: "49 cm" },
      { label: "Seat depth", value: "46 cm" },
      { label: "Back height", value: "58 cm" },
      { label: "Overall height", value: "104 – 114 cm" },
      { label: "Base diameter", value: "66 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "120 kg" },
      { label: "Recline range", value: "95° – 120°" },
      { label: "Tilt mechanism", value: "2:1 synchro" },
      { label: "Gas lift", value: "Class 3, certified" },
      { label: "Armrests", value: "2D adjustable" },
      { label: "Chair weight", value: "11.8 kg" },
    ],
    usage:
      "Adjust the lumbar pad to sit just above your belt line, then set seat height so your forearms rest level with the desk.",
    warranty: "8-year limited warranty on frame and mechanism.",
    care: [
      "Dust the mesh weekly with a dry microfibre cloth.",
      "Spot-clean spills with mild soap and cool water.",
    ],
    faqs: [
      {
        question: "Is an all-mesh seat comfortable for long sittings?",
        answer:
          "The seat is tensioned to distribute weight evenly and flex to your shape, so it stays comfortable across a full workday without a separate cushion.",
      },
      {
        question: "What is the weight capacity?",
        answer: "The Mesh Task Pro supports up to 120 kg.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "2.6 MB" },
      { label: "Assembly manual", type: "manual", size: "980 KB" },
    ],
    relatedSlugs: ["glide-ergo", "flow-executive", "pulse-gaming"],
    featured: true,
  },
  {
    name: "Aeris Flow Executive",
    slug: "flow-executive",
    category: "executive-chairs",
    price: 38999,
    compareAtPrice: 46999,
    rating: 4.9,
    reviewCount: 217,
    tagline: "Full-grain leather over an ergonomic core.",
    description:
      "Flow Executive brings the boardroom and the body into agreement. Under the hand-finished full-grain leather sits the same adaptive lumbar system as our task chairs, so a chair that looks the part also holds you correctly through a nine-hour day.",
    swatch: "#3A2E28",
    colors: [
      { name: "Espresso", hex: "#3A2E28" },
      { name: "Onyx", hex: "#1C1C1E" },
      { name: "Tan", hex: "#8A6A4B" },
    ],
    badges: ["Full-grain leather", "Adaptive lumbar", "Memory foam"],
    features: [
      {
        title: "Hand-finished leather",
        description:
          "Full-grain hide, aniline-dyed and top-stitched, ages into a richer patina over time.",
      },
      {
        title: "Layered memory foam",
        description:
          "A dual-density cushion softens the contact points while keeping firm structural support.",
      },
      {
        title: "Silent recline",
        description:
          "A weighted mechanism reclines and returns without a sound — meeting-room friendly.",
      },
    ],
    benefits: [
      {
        title: "Comfort that reads as craft",
        description:
          "You get ergonomic support without the technical look of a task chair.",
      },
      {
        title: "Ages beautifully",
        description: "Full-grain leather develops character rather than wearing out.",
      },
    ],
    materials: [
      "Full-grain aniline leather",
      "Dual-density memory foam",
      "Polished aluminium base",
      "Hooded twin-wheel castors",
    ],
    dimensions: [
      { label: "Seat height", value: "46 – 56 cm" },
      { label: "Seat width", value: "54 cm" },
      { label: "Seat depth", value: "50 cm" },
      { label: "Back height", value: "72 cm" },
      { label: "Overall height", value: "116 – 126 cm" },
      { label: "Base diameter", value: "72 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "140 kg" },
      { label: "Recline range", value: "95° – 130°" },
      { label: "Tilt mechanism", value: "Weighted synchro" },
      { label: "Gas lift", value: "Class 4, certified" },
      { label: "Armrests", value: "4D, leather-wrapped" },
      { label: "Headrest", value: "Adjustable, integrated" },
    ],
    usage:
      "Recline lock is on the right paddle; use the free-glide range for reading and lock it upright for focused desk work.",
    warranty: "12-year limited warranty; leather covered for 5 years.",
    care: [
      "Condition the leather every 6 months with a pH-neutral balm.",
      "Keep out of direct sunlight to preserve the finish.",
      "Dust weekly with a dry cloth.",
    ],
    faqs: [
      {
        question: "Is the leather genuine?",
        answer:
          "Yes — it's full-grain aniline leather, the least-processed grade, which is why it develops a patina as it ages.",
      },
      {
        question: "Does an executive chair still support good posture?",
        answer:
          "Flow uses the same adaptive lumbar core as our ergonomic range, so it supports posture as well as it looks the part.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "3.8 MB" },
      { label: "Leather care guide", type: "manual", size: "640 KB" },
      { label: "Warranty terms", type: "warranty", size: "240 KB" },
    ],
    relatedSlugs: ["glide-ergo", "mesh-task-pro", "orbit-standing-desk"],
    featured: true,
  },
  {
    name: "Aeris Pulse Gaming",
    slug: "pulse-gaming",
    category: "gaming-chairs",
    price: 21999,
    compareAtPrice: 27999,
    rating: 4.6,
    reviewCount: 634,
    tagline: "Racing-seat hold with ergonomic-chair discipline.",
    description:
      "Pulse takes the wraparound support of a racing seat and re-engineers it around posture science. Deep side bolsters keep you centred through marathon sessions while a magnetic memory-foam neck pillow and adjustable lumbar keep the ergonomics honest.",
    swatch: "#111827",
    colors: [
      { name: "Blackout", hex: "#111827" },
      { name: "Red Accent", hex: "#C62828" },
      { name: "Crimson", hex: "#9B1C1C" },
    ],
    badges: ["Wraparound bolsters", "Magnetic pillow", "165° recline"],
    features: [
      {
        title: "Wraparound bolsters",
        description:
          "Sculpted side supports keep you centred without pinching, even leaning into a game.",
      },
      {
        title: "165° deep recline",
        description:
          "Reclines nearly flat for breaks, then snaps back to a supported upright.",
      },
      {
        title: "Magnetic accessories",
        description:
          "Neck and lumbar pillows attach magnetically — no straps to slip out of place.",
      },
    ],
    benefits: [
      {
        title: "Stays supportive under load",
        description:
          "Cold-cure foam holds its shape through long, high-intensity sessions.",
      },
      {
        title: "Ergonomics, not just aesthetics",
        description: "Adjustable lumbar means the bolstered look still supports your back.",
      },
    ],
    materials: [
      "Breathable PU leatherette",
      "Cold-cure moulded foam",
      "Steel-reinforced frame",
      "75mm PU castors",
    ],
    dimensions: [
      { label: "Seat height", value: "47 – 57 cm" },
      { label: "Seat width", value: "56 cm" },
      { label: "Seat depth", value: "52 cm" },
      { label: "Back height", value: "84 cm" },
      { label: "Overall height", value: "128 – 138 cm" },
      { label: "Base diameter", value: "70 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "150 kg" },
      { label: "Recline range", value: "90° – 165°" },
      { label: "Tilt mechanism", value: "Multi-lock rocker" },
      { label: "Gas lift", value: "Class 4, certified" },
      { label: "Armrests", value: "4D adjustable" },
      { label: "Included", value: "Neck + lumbar pillows" },
    ],
    usage:
      "Use the rocker lock for upright play; release it for a gentle tilt on breaks. Set the neck pillow so it meets the base of your skull, not your neck.",
    warranty: "6-year limited warranty on frame and mechanism.",
    care: [
      "Wipe leatherette with a barely-damp cloth — never soak it.",
      "Keep away from radiators and direct sun.",
    ],
    faqs: [
      {
        question: "What type of gas lift is used?",
        answer:
          "A certified Class-4 gas lift — the highest safety class — rated well above everyday load.",
      },
      {
        question: "Are the wheels smooth and durable?",
        answer:
          "The 75mm PU-coated castors roll smoothly on hard floors and carpet and are rated for heavy daily use.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "3.0 MB" },
      { label: "Assembly manual", type: "manual", size: "1.2 MB" },
    ],
    relatedSlugs: ["glide-ergo", "mesh-task-pro", "pulse-gaming"],
    isNew: true,
  },
  {
    name: "Aeris Orbit Standing Desk",
    slug: "orbit-standing-desk",
    category: "standing-desks",
    price: 42999,
    compareAtPrice: 49999,
    rating: 4.8,
    reviewCount: 178,
    tagline: "Whisper-quiet dual motors with programmable height.",
    description:
      "Orbit moves you between sitting and standing without breaking your focus. Twin motors lift a solid oak-veneer top smoothly and quietly, while four presets remember the exact heights that work for you and everyone who shares the desk.",
    swatch: "#7A5C3E",
    colors: [
      { name: "Oak", hex: "#B08A5E" },
      { name: "Walnut", hex: "#5A4633" },
      { name: "White", hex: "#EDEAE3" },
    ],
    badges: ["Dual motor", "4 presets", "Anti-collision"],
    features: [
      {
        title: "Dual-motor lift",
        description:
          "Two synchronised motors raise the top evenly and quietly at 38mm per second.",
      },
      {
        title: "Programmable presets",
        description:
          "Store four heights and return to any of them with a single tap.",
      },
      {
        title: "Anti-collision sensing",
        description:
          "The desk detects obstacles on the way down and stops before anything is pinched.",
      },
    ],
    benefits: [
      {
        title: "Move more, sit less",
        description: "Effortless transitions make it easy to actually use the standing height.",
      },
      {
        title: "Rock-solid at full height",
        description: "A cross-braced frame stays stable even fully extended.",
      },
    ],
    materials: [
      "Solid oak-veneer top",
      "Powder-coated steel frame",
      "Dual synchronised motors",
    ],
    dimensions: [
      { label: "Top size", value: "140 × 70 cm" },
      { label: "Height range", value: "62 – 128 cm" },
      { label: "Lift speed", value: "38 mm / sec" },
      { label: "Top thickness", value: "25 mm" },
      { label: "Frame width", value: "108 – 168 cm" },
    ],
    specifications: [
      { label: "Load capacity", value: "120 kg" },
      { label: "Motors", value: "Dual, synchronised" },
      { label: "Presets", value: "4 programmable" },
      { label: "Noise level", value: "< 45 dB" },
      { label: "Anti-collision", value: "Included" },
      { label: "Cable tray", value: "Integrated" },
    ],
    usage:
      "Set your sitting preset with elbows at 90° and standing preset so wrists stay flat. Alternate roughly every 45 minutes.",
    warranty: "10-year limited warranty on frame and motors.",
    care: [
      "Wipe the top with a soft, damp cloth and dry immediately.",
      "Keep the motor housing free of dust and clutter.",
    ],
    faqs: [
      {
        question: "How quiet are the motors?",
        answer:
          "The dual-motor lift runs below 45 dB — quiet enough to raise during a call without interrupting it.",
      },
      {
        question: "How heavy a setup can it hold?",
        answer:
          "The frame is rated to 120 kg, comfortably covering multiple monitors, a laptop and desk accessories.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "4.1 MB" },
      { label: "Assembly manual", type: "manual", size: "1.6 MB" },
      { label: "Warranty terms", type: "warranty", size: "260 KB" },
    ],
    relatedSlugs: ["glide-ergo", "flow-executive", "lumbar-cushion"],
    featured: true,
  },
  {
    name: "Aeris Lumbar Cushion",
    slug: "lumbar-cushion",
    category: "accessories",
    price: 3499,
    compareAtPrice: 4499,
    rating: 4.5,
    reviewCount: 908,
    tagline: "Memory-foam lower-back support for any chair.",
    description:
      "Not every chair is an Aeris — this fixes the ones that aren't. A contoured memory-foam cushion restores the lumbar curve on flat office and car seats, with a breathable cover and a strap that keeps it exactly where you set it.",
    swatch: "#5B6472",
    colors: [
      { name: "Charcoal", hex: "#3A3F47" },
      { name: "Fog", hex: "#C9CCD1" },
    ],
    badges: ["Memory foam", "Universal strap", "Washable cover"],
    features: [
      {
        title: "Contoured memory foam",
        description:
          "Moulds to your lower back and springs back, keeping consistent support all day.",
      },
      {
        title: "Universal strap",
        description: "A two-point strap fits office chairs, car seats and sofas alike.",
      },
      {
        title: "Washable knit cover",
        description: "The breathable cover unzips and goes straight in the machine.",
      },
    ],
    benefits: [
      {
        title: "Upgrades any seat",
        description: "Turns a flat chair into a lumbar-supportive one in seconds.",
      },
      {
        title: "Travels with you",
        description: "Light enough to move between the office, the car and home.",
      },
    ],
    materials: ["High-density memory foam", "Breathable knit cover", "Elastic strap"],
    dimensions: [
      { label: "Width", value: "36 cm" },
      { label: "Height", value: "34 cm" },
      { label: "Depth", value: "10 cm" },
      { label: "Weight", value: "0.6 kg" },
    ],
    specifications: [
      { label: "Foam", value: "High-density memory" },
      { label: "Cover", value: "Machine washable" },
      { label: "Strap", value: "Two-point, adjustable" },
      { label: "Fits", value: "Most chairs & car seats" },
    ],
    usage:
      "Position the cushion so the fullest part sits just above your belt line, then tension the strap so it stays put.",
    warranty: "2-year limited warranty against foam breakdown.",
    care: ["Unzip and machine-wash the cover cold.", "Air-dry the foam; do not tumble."],
    faqs: [
      {
        question: "Will it fit my car seat?",
        answer:
          "The two-point strap wraps most car and office seats, holding the cushion at the right height for your lower back.",
      },
      {
        question: "What materials are used?",
        answer:
          "A high-density memory-foam core under a breathable, machine-washable knit cover.",
      },
    ],
    downloads: [{ label: "Product brochure", type: "brochure", size: "1.4 MB" }],
    relatedSlugs: ["glide-ergo", "mesh-task-pro", "orbit-standing-desk"],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getRelated = (slugs: string[]) =>
  slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

export const FEATURED = PRODUCTS.filter((p) => p.featured);
