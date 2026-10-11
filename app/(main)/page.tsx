import Link from "next/link";
import {
  Sparkles,
  ClipboardList,
  Bell,
  DollarSign,
  MessageCircle,
  Car,
  History,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const miniFeatures = [
  {
    icon: ClipboardList,
    title: "Smart Tracking",
    description: "Log all maintenance records",
  },
  {
    icon: Bell,
    title: "AI Reminders",
    description: "Never miss a service",
  },
  {
    icon: DollarSign,
    title: "Cost Analysis",
    description: "Track your expenses",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Maintenance Tracking",
    description:
      "Log all services, repairs, and maintenance with detailed records including cost, mileage, and dates.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Never miss an oil change or service again with intelligent reminders based on time and mileage.",
  },
  {
    icon: DollarSign,
    title: "Cost Analysis",
    description:
      "Track your maintenance expenses over time and identify patterns to budget effectively.",
  },
  {
    icon: MessageCircle,
    title: "AI Chat Assistant",
    description:
      "Get instant answers to your car maintenance questions with our intelligent chat assistant.",
  },
  {
    icon: Car,
    title: "Multiple Vehicles",
    description:
      "Manage maintenance for all your vehicles in one place with detailed histories.",
  },
  {
    icon: History,
    title: "Service History",
    description:
      "Complete timeline view of all maintenance activities for every vehicle you own.",
  },
];

const steps = [
  {
    number: 1,
    title: "Add Your Vehicle",
    description: "Enter your car's details - make, model, year, and color.",
  },
  {
    number: 2,
    title: "Log Maintenance",
    description:
      "Record oil changes, tire rotations, repairs, and more with all the details.",
  },
  {
    number: 3,
    title: "Stay Informed",
    description:
      "Get AI-powered insights, reminders, and chat assistance for optimal car care.",
  },
];

const ctaButton = cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base");
const outlineCtaButton = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 px-8 text-base",
);

export default function Home() {
  return (
    <>
      <section className="bg-linear-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <div className="grid min-h-150 grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  AI-Powered Car Care
                </span>
              </div>
              <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                Your Smart Car
                <span className="block text-primary">Doctor Assistant</span>
              </h1>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Track maintenance, get AI-powered recommendations, and keep
                your vehicle running smoothly with intelligent insights and
                reminders.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link href="/cars" className={ctaButton}>
                  Get Started
                </Link>
                <Link href="#features" className={outlineCtaButton}>
                  Learn More
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
                {miniFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-150 overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 to-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Car
                  className="h-32 w-32 text-primary/40"
                  strokeWidth={1}
                />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to maintain your vehicle in one intelligent
              platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="space-y-4 rounded-xl border bg-background p-6"
              >
                <div className="w-fit rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto space-y-6 px-4 text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-2xl text-xl opacity-90">
            Join thousands of car owners who are already using Car Doctor to
            maintain their vehicles with confidence.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-12 px-8 text-base",
              )}
            >
              Get Started Free
            </Link>
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-primary-foreground bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10",
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
