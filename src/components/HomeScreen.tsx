import { Search, Bell } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col relative bg-white overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(230, 225, 249, 0.9) 0%, rgba(227, 236, 253, 0.7) 12%, #ffffff 32%)' }}
    >

      {/* Header & Search */}
      <header className="px-4 py-2 flex items-center space-x-3">
        <div className="flex-1 bg-white border border-gray-100 rounded-xl flex items-center px-3 py-2.5 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            className="ml-2 bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Tìm kiếm"
            type="text"
          />
        </div>
        <div className="flex space-x-2">
          {/* Headset support button */}
          <button className="w-[42px] h-[42px] rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-800 shadow-sm hover:bg-gray-50 active:scale-95 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </button>
          {/* Notification button with dot */}
          <button className="w-[42px] h-[42px] rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-800 shadow-sm relative hover:bg-gray-50 active:scale-95 transition-transform">
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 w-[7px] h-[7px] bg-[#DF3C40] rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="px-4 py-3 flex items-center justify-between select-none">
        <div className="flex items-center space-x-3">
          {/* Purple Circle Avatar */}
          <div 
            className="w-12 h-12 shrink-0 rounded-full flex flex-col items-center justify-center text-white text-[13px] font-bold border border-white/20 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)' }}
          >
            <span>HH</span>
            <span className="text-[10px] tracking-widest leading-none -mt-[3px]">...</span>
          </div>
          <div>
            <h2 className="text-[#828282] text-xs font-semibold uppercase tracking-wider">Tài khoản</h2>
            <p className="font-bold text-[#1E293B] text-[15px] leading-tight">***625</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1.5">
            <span className="text-[15px] font-bold text-[#1E293B] leading-none">******</span>
            {/* Custom Eye outline icon */}
            <button className="text-gray-800 focus:outline-none">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-[#828282] font-semibold mt-0.5">*** (*%)</p>
        </div>
      </section>

      {/* Lịch sử giao dịch divider line */}
      <div className="relative flex items-center justify-center my-3 px-4">
        <div className="absolute w-[calc(100%-32px)] h-[1px] bg-purple-100 z-0"></div>
        <button className="relative z-10 bg-white text-[#7526E6] text-xs font-semibold px-4 py-1.5 rounded-full border border-purple-200 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:bg-purple-50 transition-colors">
          Lịch sử giao dịch
        </button>
      </div>

      {/* Quick Actions */}
      <nav className="px-4 py-3 grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E9E7FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:bg-[#E9E7FF]/20 transition-colors">
            <svg className="w-[22px] h-[22px] text-[#7526E6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 7H4M8 3L4 7l4 4M4 17h16M16 13l4 4-4 4" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">Chuyển tiền</span>
        </div>
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E9E7FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:bg-[#E9E7FF]/20 transition-colors">
            <svg className="w-[22px] h-[22px] text-[#7526E6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">Nạp tiền</span>
        </div>
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E9E7FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:bg-[#E9E7FF]/20 transition-colors">
            <svg className="w-[22px] h-[22px] text-[#7526E6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M14 9h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H10" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">INFY</span>
        </div>
        <div className="flex flex-col items-center space-y-2 cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E9E7FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:bg-[#E9E7FF]/20 transition-colors">
            <svg className="w-[22px] h-[22px] text-[#7526E6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="9.5" y="11" width="5" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">SmartOTP</span>
        </div>
      </nav>

      {/* Service Main Card */}
      <main className="px-4 py-2">
        <div
          className="rounded-[24px] overflow-hidden shadow-lg text-white relative animate-fade-in"
          style={{ background: 'linear-gradient(135deg, #431896 0%, #5b21b6 50%, #7c3aed 100%)' }}
        >

          {/* Inset Divider Lines */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Vertical divider line */}
            <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-white/15"></div>
            {/* Left horizontal line */}
            <div className="absolute left-4 right-1/2 mr-4 top-1/2 h-[1px] bg-white/15"></div>
            {/* Right horizontal line */}
            <div className="absolute left-1/2 ml-4 right-4 top-1/2 h-[1px] bg-white/15"></div>
          </div>

          <div className="grid grid-cols-2 relative z-20 w-full">
            {/* Stocks */}
            <button
              onClick={() => onNavigate('portfolio')}
              className="py-6 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-white/18 border border-white/35 flex items-center justify-center mb-2 shadow-[0_2px_10px_rgba(255,255,255,0.05)] transition-transform duration-200 hover:scale-105">
                <svg className="w-[22px] h-[22px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6v12" />
                  <path d="M15 8.5H10.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4H9" />
                  <path d="M18.5 9.5a6.5 6.5 0 0 0-11-2.5" />
                  <polyline points="15 9 19 9 19 5" />
                  <path d="M5.5 14.5a6.5 6.5 0 0 0 11 2.5" />
                  <polyline points="9 15 5 15 5 19" />
                </svg>
              </div>
              <span className="font-bold text-[14px]">Cổ phiếu</span>
            </button>

            {/* Derivatives */}
            <button
              onClick={() => {}}
              className="py-6 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-white/18 border border-white/35 flex items-center justify-center mb-2 shadow-[0_2px_10px_rgba(255,255,255,0.05)] transition-transform duration-200 hover:scale-105">
                <svg className="w-[22px] h-[22px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="13" width="3" height="7" rx="0.5" />
                  <rect x="10.5" y="16" width="3" height="4" rx="0.5" />
                  <rect x="16" y="9" width="3" height="11" rx="0.5" />
                  <path d="M6.5 8L12 11L17.5 4" />
                  <circle cx="6.5" cy="8" r="1.2" fill="currentColor" />
                  <circle cx="12" cy="11" r="1.2" fill="currentColor" />
                  <circle cx="17.5" cy="4" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-[14px]">Phái sinh</span>
            </button>

            {/* Recommendation */}
            <button
              onClick={() => {}}
              className="py-6 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-white/18 border border-white/35 flex items-center justify-center mb-2 shadow-[0_2px_10px_rgba(255,255,255,0.05)] transition-transform duration-200 hover:scale-105">
                <svg className="w-[22px] h-[22px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="13" r="7" />
                  <circle cx="11" cy="13" r="4" />
                  <circle cx="11" cy="13" r="1.5" fill="currentColor" />
                  <path d="M18 6l-5 5" />
                  <path d="M12.5 8.5v3h3" />
                </svg>
              </div>
              <span className="font-bold text-[14px]">Khuyến nghị</span>
            </button>

            {/* Add More */}
            <div className="py-6 px-4 flex items-center justify-center">
              <button className="bg-purple-950/40 hover:bg-purple-950/60 backdrop-blur-sm border border-white/5 rounded-full px-5 py-2 flex items-center justify-center space-x-1.5 transition-colors focus:outline-none">
                <span className="text-sm font-semibold tracking-wide">+ Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Market Indices */}
      <section className="mt-5 mb-28">
        <div className="px-4 flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-900">Chỉ số</h3>
          <button className="text-[#7526E6] font-semibold text-xs">Xem tất cả</button>
        </div>
        <div className="flex overflow-x-auto space-x-3 px-4 scrollbar-hide">
          <div className="min-w-[130px] bg-[#FFF5F5] border border-[#FFD8D8] rounded-xl p-3 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
            <p className="text-gray-500 text-xs font-semibold mb-0.5">VN-INDEX</p>
            <p className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight">1912.93</p>
            <p className="text-[#DF3C40] text-[11px] font-bold">-15.01 (-0.78%)</p>
          </div>
          <div className="min-w-[130px] bg-[#FFF5F5] border border-[#FFD8D8] rounded-xl p-3 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
            <p className="text-gray-500 text-xs font-semibold mb-0.5">VN30</p>
            <p className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight">2027.45</p>
            <p className="text-[#DF3C40] text-[11px] font-bold">-18.92 (-0.92%)</p>
          </div>
          <div className="min-w-[130px] bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
            <p className="text-gray-500 text-xs font-semibold mb-0.5">HNX</p>
            <p className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight">259.5</p>
            <p className="text-[#16A34A] text-[11px] font-bold">+0.25 (+0.1%)</p>
          </div>
          <div className="min-w-[130px] bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
            <p className="text-gray-500 text-xs font-semibold mb-0.5">UPCOM</p>
            <p className="text-[17px] font-bold text-gray-900 mb-0.5 leading-tight">124.2</p>
            <p className="text-[#16A34A] text-[11px] font-bold">+0.12 (+0.09%)</p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex flex-col pt-2 pb-2 z-50">
        <div className="flex items-center justify-between px-2 w-full">
          {/* Trang chủ - Active */}
          <div className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer">
            <svg className="w-[22px] h-[22px] text-[#7526E6]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3M19 10v10a1 1 0 01-1 1h-3M10 21V13h4v8" />
            </svg>
            <span className="text-[10px] mt-1 font-bold text-[#7526E6]">Trang chủ</span>
          </div>

          {/* Thị trường */}
          <div className="flex flex-col items-center justify-center flex-1 py-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="w-[22px] h-[22px] text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7-4.8 4.8" />
            </svg>
            <span className="text-[10px] mt-1 font-medium text-gray-700">Thị trường</span>
          </div>

          {/* Giao dịch */}
          <div className="flex flex-col items-center justify-center flex-1 py-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="w-[22px] h-[22px] text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
              <path d="M9 11h6M9 15h4" />
            </svg>
            <span className="text-[10px] mt-1 font-medium text-gray-700">Giao dịch</span>
          </div>

          {/* Tài sản */}
          <div
            onClick={() => onNavigate('portfolio')}
            className="flex flex-col items-center justify-center flex-1 py-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg className="w-[22px] h-[22px] text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 7v10M22 7v10M12 12v10" />
            </svg>
            <span className="text-[10px] mt-1 font-medium text-gray-700">Tài sản</span>
          </div>

          {/* Tất cả */}
          <button
            onClick={() => onNavigate('utilities')}
            className="flex flex-col items-center justify-center flex-1 py-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
          >
            <svg className="w-[22px] h-[22px] text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="text-[10px] mt-1 font-medium text-gray-700">Tất cả</span>
          </button>
        </div>


      </footer>
    </div>
  );
}
