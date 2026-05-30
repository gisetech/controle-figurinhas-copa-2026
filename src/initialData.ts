import { Group, StickerState } from "./types";

export const GROUPS: Group[] = [
  {
    id: "A",
    name: "Grupo A",
    countries: [
      { name: "México", code: "MEX", stickersCount: 20 },
      { name: "África do Sul", code: "RSA", stickersCount: 20 },
      { name: "Coreia do Sul", code: "KOR", stickersCount: 20 },
      { name: "República Checa", code: "CZE", stickersCount: 20 }
    ]
  },
  {
    id: "B",
    name: "Grupo B",
    countries: [
      { name: "Canadá", code: "CAN", stickersCount: 20 },
      { name: "Bósnia e Herzegovina", code: "BIH", stickersCount: 20 },
      { name: "Qatar", code: "QTA", stickersCount: 20 },
      { name: "Suíça", code: "SUI", stickersCount: 20 }
    ]
  },
  {
    id: "C",
    name: "Grupo C",
    countries: [
      { name: "Brasil", code: "BRA", stickersCount: 20 },
      { name: "Marrocos", code: "MAR", stickersCount: 20 },
      { name: "Haiti", code: "HAI", stickersCount: 20 },
      { name: "Escócia", code: "SCO", stickersCount: 20 }
    ]
  },
  {
    id: "D",
    name: "Grupo D",
    countries: [
      { name: "EUA", code: "USA", stickersCount: 20 },
      { name: "Paraguai", code: "PAR", stickersCount: 20 },
      { name: "Austrália", code: "AUS", stickersCount: 20 },
      { name: "Turquia", code: "TUR", stickersCount: 20 }
    ]
  },
  {
    id: "E",
    name: "Grupo E",
    countries: [
      { name: "Alemanha", code: "GER", stickersCount: 20 },
      { name: "Curaçao", code: "CUR", stickersCount: 20 },
      { name: "Costa do Marfim", code: "CIV", stickersCount: 20 },
      { name: "Equador", code: "ECU", stickersCount: 20 }
    ]
  },
  {
    id: "F",
    name: "Grupo F",
    countries: [
      { name: "Holanda", code: "NED", stickersCount: 20 },
      { name: "Japão", code: "JPN", stickersCount: 20 },
      { name: "Suécia", code: "SWE", stickersCount: 20 },
      { name: "Tunísia", code: "TUN", stickersCount: 20 }
    ]
  },
  {
    id: "G",
    name: "Grupo G",
    countries: [
      { name: "Bélgica", code: "BEL", stickersCount: 20 },
      { name: "Egito", code: "EGY", stickersCount: 20 },
      { name: "Irã", code: "IRN", stickersCount: 20 },
      { name: "Nova Zelândia", code: "NZL", stickersCount: 20 }
    ]
  },
  {
    id: "H",
    name: "Grupo H",
    countries: [
      { name: "Espanha", code: "ESP", stickersCount: 20 },
      { name: "Cabo Verde", code: "CPV", stickersCount: 20 },
      { name: "Arábia Saudita", code: "KSA", stickersCount: 20 },
      { name: "Uruguai", code: "URU", stickersCount: 20 }
    ]
  },
  {
    id: "I",
    name: "Grupo I",
    countries: [
      { name: "França", code: "FRA", stickersCount: 20 },
      { name: "Senegal", code: "SEN", stickersCount: 20 },
      { name: "Iraque", code: "IRQ", stickersCount: 20 },
      { name: "Noruega", code: "NOR", stickersCount: 20 }
    ]
  },
  {
    id: "J",
    name: "Grupo J",
    countries: [
      { name: "Argentina", code: "ARG", stickersCount: 20 },
      { name: "Argélia", code: "ALG", stickersCount: 20 },
      { name: "Áustria", code: "AUT", stickersCount: 20 },
      { name: "Jordânia", code: "JOR", stickersCount: 20 }
    ]
  },
  {
    id: "K",
    name: "Grupo K",
    countries: [
      { name: "Portugal", code: "POR", stickersCount: 20 },
      { name: "Congo", code: "COD", stickersCount: 20 },
      { name: "Uzbequistão", code: "UZB", stickersCount: 20 },
      { name: "Colômbia", code: "COL", stickersCount: 20 }
    ]
  },
  {
    id: "L",
    name: "Grupo L",
    countries: [
      { name: "Inglaterra", code: "ENG", stickersCount: 20 },
      { name: "Croácia", code: "CRO", stickersCount: 20 },
      { name: "Gana", code: "GHA", stickersCount: 20 },
      { name: "Panamá", code: "PAN", stickersCount: 20 }
    ]
  },
  {
    id: "especiais",
    name: "Seções Especiais",
    countries: [
      { name: "FWC Início (1-8)", code: "FWC_INI", stickersCount: 8 },
      { name: "FWC História (9-19)", code: "FWC_HIST", stickersCount: 11 },
      { name: "Champions Cup (CC)", code: "CC", stickersCount: 14 }
    ]
  }
];

