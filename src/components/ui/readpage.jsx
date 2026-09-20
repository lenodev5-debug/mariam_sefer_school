import React from "react";

// Tailwind doesn't have all the bespoke keyframes / gradients we need,
// so we inject the small amount of custom CSS that can't be expressed
// with utility classes. Everything structural stays in the JSX.
const styles = `
  .scene {
    perspective: 1200px;
  }

  .book {
    --w: 113px;
    --h: 170px;
    --dur: 4s;
    --cover: #873e23;
    --paper: #faf5ec;
    --paper-back: #f6f0e4;
    --endpaper: #e8e0d0;
    --ink: rgba(160, 130, 90, 0.25);
    --foil: rgba(180, 210, 255, 0.55);

    position: relative;
    width: 260px;
    height: 180px;
    transform-style: preserve-3d;
    animation: bob var(--dur) ease-in-out infinite;
  }

  @keyframes bob {
    0%, 100% { transform: rotateX(28deg) rotateY(-10deg); }
    50%      { transform: rotateX(28deg) rotateY(-10deg) translateY(-6px); }
  }

  .stack {
    position: absolute;
    top: 5px;
    left: 50%;
    width: var(--w);
    height: var(--h);
    transform: translateZ(10px);
    transform-style: preserve-3d;
  }

  /* leaves: back cover, 6 pages, front cover */
  .stack > * {
    position: absolute;
    inset: 0;
    transform-origin: left center;
    transform-style: preserve-3d;
    will-change: transform;
    animation: var(--dur) ease-in-out infinite;
  }

  .stack > *::before,
  .stack > *::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0 3px 3px 0;
    backface-visibility: hidden;
    background-repeat: no-repeat;
    transform: translateZ(var(--z, 0px));
  }

  .stack > *::after {
    transform: translateZ(var(--z, 0px)) rotateY(180deg);
  }

  /* ruled paper drawn with 4 gradient layers */
  .page::before,
  .page::after,
  .cover::after {
    background-image:
      repeating-linear-gradient(var(--ink) 0 2px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 10px, var(--ink) 0 12px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 20px, var(--ink) 0 22px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 30px, var(--ink) 0 32px, #0000 0 40px);
    background-position: 10px 12px;
    background-size:
      93px var(--rows),
      70px var(--rows),
      57px var(--rows),
      86px var(--rows);
  }

  .page::before {
    --rows: 110px;
    background-color: var(--paper);
    box-shadow: inset -10px 0 10px -8px rgba(0, 0, 0, 0.16);
  }

  .page::after {
    --rows: 90px;
    background-color: var(--paper-back);
    box-shadow: inset 10px 0 10px -8px rgba(0, 0, 0, 0.16);
  }

  .cover::before {
    background-color: var(--cover);
    background-image:
      radial-gradient(
        circle at 56px 46px,
        #0000 0 15px,
        rgba(180, 210, 255, 0.2) 15px 16px,
        #0000 16px 22px,
        rgba(180, 210, 255, 0.35) 22px 24px,
        #0000 24px
      ),
      linear-gradient(var(--foil) 0 0),
      linear-gradient(var(--foil) 0 0);
    background-position: 0 0, 12px 122px, 12px 132px;
    background-size: auto, 71px 3px, 49px 3px;
    border-radius: 0 4px 4px 0;
    box-shadow: inset -14px 0 12px -8px rgba(0, 0, 0, 0.35);
  }

  .cover::after {
    --ink: rgba(160, 130, 90, 0.2);
    --rows: 50px;
    background-color: var(--endpaper);
    border-radius: 0 4px 4px 0;
    box-shadow: inset 12px 0 10px -8px rgba(0, 0, 0, 0.13);
  }

  .back-cover::before {
    background-color: var(--cover);
    border-radius: 0 4px 4px 0;
    box-shadow:
      inset -4px 0 10px rgba(0, 0, 0, 0.3),
      inset -18px 0 12px -8px rgba(0, 0, 0, 0.25);
  }

  .back-cover::after { display: none; }

  /* depth: real translateZ replaces z-index */
  .cover      { --z: 0px;    animation-name: f0; }
  .page:nth-child(2) { --z: -0.3px; animation-name: f1; }
  .page:nth-child(3) { --z: -0.6px; animation-name: f2; }
  .page:nth-child(4) { --z: -0.9px; animation-name: f3; }
  .page:nth-child(5) { --z: -1.2px; animation-name: f4; }
  .page:nth-child(6) { --z: -1.5px; animation-name: f5; }
  .page:nth-child(7) { --z: -1.8px; animation-name: f6; }
  .back-cover { --z: -2.1px; }

  @keyframes f0 {
    0%        { transform: rotateY(0deg); }
    5%        { transform: rotateY(-8deg); }
    25%, 60%  { transform: rotateY(-178deg); }
    70%       { transform: rotateY(-172deg); }
    85%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f1 {
    0%, 2%    { transform: rotateY(0deg); }
    7%        { transform: rotateY(-8deg); }
    27%, 58%  { transform: rotateY(-178deg); }
    68%       { transform: rotateY(-172deg); }
    83%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f2 {
    0%, 4%    { transform: rotateY(0deg); }
    9%        { transform: rotateY(-8deg); }
    29%, 56%  { transform: rotateY(-178deg); }
    66%       { transform: rotateY(-172deg); }
    81%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f3 {
    0%, 6%    { transform: rotateY(0deg); }
    11%       { transform: rotateY(-8deg); }
    31%, 54%  { transform: rotateY(-178deg); }
    64%       { transform: rotateY(-172deg); }
    79%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f4 {
    0%, 8%    { transform: rotateY(0deg); }
    13%       { transform: rotateY(-8deg); }
    33%, 52%  { transform: rotateY(-178deg); }
    62%       { transform: rotateY(-172deg); }
    77%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f5 {
    0%, 10%   { transform: rotateY(0deg); }
    15%       { transform: rotateY(-8deg); }
    35%, 50%  { transform: rotateY(-178deg); }
    60%       { transform: rotateY(-172deg); }
    75%, 100% { transform: rotateY(0deg); }
  }
  @keyframes f6 {
    0%, 12%   { transform: rotateY(0deg); }
    17%       { transform: rotateY(-8deg); }
    37%, 48%  { transform: rotateY(-178deg); }
    58%       { transform: rotateY(-172deg); }
    73%, 100% { transform: rotateY(0deg); }
  }

  @keyframes lp {
    from { opacity: 0.4; }
    to   { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .book,
    .stack > *,
    .label { animation: none; }
    .book  { transform: rotateX(28deg) rotateY(-10deg); }
    .label { opacity: 0.8; }
  }
`;

const BookLoader = () => {
  return (
    <>
      <style>{styles}</style>

      <div
        role="status"
        aria-label="Loading"
        className="flex flex-col items-center justify-center gap-10 pt-20 pb-12"
      >
        <div className="book" aria-hidden="true">
          <div className="stack">
            <div className="back-cover" />
            <div className="page" />
            <div className="page" />
            <div className="page" />
            <div className="page" />
            <div className="page" />
            <div className="page" />
            <div className="cover" />
          </div>
        </div>

        <p className="label m-0 text-sm font-semibold uppercase tracking-[0.07em] text-neutral-400 [animation:lp_1.5s_ease-in-out_infinite_alternate]">
          Loading
        </p>
      </div>
    </>
  );
};

export default BookLoader;