'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="Hero relative min-h-screen w-full flex justify-center overflow-hidden z-10">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 w-full h-screen xs:h-[110vh] sm:h-[120vh]">
        {/* Vidéo avec fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Backgrounds/ImageHero.png"
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.55) contrast(1.1)'
          }}
          onError={(e) => {
            // Fallback vers l'image si la vidéo échoue
            const video = e.target as HTMLVideoElement;
            if (video) {
              video.style.display = 'none';
              const fallback = document.getElementById('video-fallback');
              if (fallback) fallback.style.display = 'block';
            }
          }}
        >
          <source src="/videos/Official Hero Video.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback image */}
        <div
          id="video-fallback"
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/Backgrounds/ImageHero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.55) contrast(1.1)',
            display: 'none'
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 xs:from-black/60 xs:via-black/50 xs:to-black/80 sm:from-black/40 sm:via-black/30 sm:to-black/70"
          style={{ 
            mixBlendMode: 'multiply',
            zIndex: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center min-h-[calc(100vh-76px)] xs:min-h-[calc(100vh-84px)] sm:min-h-[calc(100vh-96px)] mt-16 xs:mt-18 sm:mt-20 lg:mt-24"
        >
          <div className="flex flex-col items-center justify-center flex-1 px-4">
            <h1 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] font-normal tracking-tighter leading-[1.1] sm:leading-none text-white text-center mx-auto max-w-6xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="block mb-2"
              >
                Investissez dans l&apos;immobilier,<br className="hidden xs:block" />
                <span className="xs:hidden"> </span>aux côtés de ceux qui l&apos;opèrent.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center mt-4 xs:mt-6 font-light tracking-wide mx-auto whitespace-normal max-w-4xl px-2"
            >
              Nous investissons dans chaque opération que nous structurons.<br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>Accédez-y désormais, à nos côtés.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="w-full flex justify-center mt-6 xs:mt-8 sm:mt-10 px-4"
            >
              <form
                className="flex flex-col sm:flex-row w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg bg-white/90 shadow-lg rounded-lg items-center px-2 xs:px-3 py-1 xs:py-1.5 sm:py-2"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="email"
                  id="hero-email"
                  name="hero-email"
                  placeholder="Entrez votre adresse mail"
                  className="w-full sm:w-auto flex-1 bg-transparent outline-none text-black placeholder:text-gray-500 px-2 xs:px-3 py-2 xs:py-2.5 text-xs xs:text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#F7B096] text-black border border-[#F7B096] rounded-lg font-medium transition hover:bg-[#222222] hover:text-white text-xs xs:text-sm whitespace-nowrap"
                  style={{ borderRadius: '0.5rem' }}
                >
                  Investissez à nos côtés
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
