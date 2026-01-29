import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { WhyUs } from '@/components/landing/WhyUs'
import { Team } from '@/components/landing/Team'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyUs />
        <Team />
      </main>
      <Footer />
    </>
  )
}
