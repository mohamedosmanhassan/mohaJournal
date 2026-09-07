"""
RyzeLog Production Server
Serves the compiled production frontend and provides a high-performance REST API with SQLite database.
Requires zero third-party dependencies (uses Python built-in standard libraries: http.server, sqlite3, json).
"""

import http.server
import socketserver
import os
import json
import sqlite3
import urllib.parse
from datetime import datetime

PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "dist")
DB_PATH = os.path.join(BASE_DIR, "server", "ryzelog.db")

# Initialize Database
def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Trades Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS trades (
        id TEXT PRIMARY KEY,
        symbol TEXT NOT NULL,
        direction TEXT NOT NULL,
        entryPrice REAL,
        exitPrice REAL,
        stopLoss REAL,
        takeProfit REAL,
        lots REAL,
        pnl REAL,
        rr REAL,
        status TEXT,
        date TEXT,
        session TEXT,
        strategy TEXT,
        emotions TEXT,
        notes TEXT,
        screenshot TEXT
    )
    """)

    # Mindset Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS mindset (
        id TEXT PRIMARY KEY,
        date TEXT,
        sleepScore INTEGER,
        mentalState TEXT,
        maxRiskLimit TEXT,
        preMarketPlan TEXT,
        postMarketReview TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

class RyzeLogHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self._set_headers(200)
            self.wfile.write(json.dumps({"status": "healthy", "service": "RyzeLog Pro API", "timestamp": datetime.now().isoformat()}).encode())
            return

        elif path == "/api/trades":
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM trades ORDER BY date DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            conn.close()
            self._set_headers(200)
            self.wfile.write(json.dumps(rows).encode())
            return

        elif path == "/api/mindset":
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM mindset ORDER BY date DESC")
            rows = [dict(row) for row in cursor.fetchall()]
            conn.close()
            self._set_headers(200)
            self.wfile.write(json.dumps(rows).encode())
            return

        # Serve static file or fallback to index.html for SPA routing
        full_path = os.path.join(DIST_DIR, path.lstrip("/"))
        if os.path.exists(full_path) and not os.path.isdir(full_path):
            return super().do_GET()
        else:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            with open(os.path.join(DIST_DIR, "index.html"), "rb") as f:
                self.wfile.write(f.read())

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_len = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_len)
        data = json.loads(body.decode()) if body else {}

        if path == "/api/trades":
            trade_id = data.get("id", f"tr-{int(datetime.now().timestamp()*1000)}")
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR REPLACE INTO trades 
            (id, symbol, direction, entryPrice, exitPrice, stopLoss, takeProfit, lots, pnl, rr, status, date, session, strategy, emotions, notes, screenshot)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                trade_id,
                data.get("symbol", "EURUSD"),
                data.get("direction", "LONG"),
                data.get("entryPrice", 0),
                data.get("exitPrice", 0),
                data.get("stopLoss", 0),
                data.get("takeProfit", 0),
                data.get("lots", 1.0),
                data.get("pnl", 0),
                data.get("rr", 0),
                data.get("status", "WIN"),
                data.get("date", datetime.now().strftime("%Y-%m-%d %H:%M")),
                data.get("session", "London"),
                data.get("strategy", "SMC Liquidity Sweep"),
                data.get("emotions", "Disciplined"),
                data.get("notes", ""),
                data.get("screenshot", "")
            ))
            conn.commit()
            conn.close()
            self._set_headers(201)
            self.wfile.write(json.dumps({"success": True, "id": trade_id}).encode())
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode())

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/trades/"):
            trade_id = path.split("/api/trades/")[1]
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("DELETE FROM trades WHERE id = ?", (trade_id,))
            conn.commit()
            conn.close()
            self._set_headers(200)
            self.wfile.write(json.dumps({"success": True, "deleted": trade_id}).encode())
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode())

def run_server():
    print(f"=====================================================")
    print(f"  🚀 RyzeLog Production Server is running!")
    print(f"  🌐 URL: http://localhost:{PORT}")
    print(f"  📂 Serving Frontend from: {DIST_DIR}")
    print(f"  💾 SQLite Database: {DB_PATH}")
    print(f"=====================================================")
    with socketserver.TCPServer(("", PORT), RyzeLogHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down gracefully.")

if __name__ == "__main__":
    run_server()
