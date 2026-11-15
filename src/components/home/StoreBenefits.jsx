
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on eligible orders.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your shopping experience is safe with us.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here whenever you need help.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Simple and convenient checkout.",
  },
];

function StoreBenefits() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="bg-white border border-gray-100 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon size={24} />
              </div>

              <h3 className="font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>

              <p className="text-sm text-gray-500">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StoreBenefits;
