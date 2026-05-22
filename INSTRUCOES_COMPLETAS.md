# 📘 Instruções Completas - BCP Calculator

## ✅ Status do Projeto

**Projeto:** BCP_CIT_ITAU  
**Localização:** `/Users/rodrigorondon/BCP_CIT_ITAU`  
**Status:** ✅ Totalmente configurado e funcional

### O que foi feito:

1. ✅ Repositório clonado e configurado
2. ✅ Dependências Python instaladas (compatível com Python 3.14)
3. ✅ API Key do Claude Sonnet 4 configurada
4. ✅ Sistema testado e funcionando
5. ✅ Interface web moderna criada
6. ✅ GitHub Actions configurado para deploy automático

---

## 🚀 Como Usar

### Opção 1: Interface Web (Recomendado) 🌐

#### Passo 1: Iniciar o Servidor API
```bash
cd /Users/rodrigorondon/BCP_CIT_ITAU
python3 run_api_server.py
```

O servidor estará disponível em: http://localhost:8000

#### Passo 2: Abrir a Interface Web

**Opção A - Abrir diretamente:**
```bash
open docs/web/index.html
```

**Opção B - Usar servidor HTTP local:**
```bash
cd docs/web
python3 -m http.server 8080
```
Depois acesse: http://localhost:8080

#### Passo 3: Usar a Interface

1. **Carregar Exemplo:** Clique em "Carregar Exemplo" para ver uma história pré-configurada
2. **Ou Cole Sua História:** Digite ou cole sua história de usuário no formato Markdown
3. **Calcular:** Clique em "Calcular BCP"
4. **Ver Resultados:** Aguarde alguns segundos e veja a análise completa

### Opção 2: Linha de Comando 💻

```bash
cd /Users/rodrigorondon/BCP_CIT_ITAU

# Analisar uma história de exemplo
python3 run_cli.py tests/data/story1.md --provider claude

# Analisar sua própria história
python3 run_cli.py caminho/para/sua-historia.md --provider claude

# Salvar resultado em arquivo
python3 run_cli.py tests/data/story1.md --provider claude --output-file resultado.json
```

---

## 📊 Entendendo os Resultados

### Total BCP
Soma total dos pontos de complexidade da história.

### Componentes:
- **Business Rules (Regras de Negócio):** Complexidade das regras e lógica
- **UI Elements (Elementos de Interface):** Complexidade da interface do usuário
- **External Integrations (Integrações Externas):** Complexidade de integrações com sistemas externos

### Análise de Maturidade:
- **Story Maturity Complexity:** Quão bem definida está a história (0-5)
- **Story INVEST Maturity:** Qualidade segundo critérios INVEST (0-5)

---

## 🌐 Publicar no GitHub Pages

### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `BCP_CIT_ITAU`
3. Visibilidade: **Public**
4. Clique em "Create repository"

### Passo 2: Configurar e Fazer Push

```bash
cd /Users/rodrigorondon/BCP_CIT_ITAU

# Remover remote antigo
git remote remove origin

# Adicionar seu repositório (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/BCP_CIT_ITAU.git

# Fazer push
git branch -M main
git push -u origin main
```

### Passo 3: Habilitar GitHub Pages

1. Vá em **Settings** do repositório
2. Clique em **Pages** no menu lateral
3. Em "Source", selecione **GitHub Actions**
4. Aguarde o deploy (alguns minutos)

### Passo 4: Acessar o Site

Seu site estará em:
```
https://SEU_USUARIO.github.io/BCP_CIT_ITAU/
```

**Nota:** A interface no GitHub Pages precisará de um servidor API público para funcionar. Para uso local, use a Opção 1 acima.

---

## 📝 Formato da História de Usuário

```markdown
# História: Nome da História

## Descrição
Como [tipo de usuário]
Quero [objetivo/funcionalidade]
Para [benefício/valor]

## Critérios de Aceitação
- Critério 1
- Critério 2
- Critério 3

## Regras de Negócio
- Regra 1
- Regra 2
- Regra 3

## Integrações (opcional)
- Sistema A
- Sistema B
```

---

## 🔧 Configurações

### Arquivo .env

Localização: `/Users/rodrigorondon/BCP_CIT_ITAU/.env`

