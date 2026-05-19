import { supabase } from '../lib/supabase';
import type { RealizedPnLRow, RealizedPnLInsert, RealizedPnLUpdate } from '../types/database';

const db = supabase as any;

export const pnlService = {
  /**
   * Lấy tất cả lãi lỗ đã thực hiện theo tài khoản
   */
  async getAll(accountId: number = 1): Promise<RealizedPnLRow[]> {
    const { data, error } = await db
      .from('realized_pnl')
      .select('*')
      .eq('account_id', accountId)
      .order('sell_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Thêm mới bản ghi chốt lãi lỗ
   */
  async create(pnl: RealizedPnLInsert): Promise<RealizedPnLRow> {
    const { data, error } = await db
      .from('realized_pnl')
      .insert({
        ...pnl,
        symbol: pnl.symbol.toUpperCase(),
        account_id: pnl.account_id ?? 1,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cập nhật bản ghi chốt lãi lỗ
   */
  async update(id: string, updates: RealizedPnLUpdate): Promise<RealizedPnLRow> {
    const { data, error } = await db
      .from('realized_pnl')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Xóa bản ghi chốt lãi lỗ
   */
  async delete(id: string): Promise<void> {
    const { error } = await db
      .from('realized_pnl')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
