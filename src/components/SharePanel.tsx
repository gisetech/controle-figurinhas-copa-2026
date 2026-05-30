import React, { useState } from "react";
import { StickerState, Group } from "../types";
import { Clipboard, Check, Share2, FileText, Send } from "lucide-react";

interface SharePanelProps {
  stickers: StickerState[];
  groups: Group[];
}

export const SharePanel: React.FC<SharePanelProps> = ({ stickers, groups }) => {
  const [copiedMissing, setCopiedMissing] = useState(false);
  const [copiedRepeated, setCopiedRepeated] = useState(false);

  // Helper to generate missing stickers formatted text
  const generateMissingText = (): string => {
    let output = "📋 MINHAS FIGURINHAS FALTANTES:\n\n";
    let hasMissing = false;

    groups.forEach((g) => {
      let groupText = "";
      g.countries.forEach((c) => {
        const countryStickers = stickers.filter((s) => s.code === c.code);
        const missing = countryStickers
          .filter((s) => !s.owned)
          .map((s) => s.number);

        if (missing.length > 0) {
          groupText += `👉 ${c.name} (${c.code}): ${missing.join(", ")}\n`;
        }
      });

      if (groupText) {
        output += `═══ ${g.name} ═══\n${groupText}\n`;
        hasMissing = true;
      }
    });

    if (!hasMissing) {
      return "🎉 ÁLBUM COMPLETO! Não tenho nenhuma figurinha faltando.";
    }

    return output;
  };

  // Helper to generate repeated stickers formatted text
  const generateRepeatedText = (): string => {
    let output = "🔄 MINHAS FIGURINHAS REPETIDAS PARA TROCA:\n\n";
    let hasRepeated = false;

    groups.forEach((g) => {
      let groupText = "";
      g.countries.forEach((c) => {
        const countryStickers = stickers.filter((s) => s.code === c.code);
        const repeated = countryStickers
          .filter((s) => s.owned && s.repeatedCount > 0)
          .map((s) => `${s.number} (${s.repeatedCount}x)`);

        if (repeated.length > 0) {
          groupText += `👉 ${c.name} (${c.code}): ${repeated.join(", ")}\n`;
        }
      });

      if (groupText) {
        output += `═══ ${g.name} ═══\n${groupText}\n`;
        hasRepeated = true;
      }
    });

    if (!hasRepeated) {
      return "😔 Nenhuma figurinha repetida registrada ainda. Adicione repetidas usando os botões (+) no álbum!";
    }

    return output;
  };

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-purple-100 rounded-3xl p-6 lg:p-8 text-slate-800 shadow-md shadow-purple-100/30 space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#DD969C]" /> Relatórios de Troca e Compartilhamento
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Copie as listas prontas para colar diretamente no WhatsApp e organizar trocas com seus amigos!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Stickers Block */}
        <div className="bg-[#FAF8FC] border border-purple-100/50 rounded-2xl p-5 flex flex-col justify-between h-80">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#DD969C] flex items-center gap-2 font-display">
                <FileText className="w-4 h-4 text-[#DD969C]" /> Lista de Faltantes
              </span>
              <button
                onClick={() => copyToClipboard(generateMissingText(), setCopiedMissing)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedMissing
                    ? "bg-emerald-50 text-white"
                    : "bg-white border border-purple-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {copiedMissing ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copiado!
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" /> Copiar Texto
                  </>
                )}
              </button>
            </div>
            
            {/* Scrollable preview */}
            <div className="bg-white p-3 rounded-xl border border-purple-100 h-48 overflow-y-auto font-mono text-xs text-slate-700 select-all whitespace-pre-wrap leading-relaxed scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-transparent">
              {generateMissingText()}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-purple-100/50 flex items-center justify-between">
            <span>Perfeito para enviar em grupos de colecionadores</span>
            <Send className="w-3 h-3 text-emerald-500" />
          </div>
        </div>

        {/* Repeated Stickers Block */}
        <div className="bg-[#FAF8FC] border border-purple-100/50 rounded-2xl p-5 flex flex-col justify-between h-80">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#C8A2C8] flex items-center gap-2 font-display">
                <Layers className="w-4 h-4 text-[#C8A2C8]" /> Repetidas para Troca
              </span>
              <button
                onClick={() => copyToClipboard(generateRepeatedText(), setCopiedRepeated)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedRepeated
                    ? "bg-emerald-50 text-white"
                    : "bg-white border border-purple-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {copiedRepeated ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copiado!
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" /> Copiar Texto
                  </>
                )}
              </button>
            </div>

            {/* Scrollable preview */}
            <div className="bg-white p-3 rounded-xl border border-purple-100 h-48 overflow-y-auto font-mono text-xs text-slate-700 select-all whitespace-pre-wrap leading-relaxed scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-transparent">
              {generateRepeatedText()}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-purple-100/50 flex items-center justify-between">
            <span>Útil para trocas presenciais ou combinadas online</span>
            <Share2 className="w-3 h-3 text-[#C8A2C8]" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Help helper icon to ensure Layers fits
import { Layers } from "lucide-react";
