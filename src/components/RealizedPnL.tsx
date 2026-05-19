import { ChevronLeft, Search, ArrowRight, ChevronUp, Home, TrendingUp, Wallet } from 'lucide-react';

interface RealizedPnLProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function RealizedPnL({ onNavigate }: RealizedPnLProps) {
  return (
    <div className="w-full max-w-[421px] min-h-[613px] bg-[#f8f8fb] relative flex flex-col shadow-xl overflow-hidden pb-16 mx-auto">
      {/* Header */}
      <header className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm border-b border-[#e2e8f0]">
        <button onClick={() => onNavigate('home')} className="w-8 h-8 flex items-center justify-center text-[#1e293b]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[17px] font-semibold text-[#1e293b]">Lãi lỗ đã thực hiện</h1>
        <button className="flex items-center space-x-1 border border-gray-300 rounded-full px-3 py-1 bg-white text-sm font-medium">
          <span>TK</span>
          <span className="w-5 h-5 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs">1</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Filters */}
        <section className="space-y-3">
          {/* Date Range Buttons */}
          <div className="flex space-x-2">
            <button className="flex-1 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#1e293b] hover:bg-gray-50 outline-none">
              Hôm nay
            </button>
            <button className="flex-[2] py-2 bg-white border border-[#6b21a8] rounded-lg text-sm font-medium text-[#6b21a8] flex items-center justify-center space-x-2 hover:bg-[#e9d5ff] outline-none">
              <span>01/03/2026</span>
              <ArrowRight className="w-3 h-3" />
              <span>30/04/2026</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              className="w-full py-2.5 pl-4 pr-10 bg-white border border-[#e2e8f0] rounded-lg text-sm outline-none focus:border-[#6b21a8] focus:ring-1 focus:ring-[#6b21a8] transition-colors"
              placeholder="Mã CK"
              type="text"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Summary Banner */}
        <section className="bg-white rounded-xl p-4 flex justify-between items-center border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
          <span className="font-bold text-[#1e293b] text-base">Tổng cộng</span>
          <div className="text-right flex items-center space-x-3">
            <span className="font-bold text-[#dc2626] text-base">-7,707,359</span>
            <span className="font-bold text-[#dc2626] text-sm">-6.73%</span>
          </div>
        </section>

        {/* Transaction List */}
        <section className="space-y-2">
          {/* Transaction Item: Profit */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">11/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">MSR</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#16a34a]">912,400</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#16a34a]">10.34%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Transaction Item: Loss */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">17/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">BSR</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-2,041,749</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-13.88%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Transaction Item: Loss */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">17/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">BSR</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-4,755,250</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-12.93%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Transaction Item: Loss */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">17/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">PC1</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-361,475</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-6.48%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Transaction Item: Loss */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">19/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">BSR</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-44,724</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-2.85%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Transaction Item: Loss */}
          <article className="bg-white rounded-xl p-3 border border-[#e2e8f0]" style={{ boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' }}>
            <div className="flex justify-between items-center w-full">
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Ngày</div>
                <div className="text-sm text-[#1e293b]">19/03/2026</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Mã CK</div>
                <div className="text-sm font-bold text-[#1e293b]">BSR</div>
              </div>
              <div className="w-1/4 text-center">
                <div className="text-xs text-[#64748b] mb-1 font-medium">Lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-1,416,561</div>
              </div>
              <div className="w-1/4 text-center flex flex-col items-center relative">
                <div className="text-xs text-[#64748b] mb-1 font-medium">%lãi/lỗ</div>
                <div className="text-sm font-bold text-[#dc2626]">-3.01%</div>
                <button className="absolute -right-1 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </article>
        </section>

        <div className="h-4"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-[#e2e8f0] pb-6 pt-2 px-2 z-30" style={{ boxShadow: '0 -4px 12px -4px rgba(0, 0, 0, 0.05)' }}>
        <ul className="flex justify-between items-center text-[10px] font-medium text-[#64748b] pb-2">
          <li className="flex-1">
            <a className="flex flex-col items-center space-y-1 hover:text-[#6b21a8] transition-colors" href="#">
              <Home className="w-5 h-5 mb-0.5" />
              <span>Trang chủ</span>
            </a>
          </li>
          <li className="flex-1">
            <a className="flex flex-col items-center space-y-1 hover:text-[#6b21a8] transition-colors" href="#">
              <TrendingUp className="w-5 h-5 mb-0.5" />
              <span>Thị trường</span>
            </a>
          </li>
          <li className="flex-1">
            <a className="flex flex-col items-center space-y-1 hover:text-[#6b21a8] transition-colors" href="#">
              <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Giao dịch</span>
            </a>
          </li>
          <li className="flex-1">
            <a className="flex flex-col items-center space-y-1 text-[#6b21a8]" href="#">
              <Wallet className="w-5 h-5 mb-0.5" />
              <span>Tài sản</span>
            </a>
          </li>
          <li className="flex-1">
            <a className="flex flex-col items-center space-y-1 hover:text-[#6b21a8] transition-colors" href="#">
              <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Tất cả</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
