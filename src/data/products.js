// Mock product catalog for Dn Man
// Images use Unsplash source placeholders — swap with real product photography later.

export const CATEGORIES = ["New Arrivals", "Clothing", "Accessories"];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const products = [
  {
    id: "dn-001",
    name: "Oversized Wool Coat",
    category: "Clothing",
    price: 189,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Camel"],
    description:
      "A structured wool-blend overcoat cut with a relaxed, oversized silhouette. Fully lined, featuring horn-effect buttons and a notched lapel. Designed to layer effortlessly over knitwear.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80",
    ],
  },
  {
    id: "dn-002",
    name: "Merino Crewneck Sweater",
    category: "Clothing",
    price: 79,
    isNew: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Stone"],
    description:
      "Fine-gauge merino wool sweater with a clean crew neckline. Breathable, temperature-regulating, and soft against the skin — a modern wardrobe staple.",
    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
      "https://images.unsplash.com/photo-1608228088998-57828365d486?w=800&q=80",
    ],
  },
  {
    id: "dn-003",
    name: "Tailored Cotton Trousers",
    category: "Clothing",
    price: 95,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy"],
    description:
      "Slim-tapered trousers in a heavyweight cotton twill. Finished with a clean waistband and hidden hook closure for a sharp, minimal front.",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80",
    ],
  },
  {
    id: "dn-004",
    name: "Minimal Leather Sneakers",
    category: "Accessories",
    price: 149,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    description:
      "Full-grain leather low-top sneakers with a clean panel construction and a lightweight rubber sole. Understated, versatile, built to last.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
  },
  {
    id: "dn-005",
    name: "Structured Canvas Tote",
    category: "Accessories",
    price: 65,
    isNew: false,
    sizes: ["M"],
    colors: ["Black"],
    description:
      "Heavyweight canvas tote with a structured base and reinforced leather handles. Roomy enough for daily essentials, minimal enough for anywhere.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
    ],
  },
  {
    id: "dn-006",
    name: "Relaxed Fit Overshirt",
    category: "Clothing",
    price: 88,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Black"],
    description:
      "A brushed cotton overshirt designed to be worn open as a light layer or buttoned as a shirt. Boxy fit, dropped shoulders, patch pockets.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
  },
  {
    id: "dn-007",
    name: "Silver Chain Bracelet",
    category: "Accessories",
    price: 45,
    isNew: false,
    sizes: ["M"],
    colors: ["Silver"],
    description:
      "Solid sterling silver curb-chain bracelet with a lobster clasp closure. A refined, everyday accent piece.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    ],
  },
  {
    id: "dn-008",
    name: "Essential Crew Tee",
    category: "Clothing",
    price: 39,
    isNew: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Stone"],
    description:
      "Heavyweight 240gsm combed cotton tee with a boxy fit and ribbed crewneck. Garment-washed for a broken-in feel from day one.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    ],
  },
  {
    id: "dn-009",
    name: "Wool Blend Scarf",
    category: "Accessories",
    price: 55,
    isNew: true,
    sizes: ["M"],
    colors: ["Charcoal", "Camel"],
    description:
      "A generously sized wool-blend scarf with a soft brushed finish and fringed edges. Effortless warmth for cooler days.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80",
    ],
  },
  {
    id: "dn-010",
    name: "Slim Denim Jacket",
    category: "Clothing",
    price: 110,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Indigo", "Black"],
    description:
      "A classic trucker jacket reworked in a slim modern fit with a rigid raw denim. Built to soften and fade beautifully with wear.",
    images: [
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80",
    ],
  },
  {
    id: "dn-011",
    name: "Leather Card Holder",
    category: "Accessories",
    price: 35,
    isNew: false,
    sizes: ["M"],
    colors: ["Black", "Brown"],
    description:
      "Slim vegetable-tanned leather card holder with four card slots and a central cash pocket. Ages gracefully over time.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
  },
  {
    id: "dn-012",
    name: "Cotton Twill Chore Jacket",
    category: "Clothing",
    price: 98,
    isNew: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Stone"],
    description:
      "Utility-inspired chore jacket in a durable cotton twill. Triple stitched seams, chest pockets, and a boxy, unstructured fit.",
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);
