export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: StockRow;
        Insert: StockInsert;
        Update: StockUpdate;
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
  };
}

export interface StockRow {
  id: string;
  symbol: string;
  cost_price: number;
  market_price: number;
  total_qty: number;
  normal_qty: number;
  fs_qty: number;
  sellable_qty: number;
  outroom: number;
  other_qty: number;
  cpct_bonus: number;
  t0: number;
  t1: number;
  t2: number;
  account_id: number;
  created_at: string;
  updated_at: string;
}

export interface StockInsert {
  id?: string;
  symbol: string;
  cost_price: number;
  market_price: number;
  total_qty: number;
  normal_qty?: number;
  fs_qty?: number;
  sellable_qty?: number;
  outroom?: number;
  other_qty?: number;
  cpct_bonus?: number;
  t0?: number;
  t1?: number;
  t2?: number;
  account_id?: number;
}

export interface StockUpdate {
  id?: string;
  symbol?: string;
  cost_price?: number;
  market_price?: number;
  total_qty?: number;
  normal_qty?: number;
  fs_qty?: number;
  sellable_qty?: number;
  outroom?: number;
  other_qty?: number;
  cpct_bonus?: number;
  t0?: number;
  t1?: number;
  t2?: number;
  account_id?: number;
}
