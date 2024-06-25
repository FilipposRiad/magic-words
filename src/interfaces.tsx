export interface Word {
  id: number;
  text: string;
  createdAt: string;
  language: string;
  translations: Translation[];
  statistics: Statistics;
}

export interface Translation {
  id: number;
  text: string;
}

export interface Statistics {
  id: number;
  timesEncountered: number;
  lastDateEncountered: string;
}

export interface MemoryGameStatistics {
  mismatches: number;
  date: string;
  language: string;
  id: number;
}
