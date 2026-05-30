import React from "react";
import { StickerState, Group } from "../types";
import { CheckCircle2, AlertCircle, Percent, Layers } from "lucide-react";

interface StatsDashboardProps {
  stickers: StickerState[];
  groups: Group[];
  activeGroup: string;
  setActiveGroup: (id: string) => void;
  onResetToDefault: () => void;
  onClearAll: () => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  stickers,
  groups,
  activeGroup,
  setActiveGroup,
  onResetToDefault,
  onClearAll,
}) => {
  // Global stats calculation
  const totalStickers = stickers.length;
  const ownedStickers = stickers.filter((s) => s.owned).length;
  const missingStickers = totalStickers - ownedStickers;
  const completionPercent = totalStickers > 0 ? (ownedStickers / totalStickers) * 100 : 0;
  
  const totalRepeated = stickers.reduce((acc, curr) => acc + (curr.owned ? curr.repeatedCount : 0), 0);

  // Group-specific stats helper
  const getGroupStats = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return { total: 0, owned: 0, percent: 0 };
    
    // Get all country codes for this group
    const codes = group.countries.map((c) => c.code);
    const groupStickers = stickers.filter((s) => codes.includes(s.code));
    
    const total = groupStickers.length;
    const owned = groupStickers.filter((s) => s.owned).length;
    const percent = total > 0 ? (owned / total) * 100 : 0;
    
    return { total, owned, percent };
  };

  return (
    <div className="bg-white border border-purple-100 rounded-3xl p-6 lg:p-8 text-slate-800 shadow-md shadow-purple-100/30 mb-8 space-y-6">
      {/* Title & Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-50 pb-5">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <span className="text-2xl">🏆</span> 
            <span className="bg-gradient-to-r from-[#C8A2C8] via-[#DD969C] to-[#FFE5B4] bg-clip-text text-transparent uppercase font-display font-bold">
              Álbum de Figurinhas
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">
            Season 2026 Digital Album • Coleção A a L & Especiais
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            id="btn-restaurar-dados"
            onClick={onResetToDefault}
            className="px-4 py-2 text-xs font-bold bg-[#FFE5B4]/30 hover:bg-[#FFE5B4]/55 text-slate-700 rounded-xl transition-all border border-[#FFE5B4] shadow-sm cursor-pointer flex items-center gap-2"
            title="Restaura os dados originais fornecidos por você"
          >
            🔄 Resetar para Dados Originais
          </button>
          <button
            id="btn-limpar-album"
            onClick={onClearAll}
            className="px-4 py-2 text-xs font-bold bg-rose-50 hover:bg-rose-100/80 text-[#DD969C] rounded-xl transition-all border border-[#DD969C]/40 cursor-pointer flex items-center gap-2"
            title="Esvazia todas as figurinhas marcadas"
          >
            🗑️ Zerar Álbum
          </button>
        </div>
      </div>

      {/* Main Quantitative Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Owned */}
        <div className="bg-[#FAF8FC] border border-purple-100/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#DD969C]/10 text-[#DD969C] rounded-xl hidden sm:block">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Tenho (Obtidas)</div>
            <div className="text-2xl font-serif italic text-slate-800 mt-0.5 font-bold">
              {ownedStickers} <span className="text-xs text-slate-400 font-sans font-normal">/ {totalStickers}</span>
            </div>
          </div>
        </div>

        {/* Total Missing */}
        <div className="bg-[#FAF8FC] border border-purple-100/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#FFE5B4]/30 text-[#DD969C] rounded-xl hidden sm:block">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Faltam</div>
            <div className="text-2xl font-serif italic text-[#DD969C] mt-0.5 font-bold">
              {missingStickers} <span className="text-xs text-slate-400 font-sans font-normal">figuras</span>
            </div>
          </div>
        </div>

        {/* Completion % */}
        <div className="bg-[#FAF8FC] border border-purple-100/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#E0B0FF]/15 text-[#C8A2C8] rounded-xl hidden sm:block">
            <Percent className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Completado</div>
            <div className="text-2xl font-serif italic text-[#C8A2C8] mt-0.5 font-bold">
              {completionPercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Repetidas / Duplicates */}
        <div className="bg-[#FAF8FC] border border-purple-100/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#C8A2C8]/20 text-[#C8A2C8] rounded-xl hidden sm:block">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Repetidas</div>
            <div className="text-2xl font-serif italic text-[#C8A2C8] mt-0.5 font-bold">
              {totalRepeated} <span className="text-xs text-slate-400 font-sans font-normal">unidades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">Progresso do Álbum</span>
          <span className="font-mono text-slate-600">{ownedStickers} de {totalStickers} ({completionPercent.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
          <div
            className="bg-gradient-to-r from-[#FFE5B4] via-[#DD969C] via-[#C8A2C8] to-[#E0B0FF] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(200,162,200,0.3)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Tabs / Groups Grid Menu */}
      <div className="pt-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Grupos e Seções do Álbum (A a L)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
          {groups.map((g) => {
            const stats = getGroupStats(g.id);
            const isSelected = activeGroup === g.id;
            
            return (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`group flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#E0B0FF]/15 border-[#C8A2C8] text-slate-800 ring-1 ring-[#C8A2C8]/10 shadow-sm shadow-purple-50"
                    : "bg-white border-purple-100/75 hover:border-purple-200 text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase truncate">
                    {g.id === "especiais" ? "Especiais" : `Grupo ${g.id}`}
                  </span>
                  <span className={`text-[10px] font-medium font-mono ${isSelected ? "text-slate-700 font-semibold" : "text-slate-400 group-hover:text-slate-500"}`}>
                    {stats.owned}/{stats.total}
                  </span>
                </div>
                {/* Miniature sparkline progress */}
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isSelected ? "bg-gradient-to-r from-[#DD969C] to-[#E0B0FF]" : "bg-slate-350 bg-slate-300"
                    }`}
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </button>
            );
          })}
          
          {/* General Summary View Pseudo-Group Tab */}
          <button
            onClick={() => setActiveGroup("all_teams")}
            className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeGroup === "all_teams"
                ? "bg-[#E0B0FF]/15 border-[#C8A2C8] text-slate-850 font-semibold ring-1 ring-[#C8A2C8]/10 shadow-sm shadow-purple-50"
                : "bg-white border-purple-100/75 hover:border-purple-200 text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold uppercase truncate">
                Visão Completa
              </span>
              <span className="text-[10px] font-medium text-slate-450">
                📊
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  activeGroup === "all_teams" ? "bg-gradient-to-r from-[#FFE5B4] via-[#DD969C] to-[#E0B0FF]" : "bg-slate-300"
                }`}
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
