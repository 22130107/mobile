import { Fragment, useState, useEffect } from 'react';
import { ChevronLeft, Search, ChevronRight, EyeOff, ChevronUp, ChevronDown, Info } from 'lucide-react';
import { stockService } from '../services/stockService';

interface StockData {
  id?: string;
  symbol: string;
  costPrice: string;
  marketPrice: string;
  quantity: string;
  pnlPercent: string;
  isPositive: boolean;
  totalCapital: string;
  marketValue: string;
  pnlAmount: string;
  totalQty: string;
  normalQty: string;
  fsQty: string;
  sellableQty: string;
  outroom: string;
  otherQty: string;
  cpctBonus: string;
  t0: string;
  t1: string;
  t2: string;
}

const defaultNewStock: StockData = {
  symbol: '',
  costPrice: '0',
  marketPrice: '0',
  quantity: '0',
  pnlPercent: '0.00%',
  isPositive: true,
  totalCapital: '0',
  marketValue: '0',
  pnlAmount: '0',
  totalQty: '0',
  normalQty: '0',
  fsQty: '0',
  sellableQty: '0',
  outroom: '0',
  otherQty: '0',
  cpctBonus: '0',
  t0: '0',
  t1: '0',
  t2: '0',
};

interface StockPortfolioProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function StockPortfolio({ onNavigate }: StockPortfolioProps) {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStocks, setExpandedStocks] = useState<string[]>([]);
  const [buyModalStock, setBuyModalStock] = useState<StockData | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<number>(1);
  const [hideVolume, setHideVolume] = useState(false);

  const loadStocks = async (accId = selectedAccount) => {
    try {
      setLoading(true);
      const data = await stockService.getAll(accId);
      setStocks(data.map(stockService.computeDisplayData));
    } catch (error) {
      console.error('Lỗi khi tải danh sách cổ phiếu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStocks(selectedAccount);
  }, [selectedAccount]);

  const toggleStock = (symbol: string) => {
    setExpandedStocks((current) => (
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    ));
  };

  const closeBuyModal = () => {
    setBuyModalStock(null);
  };

  const handleSaveStock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const symbol = (formData.get('symbol') as string).toUpperCase().trim();
    if (!symbol) return;

    const cost_price = parseFloat(formData.get('costPrice') as string) || 0;
    const market_price = parseFloat(formData.get('marketPrice') as string) || 0;
    const total_qty = parseInt(formData.get('totalQty') as string) || 0;
    const normal_qty = parseInt(formData.get('normalQty') as string) || 0;
    const fs_qty = parseInt(formData.get('fsQty') as string) || 0;
    const sellable_qty = parseInt(formData.get('sellableQty') as string) || 0;
    const outroom = parseInt(formData.get('outroom') as string) || 0;
    const other_qty = parseInt(formData.get('otherQty') as string) || 0;
    const cpct_bonus = parseInt(formData.get('cpctBonus') as string) || 0;
    const t0 = parseInt(formData.get('t0') as string) || 0;
    const t1 = parseInt(formData.get('t1') as string) || 0;
    const t2 = parseInt(formData.get('t2') as string) || 0;

    try {
      const existing = await stockService.getBySymbol(symbol, selectedAccount);
      
      const payload = {
        symbol,
        cost_price,
        market_price,
        total_qty,
        normal_qty,
        fs_qty,
        sellable_qty,
        outroom,
        other_qty,
        cpct_bonus,
        t0,
        t1,
        t2,
        account_id: selectedAccount
      };

      if (existing) {
        await stockService.update(existing.id, payload);
      } else {
        await stockService.create(payload);
      }

      closeBuyModal();
      loadStocks();
    } catch (error) {
      console.error('Lỗi khi lưu cổ phiếu:', error);
      alert('Không thể lưu cổ phiếu. Vui lòng kiểm tra lại kết nối!');
    }
  };

  const handleDeleteStock = async (stock: StockData) => {
    if (!stock.id) return;
    if (!window.confirm(`Bạn có chắc chắn muốn bán hết toàn bộ mã ${stock.symbol}?`)) {
      return;
    }
    try {
      await stockService.delete(stock.id);
      loadStocks();
    } catch (error) {
      console.error('Lỗi khi xóa cổ phiếu:', error);
      alert('Không thể bán cổ phiếu. Vui lòng kiểm tra lại!');
    }
  };

  // Tính toán các giá trị tổng hợp từ danh sách stocks hiện tại
  const calcTotalCapital = stocks.reduce((sum, item) => sum + parseFloat(item.totalCapital.replace(/[,.]/g, '')), 0);
  const calcTotalMarketValue = stocks.reduce((sum, item) => sum + parseFloat(item.marketValue.replace(/[,.]/g, '')), 0);
  const totalPnLVal = calcTotalMarketValue - calcTotalCapital;
  const totalPnLPct = calcTotalCapital > 0 ? (totalPnLVal / calcTotalCapital) * 100 : 0;
  const isPnLPositive = totalPnLVal >= 0;

  const totalCapitalFormatted = calcTotalCapital.toLocaleString('en-US');
  const totalMarketValueFormatted = calcTotalMarketValue.toLocaleString('en-US');
  const totalPnLAmountFormatted = `${isPnLPositive ? '+' : ''}${totalPnLVal.toLocaleString('en-US')}`;
  const totalPnLPercentFormatted = `${isPnLPositive ? '+' : ''}${totalPnLPct.toFixed(2)}%`;

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-white font-sans">
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-3 py-2 bg-white">
        <button onClick={() => onNavigate('home')} className="p-1 text-slate-800">
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <h1
          className="font-bold text-slate-900"
          style={{ margin: 0, fontSize: '18px', lineHeight: '1.2' }}
        >
          Cổ phiếu
        </h1>
        <button className="p-1 text-slate-800">
          <Search className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </header>

      {/* Account Tabs */}
      <nav className="bg-white border-b border-slate-200 flex overflow-x-auto pt-1" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {[1, 3, 6].map((accId) => {
          const isActive = selectedAccount === accId;
          return (
            <button
              key={accId}
              onClick={() => setSelectedAccount(accId)}
              className={`flex-1 text-center pb-1.5 text-[13px] font-semibold flex items-center justify-center gap-1 transition-all focus:outline-none ${
                isActive
                  ? 'text-slate-900 border-b-[2px] border-[#8438FF]'
                  : 'text-slate-500'
              }`}
            >
              Tài khoản{' '}
              <span
                className={`text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none transition-colors ${
                  isActive ? 'bg-[#8438FF]' : 'bg-slate-400'
                }`}
              >
                {accId}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-48 bg-white">
        {/* Asset Summary Card */}
        <section className="p-4 pb-[180px] bg-white">
          <div className="bg-[#EFE7FF] rounded-2xl">
            <div className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #182570 0%, #3e1b78 50%, #762391 100%)' }}>
              <div className="absolute right-0 bottom-0 opacity-12">
                <svg fill="currentColor" height="120" viewBox="0 0 100 100" width="120">
                  <rect height="60" rx="10" transform="rotate(45 50 50)" width="60" x="20" y="20"></rect>
                </svg>
              </div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex flex-col">
                  <button className="flex items-center text-white/90 text-[13px] font-medium mb-1">
                    Tài sản ròng
                    <ChevronRight className="w-4 h-4 ml-0.5" strokeWidth={2} />
                  </button>
                  <span className="text-[28px] font-bold leading-tight">{totalMarketValueFormatted}</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="font-bold text-lg">{totalMarketValueFormatted}</span>
                  <button>
                    <EyeOff className="w-5 h-5 opacity-90" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-white/90 mt-3 relative z-10">
                <span className="text-[13px]">Sức mua</span>
                <span className="font-bold text-[13px]">100,000,000 VND</span>
              </div>
            </div>
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-1 pt-3 pb-3 px-1 rounded-b-2xl">
              <button
                onClick={() => onNavigate('orderbook')}
                className="flex flex-col items-center justify-center text-center gap-1.5 rounded-xl p-2 hover:bg-purple-50 active:scale-95 transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-[26px] h-[26px] text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" fill="none" />
                    <rect x="9" y="3" width="6" height="4" rx="1" fill="none" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="16" x2="13" y2="16" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Sổ lệnh</span>
              </button>
              <div className="flex flex-col items-center justify-center text-center gap-1.5 rounded-xl p-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-[26px] h-[26px] text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" fill="none" />
                    <path d="M12 8v8" />
                    <path d="M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" />
                    <path d="M2 12h3M19 12h3" />
                    <path d="M4.5 7l2 1.5M17.5 15.5l2 1.5" />
                    <path d="M4.5 17l2-1.5M17.5 8.5l2-1.5" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Ứng tiền</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1.5 rounded-xl p-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-[26px] h-[26px] text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="6" width="18" height="12" rx="2" fill="none" />
                    <path d="M12 10v4" />
                    <path d="M13.5 10.8h-2.2a0.8 0.8 0 0 0 0 1.6h1.4a0.8 0.8 0 0 1 0 1.6h-2.2" />
                    <path d="M3 10h2M19 10h2" />
                    <circle cx="6" cy="14" r="0.5" fill="currentColor" />
                    <circle cx="18" cy="14" r="0.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Margin</span>
              </div>
              <button
                onClick={() => onNavigate('utilities')}
                className="flex flex-col items-center justify-center text-center gap-1.5 rounded-xl p-2 hover:bg-purple-50 active:scale-95 transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-[26px] h-[26px] text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="6" height="6" rx="1.5" fill="none" />
                    <rect x="14" y="4" width="6" height="6" rx="1.5" fill="none" />
                    <rect x="4" y="14" width="6" height="6" rx="1.5" fill="none" />
                    <rect x="14" y="14" width="6" height="6" rx="1.5" fill="none" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-slate-700">Xem thêm</span>
              </button>
            </div>
          </div>
        </section>

        <div className="h-2 bg-[#F6F6F6] w-full border-t border-slate-200"></div>

        {/* Portfolio Detail Section */}
        <section className="bg-white rounded-t-3xl pt-2 pb-6 border-t border-slate-200 shadow-[0_-6px_14px_-12px_rgba(0,0,0,0.35)]">
          <div className="flex justify-center pt-2 pb-4">
            <div className="w-10 h-1 bg-slate-300 rounded-full"></div>
          </div>
          <div className="px-2">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-[16px] font-semibold text-slate-900 m-0">
                Danh mục nắm giữ
              </h2>
              <h2 className="text-[16px] font-medium text-gray-400 m-0">Cơ cấu danh mục</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-[#F6F5F8] rounded-[24px] p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[13px] font-medium">Lãi lỗ danh mục</span>
                    <EyeOff className="w-5 h-5 text-slate-400 ml-1.5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`font-bold text-[15px] ${isPnLPositive ? 'text-[#129A43]' : 'text-[#d82034]'}`}>
                      {totalPnLAmountFormatted}
                    </span>
                    <span className={`${isPnLPositive ? 'bg-[#129A43]/10 text-[#129A43]' : 'bg-[#d82034]/10 text-[#d82034]'} text-[11px] px-1.5 py-0.5 rounded-full font-bold`}>
                      {totalPnLPercentFormatted}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[13px] font-medium">Lãi/Lỗ hôm nay</span>
                    <svg className="w-5 h-5 text-slate-400 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-[15px] text-slate-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-500">
                    <span className="text-[13px] font-normal">Tổng vốn</span>
                    <svg className="w-5 h-5 text-slate-400 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold text-[15px] text-slate-900">{totalCapitalFormatted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-500">
                    <span className="text-[13px] font-normal">Tổng giá trị thị trường</span>
                  </div>
                  <span className="font-semibold text-[15px] text-slate-900">{totalMarketValueFormatted}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <label className="flex items-center space-x-2">
                  <input
                    className="rounded border-slate-300 text-[#8438FF] focus:ring-[#8438FF] w-5 h-5 bg-slate-100"
                    type="checkbox"
                    checked={hideVolume}
                    onChange={(e) => setHideVolume(e.target.checked)}
                  />
                  <span className="text-[15px] text-slate-700">Ẩn khối lượng</span>
                </label>
                <button className="border border-[#d82034] text-[#d82034] text-[13px] px-4 py-1.5 rounded-full font-medium">
                  Bán nhiều mã
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8 text-slate-400 text-sm">Đang tải danh sách cổ phiếu...</div>
              ) : stocks.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">Chưa có cổ phiếu nào. Hãy nhấn Mua để bắt đầu!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-fixed">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase w-[10%]">Mã CP</th>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase text-left w-[5%]"></th>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase text-left w-[17%] pl-3">GIÁ VỐN</th>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase text-left w-[17%]">GIÁ TT</th>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase text-right w-[20%]">
                          <div className="flex items-center justify-end">
                            KL
                            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 10l5 5 5-5z"></path>
                            </svg>
                          </div>
                        </th>
                        <th className="py-1.5 text-[11px] font-medium text-slate-500 uppercase text-right w-[29%]">LÃI/LỖ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocks.map((stock) => (
                        <Fragment key={stock.symbol}>
                          <tr
                            className="cursor-pointer active:bg-slate-50"
                            onClick={() => toggleStock(stock.symbol)}
                          >
                            <td className="py-2.5">
                              <div className={`font-bold text-[13px] ${stock.isPositive ? 'text-[#129A43]' : 'text-[#d82034]'}`}>
                                {stock.symbol}
                              </div>
                            </td>
                            <td className="py-2.5 text-left pl-0">
                              {expandedStocks.includes(stock.symbol) ? (
                                <ChevronUp className="w-3.5 h-3.5 text-slate-400 inline-block" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 inline-block" />
                              )}
                            </td>
                            <td className="py-2.5 text-left font-bold text-slate-900 text-[13px] pl-3">{stock.costPrice}</td>
                            <td className="py-2.5 text-left font-bold text-slate-900 text-[13px]">{stock.marketPrice}</td>
                            <td className="py-2.5 text-right font-bold text-slate-900 text-[13px]">
                              {hideVolume ? '***' : stock.sellableQty}
                            </td>
                            <td className={`py-2.5 text-right text-[13px] ${stock.isPositive ? 'font-medium text-[#129A43]' : 'font-bold text-[#d82034]'}`}>{stock.pnlPercent}</td>
                          </tr>
                          {expandedStocks.includes(stock.symbol) && (
                            <tr>
                              <td colSpan={6} className="p-0">
                                <div className="bg-white px-0 py-3.5 space-y-3">
                                  {/* Summary Row */}
                                  <div className="grid grid-cols-3 gap-2 bg-[#f6f5fb] rounded-xl p-2.5 py-2">
                                    <div className="text-center">
                                      <div className="text-[13px] text-[#828282] mb-0.5">Tổng vốn</div>
                                      <div className="text-[13px] font-semibold text-black">{stock.totalCapital}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-[13px] text-[#828282] mb-0.5">Giá trị thị trường</div>
                                      <div className="text-[13px] font-semibold text-black">{stock.marketValue}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-[13px] text-[#828282] mb-0.5">Lãi / Lỗ</div>
                                      <div className={`text-[13px] ${stock.isPositive ? 'font-medium text-[#129A43]' : 'font-bold text-[#d82034]'}`}>{stock.pnlAmount}</div>
                                    </div>
                                  </div>
   
                                  {/* Detail Grid */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {/* Left Column */}
                                    <div className="bg-[#f6f5fb] rounded-xl p-2.5 py-2 flex flex-col justify-between h-full">
                                      <div className="flex justify-between items-center">
                                        <span className="text-[13px] text-[#828282]">Tổng KL</span>
                                        <span className="text-[13px] font-semibold text-black">{stock.totalQty}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-[13px] text-[#828282]">KL thường</span>
                                        <span className="text-[13px] font-semibold text-black">{stock.normalQty}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-[13px] text-[#828282]">KL FS</span>
                                        <span className="text-[13px] font-semibold text-black">{stock.fsQty}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-[13px] text-[#828282]">KL có thể bán</span>
                                        <span className="text-[13px] font-semibold text-black">{stock.sellableQty}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-[13px] text-[#828282]">Outroom</span>
                                        <span className="text-[13px] font-semibold text-black">{stock.outroom}</span>
                                      </div>
                                    </div>
   
                                    {/* Right Column Container */}
                                    <div className="flex flex-col gap-2">
                                      {/* Top Box */}
                                      <div className="bg-[#f6f5fb] rounded-xl p-2.5 py-2 space-y-1.5">
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center gap-1">
                                            <span className="text-[13px] text-[#828282]">KL Khác</span>
                                            <Info className="w-3.5 h-3.5 text-[#828282]" />
                                          </div>
                                          <span className="text-[13px] font-semibold text-black">{stock.otherQty}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-[13px] text-[#828282]">CPCT/Thưởng</span>
                                          <span className="text-[13px] font-semibold text-black">{stock.cpctBonus}</span>
                                        </div>
                                      </div>
 
                                      {/* Bottom Box */}
                                      <div className="bg-[#f6f5fb] rounded-xl p-2.5 py-2 space-y-1.5">
                                        <div className="text-[13px] font-medium text-black">KL mua chờ về</div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-[13px] text-[#828282]">KL T0</span>
                                          <span className="text-[13px] font-semibold text-black">{stock.t0}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-[13px] text-[#828282]">KL T1</span>
                                          <span className="text-[13px] font-semibold text-black">{stock.t1}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-[13px] text-[#828282]">KL T2</span>
                                          <span className="text-[13px] font-semibold text-black">{stock.t2}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
   
                                  {/* Action Buttons */}
                                  <div className="grid grid-cols-3 gap-2 pt-0.5">
                                    <button
                                      className="border-[1.5px] border-[#129A43] text-[#129A43] font-semibold py-2 rounded-full text-[14px] hover:bg-green-50 transition-colors"
                                      onClick={() => setBuyModalStock(stock)}
                                    >
                                      Mua
                                    </button>
                                    <button
                                      className="border-[1.5px] border-[#d82034] text-[#d82034] font-semibold py-2 rounded-full text-[14px] hover:bg-red-50 transition-colors"
                                      onClick={() => handleDeleteStock(stock)}
                                    >
                                      Bán
                                    </button>
                                    <button className="border-[1.5px] border-[#828282] text-[#4F4F4F] font-semibold py-2 rounded-full text-[14px] hover:bg-slate-50 transition-colors">
                                      Thông tin mã
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar & Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50">
        <div className="px-4 py-2.5 flex space-x-3 bg-white">
          <button
            onClick={() => setBuyModalStock(defaultNewStock)}
            className="flex-1 bg-[#129A43] text-white font-medium py-3 rounded-full text-[15px] hover:bg-opacity-90 active:scale-95 transition-transform"
          >
            MUA
          </button>
          <button className="flex-1 bg-[#d82034] text-white font-medium py-3 rounded-full text-[15px] hover:bg-opacity-90 active:scale-95 transition-transform">
            BÁN
          </button>
        </div>
        <nav className="flex justify-between items-center pt-2 pb-6 px-4 bg-white border-t border-slate-100">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center w-1/5 outline-none">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Trang chủ</span>
          </button>
          <div className="flex flex-col items-center w-1/5">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Thị trường</span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Giao dịch</span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <svg className="w-6 h-6 text-[#8438FF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 13h-4v-4h4v4zm0-6h-4v-4h4v4zm-6 0h-4v-4h4v4zm0 6h-4v-4h4v4zm-6 0h-4v-4h4v4zm0-6h-4v-4h4v4zm0 12h-4v-4h4v4zm6 0h-4v-4h4v4zm6 0h-4v-4h4v4z"></path>
            </svg>
            <span className="text-[10px] text-[#8438FF] mt-1 font-semibold">Tài sản</span>
          </div>
          <button onClick={() => onNavigate('utilities')} className="flex flex-col items-center w-1/5 outline-none">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Tất cả</span>
          </button>
        </nav>
      </div>

      {buyModalStock && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-stretch justify-center"
          onClick={closeBuyModal}
        >
          <form
            key={buyModalStock.symbol || 'new'}
            onSubmit={handleSaveStock}
            className="w-full h-full bg-white p-4 shadow-xl overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Mã CP</label>
                <input
                  name="symbol"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px] uppercase"
                  defaultValue={buyModalStock.symbol}
                  placeholder="VIX, FTS..."
                  required
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Giá vốn</label>
                <input
                  name="costPrice"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.costPrice}
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Giá TT</label>
                <input
                  name="marketPrice"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.marketPrice}
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Tổng KL</label>
                <input
                  name="totalQty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.totalQty.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL thường</label>
                <input
                  name="normalQty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.normalQty.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL FS</label>
                <input
                  name="fsQty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.fsQty.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL có thể bán</label>
                <input
                  name="sellableQty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.sellableQty.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Outroom</label>
                <input
                  name="outroom"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.outroom.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL khác</label>
                <input
                  name="otherQty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.otherQty.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">CPCT/Thưởng</label>
                <input
                  name="cpctBonus"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.cpctBonus.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">T0</label>
                <input
                  name="t0"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t0.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">T1</label>
                <input
                  name="t1"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t1.replace(/,/g, '')}
                  type="number"
                />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-[12px] font-semibold text-slate-700">T2</label>
                <input
                  name="t2"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t2.replace(/,/g, '')}
                  type="number"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button
                type="submit"
                className="w-full bg-[#129A43] text-white font-semibold py-2.5 rounded-lg text-[14px] hover:bg-opacity-90 transition-opacity"
              >
                Lưu
              </button>
              <button
                type="button"
                className="w-full border-2 border-slate-300 text-slate-600 font-semibold py-2.5 rounded-lg text-[14px] hover:bg-slate-50 transition-colors"
                onClick={closeBuyModal}
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
