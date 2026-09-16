import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory in root of project
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'nuvv.sqlite');
export const db = new Database(dbPath);

// Enable WAL mode for better concurrency performance
db.pragma('journal_mode = WAL');

// Initialize schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      path TEXT NOT NULL,
      title TEXT,
      referrer TEXT,
      city TEXT,
      device TEXT,
      ip_hash TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
    CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

    CREATE TABLE IF NOT EXISTS viability_queries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      email TEXT,
      cep TEXT NOT NULL,
      street TEXT,
      number TEXT,
      neighborhood TEXT,
      city TEXT,
      state TEXT,
      service_type TEXT DEFAULT 'residencial',
      has_feasibility INTEGER NOT NULL, -- 1 for yes, 0 for no
      plan_interested TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_viability_cep ON viability_queries(cep);
    CREATE INDEX IF NOT EXISTS idx_viability_neighborhood ON viability_queries(neighborhood);
    CREATE INDEX IF NOT EXISTS idx_viability_has_feasibility ON viability_queries(has_feasibility);

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      status TEXT DEFAULT 'active', -- active, unsubscribed
      source TEXT DEFAULT 'footer',
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_notified_at DATETIME
    );

    CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

    CREATE TABLE IF NOT EXISTS commercial_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_page TEXT NOT NULL,
      name TEXT,
      company TEXT,
      cnpj TEXT,
      phone TEXT,
      email TEXT,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      type TEXT NOT NULL, -- welcome_newsletter, blog_broadcast, lead_alert, test
      status TEXT NOT NULL, -- sent, failed
      error_message TEXT,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ SQLite Database initialized at:', dbPath);
}
