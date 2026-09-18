#!/usr/bin/env bash
set -e

echo "🚀 Iniciando Deploy do Nuvv Site..."

# Navega até o diretório do projeto
cd /var/www/nuvv-site

echo "📥 Atualizando código do repositório (git pull)..."
git pull origin main

echo "📦 Instalando dependências e compilando pacotes nativos..."
npm install --include=dev

echo "🏗️ Compilando o frontend (Vite)..."
npm run build

echo "📁 Garantindo permissões do diretório de dados (SQLite)..."
mkdir -p data logs
chmod -R 775 data logs

echo "🔄 Reiniciando serviço no PM2..."
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs

echo "💾 Salvando estado do PM2..."
pm2 save

echo "✅ Deploy concluído com sucesso!"
