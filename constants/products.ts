import { Product } from "@/types";

/**
 * Mock catalogue for the Aeris showcase.
 * Copy is written to read like a real ergonomic-furniture brand — no lorem ipsum.
 */
export const PRODUCTS: Product[] = [
  {
    name: "Aeris Glide Ergo",
    slug: "glide-ergo",
    category: "office-chairs",
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
    category: "office-chairs",
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
    category: "leisure-lounges",
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
    category: "work-stations",
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
    category: "office-storage",
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
  {
    name: "Zenpro",
    slug: "zenpro",
    category: "office-chairs",
    price: 19499,
    compareAtPrice: 25999,
    rating: 4.7,
    reviewCount: 302,
    tagline: "Posture-correcting mesh chair built for marathon focus.",
    description:
      "Zenpro is engineered for the deep-work hours when comfort can't be an afterthought. A tri-zone mesh backrest targets shoulders, mid-back and lumbar independently, while a waterfall seat edge reduces thigh pressure so circulation stays strong through long sittings.",
    swatch: "#2D6A4F",
    colors: [
      { name: "Forest", hex: "#2D6A4F" },
      { name: "Charcoal", hex: "#2B2B2E" },
      { name: "Fog", hex: "#C9CCD1" },
    ],
    badges: ["Tri-zone mesh", "Waterfall seat", "3D lumbar"],
    features: [
      {
        title: "Tri-zone mesh backrest",
        description:
          "Three separate mesh panels with different tensions support shoulders, mid-back and lumbar each at the right firmness.",
      },
      {
        title: "Waterfall seat edge",
        description:
          "A gently curved front edge reduces pressure on the underside of the thighs to keep legs comfortable for hours.",
      },
      {
        title: "3D adjustable lumbar",
        description:
          "The lumbar pad moves up, down, in and out to meet your lower back precisely where it needs it.",
      },
    ],
    benefits: [
      {
        title: "Better circulation",
        description:
          "Waterfall edge and ventilated mesh keep blood flowing even during full-day sittings.",
      },
      {
        title: "Targeted spinal support",
        description:
          "Independent zone tensions mean every section of your back is held, not just averaged.",
      },
    ],
    materials: [
      "Tri-zone tensioned polyester mesh",
      "High-density contoured foam seat",
      "Nylon reinforced frame",
      "PU twin-wheel castors",
    ],
    dimensions: [
      { label: "Seat height", value: "44 – 54 cm" },
      { label: "Seat width", value: "51 cm" },
      { label: "Seat depth", value: "46 cm" },
      { label: "Back height", value: "60 cm" },
      { label: "Overall height", value: "106 – 116 cm" },
      { label: "Base diameter", value: "67 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "125 kg" },
      { label: "Recline range", value: "95° – 125°" },
      { label: "Tilt mechanism", value: "Tension-adjustable tilt" },
      { label: "Gas lift", value: "Class 4, certified" },
      { label: "Armrests", value: "3D adjustable" },
      { label: "Assembly time", value: "~12 minutes" },
    ],
    usage:
      "Adjust the 3D lumbar so the pad sits just above your waistband. Set seat height so feet rest flat, then fine-tune armrests until your shoulders are relaxed.",
    warranty: "10-year limited warranty on frame and mechanism.",
    care: [
      "Vacuum the mesh panels monthly using a soft brush attachment.",
      "Wipe the frame with a slightly damp cloth — avoid abrasive cleaners.",
    ],
    faqs: [
      {
        question: "How is the tri-zone mesh different from a single-panel back?",
        answer:
          "Each zone is tensioned separately, so shoulders get a softer hold while the lumbar zone provides firmer push-back — closer to what your spine actually needs.",
      },
      {
        question: "Can the seat depth be adjusted?",
        answer:
          "Yes, the seat slides forward up to 50mm so users of different leg lengths can all achieve the recommended two-finger gap behind the knee.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "2.9 MB" },
      { label: "Assembly manual", type: "manual", size: "1.0 MB" },
      { label: "Warranty terms", type: "warranty", size: "210 KB" },
    ],
    relatedSlugs: ["glide-ergo", "mesh-task-pro", "ferro"],
    featured: true,
    isNew: true,
  },
  {
    name: "Jupiter",
    slug: "jupiter",
    category: "office-chairs",
    price: 54999,
    compareAtPrice: 64999,
    rating: 4.8,
    reviewCount: 143,
    tagline: "Modular L-shaped workstation that grows with your team.",
    description:
      "Jupiter is the anchor of any serious workspace. Its L-shaped modular design links seamlessly into clusters for open-plan offices or stands alone as a private workstation. A cable-managed steel frame and reversible desk top mean it configures left or right in minutes, not hours.",
    swatch: "#4A4A4A",
    colors: [
      { name: "Graphite", hex: "#4A4A4A" },
      { name: "White Oak", hex: "#C8B89A" },
      { name: "Ivory", hex: "#EDEAE3" },
    ],
    badges: ["L-shaped", "Cable management", "Modular"],
    features: [
      {
        title: "Reversible L-configuration",
        description:
          "The return panel mounts left or right without extra parts — choose the layout that works for your room.",
      },
      {
        title: "Integrated cable management",
        description:
          "A rear cable spine and modesty panel keep wires routed and hidden from every angle.",
      },
      {
        title: "Cluster-ready frame",
        description:
          "Side-link brackets let multiple Jupiter units join into an open-plan cluster without visible gaps.",
      },
    ],
    benefits: [
      {
        title: "More desk, same footprint",
        description:
          "The L-shape gives you a primary and secondary surface without doubling the floor area.",
      },
      {
        title: "Ready for the long run",
        description:
          "Powder-coated steel and 25mm tops withstand years of daily heavy use.",
      },
    ],
    materials: [
      "25 mm engineered wood top",
      "Powder-coated steel frame",
      "ABS edge-banding",
      "Levelling feet",
    ],
    dimensions: [
      { label: "Primary top", value: "150 × 75 cm" },
      { label: "Return top", value: "100 × 60 cm" },
      { label: "Desk height", value: "75 cm (fixed)" },
      { label: "Frame gauge", value: "1.5 mm cold-rolled steel" },
    ],
    specifications: [
      { label: "Load capacity", value: "80 kg per surface" },
      { label: "Top thickness", value: "25 mm" },
      { label: "Finish", value: "Melamine with ABS edge" },
      { label: "Cable spine", value: "Integrated, rear" },
      { label: "Cluster link", value: "Side-bracket included" },
      { label: "Assembly time", value: "~30 minutes" },
    ],
    usage:
      "Position the primary surface as your main monitor station and the return for secondary tasks or a second screen. Run cables through the rear spine before attaching the modesty panel.",
    warranty: "7-year limited warranty on frame and top surface.",
    care: [
      "Wipe the melamine surface with a damp cloth — avoid abrasive pads.",
      "Check levelling feet every 6 months on uneven floors.",
    ],
    faqs: [
      {
        question: "Can I order just the primary desk and add the return later?",
        answer:
          "Yes. The return panel and side-link bracket are sold separately, so you can start with the primary desk and expand when needed.",
      },
      {
        question: "Does it support dual monitors?",
        answer:
          "The 80 kg per-surface load capacity handles multiple monitors, docks and accessories with ease.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "3.5 MB" },
      { label: "Assembly manual", type: "manual", size: "2.1 MB" },
      { label: "Warranty terms", type: "warranty", size: "230 KB" },
    ],
    relatedSlugs: ["orbit-standing-desk", "altura", "zenpro"],
    featured: true,
  },
  {
    name: "Webstar",
    slug: "webstar",
    category: "office-chairs",
    price: 67999,
    compareAtPrice: 79999,
    rating: 4.6,
    reviewCount: 88,
    tagline: "Twelve-seat conference table with integrated AV channel.",
    description:
      "Webstar turns the boardroom into a broadcast studio without the clutter. A solid-core top with an inlaid AV channel routes power, data and video cables beneath the surface to any seat, while a brushed-aluminium base adds the presence the room demands.",
    swatch: "#8A7560",
    colors: [
      { name: "Walnut", hex: "#5A4633" },
      { name: "Dark Oak", hex: "#3B2F2F" },
      { name: "White", hex: "#EDEAE3" },
    ],
    badges: ["12-seat", "AV channel", "Brushed aluminium"],
    features: [
      {
        title: "Inlaid AV channel",
        description:
          "A recessed spine running the full length of the table routes HDMI, power and USB to pop-up modules at every seat.",
      },
      {
        title: "Solid-core top",
        description:
          "A 38mm top with hardwood core resists impact, flex and day-to-day scuffs in heavy-use meeting rooms.",
      },
      {
        title: "Brushed-aluminium base",
        description:
          "Twin boat-shaped pedestals in brushed aluminium keep the floor clear and hold the top stable at full load.",
      },
    ],
    benefits: [
      {
        title: "Clean, cable-free surface",
        description:
          "Every cable stays beneath the top, so the table always looks boardroom-ready.",
      },
      {
        title: "Handles any meeting format",
        description:
          "Power and AV at each seat mean the room adapts to presentations, video calls and workshops equally.",
      },
    ],
    materials: [
      "38 mm solid-core engineered top",
      "Brushed aluminium pedestals",
      "Integrated AV conduit",
      "Pop-up module inserts",
    ],
    dimensions: [
      { label: "Top size", value: "360 × 120 cm" },
      { label: "Table height", value: "75 cm" },
      { label: "Top thickness", value: "38 mm" },
      { label: "Seating capacity", value: "Up to 12" },
    ],
    specifications: [
      { label: "Load capacity", value: "200 kg" },
      { label: "AV channel", value: "Full-length, recessed" },
      { label: "Pop-up modules", value: "6 × dual power + USB-A/C" },
      { label: "Base finish", value: "Brushed aluminium" },
      { label: "Top finish", value: "Premium melamine" },
      { label: "Assembly", value: "White-glove recommended" },
    ],
    usage:
      "Route your HDMI and power cables through the AV channel before the pop-up modules are clipped in. Modules are tool-free snap-in and can be repositioned to any seat as needed.",
    warranty: "8-year limited warranty on frame; 3 years on AV modules.",
    care: [
      "Wipe the top with a dry or lightly damp microfibre cloth.",
      "Clean pop-up modules with a dry cloth — no liquid inside the inserts.",
    ],
    faqs: [
      {
        question: "Are the pop-up modules replaceable?",
        answer:
          "Yes. Modules snap in and out without tools and are available in power, USB-C, HDMI and RJ45 variants.",
      },
      {
        question: "Can the table be split for transport?",
        answer:
          "The top ships in two halves and joins with concealed bolts for a seamless seam on site.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "4.4 MB" },
      { label: "Installation guide", type: "manual", size: "2.8 MB" },
      { label: "AV module specs", type: "brochure", size: "980 KB" },
    ],
    relatedSlugs: ["jupiter", "orbit-standing-desk", "altura"],
  },
  {
    name: "Ferro",
    slug: "ferro",
    category: "office-chairs",
    price: 12999,
    compareAtPrice: 16999,
    rating: 4.5,
    reviewCount: 476,
    tagline: "Steel-framed task chair with no-nonsense durability.",
    description:
      "Ferro is built for the floors that never stop moving — receptions, trading desks, training rooms. A powder-coated steel frame and heavy-duty mechanism outlast the average replacement cycle by years, while a slim profile keeps rows and clusters feeling open.",
    swatch: "#374151",
    colors: [
      { name: "Onyx", hex: "#1C1C1E" },
      { name: "Slate", hex: "#374151" },
      { name: "Sand", hex: "#B5A99A" },
    ],
    badges: ["Steel frame", "Heavy duty", "Slim profile"],
    features: [
      {
        title: "Powder-coated steel frame",
        description:
          "A welded and powder-coated frame resists dents, scratches and the day-to-day knocks of high-traffic spaces.",
      },
      {
        title: "Heavy-duty synchro mechanism",
        description:
          "Rated to 150 kg with a multi-lock tilt, the mechanism is built to handle shift-pattern use without wearing.",
      },
      {
        title: "Slim-profile backrest",
        description:
          "A narrow, upright backrest lets chairs tuck neatly into rows and clusters without wasting aisle space.",
      },
    ],
    benefits: [
      {
        title: "Lower total cost of ownership",
        description:
          "A frame rated for twice the average lifecycle means fewer replacements and less downtime.",
      },
      {
        title: "Fits any floor plan",
        description:
          "Slim, upright profile works equally well in dense training rooms and open-plan aisles.",
      },
    ],
    materials: [
      "Welded powder-coated steel frame",
      "High-density moulded foam seat",
      "Woven fabric upholstery",
      "Steel-reinforced nylon base",
    ],
    dimensions: [
      { label: "Seat height", value: "43 – 52 cm" },
      { label: "Seat width", value: "48 cm" },
      { label: "Seat depth", value: "45 cm" },
      { label: "Back height", value: "52 cm" },
      { label: "Overall height", value: "98 – 107 cm" },
      { label: "Base diameter", value: "65 cm" },
    ],
    specifications: [
      { label: "Weight capacity", value: "150 kg" },
      { label: "Recline range", value: "95° – 115°" },
      { label: "Tilt mechanism", value: "Multi-lock synchro" },
      { label: "Gas lift", value: "Class 4, certified" },
      { label: "Armrests", value: "Fixed or 2D optional" },
      { label: "Chair weight", value: "13.2 kg" },
    ],
    usage:
      "Set seat height so your knees sit at 90° and feet rest flat. For training-room use, the multi-lock tilt can be set upright to keep rows consistent.",
    warranty: "8-year limited warranty on frame; 5 years on mechanism.",
    care: [
      "Wipe the frame with a dry cloth to prevent surface moisture.",
      "Spot-clean fabric with mild soap and cool water, then blot dry.",
    ],
    faqs: [
      {
        question: "Is Ferro suitable for 24-hour use environments?",
        answer:
          "Yes. The steel frame and Class-4 gas lift are rated for continuous multi-shift use, making Ferro a common choice for contact centres and control rooms.",
      },
      {
        question: "Can armrests be added after purchase?",
        answer:
          "Optional 2D armrests are available as an add-on and fit the existing arm-mount sockets on the frame.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "2.2 MB" },
      { label: "Assembly manual", type: "manual", size: "880 KB" },
      { label: "Warranty terms", type: "warranty", size: "200 KB" },
    ],
    relatedSlugs: ["mesh-task-pro", "zenpro", "glide-ergo"],
  },
  {
    name: "Altura",
    slug: "altura",
    category: "office-chairs",
    price: 36999,
    compareAtPrice: 44999,
    rating: 4.9,
    reviewCount: 195,
    tagline: "Single-motor sit-stand desk with whisper-smooth lift.",
    description:
      "Altura brings height-adjustable working to individual desks without the complexity of a full dual-motor setup. A single precision motor lifts up to 80 kg smoothly and quietly, with a slim digital handset storing three personalised height presets. The bamboo-composite top is harder than solid oak and friendlier to the planet.",
    swatch: "#7A6B55",
    colors: [
      { name: "Bamboo", hex: "#C8A96E" },
      { name: "Slate Grey", hex: "#4A4A4A" },
      { name: "White", hex: "#EDEAE3" },
    ],
    badges: ["Single motor", "3 presets", "Bamboo top"],
    features: [
      {
        title: "Single precision motor",
        description:
          "A brushless motor runs below 42 dB — quieter than a library — while lifting at 35mm per second.",
      },
      {
        title: "Slim digital handset",
        description:
          "A compact handset with an LED height readout stores three presets and a sedentary reminder timer.",
      },
      {
        title: "Bamboo-composite top",
        description:
          "Strand-woven bamboo is harder than most hardwoods, resists surface scratches and is FSC-certified.",
      },
    ],
    benefits: [
      {
        title: "Moves with your day",
        description:
          "Three presets mean you switch between sitting, standing and collaboration height with one tap.",
      },
      {
        title: "A top that takes the punishment",
        description:
          "Bamboo composite is harder and more scratch-resistant than standard melamine tops.",
      },
    ],
    materials: [
      "Strand-woven bamboo composite top",
      "Powder-coated steel frame",
      "Single brushless motor",
      "Integrated cable tray",
    ],
    dimensions: [
      { label: "Top size", value: "140 × 70 cm" },
      { label: "Height range", value: "65 – 128 cm" },
      { label: "Lift speed", value: "35 mm / sec" },
      { label: "Top thickness", value: "22 mm" },
    ],
    specifications: [
      { label: "Load capacity", value: "80 kg" },
      { label: "Motor", value: "Single brushless" },
      { label: "Presets", value: "3 programmable" },
      { label: "Noise level", value: "< 42 dB" },
      { label: "Reminder timer", value: "Integrated, adjustable" },
      { label: "Cable tray", value: "Integrated, under-desk" },
    ],
    usage:
      "Programme your sitting preset first, then raise to your standing height and save that second. Set the reminder timer to prompt you every 45 – 60 minutes to switch.",
    warranty: "8-year limited warranty on frame and motor.",
    care: [
      "Wipe the bamboo top with a dry or lightly damp cloth — avoid standing water.",
      "Keep the motor housing clear of debris.",
    ],
    faqs: [
      {
        question: "How is Altura different from Orbit?",
        answer:
          "Altura uses a single motor and is optimised for individual use up to 80 kg, making it lighter and more affordable. Orbit's dual motors support 120 kg and suit heavier multi-monitor setups.",
      },
      {
        question: "Is bamboo as durable as wood?",
        answer:
          "Strand-woven bamboo is harder than most hardwoods by Janka rating, so it resists scratches and dents better than oak or walnut veneer.",
      },
    ],
    downloads: [
      { label: "Product brochure", type: "brochure", size: "3.3 MB" },
      { label: "Assembly manual", type: "manual", size: "1.4 MB" },
      { label: "Warranty terms", type: "warranty", size: "220 KB" },
    ],
    relatedSlugs: ["orbit-standing-desk", "jupiter", "webstar"],
    featured: true,
    isNew: true,
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getRelated = (slugs: string[]) =>
  slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

const FEATURED_SLUGS = ["zenpro", "webstar", "ferro", "altura", "jupiter"];
export const FEATURED = FEATURED_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

/**
 * Map of slug → public image path.
 * Add an entry here whenever a real product photo is available.
 */
export const PRODUCT_IMAGES: Record<string, string> = {
  zenpro:   "/images/products/chairs/zenpro.webp",
  jupiter:  "/images/products/chairs/Jupiter.webp",
  webstar:  "/images/products/chairs/webstar.webp",
  ferro:    "/images/products/chairs/ferro.webp",
  altura:   "/images/products/chairs/altura.webp",
};

/**
 * Map of slug → multiple public image paths, in display order.
 * When a slug appears here the product gallery shows these as switchable
 * views with thumbnails; otherwise it falls back to PRODUCT_IMAGES.
 */
export const PRODUCT_GALLERIES: Record<string, string[]> = {
  /* Product shots first, then the feature panels.
     Note: spaces in the filenames are URL-encoded (%20) — "Front  Perspective"
     genuinely has two spaces. Renaming these to kebab-case would be safer. */
  zenpro: [
    "/images/products/chairs/Zenpro/Front.webp",
    "/images/products/chairs/Zenpro/Front%20%20Perspective.webp",
    "/images/products/chairs/Zenpro/Side.webp",
    "/images/products/chairs/Zenpro/Rear%20Perspective.webp",
    "/images/products/chairs/Zenpro/Rear.webp",
    "/images/products/chairs/Zenpro/1.webp",
    "/images/products/chairs/Zenpro/2.webp",
    "/images/products/chairs/Zenpro/3.webp",
    "/images/products/chairs/Zenpro/4.webp",
    "/images/products/chairs/Zenpro/5.webp",
  ],
};

/** Every photo for a product, richest source first. */
export const galleryFor = (slug: string): string[] =>
  PRODUCT_GALLERIES[slug] ?? (PRODUCT_IMAGES[slug] ? [PRODUCT_IMAGES[slug]] : []);

/** Products belonging to a category, photographed ones first. */
export const productsByCategory = (slug: string) =>
  PRODUCTS.filter((p) => p.category === slug).sort(
    (a, b) => Number(Boolean(PRODUCT_IMAGES[b.slug])) - Number(Boolean(PRODUCT_IMAGES[a.slug]))
  );

/**
 * Explicit artwork for a subcategory, keyed `categorySlug:Subcategory name`.
 * Used by the products mega menu so each tile shows a deliberate shot rather
 * than whichever product happens to sort first.
 */
export const SUBCATEGORY_IMAGES: Record<string, string> = {
  "office-chairs:Executive Series": "/images/products/chairs/zenpro.webp",
  "office-chairs:Leather Series": "/images/products/chairs/webstar.webp",
  "office-chairs:Leatherette Series": "/images/products/chairs/ferro.webp",
};

/**
 * TEMPORARY: stand-in shots for categories without photography yet.
 * Cycled by tile position so the menu never falls back to a generated render.
 * Remove once real artwork lands in SUBCATEGORY_IMAGES.
 */
export const PLACEHOLDER_IMAGES: string[] = [
  "/images/products/chairs/zenpro.webp",
  "/images/products/chairs/webstar.webp",
  "/images/products/chairs/ferro.webp",
];
