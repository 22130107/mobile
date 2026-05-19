export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: StockRow;
        Insert: StockInsert;
        Update: StockUpdate;
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: OrderUpdate;
      };
      realized_pnl: {
        Row: RealizedPnLRow;
        Insert: RealizedPnLInsert;
        Update: RealizedPnLUpdate;
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

// Order book types
export interface OrderRow {
  id: string;
  symbol: string;
  side: string;
  order_type: string;
  qty: number;
  price: number;
  matched_qty: number;
  matched_price: number | null;
  status: string;
  order_time: string;
  account_id: number;
  created_at: string;
}

export interface OrderInsert {
  id?: string;
  symbol: string;
  side: string;
  order_type?: string;
  qty: number;
  price: number;
  matched_qty?: number;
  matched_price?: number;
  status: string;
  order_time?: string;
  account_id?: number;
}

export interface OrderUpdate {
  id?: string;
  symbol?: string;
  side?: string;
  order_type?: string;
  qty?: number;
  price?: number;
  matched_qty?: number;
  matched_price?: number;
  status?: string;
  order_time?: string;
  account_id?: number;
}

// Realized PnL types
export interface RealizedPnLRow {
  id: string;
  sell_date: string;
  symbol: string;
  pnl_amount: number;
  pnl_percent: number;
  account_id: number;
  created_at: string;
}

export interface RealizedPnLInsert {
  id?: string;
  sell_date?: string;
  symbol: string;
  pnl_amount: number;
  pnl_percent: number;
  account_id?: number;
}

export interface RealizedPnLUpdate {
  id?: string;
  sell_date?: string;
  symbol?: string;
  pnl_amount?: number;
  pnl_percent?: number;
  account_id?: number;
}
