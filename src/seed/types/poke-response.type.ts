export interface PokeItem {
  name: string;
  url: string;
}

export interface PokeResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<PokeItem>;
}
