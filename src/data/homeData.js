// NEW FILE: src/data/homeData.js
// VITE_API_URL set ho to GET {VITE_API_URL}/api/home call hoti hai, warna MOCK use hota hai.

export const MOCK = {
  total: 118420,
  brands: [
    ["Toyota", 33120], ["Nissan", 18240], ["Honda", 15010], ["Mazda", 7020],
    ["Suzuki", 9210], ["Subaru", 5730], ["Mitsubishi", 4480], ["Daihatsu", 6120],
    ["Isuzu", 3190], ["Lexus", 2840], ["Mercedes-Benz", 2190], ["BMW", 1950],
    ["Volkswagen", 1380], ["Audi", 1090], ["Hino", 1810], ["Mitsubishi Fuso", 1640],
  ].map(([name, count]) => ({ name, count })),
  models: {
    Toyota: ["Corolla", "Land Cruiser Prado", "Hilux", "Vitz", "Hiace"],
    Nissan: ["Note", "X-Trail", "Caravan", "Serena"],
    Honda: ["Fit", "Vezel", "Freed", "N-BOX"],
    Mazda: ["Demio", "CX-5", "Axela"],
    Suzuki: ["Swift", "Jimny", "Every"],
    Subaru: ["Forester", "Impreza"],
    Mitsubishi: ["Outlander", "Delica", "Pajero"],
  },
  bodies: [
    ["Sedan", 21900], ["SUV", 26100], ["Hatchback", 19500], ["Wagon", 6000],
    ["Minivan", 14400], ["Pickup", 4500], ["Truck", 8800], ["Coupe", 1800],
    ["Kei Car", 11000], ["Bus", 1200], ["Van", 8900], ["Convertible", 400],
  ].map(([name, count]) => ({ name, count })),
  prices: [
    { label: "Under $2,000", min: 0, max: 2000, count: 12100 },
    { label: "$2,000–$4,000", min: 2000, max: 4000, count: 20800 },
    { label: "$4,000–$6,000", min: 4000, max: 6000, count: 19100 },
    { label: "$6,000–$9,000", min: 6000, max: 9000, count: 17000 },
    { label: "$9,000–$15,000", min: 9000, max: 15000, count: 13700 },
    { label: "$15,000+", min: 15000, max: 1e9, count: 8900 },
  ],
  countries: ["Kenya", "Tanzania", "Zambia", "Uganda", "Ghana", "New Zealand", "Pakistan", "Jamaica", "Bangladesh", "Mozambique", "Sri Lanka", "Guyana"],
  promos: [
    { id: "weekly", title: "WEEKLY SPECIALS", sub: "Up to 30% off, refreshed every Monday", count: 1240, tone: "red" },
    { id: "trucks", title: "TRUCKS", sub: "Dump, flatbed, pickup", count: 8800, tone: "dark" },
    { id: "suv", title: "SUV & 4WD", sub: "Land Cruiser, Prado, Hilux", count: 14200, tone: "deep" },
  ],
  vehicles: [
    { id: 1, title: "Toyota Land Cruiser Prado TX", make: "Toyota", type: "SUV", year: 2018, km: 62000, price: 21800, tags: ["weekly", "suv"] },
    { id: 2, title: "Toyota Hilux Double Cab", make: "Toyota", type: "Pickup", year: 2017, km: 88000, price: 15900, tags: ["trucks", "new"] },
    { id: 3, title: "Nissan Note e-Power", make: "Nissan", type: "Hatchback", year: 2019, km: 41000, price: 6900, tags: ["weekly", "new"] },
    { id: 4, title: "Honda Vezel Hybrid Z", make: "Honda", type: "SUV", year: 2018, km: 55000, price: 9800, tags: ["suv", "new"] },
    { id: 5, title: "Suzuki Jimny Sierra", make: "Suzuki", type: "SUV", year: 2020, km: 27000, price: 14500, tags: ["weekly", "suv"] },
    { id: 6, title: "Isuzu Elf Dump Truck", make: "Isuzu", type: "Truck", year: 2014, km: 143000, price: 11200, tags: ["trucks"] },
    { id: 7, title: "Toyota Hiace Van Super GL", make: "Toyota", type: "Van", year: 2016, km: 97000, price: 12400, tags: ["weekly", "trucks"] },
    { id: 8, title: "Mazda CX-5 XD", make: "Mazda", type: "SUV", year: 2017, km: 71000, price: 8700, tags: ["suv", "new"] },
    { id: 9, title: "Suzuki Every Van", make: "Suzuki", type: "Kei Car", year: 2015, km: 64000, price: 3200, tags: ["weekly"] },
    { id: 10, title: "Mitsubishi Delica D:5", make: "Mitsubishi", type: "Minivan", year: 2016, km: 82000, price: 10900, tags: ["suv", "new"] },
  ],
};

export async function fetchHome() {
  try {
    const base = import.meta.env?.VITE_API_URL;
    if (!base) throw new Error("no api");
    const r = await fetch(`${base}/api/home`);
    if (!r.ok) throw new Error(String(r.status));
    return await r.json();
  } catch {
    await new Promise((res) => setTimeout(res, 400)); // loading state demo
    return MOCK;
  }
}