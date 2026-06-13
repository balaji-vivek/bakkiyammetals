import React from "react";
import { CheckCircle, Truck, RotateCcw, Award } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Certified household products made from best materials"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "FREE shipping on orders over ₹100"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      icon: CheckCircle,
      title: "Secure Checkout",
      description: "100% secure payments with SSL encryption"
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="section-header">
        <h2>Why Choose Us?</h2>
        <p>Trusted by thousands of households across India</p>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <div key={idx} className="reason-card">
              <div className="reason-icon">
                <Icon size={40} color="#2563eb" />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
