"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Sparkles,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { DisplayText } from "@/components/global/display-text";
import { motion } from "framer-motion";
import { type Dispatch, type SetStateAction } from "react";

interface EmptyRoomsStateProps {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

export function EmptyRoomsState({ setShowDialog }: EmptyRoomsStateProps) {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Interviews",
      description: "Practice with intelligent AI that adapts to your responses",
    },
    {
      icon: TrendingUp,
      title: "Real-time Feedback",
      description:
        "Get instant feedback on your performance and areas to improve",
    },
    {
      icon: Users,
      title: "Multiple Interview Types",
      description: "Technical, behavioral, and industry-specific questions",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Main Illustration */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#009758]/20 to-[#009758]/5 rounded-2xl flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#009758]/10 to-transparent rounded-2xl" />
            <MessageSquare className="w-16 h-16 text-[#009758]" />

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#009758]/20 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-[#009758]" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#009758]/30 rounded-full"
            />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DisplayText className="text-3xl mb-4 text-center">
            Ready to start practicing?
          </DisplayText>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Create your first interview practice room to practice and get a j∗b.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <Card className="h-full border-border/50 hover:border-[#009758]/30 transition-colors">
                <CardContent className="p-4 text-center">
                  <feature.icon className="w-8 h-8 text-[#009758] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
