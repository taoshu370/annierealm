"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-lg border transition-all duration-200 ${
              isOpen ? "border-accent-purple/40 bg-accent-purple/5" : "border-border bg-surface"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text">{item.question}</span>
              <span
                className={`ml-4 flex-shrink-0 text-lg transition-colors duration-200 ${
                  isOpen ? "text-accent-purple" : "text-text-muted"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
