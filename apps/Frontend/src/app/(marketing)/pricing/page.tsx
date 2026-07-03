import Footer from "@/components/shared/Footer"
import {
  ComparisonTable,
  FAQ,
  PricingContent,
  TrustSection,
} from "@/components/pricing"
import Header from "@/components/shared/Header"

const page = () => {
  return (
    <div className="relative pt-17.5 z-0">
      <Header />
      <main className="relative overflow-hidden bg-background">
        <PricingContent />
        <ComparisonTable />
        <FAQ />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}

export default page
