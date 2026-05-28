import { Coins, Wand2, MountainSnow, LayoutTemplate, Sparkles, Video } from 'lucide-react';

export const testimonialsData = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Game Director @ NeonSpin Studios",
    image: "https://picsum.photos/100/100?random=601",
    stars: 5,
    review: "Absolutely incredible work. The slot art delivered was beyond what we imagined — every symbol felt alive and the characters had real personality. Our player engagement jumped 40% after the rebrand.",
  },
  {
    id: 2,
    name: "Sofia Reyes",
    role: "CEO @ LuckyCasino Group",
    image: "https://picsum.photos/100/100?random=602",
    stars: 5,
    review: "Working with this artist was a dream. They understood our game's theme immediately and brought it to life with stunning visual storytelling. The turnaround time was remarkable.",
  },
  {
    id: 3,
    name: "James Thornton",
    role: "Art Director @ GoldReel Games",
    image: "https://picsum.photos/100/100?random=603",
    stars: 5,
    review: "The most talented slot game artist I've ever worked with. Their attention to lighting, color theory, and player psychology shows in every piece. Absolutely hire them.",
  },
  {
    id: 4,
    name: "Aiko Yamamoto",
    role: "Product Lead @ SlotVault",
    image: "https://picsum.photos/100/100?random=604",
    stars: 5,
    review: "Premium quality, professional communication, and always on deadline. The background art for our Japanese-themed slot set a new benchmark for our studio.",
  },
  {
    id: 5,
    name: "David Osei",
    role: "Founder @ PixelBet",
    image: "https://picsum.photos/100/100?random=605",
    stars: 5,
    review: "From concept to delivery, the experience was seamless. The wild and scatter symbols created were unique, beautiful, and perfectly optimized for our game engine.",
  },
];

export const servicesData = [
  { id: 1, icon: <Coins size={28} color="#f59e0b" />, title: "Slot Symbols & Icons", description: "Wild, scatter, bonus, and high-value symbols crafted with premium quality for slot games.", price: "From $150/set" },
  { id: 2, icon: <Wand2 size={28} color="#1769FF" />, title: "Character Design", description: "Memorable, thematic game characters with animation-ready layered files.", price: "From $300/char" },
  { id: 3, icon: <MountainSnow size={28} color="#06b6d4" />, title: "Background Art", description: "Full scene background artwork that immerses players in your game's world.", price: "From $400/bg" },
  { id: 4, icon: <LayoutTemplate size={28} color="#8b5cf6" />, title: "UI & Frame Design", description: "Complete slot UI kits — HUD, menus, buttons, win screens, and more.", price: "From $500/kit" },
  { id: 5, icon: <Sparkles size={28} color="#10b981" />, title: "Full Game Skin", description: "End-to-end complete slot game art package — all assets in one go.", price: "Custom Quote" },
  { id: 6, icon: <Video size={28} color="#ef4444" />, title: "Animation Ready Assets", description: "Layered, animation-ready PSD/AI files for seamless engine integration.", price: "From $200/asset" },
];
