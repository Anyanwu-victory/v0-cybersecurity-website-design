import React from 'react'
import Link from 'next/link'; 

const HomepageCTA = () => {
  return (
    <>
         {/* Featured CTA */}
          <section className="container mx-auto px-4 py-24 lg:px-[80px]">
            <div className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#0b0e14]/20 p-12 text-center border border-white/10">
              <div className="flex flex-col text-white   px-20 mx-auto w-full items-center justify-between max-w-screen-xl">
                <div className="w-full mb-6 text-center md:text-left md:mb-0">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {" "}
                    RedTrace-D Sentinel
                  </h2>
                  <p className="font-light md:text-xl">
                    {" "}
                    Every digital footprint leaves a trace. We help you control that
                    trace—by building smarter, safer, and more resilient digital
                    experiences
                  </p>
                </div>
    
                <div className="w-full flex justify-center md:justify-end mt-8 md:mt-12">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-2 rounded-lg
                   bg-[#E11D2E] md:px-8 px-4 py-4 text-lg font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:neon-glow-red sm:w-auto"
                  >
                    Work with RTDS
                  </Link>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default HomepageCTA;