// Initial set of owned stickers from the user tables, combined.
export const INITIAL_OWNED_PRESET: Record<string, number[]> = {
  // Group A
  "MEX": [3, 6, 10, 18],
  "RSA": [2, 3, 4, 7, 8, 17],
  "KOR": [4, 7, 14, 18],
  "CZE": [2, 6, 7, 10, 11, 14, 16],

  // Group B
  "CAN": [3, 7, 10],
  "BIH": [2, 8, 14, 19],
  "QTA": [3, 4, 8, 10, 14, 15, 18],
  "SUI": [2],

  // Group C
  "BRA": [2, 6],
  "MAR": [3, 4, 12, 17, 18],
  "HAI": [3, 7, 11, 13, 16, 18],
  "SCO": [2, 3, 4, 5, 9, 10, 14, 15, 16],

  // Group D
  "USA": [2, 7, 15, 16, 19, 20],
  "PAR": [1, 5, 9, 14, 18],
  "AUS": [8, 9, 11, 14, 19],
  "TUR": [5, 11, 14, 16, 19],

  // Group E
  "GER": [6, 8, 9, 17],
  "CUR": [1, 5, 12, 18, 20],
  "CIV": [12, 20],
  "ECU": [6],

  // Group F
  "NED": [19],
  "JPN": [2, 6, 11, 19],
  "SWE": [1, 2, 4, 11, 15, 19],
  "TUN": [],

  // Group G
  "BEL": [1, 8, 11, 16, 17],
  "EGY": [2, 5, 7, 9, 11, 16, 20],
  "IRN": [2, 3, 5, 6, 7, 10, 12, 15, 17, 19, 20],
  "NZL": [5, 11, 14, 17],

  // Group H
  "ESP": [7, 10, 20],
  "CPV": [5, 10, 17],
  "KSA": [9, 18],
  "URU": [4, 5, 17],

  // Group I
  "FRA": [9, 14],
  "SEN": [],
  "IRQ": [3, 6, 10, 12],
  "NOR": [5, 14, 15],

  // Group J
  "ARG": [],
  "ALG": [6, 11, 13],
  "AUT": [6, 9],
  "JOR": [],

  // Group K
  "POR": [12],
  "COD": [6, 17],
  "UZB": [],
  "COL": [8, 20],

  // Group L
  "ENG": [8],
  "CRO": [2, 5, 7, 10, 11, 17],
  "GHA": [9, 13, 15, 16, 18],
  "PAN": [10],

  // Specials
  // FWC_INI: FWC 1 to 8. None originally listed as owned.
  "FWC_INI": [],
  // FWC_HIST: FWC 9 to 19. 9, 10, 11, 14, 15, 16, 17, 18, 19 are missing ("que faltam"), so 12 and 13 are owned.
  "FWC_HIST": [12, 13],
  // CC: CC 1 to 14. "só tem a CC3"
  "CC": [3]
};

// Generates the initial standard array of all stickers
export function generateInitialStickers(): StickerState[] {
  const list: StickerState[] = [];

  GROUPS.forEach(g => {
    g.countries.forEach(c => {
      // Offset for FWC History start if needed: FWC_INI stickers are numbered 1 to 8.
      // FWC_HIST stickers are numbered 9 to 19.
      const isFwcHist = c.code === "FWC_HIST";
      const startNum = isFwcHist ? 9 : 1;
      const count = c.stickersCount;

      for (let i = 0; i < count; i++) {
        const num = startNum + i;
        const id = `${c.code}:${num}`;
        const defaultOwnedList = INITIAL_OWNED_PRESET[c.code] || [];
        const owned = defaultOwnedList.includes(num);

        list.push({
          id,
          code: c.code,
          number: num,
          owned,
          repeatedCount: 0 // Default 0 duplicate copies
        });
      }
    });
  });

  return list;
}

export const FLAGS: Record<string, string> = {
  MEX: "🇲🇽", RSA: "🇿🇦", KOR: "🇰🇷", CZE: "🇨🇿", CAN: "🇨🇦", BIH: "🇧🇦", QTA: "🇶🇦", SUI: "🇨🇭",
  BRA: "🇧🇷", MAR: "🇲🇦", HAI: "🇭🇹", SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", USA: "🇺🇸", PAR: "🇵🇾", AUS: "🇦🇺", TUR: "🇹🇷",
  GER: "🇩🇪", CUR: "🇨🇼", CIV: "🇨🇮", ECU: "🇪🇨", NED: "🇳🇱", JPN: "🇯🇵", SWE: "🇸🇪", TUN: "🇹🇳",
  BEL: "🇧🇪", EGY: "🇪🇬", IRN: "🇮🇷", NZL: "🇳🇿", ESP: "🇪🇸", CPV: "🇨🇻", KSA: "🇸🇦", URU: "🇺🇾",
  FRA: "🇫🇷", SEN: "🇸🇳", IRQ: "🇮🇶", NOR: "🇳🇴", ARG: "🇦🇷", ALG: "🇩🇿", AUT: "🇦🇹", JOR: "🇯🇴",
  POR: "🇵🇹", COD: "🇨🇩", UZB: "🇺🇿", COL: "🇨🇴", ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", CRO: "🇭🇷", GHA: "🇬🇭", PAN: "🇵🇦",
  FWC_INI: "🏆", FWC_HIST: "📖", CC: "🥤"
};
