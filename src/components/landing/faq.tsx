"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqs = [
  {
    question: "How realistic are the AI interview agents?",
    answer:
      "Our AI agents are trained on thousands of real interview scenarios and can adapt their questioning style based on your responses. They provide realistic conversations that closely mimic actual interview experiences.",
  },
  {
    question: "Can I practice for specific companies or roles?",
    answer:
      "Yes! We have specialized scenarios for different industries, company sizes, and specific roles. You can practice for technical interviews, behavioral questions, case studies, and more.",
  },
  {
    question: "What kind of feedback will I receive?",
    answer:
      "You'll get detailed feedback on your speaking pace, clarity, content quality, and areas for improvement. Our AI analyzes your responses and provides actionable suggestions to enhance your performance.",
  },
  {
    question: "Is my practice data secure?",
    answer:
      "Absolutely. We use enterprise-grade security measures to protect your data. Your practice sessions are encrypted and stored securely, and we never share your information with third parties.",
  },
  {
    question: "Can I use re:interview for presentation practice?",
    answer:
      "Yes! Beyond interviews, you can practice presentations, sales pitches, public speaking, and any other scenarios that require confident communication skills.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer a free tier with basic practice sessions, and premium plans with advanced features like detailed analytics, industry-specific scenarios, and unlimited practice time.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
      <CardHeader className="pb-0">
        <Button
          variant="ghost"
          className="w-full text-left justify-between p-0 h-auto hover:bg-transparent"
          onClick={onToggle}
        >
          <CardTitle className="text-white text-lg font-semibold pr-4">
            {question}
          </CardTitle>
          {isOpen ? (
            <Minus className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          ) : (
            <Plus className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          )}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-4">
          <p className="text-zinc-300 leading-relaxed">{answer}</p>
        </CardContent>
      )}
    </Card>
  );
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions
            about re:interview.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
