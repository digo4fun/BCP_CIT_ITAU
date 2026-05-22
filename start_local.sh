#!/bin/bash

# Script para iniciar o BCP Calculator localmente
# Uso: ./start_local.sh

echo "🚀 Iniciando BCP Calculator..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "run_api_server.py" ]; then
    echo "❌ Erro: Execute este script no diretório BCP_CIT_ITAU"
    exit 1
fi

# Verificar se a porta 8000 está em uso
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Porta 8000 já está em uso. Matando processo..."
    lsof -ti:8000 | xargs kill -9
    sleep 2
fi

# Iniciar servidor API em background
echo "📡 Iniciando servidor API na porta 8000..."
python3 run_api_server.py > api_server.log 2>&1 &
API_PID=$!

# Aguardar servidor iniciar
echo "⏳ Aguardando servidor iniciar..."
sleep 3

# Verificar se o servidor está rodando
if ! lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Erro ao iniciar servidor API"
    echo "Verifique o arquivo api_server.log para mais detalhes"
    exit 1
fi

echo "✅ Servidor API iniciado (PID: $API_PID)"
echo ""

# Abrir interface web no navegador
echo "🌐 Abrindo interface web no navegador..."
open docs/web/index.html

echo ""
echo "✨ BCP Calculator iniciado com sucesso!"
echo ""
echo "📍 Servidor API: http://localhost:8000"
echo "📍 Interface Web: Aberta no navegador"
echo "📝 Logs do servidor: api_server.log"
echo ""
echo "Para parar o servidor, execute:"
echo "  kill $API_PID"
echo ""
echo "Ou use:"
echo "  lsof -ti:8000 | xargs kill -9"
echo ""

# Made with Bob
