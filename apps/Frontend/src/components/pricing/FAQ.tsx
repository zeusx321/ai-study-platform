"use client"

import { useState } from "react"
import { ChevronDown, CircleHelp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { pricingFaqs } from "./pricing-data"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative z-10 px-4 pt-20 sm:px-6">
      <div className="mx-auto max-w-215">
        <div className="mb-8 text-center">
          <h2 className="text-[30px] font-extrabold leading-tight text-text-primary md:text-[38px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-text-secondary">
            Everything you need to know before choosing your plan.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {pricingFaqs.map((faq, index) => {
            const isOpen = openIndex === index
            const contentId = `pricing-faq-${index}`
            const buttonId = `${contentId}-trigger`

            return (
              <div
                className={cn(
                  "overflow-hidden rounded-md border border-white/10 bg-white/1.5 transition-colors duration-200",
                  isOpen && "border-primary/80 bg-primary/3.5 shadow-[0_0_30px_rgba(115,51,210,0.12)]",
                )}
                key={faq.question}
              >
                <button
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-5 py-5 text-left text-[14px] font-semibold text-text-primary outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/70"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#7e37ff] text-white">
                    <CircleHelp className="size-4" aria-hidden="true" />
                  </span>
                  <span className={cn("flex-1", isOpen && "text-[#df8cff]")}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-text-primary transition-transform duration-200",
                      isOpen && "rotate-180 text-[#df8cff]",
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      aria-labelledby={buttonId}
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      role="region"
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <p className="px-14 pb-6 text-[14px] leading-7 text-text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
