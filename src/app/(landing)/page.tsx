"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Github,
  Heart,
  Search,
  Send,
  Calendar,
  Workflow,
  Coffee,
  Check,
} from "lucide-react";
import Link from "next/link";
import { DisplayText } from "@/components/global/display-text";
import { motion } from "motion/react";
import { AnimatedOrbs } from "@/components/landing/animated-orbs";
import { DeviceMockup } from "@/components/landing/device-mockup";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <main className="scroll-smooth min-w-screen min-h-screen bg-gradient-to-br from-n-950 via-n-900 to-n-950 relative isolate overflow-hidden">
      <AnimatedOrbs />

      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-[#009758] rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-1 h-1 bg-[#009758] rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Hero Section */}
      <section className="relative py-28 mt-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 bg-[#009758]/10 text-[#009758] border-[#009758]/20"
              >
                <Github className="w-4 h-4 mr-2" />
                Open Source & Free Forever
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center mb-4"
            >
              <DisplayText className="flex items-center h-full relative italic text-7xl md:text-9xl font-bold tracking-tight mb-6 ">
                <span className="text-neutral-50 z-20">re:</span>
                <span className="leading-loose relative flex items-center justify-center -ml-4 md:-ml-6 not-italic bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  j&nbsp;&nbsp;
                  <span className="z-20 text-white text-[125px] md:text-[200px] h-32 md:h-64 absolute top-10 right-8 md:top-14 md:right-16 skew-6 inline-flex items-center justify-center">
                    *
                  </span>
                  bs
                </span>
              </DisplayText>
            </motion.div>

            <motion.p
              className="text-lg md:text-2xl text-n-300 mb-4 p-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Open-source, AI-powered, All-in-one job seeking tool.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full cursor-pointer"
                as="button"
                className="px-0 py-0 w-full h-full cursor-pointer flex items-center justify-center "
                onClick={() => {
                  if (isSignedIn) {
                    router.push("/dashboard");
                  } else {
                    router.push("/sign-in");
                  }
                }}
              >
                {isSignedIn ? (
                  <div className="px-8 py-3 flex items-center justify-center">
                    <DisplayText className="text-lg">
                      Go To Dashboard
                    </DisplayText>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                ) : (
                  <div className="px-8 py-3 flex items-center justify-center">
                    <DisplayText className="text-lg">
                      Start for free
                    </DisplayText>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </HoverBorderGradient>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DisplayText className="text-primary text-4xl md:text-5xl font-bold mb-4">
              Defeat the allegations. Find a j∗b.
            </DisplayText>
            <p className="text-lg text-n-300 max-w-2xl mx-auto">
              Find. Apply. Practice. Repeat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                title: "Smart Job Discovery",
                description:
                  "AI scrapes the web to find jobs matching your profile and preferences",
                delay: 0.1,
              },
              {
                icon: Send,
                title: "Easy Apply",
                description:
                  "Automatically applies to relevant positions with personalized cover letters",
                delay: 0.2,
              },
              {
                icon: Workflow,
                title: "Customized Interview",
                description:
                  "Generates a personalized interview practice based on job descriptions",
                delay: 0.3,
              },
              {
                icon: Calendar,
                title: "Practice Room Creation",
                description:
                  "Creates dedicated interview practice sessions for each application",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-n-900/50 bg-background/60 backdrop-blur-xl border-n-800 hover:border-[#009758]/30 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-[#009758]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <feature.icon className="w-6 h-6 text-[#009758]" />
                    </div>
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-n-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        className="py-20 bg-gradient-to-b from-transparent to-n-900/30"
        id="product"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <DisplayText className="flex gap-x-2 text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Practice Makes
                <span className="block text-primary italic text-6xl">
                  Perfect
                </span>
              </DisplayText>

              <p className="text-lg text-n-300 mb-8">
                Practice interviews with AI agents that understand the context
                of your job applications. Get real-time feedback on your
                performance and improve your skills.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Unlimited practice sessions",
                  "Real-time performance feedback",
                  "Multiple interview scenarios",
                  "Completely free and open source",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#009758] flex-shrink-0" />
                    <span className="text-n-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Simple Device Mockup */}
              <DeviceMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative" id="pricing">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DisplayText className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple <span className="text-primary">Pricing</span>
            </DisplayText>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Free forever, with an optional way to support development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-[#009758]/30 transition-all duration-300 h-full relative">
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="w-16 h-16 bg-[#009758]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Heart className="w-8 h-8 text-[#009758]" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">
                    Free Forever
                  </CardTitle>
                  <div className="text-4xl font-bold text-white mb-2">
                    $0
                    <span className="text-lg font-normal text-zinc-400">
                      /month
                    </span>
                  </div>
                  <CardDescription className="text-zinc-400">
                    Everything you need, completely free
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between items-center">
                  <div className="px-6 pb-8">
                    <ul className="space-y-4 mb-8">
                      {[
                        "Unlimited AI interview practice",
                        "Smart job discovery & auto-apply",
                        "Custom interview preparation",
                        "Video & voice feedback",
                        "Open source & community driven",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[#009758] flex-shrink-0" />
                          <span className="text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => redirect("/sign-in")}
                      className="w-full bg-[#009758] hover:bg-[#007A46] text-white"
                    >
                      <DisplayText className="text-lg">
                        Get Started Free
                      </DisplayText>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="flex flex-col justify-between items-center bg-gradient-to-b from-[#009758]/5 to-zinc-900/50 border-[#009758]/30 hover:border-[#009758]/50 transition-all duration-300 h-full relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#009758] text-white px-4 py-1">
                    Support Development
                  </Badge>
                </div>
                <CardHeader className="w-full text-center pb-8 pt-8">
                  <div className="w-16 h-16 bg-[#009758]/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Coffee className="w-8 h-8 text-[#009758]" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">
                    Pro Supporter
                  </CardTitle>
                  <div className="text-4xl font-bold text-white mb-2">
                    $5
                    <span className="text-lg font-normal text-zinc-400">
                      /month
                    </span>
                  </div>
                  <CardDescription className="text-zinc-400">
                    Same features + support the developer
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between items-center">
                  <div className="px-6 pb-8">
                    <ul className="space-y-4 mb-8">
                      {[
                        "Everything in Free Forever",
                        "Help fund new features",
                        "Priority community support",
                        "Special supporter badge",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[#009758] flex-shrink-0" />
                          <span className="text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="text-lg w-full bg-gradient-to-r from-[#009758] to-[#007A46] hover:from-[#007A46] hover:to-[#005A35] text-white">
                      <DisplayText>Support Development</DisplayText>
                      <Heart className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-n-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <DisplayText className="text-2xl font-bold text-white mb-2">
                re:j∗bs
              </DisplayText>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/RyanDyson/rejobs"
                className="text-n-400 hover:text-[#009758] transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-n-800 text-center">
            <p className="text-n-400 text-sm">
              © 2025 Verflight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
