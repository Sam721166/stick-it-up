import React, { useId } from "react";
import type { StickerProps } from "../types";
import { usePeel } from "../utils/usePeel";

export const CrownSticker: React.FC<StickerProps> = ({
  size = 120,
  width,
  height,
  peel = false,
  className = "",
  style,
  ...props
}) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Crown Sticker"
      role="img"
      {...props}
    >
      <g filter={`url(#filter0_d_${id})`}>
<g fill="white" stroke="white" strokeWidth="16" strokeLinejoin="round">
<path d="M38 152 L50 150 C68 171 82 198 94 198 C106 198 108 180 110 166 L122 166 C138 187 151 201 164 190 C181 176 189 125 193 98 L207 98 C211 125 219 176 236 190 C249 201 262 187 278 166 L290 166 C292 180 294 198 306 198 C318 198 332 171 350 150 L362 152 L320 282 Q319 288 313 288 Q200 274 87 288 Q81 288 80 282 Z"/>
<circle cx="44" cy="140" r="19" />
<circle cx="116" cy="154" r="16" />
<circle cx="200" cy="82" r="22" />
<circle cx="284" cy="154" r="16" />
<circle cx="356" cy="140" r="19" />
<path d="M87 300 Q200 286 313 300 Q321 301 321 309 L321 314 Q321 323 312 322 Q200 309 88 322 Q79 323 79 314 L79 309 Q79 301 87 300 Z"/>
</g>
</g>
<g fill={`url(#paint0_linear_${id})`}>
<path d="M38 152 L50 150 C68 171 82 198 94 198 C106 198 108 180 110 166 L122 166 C138 187 151 201 164 190 C181 176 189 125 193 98 L207 98 C211 125 219 176 236 190 C249 201 262 187 278 166 L290 166 C292 180 294 198 306 198 C318 198 332 171 350 150 L362 152 L320 282 Q319 288 313 288 Q200 274 87 288 Q81 288 80 282 Z"/>
<circle cx="44" cy="140" r="19" />
<circle cx="116" cy="154" r="16" />
<circle cx="200" cy="82" r="22" />
<circle cx="284" cy="154" r="16" />
<circle cx="356" cy="140" r="19" />
</g>
<path d="M87 300 Q200 286 313 300 Q321 301 321 309 L321 314 Q321 323 312 322 Q200 309 88 322 Q79 323 79 314 L79 309 Q79 301 87 300 Z" fill="#F7B824"/>
<defs>
<filter id={`filter0_d_${id}`} x="4" y="42" width="392" height="312" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="hardAlpha"/>
<feOffset dy="5"/>
<feGaussianBlur stdDeviation="4"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.32549 0 0 0 0 0.262745 0 0 0 0 0.14902 0 0 0 0.18 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<linearGradient id={`paint0_linear_${id}`} x1="200" y1="62" x2="200" y2="288" gradientUnits="userSpaceOnUse">
<stop stopColor="#FFE991"/>
<stop offset="0.3" stopColor="#FFD84D"/>
<stop offset="0.82" stopColor="#FFD84D"/>
<stop offset="1" stopColor="#FFC52E"/>
</linearGradient>
</defs>
    </svg>
  );
};
