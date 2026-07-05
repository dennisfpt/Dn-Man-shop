import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+84 865 156 242",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@dnman.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 9:00 PM",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Message can't be empty";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // No backend wired up yet — this simply simulates a successful send.
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest2 text-stone mb-3">
          Get In Touch
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold">Contact Us</h1>
        <p className="text-stone text-sm mt-3 max-w-md mx-auto">
          Questions about an order, sizing, or anything else? We'd love to
          hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14">
        {/* Contact info */}
        <div className="space-y-8">
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <div className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-ink" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone">{label}</p>
                <p className="text-sm text-ink font-medium mt-1">{value}</p>
              </div>
            </div>
          ))}

          <div className="aspect-video bg-fog overflow-hidden mt-10">
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
              alt="Ho Chi Minh City street"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact form */}
        <div>
          {submitted && (
            <div className="flex items-center gap-2 bg-ink/[0.04] border border-ink/10 px-4 py-3 mb-6 text-sm text-ink">
              <CheckCircle2 size={16} />
              Thanks for reaching out — we'll get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-wide text-stone">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Your name"
                  className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
                    errors.name ? "border-red-500" : "border-ink/20 focus:border-ink"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-stone">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                  className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none placeholder:text-stone/60 ${
                    errors.email ? "border-red-500" : "border-ink/20 focus:border-ink"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-stone">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={handleChange("subject")}
                placeholder="Order inquiry, sizing question, etc."
                className="w-full mt-1.5 bg-transparent border-b border-ink/20 focus:border-ink py-2 text-sm outline-none placeholder:text-stone/60"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-stone">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Tell us how we can help..."
                className={`w-full mt-1.5 bg-transparent border-b py-2 text-sm outline-none resize-none placeholder:text-stone/60 ${
                  errors.message ? "border-red-500" : "border-ink/20 focus:border-ink"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-600 mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-ink text-cream px-10 py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
