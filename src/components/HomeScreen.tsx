import { Search, LifeBuoy, Bell, ArrowLeftRight, PlusCircle, Shield, TrendingUp, Play } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="bg-white min-h-screen shadow-lg flex flex-col relative">
      {/* Header & Search */}
      <header className="px-4 py-2 flex items-center space-x-2">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg flex items-center px-3 py-1.5 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="ml-2 bg-transparent border-none focus:ring-0 text-xs w-full outline-none"
            placeholder="Tìm kiếm"
            type="text"
          />
        </div>
        <div className="flex space-x-3 text-gray-700">
          <button className="p-1">
            <LifeBuoy className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="p-1 relative">
            <Bell className="w-6 h-6" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-purple-700 flex flex-col items-center justify-center text-white text-base font-bold border-2 border-purple-200">
            <span>HH</span>
            <span className="text-[10px] opacity-70">...</span>
          </div>
          <div>
            <h2 className="text-gray-500 text-xs">Tài khoản</h2>
            <p className="font-bold text-base">***625</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2">
            <span className="text-base font-bold">******</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <p className="text-xs text-gray-500 font-medium">*** (*%)</p>
        </div>
      </section>

      {/* Transaction History Link */}
      <div className="relative flex items-center justify-center -mt-2 mb-4">
        <div className="absolute w-full h-[1px] bg-purple-100 z-0"></div>
        <button className="relative z-10 bg-white text-purple-600 text-[13px] font-medium px-6 py-1.5 rounded-full border border-purple-200 shadow-sm">
          Lịch sử giao dịch
        </button>
      </div>

      {/* Quick Actions */}
      <nav className="px-6 py-4 grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
            <ArrowLeftRight className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">Chuyển tiền</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
            <PlusCircle className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">Nạp tiền</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
            <span className="font-bold text-sm">$</span>
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">INFY</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
            <Shield className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">SmartOTP</span>
        </div>
      </nav>

      {/* Service Main Card */}
      <main className="px-4 py-2">
        <div className="rounded-2xl overflow-hidden shadow-xl text-white relative" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #9333ea 100%)' }}>
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
              <path d="M0,100 C20,80 50,110 100,50 L100,100 Z" fill="white"></path>
            </svg>
          </div>
          <div className="grid grid-cols-2 relative z-10">
            {/* Stocks */}
            <button
              onClick={() => onNavigate('portfolio')}
              className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
              style={{ borderRight: '0.5px solid rgba(255, 255, 255, 0.2)', borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <span className="font-bold text-base">Cổ phiếu</span>
            </button>
            {/* Derivatives */}
            <div className="p-4 flex flex-col items-center justify-center" style={{ borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)' }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" strokeWidth={2} />
              </div>
              <span className="font-bold text-base">Phái sinh</span>
            </div>
            {/* Recommendation */}
            <div className="p-4 flex flex-col items-center justify-center" style={{ borderRight: '0.5px solid rgba(255, 255, 255, 0.2)' }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2 backdrop-blur-sm">
                <Play className="w-6 h-6" strokeWidth={2} />
              </div>
              <span className="font-bold text-base">Khuyến nghị</span>
            </div>
            {/* Add More */}
            <div className="p-4 flex flex-col items-center justify-center">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 flex items-center space-x-1">
                <span className="text-lg font-light">+</span>
                <span className="text-xs font-semibold">Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Market Indices */}
      <section className="mt-6 mb-20 pb-[200px]">
        <div className="px-4 flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Chỉ số</h3>
          <button className="text-purple-600 font-semibold text-sm">Xem tất cả</button>
        </div>
        <div className="flex overflow-x-auto space-x-3 px-4" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div className="min-w-[140px] bg-red-50/30 border border-red-200 rounded-xl p-4">
            <p className="text-gray-600 text-sm font-semibold mb-1">VN-INDEX</p>
            <p className="text-lg font-bold text-gray-900 mb-1">1912.93</p>
            <p className="text-red-500 text-xs font-semibold">-15.01 (-0.78%)</p>
          </div>
          <div className="min-w-[140px] bg-red-50/30 border border-red-200 rounded-xl p-4">
            <p className="text-gray-600 text-sm font-semibold mb-1">VN30</p>
            <p className="text-lg font-bold text-gray-900 mb-1">2027.45</p>
            <p className="text-red-500 text-xs font-semibold">-18.92 (-0.92%)</p>
          </div>
          <div className="min-w-[140px] bg-green-50/30 border border-green-200 rounded-xl p-4">
            <p className="text-gray-600 text-sm font-semibold mb-1">HNX</p>
            <p className="text-lg font-bold text-gray-900 mb-1">259.5</p>
            <p className="text-green-600 text-xs font-semibold">+0.25 (+0.1%)</p>
          </div>
          <div className="min-w-[140px] bg-green-50/30 border border-green-200 rounded-xl p-4">
            <p className="text-gray-600 text-sm font-semibold mb-1">UPCOM</p>
            <p className="text-lg font-bold text-gray-900 mb-1">124.2</p>
            <p className="text-green-600 text-xs font-semibold">+0.12 (+0.09%)</p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-between px-2 pb-6 pt-2 z-50">
        <div className="flex flex-col items-center justify-center flex-1 py-1">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="text-[10px] mt-1 font-bold text-purple-600">Trang chủ</span>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 py-1 opacity-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Thị trường</span>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 py-1 opacity-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Giao dịch</span>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 py-1 opacity-40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Tài sản</span>
        </div>
        <button onClick={() => onNavigate('utilities')} className="flex flex-col items-center justify-center flex-1 py-1 opacity-40 hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
          <span className="text-[10px] mt-1 font-medium">Tất cả</span>
        </button>
      </footer>
    </div>
  );
}