```env
# API Key do Claude (já configurada)
ANTHROPIC_API_KEY=sua_chave_aqui

# Modelo (já configurado)
ANTHROPIC_MODEL_NAME=claude-sonnet-4-20250514

# Log Level
LOG_LEVEL=INFO
```

### Alterar Modelo ou API Key

1. Abra o arquivo `.env`
2. Modifique os valores necessários
3. Reinicie o servidor API

---

## 📁 Estrutura do Projeto

```
BCP_CIT_ITAU/
├── docs/web/              # Interface Web
│   ├── index.html         # Página principal
│   ├── css/styles.css     # Estilos
│   └── js/app.js          # Lógica JavaScript
├── tests/data/            # 15 histórias de exemplo
│   ├── story1.md
│   ├── story2.md
│   └── ...
├── src/                   # Código fonte Python
├── run_cli.py            # CLI
├── run_api_server.py     # Servidor API
├── .env                  # Configurações (API Keys)
└── requirements.txt      # Dependências Python
```

---

## 🆘 Solução de Problemas

### Erro: "API não encontrada"
**Solução:** Certifique-se de que o servidor API está rodando:
```bash
python3 run_api_server.py
```

### Erro: "Address already in use"
**Solução:** Mate o processo na porta 8000:
```bash
lsof -ti:8000 | xargs kill -9
```

### Interface não conecta à API
**Solução:** Verifique se a URL da API está correta (http://localhost:8000)

### Erro de módulo Python
**Solução:** Reinstale as dependências:
```bash
pip3 install -r requirements.txt
```

---

## 💡 Dicas de Uso

### Para Melhores Resultados:

1. **Seja Específico:** Descreva claramente o que o usuário quer fazer
2. **Critérios Claros:** Liste critérios de aceitação mensuráveis
3. **Regras Explícitas:** Documente todas as regras de negócio
4. **Mencione Integrações:** Liste sistemas externos envolvidos
5. **Use Markdown:** Formate bem sua história para melhor análise

### Histórias de Exemplo:

O projeto inclui 15 histórias de exemplo em `tests/data/`:
- story1.md: Pagamento automático
- story2.md até story15.md: Diversos cenários

Use-as como referência!

---

## 📚 Documentação Adicional

- **README.md:** Documentação completa do projeto
- **DEPLOY_GITHUB_PAGES.md:** Guia detalhado de deploy
- **docs/web/README.md:** Documentação da interface web
- **docs/usage/:** Guias de uso detalhados

---

## 🎯 Próximos Passos

1. ✅ Teste com as histórias de exemplo
2. ✅ Crie suas próprias histórias
3. ✅ Publique no GitHub Pages (opcional)
4. ✅ Compartilhe com sua equipe
5. ✅ Integre no seu workflow

---

## 📞 Comandos Rápidos

```bash
# Iniciar servidor API
cd /Users/rodrigorondon/BCP_CIT_ITAU && python3 run_api_server.py

# Abrir interface web
open /Users/rodrigorondon/BCP_CIT_ITAU/docs/web/index.html

# Analisar história via CLI
cd /Users/rodrigorondon/BCP_CIT_ITAU && python3 run_cli.py tests/data/story1.md --provider claude

# Ver histórias de exemplo
ls /Users/rodrigorondon/BCP_CIT_ITAU/tests/data/

# Verificar status do Git
cd /Users/rodrigorondon/BCP_CIT_ITAU && git status
```

---

## ✨ Recursos da Interface Web

- 🎨 Design moderno e responsivo
- 📱 Funciona em desktop, tablet e mobile
- 💾 Exportação de resultados em JSON
- 📊 Visualização clara de métricas
- 🔄 Carregamento de exemplos
- 💡 Ajuda integrada
- 🌙 Visualização de JSON com syntax highlighting

---

## 🎉 Tudo Pronto!

Seu BCP Calculator está 100% configurado e pronto para uso!

**Comece agora:**
1. Abra o terminal
2. Execute: `cd /Users/rodrigorondon/BCP_CIT_ITAU && python3 run_api_server.py`
3. Abra: `docs/web/index.html` no navegador
4. Clique em "Carregar Exemplo" e depois "Calcular BCP"

**Divirta-se analisando suas histórias de usuário! 🚀**