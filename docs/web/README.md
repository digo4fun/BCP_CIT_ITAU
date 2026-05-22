# BCP Calculator - Interface Web

Interface web moderna para o BCP Calculator, permitindo análise de histórias de usuário sem usar linha de comando.

## 🌐 Acesso Online

A interface está disponível em: [GitHub Pages URL será gerada após o deploy]

## 🚀 Como Usar

### Opção 1: Usar Localmente (Recomendado)

1. **Inicie o servidor API:**
   ```bash
   cd /Users/rodrigorondon/BCP_CIT_ITAU
   python3 run_api_server.py
   ```

2. **Abra a interface web:**
   - Abra o arquivo `index.html` no seu navegador, ou
   - Use um servidor local:
     ```bash
     cd docs/web
     python3 -m http.server 8080
     ```
   - Acesse: http://localhost:8080

3. **Configure a URL da API:**
   - Por padrão: `http://localhost:8000`
   - Certifique-se de que o servidor API está rodando

### Opção 2: Usar Online (GitHub Pages)

**Nota:** Para usar online, você precisará de um servidor API acessível publicamente ou usar CORS proxy.

## 📝 Funcionalidades

- ✅ Interface intuitiva e responsiva
- ✅ Editor de texto para histórias de usuário
- ✅ Exemplo pré-carregado
- ✅ Visualização clara dos resultados
- ✅ Análise de maturidade e INVEST
- ✅ Exportação de resultados em JSON
- ✅ Modo escuro para visualização de JSON
- ✅ Ajuda integrada

## 🎨 Estrutura

```
docs/web/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos da interface
├── js/
│   └── app.js          # Lógica da aplicação
└── README.md           # Esta documentação
```

## 🔧 Configuração

### Servidor API Local

O servidor API deve estar rodando para que a interface funcione:

```bash
# No diretório do projeto
python3 run_api_server.py
```

O servidor estará disponível em: http://localhost:8000

### CORS (Cross-Origin Resource Sharing)

Se você estiver usando a interface de um domínio diferente do servidor API, pode ser necessário configurar CORS no servidor.

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎯 Exemplo de Uso

1. Clique em "Carregar Exemplo" para ver uma história de usuário de exemplo
2. Ou cole sua própria história no formato Markdown
3. Clique em "Calcular BCP"
4. Aguarde a análise (pode levar alguns segundos)
5. Visualize os resultados detalhados

## 🐛 Solução de Problemas

### Erro: "API não encontrada"
- Verifique se o servidor API está rodando
- Confirme a URL da API nas configurações

### Erro: "Não foi possível conectar à API"
- Certifique-se de que o servidor está ativo
- Verifique se a porta 8000 está disponível
- Tente reiniciar o servidor API

### Interface não carrega
- Verifique se todos os arquivos estão presentes
- Abra o console do navegador (F12) para ver erros
- Tente usar um servidor HTTP local

## 📚 Documentação Adicional

- [README Principal](../../README.md)
- [Guia de Uso](../../GUIA_DE_USO.md)
- [Documentação da API](../usage/http_api_usage.md)

## 🤝 Contribuindo

Para contribuir com melhorias na interface:

1. Faça suas alterações nos arquivos HTML/CSS/JS
2. Teste localmente
3. Commit e push para o repositório
4. O GitHub Actions fará o deploy automático

## 📄 Licença

Este projeto está sob a mesma licença do projeto principal (MIT License).