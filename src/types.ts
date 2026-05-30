export interface Country {
  name: string;
  code: string;
  group: string;
  stickersCount: number;
}

export interface StickerState {
  id: string; // e.g. "MEX:3", "FWC:9", "CC:3"
  code: string; // e.g. "MEX", "FWC", "CC"
  number: number;
  owned: boolean;
  repeatedCount: number;
}

export interface Group {
  id: string; // "A", "B", ..., "L", "especiais"
  name: string; // "Grupo A", etc.
  countries: {
    name: string;
    code: string;
    stickersCount: number;
  }[];
}
