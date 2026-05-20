import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { orderService } from '../services/orderService';
import type { OrderRow } from '../types/database';

interface OrderBookProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

const defaultNewOrder: Partial<OrderRow> = {
  symbol: '',
  side: 'BUY',
  order_type: 'Thường',
  qty: 0,
  price: 0,
  matched_qty: 0,
  matched_price: 0,
  status: 'Đã khớp',
  order_time: '',
};

export default function OrderBook({ onNavigate }: OrderBookProps) {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<OrderRow> | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll(1);
      setOrders(data);
    } catch (error) {
      console.error('Lỗi khi tải sổ lệnh:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSaveOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const symbol = (formData.get('symbol') as string).toUpperCase().trim();
    if (!symbol) return;

    const side = formData.get('side') as string;
    const order_type = formData.get('order_type') as string;
    const qty = parseInt(formData.get('qty') as string) || 0;
    const price = parseFloat(formData.get('price') as string) || 0;
    const matched_qty = parseInt(formData.get('matched_qty') as string) || 0;
    const matched_price = parseFloat(formData.get('matched_price') as string) || 0;
    const status = formData.get('status') as string;
    
    // Tạo định dạng thời gian HH:MM nếu trống
    let order_time = formData.get('order_time') as string;
    if (!order_time) {
      const now = new Date();
      order_time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    } else if (order_time.length > 5) {
      // Cắt bỏ phần giây nếu có
      order_time = order_time.substring(0, 5);
    }

    const payload = {
      symbol,
      side,
      order_type,
      qty,
      price,
      matched_qty,
      matched_price,
      status,
      order_time,
      account_id: 1
    };

    try {
      if (selectedOrder?.id) {
        await orderService.update(selectedOrder.id, payload);
      } else {
        await orderService.create(payload);
      }
      setModalOpen(false);
      loadOrders();
    } catch (error) {
      console.error('Lỗi khi lưu lệnh:', error);
      alert('Không thể lưu lệnh. Vui lòng kiểm tra lại!');
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy lệnh này?')) return;
    try {
      await orderService.delete(id);
      setModalOpen(false);
      loadOrders();
    } catch (error) {
      console.error('Lỗi khi hủy lệnh:', error);
      alert('Không thể hủy lệnh. Vui lòng kiểm tra lại!');
    }
  };

  const handleCancelAll = async () => {
    if (orders.length === 0) return;
    if (!window.confirm('Bạn có chắc chắn muốn hủy toàn bộ lệnh trong ngày?')) return;
    try {
      await orderService.deleteAll(1);
      loadOrders();
    } catch (error) {
      console.error('Lỗi khi hủy toàn bộ lệnh:', error);
      alert('Không thể hủy toàn bộ lệnh!');
    }
  };

  const openAddModal = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setSelectedOrder({
      ...defaultNewOrder,
      order_time: currentTime
    });
    setModalOpen(true);
  };

  const openEditModal = (order: OrderRow) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden font-sans bg-white">
      {/* Main Header */}
      <nav className="flex items-center justify-between px-4 py-1.5 border-b border-gray-100">
        <button onClick={() => onNavigate('portfolio')} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <h1
          className="font-bold text-gray-900"
          style={{ margin: 0, fontSize: '18px', lineHeight: '1.2' }}
        >
          Sổ lệnh
        </h1>
        <button
          onClick={openAddModal}
          className="border border-gray-300 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <span>TK</span>
          <span className="bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">6</span>
        </button>
      </nav>

      {/* Navigation Tabs */}
      <section className="flex overflow-x-auto whitespace-nowrap px-0 border-b border-gray-100 scrollbar-hide">
        <button className="px-4 py-3 text-sm font-semibold text-[#6b4eff] border-b-2 border-[#6b4eff]">Lệnh trong ngày</button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">Lệnh điều kiện</button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">Phiên kế tiếp</button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500">Xác nhận lệnh</button>
      </section>

      {/* Filters */}
      <section className="px-4 pt-4 pb-2 space-y-3">
        {/* Stock Code Search */}
        <div className="relative w-full">
          <input
            className="w-full border border-gray-200 rounded-lg py-[10px] px-4 text-[15px] outline-none focus:ring-1 focus:ring-[#6b4eff] pr-10 text-gray-800 placeholder-gray-300"
            placeholder="Mã CK"
            type="text"
          />
          <div className="absolute right-3 top-3 text-gray-800">
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex gap-3">
          <div className="relative w-1/2">
            <select className="appearance-none w-full border border-gray-200 rounded-lg py-[10px] px-3 text-[15px] outline-none bg-white pr-8 text-gray-600">
              <option>Tất cả loại lệnh</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-800 pointer-events-none">
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="relative w-1/2">
            <select className="appearance-none w-full border border-gray-200 rounded-lg py-[10px] px-3 text-[15px] outline-none bg-white pr-8 text-gray-600">
              <option>Tất cả trạng thái</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-800 pointer-events-none">
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* P/L Action */}
        <div className="flex justify-between items-center">
          <button className="inline-flex items-center px-4 py-[9px] border border-[#6b4eff] rounded-full text-[#6b4eff] text-[13px] font-normal">
            Xem lãi lỗ dự tính
            <ChevronRight className="w-4 h-4 ml-1" strokeWidth={2} />
          </button>
        </div>
      </section>

      {/* Table Header */}
      <div className="grid grid-cols-[16%_14%_15%_15%_40%] text-[13px] text-gray-500 font-normal px-4 py-[8px] border-b border-gray-100 bg-white">
        <div className="text-left">Mã CK</div>
        <div className="text-left">M/B</div>
        <div className="text-right">Đặt</div>
        <div className="text-right">Khớp</div>
        <div className="text-right">Còn lại</div>
      </div>

      {/* Data List Content */}
      <main className="flex-grow flex flex-col overflow-y-auto pb-24 bg-white">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm bg-white">Đang tải sổ lệnh...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm bg-white">Chưa có lệnh nào đặt trong ngày.</div>
        ) : (
          orders.map((order) => {
            const formattedTime = order.order_time ? order.order_time.substring(0, 5) : '';
            const isBuy = order.side === 'BUY';
            const remaining = Math.max(0, order.qty - order.matched_qty);
            
            // Màu sắc trạng thái
            let statusBulletColor = 'bg-[#129A43]';
            if (order.status === 'Chờ khớp') statusBulletColor = 'bg-yellow-500';
            if (order.status === 'Đã hủy') statusBulletColor = 'bg-gray-400';

            return (
              <div key={order.id}>
                <div
                  onClick={() => openEditModal(order)}
                  className="bg-white px-4 py-3 grid grid-cols-[16%_14%_15%_15%_40%] items-center cursor-pointer active:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-[16px]">{order.symbol}</span>
                    <span className="text-[13px] text-gray-400 mt-0.5">{formattedTime}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`font-medium text-[15px] ${isBuy ? 'text-[#129A43]' : 'text-[#DF3C40]'}`}>
                      {isBuy ? 'Mua' : 'Bán'}
                    </span>
                    <span className="text-[13px] text-gray-400 mt-0.5">{order.order_type}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-gray-900 text-[15px]">{order.qty.toLocaleString()}</span>
                    <span className="text-[13px] text-gray-400 mt-0.5">{order.price.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-gray-900 text-[15px]">{order.matched_qty.toLocaleString()}</span>
                    <span className="text-[13px] text-gray-400 mt-0.5">
                      {order.matched_price ? order.matched_price.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end justify-end space-y-1">
                    {remaining > 0 ? (
                      <span className="text-xs text-gray-600 font-medium pr-1">{remaining.toLocaleString()}</span>
                    ) : (
                      <span className="text-xs text-transparent select-none pr-1">0</span>
                    )}
                    <div className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded flex items-center text-[10px] font-medium whitespace-nowrap">
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusBulletColor}`}></span>
                      {order.status}
                    </div>
                  </div>
                </div>
                <div className="h-[10px] bg-[#f5f6fa] w-full"></div>
              </div>
            );
          })
        )}
      </main>

      {/* Floating Bottom Button */}
      <footer className="py-3 px-4 flex justify-end absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <button
          onClick={handleCancelAll}
          className="bg-[#5a6270] text-white px-6 py-2.5 rounded-full font-bold shadow-md text-sm active:bg-gray-700 transition-colors"
        >
          Hủy tất cả
        </button>
      </footer>

      {/* Add / Edit Order Modal */}
      {modalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-stretch justify-center"
          onClick={() => setModalOpen(false)}
        >
          <form
            key={selectedOrder.id || 'new_order'}
            onSubmit={handleSaveOrder}
            className="w-full h-full bg-white p-4 shadow-xl overflow-y-auto flex flex-col justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                {selectedOrder.id ? 'Sửa thông tin lệnh' : 'Thêm lệnh mới'}
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Mã CK</label>
                  <input
                    name="symbol"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px] uppercase"
                    defaultValue={selectedOrder.symbol}
                    placeholder="VGI, MBS..."
                    required
                    type="text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Loại Giao Dịch</label>
                  <select
                    name="side"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px] bg-white"
                    defaultValue={selectedOrder.side}
                  >
                    <option value="BUY">Mua</option>
                    <option value="SELL">Bán</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Loại Lệnh</label>
                  <input
                    name="order_type"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.order_type}
                    placeholder="Thường, Điều kiện..."
                    type="text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Trạng Thái</label>
                  <select
                    name="status"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px] bg-white"
                    defaultValue={selectedOrder.status}
                  >
                    <option value="Đã khớp">Đã khớp</option>
                    <option value="Chờ khớp">Chờ khớp</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Khối Lượng Đặt</label>
                  <input
                    name="qty"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.qty}
                    type="number"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Giá Đặt</label>
                  <input
                    name="price"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.price}
                    type="number"
                    step="any"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Khối Lượng Khớp</label>
                  <input
                    name="matched_qty"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.matched_qty}
                    type="number"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Giá Khớp</label>
                  <input
                    name="matched_price"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.matched_price || 0}
                    type="number"
                    step="any"
                  />
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Giờ đặt lệnh</label>
                  <input
                    name="order_time"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedOrder.order_time}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                type="submit"
                className="w-full bg-[#6b4eff] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-95 transition-opacity"
              >
                Lưu lệnh
              </button>
              {selectedOrder.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteOrder(selectedOrder.id!)}
                  className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-95 transition-opacity"
                >
                  Hủy đặt lệnh
                </button>
              )}
              <button
                type="button"
                className="w-full border-2 border-slate-300 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Thoát
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
