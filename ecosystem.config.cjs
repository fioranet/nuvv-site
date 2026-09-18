module.exports = {
  apps: [
    {
      name: 'nuvv-site',
      script: 'server/index.js',
      instances: 1, // Fork mode recommended for SQLite WAL
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      restart_delay: 3000,
    },
  ],
};
