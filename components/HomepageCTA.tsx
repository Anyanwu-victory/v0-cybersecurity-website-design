import React from 'react'
import Link from 'next/link'; 

const HomepageCTA = () => {
  return (
    <>
      {/* Featured CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-[80px]">
        <div className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#0b0e14]/20 p-12 text-center border border-white/10">
          <div className="flex flex-col text-white   lg:px-20 mx-auto w-full items-center justify-between max-w-screen-xl">
            <div className="w-full mb-6 text-center md:mb-0">
              <h2 className="text-sm md:text-md font-bold mb-4">
                {" "}
                How can we help?
              </h2>
              <p className="text-2xl font-bold lg:text-4xl ">
                {" "}
                Let’s get to know each other and see how we can build a smarter, safer digital experience together.
               
              </p>
            </div>

            <div className="w-full inline-flex justify-center  mt-8 md:mt-12">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg
                   bg-[#E11D2E] md:px-8 px-4 py-4 text-md font-semibold text-white transition-all hover:bg-[#E11D2E]/90 
                   hover:neon-glow-red sm:w-auto"
              >

                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomepageCTA;