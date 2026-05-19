-- =============================================
-- Supabase Schema cho MobileVPS
-- Bao gồm 3 bảng: stocks, orders, realized_pnl
-- =============================================

-- 1. BẢNG STOCKS: Lưu danh mục cổ phiếu hiện đang nắm giữ
CREATE TABLE IF NOT EXISTS stocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol VARCHAR(10) NOT NULL,
  cost_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  market_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total_qty INTEGER NOT NULL DEFAULT 0,
  normal_qty INTEGER NOT NULL DEFAULT 0,
  fs_qty INTEGER NOT NULL DEFAULT 0,
  sellable_qty INTEGER NOT NULL DEFAULT 0,
  outroom INTEGER NOT NULL DEFAULT 0,
  other_qty INTEGER NOT NULL DEFAULT 0,
  cpct_bonus INTEGER NOT NULL DEFAULT 0,
  t0 INTEGER NOT NULL DEFAULT 0,
  t1 INTEGER NOT NULL DEFAULT 0,
  t2 INTEGER NOT NULL DEFAULT 0,
  account_id INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index và RLS cho stocks
CREATE INDEX IF NOT EXISTS idx_stocks_account_id ON stocks(account_id);
CREATE INDEX IF NOT EXISTS idx_stocks_symbol ON stocks(symbol);
CREATE UNIQUE INDEX IF NOT EXISTS idx_stocks_symbol_account ON stocks(symbol, account_id);
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on stocks" ON stocks
  FOR ALL USING (true) WITH CHECK (true);

-- 2. BẢNG ORDERS: Lưu sổ lệnh mua/bán trong ngày
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol VARCHAR(10) NOT NULL,
  side VARCHAR(10) NOT NULL,               -- 'BUY' (Mua) hoặc 'SELL' (Bán)
  order_type VARCHAR(20) DEFAULT 'Thường', -- 'Thường', 'Điều kiện', v.v.
  qty INTEGER NOT NULL DEFAULT 0,          -- Khối lượng đặt
  price DECIMAL(10, 2) NOT NULL DEFAULT 0, -- Giá đặt
  matched_qty INTEGER NOT NULL DEFAULT 0,  -- Khối lượng khớp
  matched_price DECIMAL(10, 2) DEFAULT 0,  -- Giá khớp
  status VARCHAR(50) NOT NULL,             -- 'Đã khớp', 'Chờ khớp', 'Đã hủy'
  order_time TIME NOT NULL DEFAULT CURRENT_TIME, -- Giờ đặt lệnh
  account_id INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index và RLS cho orders
CREATE INDEX IF NOT EXISTS idx_orders_account_id ON orders(account_id);
CREATE INDEX IF NOT EXISTS idx_orders_symbol ON orders(symbol);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on orders" ON orders
  FOR ALL USING (true) WITH CHECK (true);

-- 3. BẢNG REALIZED_PNL: Lưu lịch sử lãi lỗ đã thực hiện (đã chốt bán)
CREATE TABLE IF NOT EXISTS realized_pnl (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sell_date DATE NOT NULL DEFAULT CURRENT_DATE,       -- Ngày bán
  symbol VARCHAR(10) NOT NULL,                        -- Mã cổ phiếu
  pnl_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,       -- Số tiền lãi/lỗ (VND)
  pnl_percent DECIMAL(10, 2) NOT NULL DEFAULT 0,      -- % lãi/lỗ
  account_id INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index và RLS cho realized_pnl
CREATE INDEX IF NOT EXISTS idx_pnl_account_id ON realized_pnl(account_id);
CREATE INDEX IF NOT EXISTS idx_pnl_symbol ON realized_pnl(symbol);
ALTER TABLE realized_pnl ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on realized_pnl" ON realized_pnl
  FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- Trigger tự động cập nhật updated_at cho stocks
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_stocks_updated_at ON stocks;
CREATE TRIGGER update_stocks_updated_at
  BEFORE UPDATE ON stocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DỮ LIỆU MẪU ĐỒNG BỘ VỚI GIAO DIỆN
-- =============================================

-- Dữ liệu cho trang Danh mục tài sản (stocks)
INSERT INTO stocks (symbol, cost_price, market_price, total_qty, normal_qty, sellable_qty, account_id)
VALUES
  ('FTS', 27.94, 27.10, 1, 1, 1, 1),
  ('GAS', 80.12, 93.00, 1, 1, 1, 1),
  ('VIX', 16.67, 19.05, 6000, 6000, 6000, 1)
ON CONFLICT (symbol, account_id) DO NOTHING;

-- Dữ liệu cho trang Sổ lệnh (orders)
INSERT INTO orders (symbol, side, order_type, qty, price, matched_qty, matched_price, status, order_time, account_id)
VALUES
  ('VGI', 'BUY', 'Thường', 900, 93.00, 900, 93.00, 'Đã khớp', '11:03:00', 1),
  ('MBS', 'BUY', 'Thường', 5000, 19.90, 5000, 19.90, 'Đã khớp', '09:51:00', 1);

-- Dữ liệu cho trang Lãi lỗ đã thực hiện (realized_pnl)
INSERT INTO realized_pnl (sell_date, symbol, pnl_amount, pnl_percent, account_id)
VALUES
  ('2026-03-11', 'MSR', 912400.00, 10.34, 1),
  ('2026-03-17', 'BSR', -2041749.00, -13.88, 1),
  ('2026-03-17', 'BSR', -4755250.00, -12.93, 1),
  ('2026-03-17', 'PC1', -361475.00, -6.48, 1),
  ('2026-03-19', 'BSR', -44724.00, -2.85, 1),
  ('2026-03-19', 'BSR', -1416561.00, -3.01, 1);
