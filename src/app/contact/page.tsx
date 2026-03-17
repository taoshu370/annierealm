"use client";

import { useState, FormEvent } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import RevealOnScroll from "@/components/RevealOnScroll";

const faqItems = [
  {
    question: "Do you take on freelance projects?",
    answer:
      "I'm open to collaborations where we care about craft, iteration, and player experience. Please include timelines and what kind of help you need in your message.",
  },
  {
    question: "Can I use your games or assets?",
    answer:
      "Please reach out to discuss licensing. I'm generally open to educational use and collaborations.",
  },
  {
    question: "Are you available for game jam collaborations?",
    answer:
      "Yes — game jams are where I've had some of my most productive learning. Reach out with the jam details and I'll let you know my availability.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailtoLink = `mailto:robotaoshu@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder-text-muted/50 transition-all duration-200 focus:border-accent-purple/60 focus:outline-none focus:ring-1 focus:ring-accent-purple/30";

  return (
    <>
      {/* Page header */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-3">
              Contact
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-text mb-4">
              Let&apos;s talk.
            </h1>
            <p className="text-text-muted max-w-md leading-relaxed">
              Got a project, game idea, or collaboration in mind? Send a message.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <RevealOnScroll direction="left" className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-text-muted mb-2 font-mono uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-text-muted mb-2 font-mono uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-text-muted mb-2 font-mono uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-text-muted mb-2 font-mono uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project, timeline, and what kind of help you're looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Opening mail client..." : "Send Message →"}
              </Button>
            </form>
          </RevealOnScroll>

          {/* Sidebar */}
          <RevealOnScroll direction="right">
            <div className="space-y-6">
              <div className="glass rounded-xl border border-border p-6">
                <p className="font-mono text-sm text-accent-cyan tracking-widest uppercase mb-4">
                  Direct Contact
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Email</p>
                    <a
                      href="mailto:robotaoshu@gmail.com"
                      className="text-sm text-accent-cyan hover:text-accent-cyan/80 transition-colors"
                    >
                      robotaoshu@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Response time</p>
                    <p className="text-sm text-text">Usually within a few days</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl border border-border p-6">
                <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-3">
                  Best for
                </p>
                <ul className="space-y-2">
                  {[
                    "Collaborations & projects",
                    "Game jam partnerships",
                    "Licensing & asset use",
                    "Just saying hi",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1 h-1 rounded-full bg-accent-purple/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border bg-void">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <p className="font-mono text-sm text-accent-purple tracking-widest uppercase mb-5">
              FAQ
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-text mb-8">
              Common Questions
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
