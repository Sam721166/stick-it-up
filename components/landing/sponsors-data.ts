export interface SponsorApp {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  logo: string;
  bg?: string;
  border?: string;
  isOpenSlot?: boolean;
  price?: string;
}

export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/Sam721166";

export const SPONSOR_APPS: SponsorApp[] = [
  {
    id: "openslot",
    name: "Your product here",
    subtitle: "Open slot",
    description: "Feature your product to developers and designers. One-time payment, lifetime visibility.",
    url: GITHUB_SPONSORS_URL,
    logo: "",
    isOpenSlot: true,
    price: "$49.99 lifetime",
  },
  {
    id: "purecanvas",
    name: "PureCanvas",
    subtitle: "Sponsored",
    description: "Local-first vector design app built for speed and privacy on the web.",
    url: "https://www.purecanvas.app/",
    logo: "https://www.purecanvas.app/favicon.svg",
    bg: "#ffffff",
    border: "#e4e4e7",
  },
  {
    id: "clonvo",
    name: "Clonvo",
    subtitle: "Sponsored",
    description: "The AI gateway & API routing layer for autonomous agents.",
    url: "https://clonvo.com/",
    logo: "/sponsors/clonvo-favicon.svg",
    bg: "#12110f",
    border: "#27272a",
  },
  {
    id: "reactbits",
    name: "React Bits",
    subtitle: "Sponsored",
    description: "Animated React components & open source interactive library.",
    url: "https://reactbits.dev/",
    logo: "/sponsors/react-bits-favicon.svg",
    bg: "#09090b",
    border: "#27272a",
  },
  {
    id: "brickyard",
    name: "Brickyard",
    subtitle: "Sponsored",
    description: "Build Roblox games with AI: world builder & script assistant.",
    url: "https://brickyard.ch/",
    logo: "/sponsors/brickyard-favicon.svg",
    bg: "#09090b",
    border: "#27272a",
  },
];
