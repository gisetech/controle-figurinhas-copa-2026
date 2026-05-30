import React from "react";
import { StickerState, Country } from "../types";
import { Check } from "lucide-react";
import { FLAGS } from "../initialData";

interface StickerGridProps {
  country: Country;
  stickers: StickerState[];
  onToggleSticker: (id: string) => void;
  onIncrementRepeated: (id: string, amount: number) => void;
  onMarkAllCountry: (code: string, owned: boolean) => void;
}

// Nice color style mapper for country headers based on codes to look premium and visual
const getCountryHeaderStyles = (code: string): string => {
  switch (code) {
    case "BRA":
      return "from-green-700 via-emerald-800 to-yellow-600 text-yellow-100";
    case "ARG":
      return "from-sky-700 via-slate-800 to-indigo-900 text-sky-100";
    case "GER":
      return "from-zinc-900 via-red-950 to-amber-700 text-amber-100";
    case "MEX":
      return "from-green-800 via-emerald-950 to-red-800 text-green-100";
    case "ESP":
      return "from-red-800 via-rose-950 to-yellow-600 text-yellow-104 text-white";
    case "FRA":
      return "from-blue-800 via-indigo-950 to-red-800 text-white";
    case "POR":
      return "from-emerald-800 via-teal-950 to-red-800 text-emerald-100";
    case "ENG":
      return "from-indigo-955 from-indigo-900 via-slate-800 to-red-705 text-white";
    case "NED":
      return "from-orange-700 via-amber-800 to-red-700 text-orange-100";
    case "JPN":
      return "from-neutral-900 via-slate-800 to-rose-900 text-rose-100";
    case "SWE":
      return "from-blue-800 via-indigo-900 to-yellow-650 text-yellow-100";
    case "BEL":
      return "from-red-850 from-red-800 via-amber-900 to-yellow-600 text-amber-105 text-white";
    case "URU":
      return "from-sky-700 via-teal-900 to-blue-800 text-sky-105 text-white";
    case "USA":
      return "from-blue-900 via-slate-850 to-red-750 text-white";
    case "CC":
      return "from-yellow-700 via-amber-600 to-yellow-500 text-slate-950";
    case "FWC_INI":
    case "FWC_HIST":
      return "from-cyan-950 to-indigo-950 text-cyan-200";
    default:
      return "from-slate-900 to-slate-800 text-slate-100";
  }
};

