# 🚀 Guia de Deploy no GitHub Pages

Este guia mostra como publicar a interface web do BCP Calculator no GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado
- Projeto BCP_CIT_ITAU configurado

## 🔧 Passo a Passo

### 1. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Preencha os dados:
   - **Repository name:** `BCP_CIT_ITAU` (ou outro nome de sua preferência)
   - **Description:** "BCP Calculator - Calculadora de Pontos de Complexidade de Negócio"
   - **Visibility:** Public (necessário para GitHub Pages gratuito)
   - **NÃO** marque "Initialize this repository with a README"
3. Clique em "Create repository"

### 2. Configurar Remote do Git

No terminal, execute os seguintes comandos:

```bash
cd /Users/rodrigorondon/BCP_CIT_ITAU

# Remover o remote origin antigo
git remote remove origin

# Adicionar seu novo repositório (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/BCP_CIT_ITAU.git

# Verificar se foi configurado corretamente
git remote -v
```

### 3. Fazer Push do Código

```bash
# Garantir que está na branch main
git branch -M main

# Fazer push do código
git push -u origin main
```

Se solicitado, faça login com suas credenciais do GitHub.

### 4. Habilitar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em "Build and deployment":
   - **Source:** Selecione "GitHub Actions"
5. Aguarde alguns minutos para o deploy ser concluído

### 5. Acessar o Site

Após o deploy, seu site estará disponível em:

```
https://SEU_USUARIO.github.io/BCP_CIT_ITAU/
```

## ⚙️ Configuração Adicional

### Habilitar CORS no Servidor API (Opcional)

Para usar a interface web hospedada no GitHub Pages com seu servidor API local, você precisará habilitar CORS.

Edite o arquivo `src/api/server.py` e adicione:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://SEU_USUARIO.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Usar com Servidor API Público

Se você quiser usar a interface web com um servidor API público:

1. Hospede o servidor API em um serviço como:
   - Heroku
   - Railway
   - Render
   - AWS/GCP/Azure

2. Atualize a URL da API na interface web

## 🔄 Atualizações Futuras

Sempre que você fizer alterações na interface web:

```bash
cd /Users/rodrigorondon/BCP_CIT_ITAU

# Adicionar alterações
git add docs/web/

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push
git push origin main
```

O GitHub Actions fará o deploy automático!

## 🧪 Testar Localmente Antes do Deploy

Antes de fazer push, teste localmente:

```bash
# Iniciar servidor API
python3 run_api_server.py

# Em outro terminal, servir a interface web
cd docs/web
python3 -m http.server 8080
```

Acesse: http://localhost:8080

## 📝 Comandos Úteis

```bash
# Ver status do Git
git status

# Ver histórico de commits
git log --oneline

# Ver branches
git branch

# Ver remotes configurados
git remote -v

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Ver diferenças não commitadas
git diff
```

## ❓ Solução de Problemas

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/BCP_CIT_ITAU.git
```

### Erro: "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### GitHub Pages não está funcionando
1. Verifique se o repositório é público
2. Confirme que GitHub Pages está habilitado nas configurações
3. Aguarde alguns minutos após o primeiro push
4. Verifique a aba "Actions" para ver se o workflow foi executado

### Interface carrega mas não conecta à API
- A interface no GitHub Pages não pode conectar diretamente a `localhost`
- Você precisa de um servidor API público ou usar a interface localmente

## 🎯 Próximos Passos

Após o deploy:

1. ✅ Teste a interface no GitHub Pages
2. ✅ Compartilhe o link com sua equipe
3. ✅ Configure um domínio customizado (opcional)
4. ✅ Adicione analytics (opcional)

## 📚 Recursos Adicionais

- [Documentação do GitHub Pages](https://docs.github.com/pages)
- [Documentação do GitHub Actions](https://docs.github.com/actions)
- [Guia de Git](https://git-scm.com/doc)

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique a aba "Actions" no GitHub para logs de erro
2. Consulte a documentação do GitHub Pages
3. Verifique se todos os arquivos foram commitados corretamente