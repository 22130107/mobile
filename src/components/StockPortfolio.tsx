import { Fragment, useState } from 'react';
import { ChevronLeft, Search, ChevronRight, EyeOff, BookOpen, Menu, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface StockData {
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

const stocksData: StockData[] = [
  {
    symbol: 'FTS',
    costPrice: '27.94',
    marketPrice: '27.10',
    quantity: '1',
    pnlPercent: '-3.01%',
    isPositive: false,
    totalCapital: '27,940',
    marketValue: '27,100',
    pnlAmount: '-840',
    totalQty: '1',
    normalQty: '1',
    fsQty: '0',
    sellableQty: '1',
    outroom: '0',
    otherQty: '0',
    cpctBonus: '0',
    t0: '0',
    t1: '0',
    t2: '0',
  },
  {
    symbol: 'GAS',
    costPrice: '80.12',
    marketPrice: '93.00',
    quantity: '1',
    pnlPercent: '+16.08%',
    isPositive: true,
    totalCapital: '80,120',
    marketValue: '93,000',
    pnlAmount: '+12,880',
    totalQty: '1',
    normalQty: '1',
    fsQty: '0',
    sellableQty: '1',
    outroom: '0',
    otherQty: '0',
    cpctBonus: '0',
    t0: '0',
    t1: '0',
    t2: '0',
  },
];

interface StockPortfolioProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function StockPortfolio({ onNavigate }: StockPortfolioProps) {
  const [expandedStocks, setExpandedStocks] = useState<string[]>([]);
  const [buyModalStock, setBuyModalStock] = useState<StockData | null>(null);

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
        <div className="flex-1 text-center pb-1.5 relative text-[13px] font-semibold text-slate-900 border-b-[2px] border-[#8438FF] flex items-center justify-center gap-1">
          Tài khoản <span className="bg-[#8438FF] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none">1</span>
        </div>
        <div className="flex-1 text-center pb-1.5 text-[13px] text-slate-500 font-semibold flex items-center justify-center gap-1">
          Tài khoản <span className="bg-slate-400 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none">3</span>
        </div>
        <div className="flex-1 text-center pb-1.5 text-[13px] text-slate-500 font-semibold flex items-center justify-center gap-1">
          Tài khoản <span className="bg-slate-400 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full leading-none">6</span>
        </div>
      </nav>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-48 bg-white">
        {/* Asset Summary Card */}
        <section className="p-4 pb-[180px] bg-white">
          <div className="bg-[#EFE7FF] rounded-2xl">
            <div className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7146FF 0%, #9F62FF 100%)' }}>
              <div className="absolute right-0 bottom-0 opacity-10">
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
                  <span className="text-[28px] font-bold leading-tight">0</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="font-bold text-lg">0</span>
                  <button>
                    <EyeOff className="w-5 h-5 opacity-90" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-white/90 mt-3 relative z-10">
                <span className="text-[13px]">Sức mua</span>
                <span className="font-bold text-[13px]">0 VND</span>
              </div>
            </div>
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-2 pt-3 pb-3 px-2 rounded-b-2xl">
              <button
                onClick={() => onNavigate('orderbook')}
                className="flex flex-col items-center justify-center text-center gap-1 rounded-lg p-2 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-slate-800">Sổ lệnh</span>
              </button>
              <div className="flex flex-col items-center justify-center text-center gap-1 rounded-lg p-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-800">Ứng tiền</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1 rounded-lg p-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="border-[1.5px] border-slate-800 rounded p-1 flex items-center justify-center w-6 h-6">
                    <span className="text-[14px] font-semibold text-slate-800 leading-none pb-0.5">$</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-800">Margin</span>
              </div>
              <button
                onClick={() => onNavigate('utilities')}
                className="flex flex-col items-center justify-center text-center gap-1 rounded-lg p-2 hover:bg-purple-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Menu className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-slate-800">Xem thêm</span>
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
          <div className="px-4">
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
                    <span className="font-bold text-[15px] text-[#13A849]">+12,039</span>
                    <span className="bg-[#13A849]/10 text-[#13A849] text-[11px] px-1.5 py-0.5 rounded-full font-bold">+11.14%</span>
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
                  <div className="flex items-center text-slate-700">
                    <span className="text-[13px] font-medium">Tổng vốn</span>
                    <svg className="w-5 h-5 text-slate-400 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-[15px] text-slate-900">108,061</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[13px] font-medium">Tổng giá trị thị trường</span>
                  </div>
                  <span className="font-bold text-[15px] text-slate-900">120,100</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <label className="flex items-center space-x-2">
                  <input className="rounded border-slate-300 text-[#8438FF] focus:ring-[#8438FF] w-5 h-5 bg-slate-100" type="checkbox" />
                  <span className="text-[15px] text-slate-700">Ẩn khối lượng</span>
                </label>
                <button className="border border-[#DF3C40] text-[#DF3C40] text-[13px] px-4 py-1.5 rounded-full font-medium">
                  Bán nhiều mã
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase">Mã CP</th>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-left">GIÁ VỐN</th>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-left">GIÁ TT</th>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-right">
                        <div className="flex items-center justify-end">
                          KL
                          <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"></path>
                          </svg>
                        </div>
                      </th>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-right">LÃI/LỖ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stocksData.map((stock) => (
                      <Fragment key={stock.symbol}>
                        <tr
                          className="cursor-pointer active:bg-slate-50"
                          onClick={() => toggleStock(stock.symbol)}
                        >
                          <td className="py-4">
                            <div className={`flex items-center font-bold text-[15px] ${stock.isPositive ? 'text-[#13A849]' : 'text-[#DF3C40]'}`}>
                              {stock.symbol}
                              {expandedStocks.includes(stock.symbol) ? (
                                <ChevronUp className="w-4 h-4 ml-0.5" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-0.5" />
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-left font-bold text-slate-900">{stock.costPrice}</td>
                          <td className="py-4 text-left font-bold text-slate-900">{stock.marketPrice}</td>
                          <td className="py-4 text-right font-bold text-slate-900">{stock.quantity}</td>
                          <td className={`py-4 text-right font-bold ${stock.isPositive ? 'text-[#13A849]' : 'text-[#DF3C40]'}`}>{stock.pnlPercent}</td>
                        </tr>
                        {expandedStocks.includes(stock.symbol) && (
                          <tr>
                            <td colSpan={5} className="p-0">
                              <div className="bg-white px-4 py-4 space-y-4">
                                {/* Summary Row */}
                                <div className="grid grid-cols-3 gap-2 bg-[#F8F9FB] rounded-lg p-3 border border-slate-100">
                                  <div className="text-center">
                                    <div className="text-[11px] text-slate-500 mb-1">Tổng vốn</div>
                                    <div className="text-[14px] font-bold text-slate-900">{stock.totalCapital}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[11px] text-slate-500 mb-1">Giá trị thị trường</div>
                                    <div className="text-[14px] font-bold text-slate-900">{stock.marketValue}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[11px] text-slate-500 mb-1">Lãi / Lỗ</div>
                                    <div className={`text-[14px] font-bold ${stock.isPositive ? 'text-[#13A849]' : 'text-[#DF3C40]'}`}>{stock.pnlAmount}</div>
                                  </div>
                                </div>

                                {/* Detail Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                  {/* Left Column */}
                                  <div className="bg-[#F8F9FB] rounded-lg p-3 border border-slate-100 space-y-2.5">
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">Tổng KL</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.totalQty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">KL thường</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.normalQty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">KL FS</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.fsQty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">KL có thể bán</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.sellableQty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">Outroom</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.outroom}</span>
                                    </div>
                                  </div>

                                  {/* Right Column */}
                                  <div className="bg-[#F8F9FB] rounded-lg p-3 border border-slate-100 space-y-2.5">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1">
                                        <span className="text-[13px] text-slate-600">KL Khác</span>
                                        <Info className="w-3.5 h-3.5 text-slate-400" />
                                      </div>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.otherQty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-[13px] text-slate-600">CPCT/Thưởng</span>
                                      <span className="text-[13px] font-semibold text-slate-900">{stock.cpctBonus}</span>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-slate-100">
                                      <div className="text-[13px] font-semibold text-slate-900 mb-2">KL mua chờ về</div>
                                      <div className="space-y-1.5">
                                        <div className="flex justify-between">
                                          <span className="text-[13px] text-slate-600">KL T0</span>
                                          <span className="text-[13px] font-semibold text-slate-900">{stock.t0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-[13px] text-slate-600">KL T1</span>
                                          <span className="text-[13px] font-semibold text-slate-900">{stock.t1}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-[13px] text-slate-600">KL T2</span>
                                          <span className="text-[13px] font-semibold text-slate-900">{stock.t2}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2 pt-1">
                                  <button
                                    className="border-2 border-[#13A849] text-[#13A849] font-semibold py-2.5 rounded-full text-[14px]"
                                    onClick={() => setBuyModalStock(stock)}
                                  >
                                    Mua
                                  </button>
                                  <button className="border-2 border-[#DF3C40] text-[#DF3C40] font-semibold py-2.5 rounded-full text-[14px]">
                                    Bán
                                  </button>
                                  <button className="border-2 border-slate-300 text-slate-700 font-semibold py-2.5 rounded-full text-[14px]">
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
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar & Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50">
        <div className="px-4 py-2.5 flex space-x-3 bg-white">
          <button className="flex-1 bg-[#13A849] text-white font-medium py-3 rounded-full text-[15px]">
            MUA
          </button>
          <button className="flex-1 bg-[#DF3C40] text-white font-medium py-3 rounded-full text-[15px]">
            BÁN
          </button>
        </div>
        <nav className="flex justify-between items-center pt-2 pb-6 px-4 bg-white border-t border-slate-100">
          <div className="flex flex-col items-center w-1/5">
            <svg className="w-6 h-6 text-[#8438FF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span className="text-[10px] text-[#8438FF] mt-1 font-semibold">Trang chủ</span>
          </div>
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
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 13h-4v-4h4v4zm0-6h-4v-4h4v4zm-6 0h-4v-4h4v4zm0 6h-4v-4h4v4zm-6 0h-4v-4h4v4zm0-6h-4v-4h4v4zm0 12h-4v-4h4v4zm6 0h-4v-4h4v4zm6 0h-4v-4h4v4z"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Tài sản</span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Tất cả</span>
          </div>
        </nav>
      </div>

      {buyModalStock && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-stretch justify-center"
          onClick={closeBuyModal}
        >
          <div
            className="w-full h-full bg-white p-4 shadow-xl overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Mã CP</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.symbol}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Giá vốn</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.costPrice}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Giá TT</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.marketPrice}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Tổng KL</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.totalQty}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL thường</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.normalQty}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL FS</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.fsQty}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL có thể bán</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.sellableQty}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">Outroom</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.outroom}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">KL khác</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.otherQty}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">CPCT/Thưởng</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.cpctBonus}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">T0</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t0}
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-slate-700">T1</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t1}
                  type="text"
                />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-[12px] font-semibold text-slate-700">T2</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[16px] sm:text-[13px]"
                  defaultValue={buyModalStock.t2}
                  type="text"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full border-2 border-slate-400 text-slate-800 font-semibold py-2 rounded-lg text-[14px]">
                Luu
              </button>
              <button
                className="w-full border-2 border-slate-400 text-slate-800 font-semibold py-2 rounded-lg text-[14px]"
                onClick={closeBuyModal}
              >
                Thoat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
