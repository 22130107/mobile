import { supabase } from '../lib/supabase';
import type { StockRow, StockInsert, StockUpdate } from '../types/database';

const db = supabase as any;

export const stockService = {
  /**
   * Lấy tất cả cổ phiếu theo tài khoản
   */
  async getAll(accountId: number = 1): Promise<StockRow[]> {
    const { data, error } = await db
      .from('stocks')
      .select('*')
      .eq('account_id', accountId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Lấy 1 cổ phiếu theo ID
   */
  async getById(id: string): Promise<StockRow | null> {
    const { data, error } = await db
      .from('stocks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Lấy cổ phiếu theo mã
   */
  async getBySymbol(symbol: string, accountId: number = 1): Promise<StockRow | null> {
    const { data, error } = await db
      .from('stocks')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .eq('account_id', accountId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Thêm mới cổ phiếu (Mua)
   */
  async create(stock: StockInsert): Promise<StockRow> {
    const { data, error } = await db
      .from('stocks')
      .insert({
        ...stock,
        symbol: stock.symbol.toUpperCase(),
        account_id: stock.account_id ?? 1,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cập nhật cổ phiếu
   */
  async update(id: string, updates: StockUpdate): Promise<StockRow> {
    const { data, error } = await db
      .from('stocks')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Xóa cổ phiếu (Bán hết)
   */
  async delete(id: string): Promise<void> {
    const { error } = await db
      .from('stocks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Tính toán dữ liệu hiển thị từ StockRow
   */
  computeDisplayData(stock: StockRow) {
    const totalCapital = stock.cost_price * stock.total_qty * 1000;
    const marketValue = stock.market_price * stock.total_qty * 1000;
    const pnlAmount = marketValue - totalCapital;
    const pnlPercent = totalCapital > 0 ? ((pnlAmount / totalCapital) * 100) : 0;
    const isPositive = pnlAmount >= 0;

    return {
      id: stock.id,
      symbol: stock.symbol,
      costPrice: stock.cost_price.toFixed(2),
      marketPrice: stock.market_price.toFixed(2),
      quantity: stock.total_qty.toLocaleString(),
      pnlPercent: `${isPositive ? '+' : ''}${pnlPercent.toFixed(2)}%`,
      isPositive,
      totalCapital: totalCapital.toLocaleString(),
      marketValue: marketValue.toLocaleString(),
      pnlAmount: `${isPositive ? '+' : ''}${pnlAmount.toLocaleString()}`,
      totalQty: stock.total_qty.toLocaleString(),
      normalQty: stock.normal_qty.toLocaleString(),
      fsQty: stock.fs_qty.toLocaleString(),
      sellableQty: stock.sellable_qty.toLocaleString(),
      outroom: stock.outroom.toLocaleString(),
      otherQty: stock.other_qty.toLocaleString(),
      cpctBonus: stock.cpct_bonus.toLocaleString(),
      t0: stock.t0.toLocaleString(),
      t1: stock.t1.toLocaleString(),
      t2: stock.t2.toLocaleString(),
    };
  },
};
