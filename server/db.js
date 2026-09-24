import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
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
      status TEXT DEFAULT 'VIAVEL', -- VIAVEL, INVIAVEL, EM_ANALISE
      matched_layer TEXT,
      matched_polygon TEXT,
      distance_meters REAL DEFAULT 0,
      latitude REAL,
      longitude REAL,
      raw_response TEXT,
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

    CREATE TABLE IF NOT EXISTS portal_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone TEXT,
      role TEXT,
      user_type TEXT DEFAULT 'usuario', -- admin ou usuario
      status TEXT DEFAULT 'ativo', -- ativo ou bloqueado
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_portal_users_email ON portal_users(email);
  `);

  // Seed default admin if portal_users is empty
  try {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM portal_users').get().count;
    if (userCount === 0) {
      const defaultHash = crypto.createHash('sha256').update('nuvv2026').digest('hex');
      db.prepare(`
        INSERT INTO portal_users (name, email, password_hash, phone, role, user_type, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        'Administrador Nuvv',
        'admin@nuvv.com.br',
        defaultHash,
        '(11) 99999-9999',
        'Gestor de Treinamento e Operações',
        'admin',
        'ativo'
      );
    }
  } catch (seedErr) {
    console.warn('⚠️ Could not check/seed portal_users:', seedErr.message);
  }

  // Migration: Ensure viability_queries has new enriched columns if database already existed
  try {
    const existingCols = db.prepare("PRAGMA table_info(viability_queries)").all().map(c => c.name);
    const columnsToAdd = [
      { name: 'status', type: "TEXT DEFAULT 'VIAVEL'" },
      { name: 'matched_layer', type: 'TEXT' },
      { name: 'matched_polygon', type: 'TEXT' },
      { name: 'distance_meters', type: 'REAL DEFAULT 0' },
      { name: 'latitude', type: 'REAL' },
      { name: 'longitude', type: 'REAL' },
      { name: 'raw_response', type: 'TEXT' },
    ];

    for (const col of columnsToAdd) {
      if (!existingCols.includes(col.name)) {
        db.prepare(`ALTER TABLE viability_queries ADD COLUMN ${col.name} ${col.type}`).run();
      }
    }
    db.prepare('CREATE INDEX IF NOT EXISTS idx_viability_status ON viability_queries(status)').run();
  } catch (migErr) {
    console.warn('⚠️ Could not run viability_queries migration:', migErr.message);
  }

  // Seed default viability layer settings
  try {
    db.prepare(`
      INSERT OR IGNORE INTO settings (key, value) VALUES ('viability_layer_residencial', 'suzano_poa');
    `).run();
    db.prepare(`
      INSERT OR IGNORE INTO settings (key, value) VALUES ('viability_layer_empresarial', 'ihs___sp');
    `).run();
  } catch (settingErr) {
    console.warn('⚠️ Could not seed viability layer settings:', settingErr.message);
  }

  console.log('✅ SQLite Database initialized at:', dbPath);
}

