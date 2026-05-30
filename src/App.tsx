import { useState, useEffect, useMemo } from "react";
import { StickerState } from "./types";
import { GROUPS, generateInitialStickers, FLAGS } from "./initialData";
import { StatsDashboard } from "./components/StatsDashboard";
import { StickerGrid } from "./components/StickerGrid";
import { SharePanel } from "./components/SharePanel";
import { Search, Heart } from "lucide-react";

export default function App() {
  // --- States ---
  const [stickers, setStickers] = useState<StickerState[]>([]);
  const [activeGroup, setActiveGroup] = useState<string>("A");
  const [activeCountryTab, setActiveCountryTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "missing" | "owned" | "repeated">("all");

  // Reset country tab when activeGroup changes
  useEffect(() => {
    setActiveCountryTab("all");
  }, [activeGroup]);

  // --- Initial Data Load ---
  useEffect(() => {
    const saved = localStorage.getItem("stickers_album_data_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStickers(parsed);
          return;
        }
      } catch (e) {
        console.error("Erro ao carregar dados salvos:", e);
      }
    }
    // Default fallback to preset if no data in localStorage
    const initial = generateInitialStickers();
    setStickers(initial);
    localStorage.setItem("stickers_album_data_v2", JSON.stringify(initial));
  }, []);

  // --- Helper: Save current state to localStorage ---
  const saveStickersState = (updated: StickerState[]) => {
    setStickers(updated);
    localStorage.setItem("stickers_album_data_v2", JSON.stringify(updated));
  };

  // --- Actions ---
  // 1. Toggle Owned State (Left Click / click sticker number)
  const handleToggleSticker = (id: string) => {
    const updated = stickers.map((s) => {
      if (s.id === id) {
        const nextOwned = !s.owned;
        return {
          ...s,
          owned: nextOwned,
          // If unowned, we reset the duplicates count
          repeatedCount: nextOwned ? s.repeatedCount : 0,
        };
      }
      return s;
    });
    saveStickersState(updated);
  };

  // 2. Increment Duplicate count (+ / - footer keys)
  const handleIncrementRepeated = (id: string, amount: number) => {
    const updated = stickers.map((s) => {
      if (s.id === id) {
        const nextCount = Math.max(0, s.repeatedCount + amount);
        return {
          ...s,
          repeatedCount: nextCount,
        };
      }
      return s;
    });
    saveStickersState(updated);
  };

  // 3. Mark entire country as owned or unowned (Quick actions)
  const handleMarkAllCountry = (code: string, owned: boolean) => {
    const updated = stickers.map((s) => {
      if (s.code === code) {
        return {
          ...s,
          owned: owned,
          repeatedCount: owned ? s.repeatedCount : 0,
        };
      }
      return s;
    });
    saveStickersState(updated);
  };

  // 4. Restore original prompt merged data
  const handleResetToDefault = () => {
    const confirmed = window.confirm(
      "Isso irá redefinir seu progresso para as figurinhas originais especificadas no seu e-mail / prompt inicial (com as marcações do grupo A ao L, FWC e CC). Deseja prosseguir?"
    );
    if (confirmed) {
      const initial = generateInitialStickers();
      saveStickersState(initial);
    }
  };

  // 5. Clear all stickers (Zerar álbum do zero)
  const handleClearAll = () => {
    const confirmed = window.confirm(
      "ATENÇÃO: Você tem certeza que deseja zerar TODAS as figurinhas do seu álbum e recomeçar do zero? Essa ação não pode ser desfeita!"
    );
    if (confirmed) {
      const cleared = stickers.map((s) => ({
        ...s,
        owned: false,
        repeatedCount: 0,
      }));
      saveStickersState(cleared);
    }
  };

  // --- Computation and Filtering ---
  
  // Determine list of active countries based on activeGroup
  const currentGroupCountries = useMemo(() => {
    if (activeGroup === "all_teams") {
      return [];
    }
    const group = GROUPS.find((g) => g.id === activeGroup);
    return group ? group.countries : [];
  }, [activeGroup]);

  // Determine list of active countries based on activeGroup or overall tab ("all_teams") & country tab
  const activeCountries = useMemo(() => {
    if (activeGroup === "all_teams") {
      // Return all countries across all groups including specials
      const all: any[] = [];
      GROUPS.forEach((g) => {
        g.countries.forEach((c) => {
          all.push({ ...c, groupName: g.name });
        });
      });
      return all;
    } else {
      const group = GROUPS.find((g) => g.id === activeGroup);
      const countries = group ? group.countries : [];
      if (activeCountryTab === "all") {
        return countries;
      } else {
        return countries.filter((c) => c.code === activeCountryTab);
      }
    }
  }, [activeGroup, activeCountryTab]);

  // Apply search query filter & state filtering if statusFilter is active
  const filteredCountriesWithStickers = useMemo(() => {
    return activeCountries.filter((c) => {
      // 1. Search Query filter (matches country name or code)
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // 2. Status filter logic
      if (statusFilter === "all") return true;

      const countryStickers = stickers.filter((s) => s.code === c.code);
      if (statusFilter === "missing") {
        return countryStickers.some((s) => !s.owned);
      }
      if (statusFilter === "owned") {
        return countryStickers.some((s) => s.owned);
      }
      if (statusFilter === "repeated") {
        return countryStickers.some((s) => s.owned && s.repeatedCount > 0);
      }

      return true;
    });
  }, [activeCountries, stickers, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-[#FAF8FB] text-slate-800 flex flex-col antialiased selection:bg-[#E0B0FF] selection:text-slate-900 pb-12 font-sans">
      
      {/* Top Hero Accent Strip */}
      <div className="bg-gradient-to-r from-[#FFE5B4] via-[#DD969C] via-[#C8A2C8] to-[#E0B0FF] h-1.5 w-full shadow-xs" />
      
      {/* Container wrapper */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-grow space-y-6">
        
        {/* Main Application Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-purple-100 shadow-sm shadow-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E0B0FF] to-[#DD969C] flex items-center justify-center text-2xl shadow-sm text-white">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight">
                  Meu Álbum Virtual v2
                </span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-[#E0B0FF]/25 text-slate-700 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                  Grupos A-L • Especiais
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Organizador visual com paletas de referência para controle de figurinhas e repetidas.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right font-mono text-[10px] text-slate-500 bg-purple-50/50 px-3 py-1.5 rounded-xl border border-purple-100">
              <div className="text-slate-700 font-bold font-mono">1 a 20 por País</div>
              <div className="text-slate-400">Especiais FWC e Coca-Cola</div>
            </div>
          </div>
        </header>

        {/* 1. Statistics Dashboard & Group Selector Component */}
        {stickers.length > 0 && (
          <StatsDashboard
            stickers={stickers}
            groups={GROUPS}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            onResetToDefault={handleResetToDefault}
            onClearAll={handleClearAll}
          />
        )}

        {/* 1.5 Country Specific Tabs block - visible when a specific group is selected */}
        {activeGroup !== "all_teams" && currentGroupCountries.length > 0 && (
          <div className="bg-white border border-purple-100 rounded-2xl p-3 shadow-sm shadow-purple-100/10 space-y-2">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Visualizar por País (Abas)
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCountryTab("all")}
                className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                  activeCountryTab === "all"
                    ? "bg-[#C8A2C8] text-white border-[#C8A2C8] shadow-sm font-black"
                    : "bg-purple-50/30 hover:bg-purple-50 text-slate-600 border-purple-100/40"
                }`}
              >
                🌍 Todos os Países
              </button>
              {currentGroupCountries.map((c) => {
                const countryStickers = stickers.filter((s) => s.code === c.code);
                const owned = countryStickers.filter((s) => s.owned).length;
                const total = countryStickers.length;
                const isSelected = activeCountryTab === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => setActiveCountryTab(c.code)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#C8A2C8] text-white border-[#C8A2C8] shadow-sm font-black"
                        : "bg-white border-purple-100 hover:bg-purple-50 hover:text-slate-800 text-slate-600"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <span>{FLAGS[c.code] || "🌍"}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className={`text-[9px] font-mono rounded px-1 ${
                      isSelected ? "bg-white/30 text-white" : "bg-purple-50 text-slate-500 font-semibold"
                    }`}>
                      {owned}/{total}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Search & Fine Filters Panel */}
        <section className="bg-white p-4 sm:p-5 rounded-3xl border border-purple-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm shadow-purple-50">
          
          {/* Text Search Input */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar país por nome ou sigla (ex: BRA, México, FRA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8FC] border border-purple-100 rounded-xl py-2 pl-[38px] pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A2C8]/50 focus:border-[#C8A2C8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8A2C8] hover:text-slate-800 text-xs cursor-pointer font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Quick Filters Buttons (All, Owned, Missing, Repeated) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-bold hidden lg:inline mr-1 uppercase tracking-wider text-[10px]">
              Filtrar figurinhas:
            </span>
            <div className="flex bg-[#FAF8FC] border border-purple-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  statusFilter === "all"
                    ? "bg-[#C8A2C8] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Todas 🌟
              </button>
              <button
                onClick={() => setStatusFilter("missing")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  statusFilter === "missing"
                    ? "bg-[#C8A2C8] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Mantenha o foco apenas nas que ainda faltam"
              >
                Faltando ✕
              </button>
              <button
                onClick={() => setStatusFilter("owned")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  statusFilter === "owned"
                    ? "bg-[#C8A2C8] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Mostrar apenas as figurinhas que você possui"
              >
                Tenho ✓
              </button>
              <button
                onClick={() => setStatusFilter("repeated")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  statusFilter === "repeated"
                    ? "bg-[#C8A2C8] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Filtre apenas os cromos que possuem cópias repetidas para troca"
              >
                Repetidas 🔄
              </button>
            </div>
          </div>
        </section>

        {/* 3. Sticker Grid Main Content Section */}
        <main className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2B1D35] flex items-center gap-1.5">
              <span className="text-[#C8A2C8] font-extrabold">■</span>{" "}
              {activeGroup === "all_teams" ? "Todas as Seções" : `Grupo ${activeGroup}`} 
              {activeCountryTab !== "all" && ` • País selecionado`}
              {searchQuery && ` (Buscando "${searchQuery}")`}
            </h2>
            <span className="text-[10px] text-slate-400 font-mono">
              Exibindo {filteredCountriesWithStickers.length} seções
            </span>
          </div>

          {filteredCountriesWithStickers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCountriesWithStickers.map((c) => {
                return (
                  <div key={c.code} className="space-y-1">
                    {activeGroup === "all_teams" && c.groupName && (
                      <span className="text-[9px] bg-purple-50 border border-purple-100/60 px-2 py-0.5 rounded text-[#C8A2C8] font-bold tracking-wider float-right uppercase">
                        {c.groupName}
                      </span>
                    )}
                    <StickerGrid
                      country={c}
                      stickers={stickers}
                      onToggleSticker={handleToggleSticker}
                      onIncrementRepeated={handleIncrementRepeated}
                      onMarkAllCountry={handleMarkAllCountry}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-purple-100 rounded-3xl py-12 px-6 text-center max-w-sm mx-auto space-y-3 shadow-xs">
              <div className="text-3xl">🔍</div>
              <h3 className="font-bold text-slate-800 text-base">Nenhum país encontrado</h3>
              <p className="text-xs text-slate-400">
                Não há seleções ou categorias correspondentes à busca ou aos filtros aplicados neste grupo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setActiveCountryTab("all");
                }}
                className="px-4 py-2 bg-[#C8A2C8] hover:bg-[#C8A2C8]/90 text-xs font-bold rounded-lg transition-colors text-white cursor-pointer"
              >
                Limpar Busca e Filtros
              </button>
            </div>
          )}
        </main>

        {/* 4. Shareable Lists and WhatsApp Tool Block */}
        {stickers.length > 0 && <SharePanel stickers={stickers} groups={GROUPS} />}

      </div>

      {/* Footer credits and information */}
      <footer className="mt-auto border-t border-purple-100 bg-[#FAF8FC] p-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-1">
            Meu Álbum Virtual • Feito com <Heart className="w-3.5 h-3.5 text-[#DD969C] fill-[#DD969C] inline" /> para colecionadores de figurinhas.
          </p>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px]">
            <span>Organizado de A a L</span>
            <span>Usa localStorage nativo sem perdas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
