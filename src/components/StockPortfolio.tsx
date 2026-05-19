import { ChevronLeft, Search, ChevronRight, EyeOff, BookOpen, Menu } from 'lucide-react';

interface StockPortfolioProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function StockPortfolio({ onNavigate }: StockPortfolioProps) {
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
                    <span className="text-[15px] font-medium">Lãi lỗ danh mục</span>
                    <EyeOff className="w-5 h-5 text-slate-400 ml-1.5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[17px] text-[#13A849]">+12,039</span>
                    <span className="bg-[#13A849]/10 text-[#13A849] text-[12px] px-1.5 py-0.5 rounded-full font-bold">+11.14%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[15px] font-medium">Lãi/Lỗ hôm nay</span>
                    <svg className="w-5 h-5 text-slate-400 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-[17px] text-slate-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[15px] font-medium">Tổng vốn</span>
                    <svg className="w-5 h-5 text-slate-400 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-[17px] text-slate-900">108,061</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-slate-700">
                    <span className="text-[15px] font-medium">Tổng giá trị thị trường</span>
                  </div>
                  <span className="font-bold text-[17px] text-slate-900">120,100</span>
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
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-right">GIÁ VỐN</th>
                      <th className="py-2 text-[12px] font-medium text-slate-500 uppercase text-right">GIÁ TT</th>
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
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center text-[#DF3C40] font-bold text-[15px]">
                          FTS
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"></path>
                          </svg>
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-slate-900">27.94</td>
                      <td className="py-4 text-right font-bold text-slate-900">27.10</td>
                      <td className="py-4 text-right font-bold text-slate-900">1</td>
                      <td className="py-4 text-right font-bold text-[#DF3C40]">-3.01%</td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center text-[#13A849] font-bold text-[15px]">
                          GAS
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"></path>
                          </svg>
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-slate-900">80.12</td>
                      <td className="py-4 text-right font-bold text-slate-900">93.00</td>
                      <td className="py-4 text-right font-bold text-slate-900">1</td>
                      <td className="py-4 text-right font-bold text-[#13A849]">+16.08%</td>
                    </tr>
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
    </div>
  );
}
