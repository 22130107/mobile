import { useState, useEffect } from 'react';
import { ChevronLeft, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { pnlService } from '../services/pnlService';
import type { RealizedPnLRow } from '../types/database';

interface RealizedPnLProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

const defaultNewPnL: Partial<RealizedPnLRow> = {
  symbol: '',
  sell_date: '',
  pnl_amount: 0,
  pnl_percent: 0,
};

const formatDateToDisplay = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

export default function RealizedPnL({ onNavigate }: RealizedPnLProps) {
  const [pnls, setPnls] = useState<RealizedPnLRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPnL, setSelectedPnL] = useState<Partial<RealizedPnLRow> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('2026-03-01');
  const [endDate, setEndDate] = useState<string>('2026-04-30');

  const loadPnls = async () => {
    try {
      setLoading(true);
      const data = await pnlService.getAll(1);
      setPnls(data);
    } catch (error) {
      console.error('Lỗi khi tải lãi lỗ thực hiện:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPnls();
  }, []);

  const handleSavePnL = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const symbol = (formData.get('symbol') as string).toUpperCase().trim();
    if (!symbol) return;

    const sell_date = formData.get('sell_date') as string || new Date().toISOString().split('T')[0];
    const pnl_amount = parseFloat(formData.get('pnl_amount') as string) || 0;
    const pnl_percent = parseFloat(formData.get('pnl_percent') as string) || 0;

    const payload = {
      symbol,
      sell_date,
      pnl_amount,
      pnl_percent,
      account_id: 1
    };

    try {
      if (selectedPnL?.id) {
        await pnlService.update(selectedPnL.id, payload);
      } else {
        await pnlService.create(payload);
      }
      setModalOpen(false);
      loadPnls();
    } catch (error) {
      console.error('Lỗi khi lưu lãi/lỗ:', error);
      alert('Không thể lưu thông tin. Vui lòng kiểm tra lại!');
    }
  };

  const handleDeletePnL = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) return;
    try {
      await pnlService.delete(id);
      setModalOpen(false);
      loadPnls();
    } catch (error) {
      console.error('Lỗi khi xóa bản ghi:', error);
      alert('Không thể xóa bản ghi!');
    }
  };

  const openAddModal = () => {
    setSelectedPnL(defaultNewPnL);
    setModalOpen(true);
  };

  const openEditModal = (pnl: RealizedPnLRow) => {
    setSelectedPnL(pnl);
    setModalOpen(true);
  };

  const filteredPnls = pnls.filter((pnl) => {
    const matchesSearch = pnl.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    
    if (pnl.sell_date) {
      const pnlDateStr = pnl.sell_date.split('T')[0];
      return pnlDateStr >= startDate && pnlDateStr <= endDate;
    }
    return true;
  });

  // Tính toán lãi lỗ tổng cộng từ các bản ghi đã lọc
  let totalCost = 0;
  let totalPnLAmount = 0;

  filteredPnls.forEach((item) => {
    totalPnLAmount += Number(item.pnl_amount);
    if (item.pnl_percent !== 0) {
      totalCost += Number(item.pnl_amount) / (Number(item.pnl_percent) / 100);
    }
  });

  const totalPnLPercent = totalCost !== 0 ? (totalPnLAmount / totalCost) * 100 : 0;
  const isPnLPositive = totalPnLAmount >= 0;

  const totalPnLAmountFormatted = `${Math.round(totalPnLAmount).toLocaleString('en-US')}`;
  const totalPnLPercentFormatted = `${totalPnLPercent.toFixed(2)}%`;

  return (
    <div className="w-full min-h-screen bg-[rgba(240,239,244,1)] relative flex flex-col shadow-xl overflow-hidden pb-16">
      {/* Header */}
      <header className="bg-white flex items-center justify-between px-4 pt-4 pb-3 sticky top-0 z-20 shadow-sm border-b border-[#e2e8f0]">
        <button onClick={() => onNavigate('home')} className="w-8 h-8 flex items-center justify-center text-[#1e293b]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1
          className="font-extrabold tracking-wider text-[#1e293b]"
          style={{ margin: 0, fontSize: '18px', lineHeight: '1.2' }}
        >
          Lãi lỗ đã thực hiện
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-1 border border-gray-300 rounded-full px-3 py-1 bg-white text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all"
        >
          <span>TK</span>
          <span className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs">6</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-24">
        {/* Filters */}
        <section className="space-y-3">
          {/* Date Range Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const todayStr = new Date().toISOString().split('T')[0];
                setStartDate(todayStr);
                setEndDate(todayStr);
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors outline-none border ${
                startDate === new Date().toISOString().split('T')[0] && endDate === new Date().toISOString().split('T')[0]
                  ? 'bg-[#6b21a8] text-white border-[#6b21a8]'
                  : 'bg-white text-[#1e293b] border-[#e2e8f0] hover:bg-gray-50'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setDateModalOpen(true)}
              className="flex-[2] py-2 bg-white border border-[#6b21a8] rounded-lg text-sm font-medium text-[#6b21a8] flex items-center justify-center space-x-2 hover:bg-[#e9d5ff] outline-none transition-colors"
            >
              <span>{formatDateToDisplay(startDate)}</span>
              <ArrowRight className="w-3 h-3 mx-4" />
              <span>{formatDateToDisplay(endDate)}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full mb-16">
            <input
              className="w-full py-2.5 pl-4 pr-10 bg-white border border-[#e2e8f0] rounded-lg text-sm outline-none focus:border-[#6b21a8] focus:ring-1 focus:ring-[#6b21a8] transition-colors text-gray-800 placeholder-gray-300"
              placeholder="Mã CK"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Summary Banner */}
        <section className="bg-white rounded-xl p-4 flex justify-between items-center border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
          <span className="font-bold text-[#1e293b] text-base">Tổng cộng</span>
          <div className="text-right flex items-center space-x-3 mr-2">
            <span className={`font-bold text-base ${isPnLPositive ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
              {totalPnLAmountFormatted}
            </span>
            <span className={`font-bold text-sm ${isPnLPositive ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
              {totalPnLPercentFormatted}
            </span>
          </div>
        </section>

        {/* Transaction List */}
        <section className="space-y-2">
          {loading ? (
            <div className="text-center py-10 text-gray-400 text-sm">Đang tải lịch sử lãi lỗ...</div>
          ) : filteredPnls.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">Không tìm thấy bản ghi nào.</div>
          ) : (
            filteredPnls.map((pnl) => {
              const dateObj = new Date(pnl.sell_date);
              const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
              const isProfit = Number(pnl.pnl_amount) >= 0;
              const formattedAmount = Math.round(Number(pnl.pnl_amount)).toLocaleString('en-US');
              const formattedPercent = `${Number(pnl.pnl_percent).toFixed(2)}%`;

              return (
                <article
                  key={pnl.id}
                  onClick={() => openEditModal(pnl)}
                  className="bg-white rounded-xl px-0 pt-2 pb-0 border border-[#e2e8f0] cursor-pointer hover:bg-slate-50 transition-colors"
                  style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="w-1/4 text-center">
                      <div className="text-xs text-[rgba(197,165,167,1)] mb-[14px] font-medium">Ngày</div>
                      <div className="text-sm text-[#1e293b]">{formattedDate}</div>
                    </div>
                    <div className="w-1/4 text-center">
                      <div className="text-xs text-[rgba(197,165,167,1)] mb-[14px] font-medium">Mã CK</div>
                      <div className="text-sm font-extrabold text-[#1e293b]">{pnl.symbol}</div>
                    </div>
                    <div className="w-1/4 text-center">
                      <div className="text-xs text-[rgba(197,165,167,1)] mb-[14px] font-medium">Lãi/lỗ</div>
                      <div className={`text-[11px] font-extrabold ${isProfit ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                        {formattedAmount}
                      </div>
                    </div>
                    <div className="w-1/4 text-center flex flex-col items-center relative">
                      <div className="text-xs text-[rgba(197,165,167,1)] mb-[14px] font-medium">%lãi/lỗ</div>
                      <div className={`text-[11px] font-extrabold ${isProfit ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                        {formattedPercent}
                      </div>
                      <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-black p-1 rotate-180">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>

      {/* Add / Edit PnL Modal */}
      {modalOpen && selectedPnL && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-stretch justify-center"
          onClick={() => setModalOpen(false)}
        >
          <form
            key={selectedPnL.id || 'new_pnl'}
            onSubmit={handleSavePnL}
            className="w-full h-full bg-white p-4 shadow-xl overflow-y-auto flex flex-col justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                {selectedPnL.id ? 'Sửa chốt Lãi/Lỗ' : 'Thêm chốt Lãi/Lỗ'}
              </h2>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Mã CK</label>
                  <input
                    name="symbol"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px] uppercase"
                    defaultValue={selectedPnL.symbol}
                    placeholder="Ví dụ: MSR, BSR..."
                    required
                    type="text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Ngày Bán</label>
                  <input
                    name="sell_date"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedPnL.sell_date ? selectedPnL.sell_date.split('T')[0] : new Date().toISOString().split('T')[0]}
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Số tiền Lãi/Lỗ (VND)</label>
                  <input
                    name="pnl_amount"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedPnL.pnl_amount}
                    placeholder="Ví dụ: -2041749 hoặc 912400"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">% Lãi/Lỗ</label>
                  <input
                    name="pnl_percent"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    defaultValue={selectedPnL.pnl_percent}
                    placeholder="Ví dụ: -13.88 hoặc 10.34"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                type="submit"
                className="w-full bg-[#6b21a8] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-95 transition-opacity"
              >
                Lưu
              </button>
              {selectedPnL.id && (
                <button
                  type="button"
                  onClick={() => handleDeletePnL(selectedPnL.id!)}
                  className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-95 transition-opacity"
                >
                  Xóa bản ghi
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

      {/* Date Filter Modal */}
      {dateModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-stretch justify-center"
          onClick={() => setDateModalOpen(false)}
        >
          <div
            className="w-full h-full bg-white p-4 shadow-xl flex flex-col justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                Chọn khoảng thời gian
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Từ ngày</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Đến ngày</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => setDateModalOpen(false)}
                className="w-full bg-[#6b21a8] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-opacity-95 transition-opacity"
              >
                Xác nhận
              </button>
              <button
                type="button"
                onClick={() => {
                  const todayStr = new Date().toISOString().split('T')[0];
                  setStartDate('2026-03-01');
                  setEndDate(todayStr);
                  setDateModalOpen(false);
                }}
                className="w-full border-2 border-slate-300 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors"
              >
                Đặt lại (01/03/2026 - Nay)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