export const StickerGrid: React.FC<StickerGridProps> = ({
  country,
  stickers,
  onToggleSticker,
  onIncrementRepeated,
  onMarkAllCountry,
}) => {
  const countryStickers = stickers.filter((s) => s.code === country.code);
  const ownedCount = countryStickers.filter((s) => s.owned).length;
  const totalCount = countryStickers.length;
  const percent = totalCount > 0 ? (ownedCount / totalCount) * 100 : 0;

  // Swatch colors from the user prompt reference
  const paletteColors = ["#FFE5B4", "#DD969C", "#C8A2C8", "#E0B0FF"];

  const isCompleted = ownedCount === totalCount && totalCount > 0;

  return (
    <div className={`rounded-3xl overflow-hidden shadow-sm transition-all duration-300 border ${
      isCompleted 
        ? "bg-[#FCFBEF]/40 border-amber-300 shadow-md shadow-amber-100/30 ring-1 ring-amber-350/10" 
        : "bg-white border-purple-100 shadow-purple-50 hover:shadow-md hover:border-purple-200"
    }`}>
      {/* Country Header banner */}
      <div className={`px-5 py-3.5 flex items-center justify-between border-b ${
        isCompleted ? "bg-amber-50/40 border-amber-200/55" : "bg-[#FAF8FC] border-purple-100/60"
      }`}>
        <div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none select-none">
                {FLAGS[country.code] || "🌍"}
              </span>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-slate-800">
                {country.name}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                isCompleted 
                  ? "bg-amber-100 text-amber-800 border border-amber-200/50" 
                  : "bg-purple-50 text-[#C8A2C8] border border-purple-100/50"
              }`}>
                {country.code === "FWC_INI" ? "FWC INÍCIO" : country.code === "FWC_HIST" ? "FWC HISTÓRIA" : country.code}
              </span>
              {isCompleted && (
                <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider animate-pulse flex items-center gap-0.5 border border-emerald-200/50">
                  ★ COMPLETO
                </span>
              )}
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 font-bold">
            {ownedCount} de {totalCount} Figuras ({percent.toFixed(0)}%)
          </p>
        </div>
        
        {/* Toggle all actions menu */}
        <div className="flex gap-1">
          <button
            onClick={() => onMarkAllCountry(country.code, true)}
            className="px-2 py-0.5 bg-white border border-purple-200 hover:bg-purple-50 text-slate-700 rounded text-[9px] uppercase tracking-wider font-extrabold transition-colors cursor-pointer shadow-xs"
            title="Marcar todas as figurinhas deste país"
          >
            ✓ Tudo
          </button>
          <button
            onClick={() => onMarkAllCountry(country.code, false)}
            className="px-2 py-0.5 bg-white border border-purple-200 hover:bg-rose-50 text-slate-700 rounded text-[9px] uppercase tracking-wider font-extrabold transition-colors cursor-pointer shadow-xs"
            title="Limpar figurinhas deste país"
          >
            ✕ Limpar
          </button>
        </div>
      </div>

      {/* Grid of Slots */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-5 gap-2.5">
          {countryStickers.map((sticker) => {
            const swatchColor = paletteColors[sticker.number % paletteColors.length];
            return (
              <div
                key={sticker.id}
                className={`relative flex flex-col justify-between items-center rounded-2xl transition-all duration-300 aspect-[3/4.5] p-1 select-none overflow-hidden border ${
                  sticker.owned
                    ? "bg-white border-purple-100 shadow-sm hover:scale-[1.04]"
                    : "bg-[#FAFAFC] border-2 border-dashed border-slate-200 hover:border-[#C8A2C8]/60 hover:bg-purple-50/10 cursor-pointer"
                }`}
              >
                {/* Visual Swatch Color Block */}
                <div
                  className="w-full rounded-xl flex-1 flex flex-col justify-center items-center transition-all cursor-pointer relative"
                  style={{ backgroundColor: sticker.owned ? swatchColor : "transparent" }}
                  onClick={() => onToggleSticker(sticker.id)}
                  title={sticker.owned ? "Clique para desmarcar" : "Clique para marcar como adquirido"}
                >
                  <span className={`text-center font-display leading-none transition-all ${
                    sticker.owned 
                      ? "text-3xl sm:text-4xl font-black text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.18)]" 
                      : "text-xl font-bold text-slate-350"
                    }`}
                  >
                    {sticker.number}
                  </span>
                  
                  {/* Faint context indicator inside non-owned */}
                  {!sticker.owned && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] uppercase tracking-widest font-bold text-[#C8A2C8]">Obter</span>
                    </div>
                  )}
                </div>

                {/* Bottom Swatch Information White Bar */}
                <div className="w-full bg-white pt-1 pb-0.5 px-0.5 flex flex-col items-center">
                  <span className={`text-[8px] font-mono tracking-tight font-black leading-none uppercase ${
                    sticker.owned ? "text-slate-700" : "text-slate-400"
                  }`}>
                    #{sticker.code === "FWC_INI" ? "FWC" : sticker.code === "FWC_HIST" ? "HIST" : sticker.code}-{sticker.number}
                  </span>

                  {/* Duplicate controllers or state details */}
                  {sticker.owned ? (
                    <div className="w-full flex items-center justify-between mt-1 pt-1 border-t border-purple-50">
                      {/* Decrement Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onIncrementRepeated(sticker.id, -1);
                        }}
                        className="w-4 h-4 rounded bg-purple-50 hover:bg-purple-100 text-slate-700 flex items-center justify-center font-mono font-extrabold text-[10px] cursor-pointer"
                        title="Diminuir repetidas"
                        disabled={sticker.repeatedCount === 0}
                      >
                        -
                      </button>

                      {/* Repetidas Badge */}
                      <span 
                        className={`font-mono font-bold px-1 rounded-[4px] text-[8px] leading-tight ${
                          sticker.repeatedCount > 0 
                            ? "bg-[#C8A2C8] text-white font-extrabold" 
                            : "text-slate-450 text-[7px]"
                        }`}
                        title={`${sticker.repeatedCount} repetidas`}
                      >
                        {sticker.repeatedCount > 0 ? `r${sticker.repeatedCount}` : "0"}
                      </span>

                      {/* Increment Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onIncrementRepeated(sticker.id, 1);
                        }}
                        className="w-4 h-4 rounded bg-purple-50 hover:bg-purple-100 text-slate-700 flex items-center justify-center font-mono font-extrabold text-[10px] cursor-pointer"
                        title="Adicionar repetida"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span className="text-[7px] text-slate-400 font-extrabold uppercase tracking-wide leading-none mt-1">
                      Falta
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
