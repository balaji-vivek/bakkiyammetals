import { motion } from "framer-motion";
import {
  BadgeIndianRupee,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

const trustBadges = [
  { label: "Quality Products", icon: ShieldCheck },
  { label: "Affordable Prices", icon: BadgeIndianRupee },
  { label: "Trusted Store", icon: Store },
  { label: "Fast Delivery", icon: Truck },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  return (
    <section className="hero-premium" aria-label="Bakkiyam Metal Mart hero">
      <div className="hero-premium__overlay" />

      <motion.div
        className="hero-premium__inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-premium__content">
          <motion.div className="hero-premium__eyebrow" variants={itemVariants}>
            <Sparkles size={18} aria-hidden="true" />
            Bakkiyam Metal Mart
          </motion.div>

          <motion.h1 className="hero-premium__title" variants={itemVariants}>
            Premium <span>Kitchenware</span> & Household{" "}
            <span>Essentials</span>
          </motion.h1>

          <motion.p className="hero-premium__subtitle" variants={itemVariants}>
            <span>Quality</span> stainless steel vessels, pressure cookers,
            water bottles, storage containers and home essentials for every
            family.
          </motion.p>

          <motion.div className="hero-premium__actions" variants={itemVariants}>
            <a className="hero-premium__button hero-premium__button--primary" href="#products">
              <ShoppingBag size={20} aria-hidden="true" />
              Shop Now
            </a>
            <a
              className="hero-premium__button hero-premium__button--secondary"
              href="https://wa.me/message/QU3D6U7D35VSH1"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        <motion.div className="hero-premium__badges" variants={containerVariants}>
          {trustBadges.map(({ label, icon: Icon }) => (
            <motion.div className="hero-premium__badge" key={label} variants={itemVariants}>
              <span className="hero-premium__badge-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
