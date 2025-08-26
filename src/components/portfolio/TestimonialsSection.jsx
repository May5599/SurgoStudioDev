// components/TestimonialsSection.jsx
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[#FBF7F5] py-32 px-6 text-[#0f0761] text-center flex flex-col items-center"
    >
      

      <div className="rounded-3xl overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.2)] w-full max-w-6xl border-4 border-[#0f0761]/1000 transform transition-transform duration-500 hover:scale-105 hover:shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
        <img
          src="/testplace.mp4"
          alt="Surgo Client Testimonials"
          className="w-full h-auto"
        />
      </div>

      <p className="mt-12 text-xl md:text-2xl text-black/70 max-w-2xl font-medium leading-relaxed">
        Real voices. Real stories. Real impact.<br />
        Our clients say it best and they all say:
        <span className="ml-2 font-bold text-green-400">We love Surgo!</span>
      </p>
    </section>
  );
}
