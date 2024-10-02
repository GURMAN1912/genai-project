import React, { useState } from "react";
import HeroBanner from "../components/home/HeroBanner";
import MentalHealthIssues from "../components/home/MentalHealthIssues";
import { motion } from "framer-motion";
export default function HomePage() {
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="bg-[#fef4ee] "
    >
      <HeroBanner />
      <MentalHealthIssues />
    </motion.div>
  );
}
