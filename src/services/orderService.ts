import { supabase } from '../lib/supabase';
import type { OrderRow, OrderInsert, OrderUpdate } from '../types/database';

const db = supabase as any;

export const orderService = {
  /**
   * Lấy tất cả lệnh theo tài khoản
   */
  async getAll(accountId: number = 1): Promise<OrderRow[]> {
    const { data, error } = await db
      .from('orders')
      .select('*')
      .eq('account_id', accountId)
      .order('order_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Thêm mới lệnh
   */
  async create(order: OrderInsert): Promise<OrderRow> {
    const { data, error } = await db
      .from('orders')
      .insert({
        ...order,
        symbol: order.symbol.toUpperCase(),
        account_id: order.account_id ?? 1,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cập nhật lệnh
   */
  async update(id: string, updates: OrderUpdate): Promise<OrderRow> {
    const { data, error } = await db
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Xóa 1 lệnh (Hủy lệnh)
   */
  async delete(id: string): Promise<void> {
    const { error } = await db
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Hủy tất cả lệnh
   */
  async deleteAll(accountId: number = 1): Promise<void> {
    const { error } = await db
      .from('orders')
      .delete()
      .eq('account_id', accountId);

    if (error) throw error;
  },
};
