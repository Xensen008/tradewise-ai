import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, Brain, LineChart, Lock, Settings, TrendingUp } from "lucide-react";
import Image from "next/image";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 animate-fade-up">
            Smart Investing Starts Here
            <span className="block text-emerald-600">AI-Powered Insights for Retail Investors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-100">
            Navigate the markets with confidence using real-time data, AI-powered advisory, and risk management tools designed for modern investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up animation-delay-200">
            <AuthDialog>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </AuthDialog>
            <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Powerful Features for Smart Investing
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to make informed investment decisions, powered by cutting-edge AI technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<LineChart className="h-10 w-10 text-emerald-600" />}
              title="AI-Based Market Insights"
              description="Get real-time stock trends and AI-powered recommendations to stay ahead of market movements."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-emerald-600" />}
              title="Personalized Advisory"
              description="Receive customized investment advice based on your goals and risk appetite."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-emerald-600" />}
              title="Interactive Analytics"
              description="Visualize market data with smart charts and comprehensive trend analysis tools."
            />
            <FeatureCard
              icon={<Settings className="h-10 w-10 text-emerald-600" />}
              title="API Integration"
              description="Access live stock prices and stay compliant with automated regulatory tracking."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Start Investing in Three Simple Steps
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Begin your investment journey with our easy-to-follow process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Sign Up & Set Goals"
              description="Create your account and define your investment objectives and risk tolerance."
            />
            <StepCard
              number="02"
              title="Analyze & Discover"
              description="Get AI-powered insights and discover promising investment opportunities."
            />
            <StepCard
              number="03"
              title="Invest & Optimize"
              description="Make data-driven investment decisions and optimize your portfolio performance."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of satisfied investors who trust Tradewise AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I grew my portfolio by 30% using Tradewise AI's recommendations!"
              author="Sarah K."
              role="Retail Investor"
            />
            <TestimonialCard
              quote="The AI insights have completely transformed how I approach investing."
              author="Michael R."
              role="Day Trader"
            />
            <TestimonialCard
              quote="Finally, a platform that makes sense of market data for retail investors."
              author="David L."
              role="Long-term Investor"
            />
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Lock className="h-5 w-5 text-emerald-600" />
              <span>Bank-grade Security</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Real-time Data</span>
            </div>
            <div className="text-gray-600">GDPR Compliant</div>
            <div className="text-gray-600">SSL Encrypted</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already using Tradewise AI to make smarter investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AuthDialog>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </AuthDialog>
            <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-white border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="mb-4 bg-emerald-50 w-16 h-16 rounded-lg flex items-center justify-center">{icon}</div>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <Card className="bg-white border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute -top-4 -left-4 text-8xl font-bold text-emerald-100">{number}</div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="bg-white border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardDescription className="text-gray-600 text-lg italic">"{quote}"</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-emerald-600">{author}</p>
        <p className="text-gray-600">{role}</p>
      </CardContent>
    </Card>
  );
}
