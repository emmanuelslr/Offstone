'use client';

export default function ConversationBanner() {
  return (
<div className="w-full bg-[#F7B096] py-5 flex justify-start items-center">
      <div className="flex flex-row items-center gap-8 text-black text-[1.18rem] md:text-[1.32rem] font-extralight pl-32">
        <span>Restons en lien :</span>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-3 group"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-black font-extralight">LinkedIn</span>
          <svg
            className="w-9 h-9 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}
