import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrderBookProps {
  onNavigate: (screen: 'home' | 'portfolio' | 'orderbook' | 'pnl' | 'utilities') => void;
}

export default function OrderBook({ onNavigate }: OrderBookProps) {
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
        <div className="border border-gray-300 rounded-full px-2 py-0.5 text-xs font-semibold flex items-center gap-1 text-gray-700">
          <span>TK</span>
          <span className="bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">6</span>
        </div>
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
            className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-[#6b4eff] pr-10 text-gray-800 placeholder-gray-300"
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
            <select className="appearance-none w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none bg-white pr-8 text-gray-600">
              <option>Tất cả loại lệnh</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-800 pointer-events-none">
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
          <div className="relative w-1/2">
            <select className="appearance-none w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm outline-none bg-white pr-8 text-gray-600">
              <option>Tất cả trạng thái</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-800 pointer-events-none">
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* P/L Action */}
        <button className="inline-flex items-center px-4 py-1.5 border border-[#6b4eff] rounded-full text-[#6b4eff] text-sm font-medium">
          Xem lãi lỗ dự tính
          <ChevronRight className="w-4 h-4 ml-1" strokeWidth={2} />
        </button>
      </section>

      {/* Data List Content */}
      <main className="flex-grow flex flex-col px-4 mt-2 overflow-y-auto">
        {/* Table Header */}
        <div className="grid grid-cols-5 text-xs text-gray-500 font-medium pb-2 border-b border-gray-50">
          <div className="col-span-1">Mã CK</div>
          <div className="col-span-1 text-center">M/B</div>
          <div className="col-span-1 text-right">Đặt</div>
          <div className="col-span-1 text-right">Khớp</div>
          <div className="col-span-1 text-right">Còn lại</div>
        </div>

        {/* Row 1 */}
        <div className="py-3 border-b border-gray-50 grid grid-cols-5 items-center">
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-gray-900 text-[15px]">VGI</span>
            <span className="text-xs text-gray-400 mt-0.5">11:03</span>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <span className="font-bold text-green-500 text-sm">Mua</span>
            <span className="text-xs text-gray-400 mt-0.5">Thường</span>
          </div>
          <div className="col-span-1 flex flex-col items-end">
            <span className="font-bold text-gray-900 text-sm">900</span>
            <span className="text-xs text-gray-400 mt-0.5">93.0</span>
          </div>
          <div className="col-span-1 flex flex-col items-end">
            <span className="font-bold text-gray-900 text-sm">900</span>
            <span className="text-xs text-gray-400 mt-0.5">93.00</span>
          </div>
          <div className="col-span-1 flex flex-col items-end justify-end space-y-1">
            <div className="h-5"></div>
            <div className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded flex items-center text-[10px] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Đã khớp
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="py-3 border-b border-gray-50 grid grid-cols-5 items-center bg-gray-50/50 -mx-4 px-4">
          <div className="col-span-1 flex flex-col">
            <span className="font-bold text-gray-900 text-[15px]">MBS</span>
            <span className="text-xs text-gray-400 mt-0.5">09:51</span>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <span className="font-bold text-green-500 text-sm">Mua</span>
            <span className="text-xs text-gray-400 mt-0.5">Thường</span>
          </div>
          <div className="col-span-1 flex flex-col items-end">
            <span className="font-bold text-gray-900 text-sm">5,000</span>
            <span className="text-xs text-gray-400 mt-0.5">19.9</span>
          </div>
          <div className="col-span-1 flex flex-col items-end">
            <span className="font-bold text-gray-900 text-sm">5,000</span>
            <span className="text-xs text-gray-400 mt-0.5">19.90</span>
          </div>
          <div className="col-span-1 flex flex-col items-end justify-end space-y-1">
            <div className="h-5"></div>
            <div className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded flex items-center text-[10px] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
              Đã khớp
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Button */}
      <footer className="p-6 flex justify-end absolute bottom-0 right-0 w-full pointer-events-none">
        <button className="bg-[#5a6270] text-white px-6 py-3 rounded-full font-bold shadow-md text-sm active:bg-gray-700 transition-colors pointer-events-auto">
          Hủy tất cả
        </button>
      </footer>
    </div>
  );
}
