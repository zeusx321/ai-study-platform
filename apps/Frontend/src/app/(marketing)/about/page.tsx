import Image from "next/image";
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'

const AboutPage = () => {
   const cards = [
    {
      icon: "/images/mindset.svg",
      title: "Smart",
      desc: "Organize tasks efficiently with intelligent workflow.",
    },
    {
      icon: "/images/clock.svg",
      title: "Fast",
      desc: "Save time and boost productivity quickly.",
    },
    {
      icon: "/images/security.svg",
      title: "Secure",
      desc: "Keep your data safe with advanced protection.",
    },
  ]

  return (
    <div className="relative pt-[70px] z-0">
        <Header />
        <section className="bg-black px-6 py-24 text-white">
  <div className="relative mx-auto max-w-7xl rounded-[30px] bg-gradient-to-r from-[#07122a] to-[#0b1335] p-10">

    {/* Badge */}
    <div className="mb-8 inline-flex rounded-full border border-purple-500/30 px-4 py-2 text-sm text-gray-300">
      WHO WE ARE
    </div>
    <div className="absolute top-[170px] right-[120px] w-[420px] h-[420px] rounded-full bg-purple-500/70 blur-[140px] z-0"></div>
    <div className="relative z-10 grid items-center gap-6 md:grid-cols-2">

    {/* Top Section */}
      <div>
        <h1 className="text-7xl font-bold md:text-[92px]">
          About <span className="text-purple-500">Us</span>
        </h1>

        <p className="mt-6 max-w-lg text-xl leading-relaxed text-gray-300">
          We are a smart productivity platform designed to help
          individuals and teams stay organized, focused, and
          efficient in achieving their goals.
        </p>
      </div>
<div className="relative flex justify-center items-center translate-x-6 translate-y-5">
  <Image
    src="/images/planet.png"
    alt="Planet"
    width={370}
    height={370}
    className="relative z-10 object-contain"
  />
</div>    
</div>

    {/* Cards */}
<div className="relative z-10 mt-20 grid gap-6 md:grid-cols-3">
  {cards.map((card, index) => (
    <div
      key={index}
      className="flex flex-col rounded-3xl border border-purple-500/20 bg-[#0b1120]/80 p-8 min-h-[220px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
    >
      <Image
        src={card.icon}
        alt={card.title}
        width={28}
        height={28}
      />

      <h3 className="mt-4 text-2xl font-semibold">
        {card.title}
      </h3>

      <p className="mt-2 leading-relaxed text-gray-400">
        {card.desc}
      </p>
    </div>
  ))}
</div>
</div>
</section>
        <Footer />
      
    </div>
  )
}

export default AboutPage