import { ChevronLeft } from 'lucide-react';

interface AllUtilitiesProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function AllUtilities({ onNavigate }: AllUtilitiesProps) {
  return (
    <div className="bg-white font-sans text-[#1a1a1a] select-none min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-50">
        <button onClick={() => onNavigate('home')} className="p-1">
          <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center pr-8">Tất cả tiện ích</h1>
        <div></div>
      </header>

      <main className="pb-10">
        {/* Home Screen Shortcuts Section */}
        <section className="px-4 mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-base">Tiện ích màn hình chính</h2>
            <button className="text-[#6b4eff] font-medium text-sm">Thay đổi</button>
          </div>
          {/* Dashed container */}
          <div className="rounded-xl p-4 grid grid-cols-3 gap-4 border border-dashed border-[#d1dbea]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <span className="text-xs font-medium">Sổ lệnh</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <span className="text-xs font-medium">Ứng tiền</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <span className="text-xs font-medium">Margin</span>
            </div>
          </div>
        </section>

        {/* All Utilities Section */}
        <section className="mt-8 px-4">
          <h2 className="font-bold text-base mb-4">Tất cả tiện ích</h2>

          {/* Tra cứu thông tin subsection */}
          <div className="mb-6">
            <div className="inline-block bg-[#eef1ff] px-2 py-1 rounded text-xs font-medium text-[#6b4eff] mb-3">
              Tra cứu thông tin
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => onNavigate('orderbook')}
                className="w-full flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Sổ lệnh</span>
              </button>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Xác nhận lệnh đặt</span>
              </div>
              <button
                onClick={() => onNavigate('pnl')}
                className="w-full flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Lãi lỗ đã thực hiện</span>
              </button>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Sao kê tiền</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Sao kê chứng khoán</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Thông tin quyền</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Báo cáo tài sản</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Margin</span>
              </div>
            </div>
          </div>

          {/* Giao dịch subsection */}
          <div className="mb-6">
            <div className="inline-block bg-[#eef1ff] px-2 py-1 rounded text-xs font-medium text-[#6b4eff] mb-3">
              Giao dịch
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Nạp tiền</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4 border-b border-gray-100 last:border-b-0">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Ứng tiền</span>
              </div>
              <div className="flex items-center px-4 py-3 gap-4">
                <svg className="w-6 h-6 text-[#666666]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="text-sm font-medium">Cảnh báo lãi lỗ</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
