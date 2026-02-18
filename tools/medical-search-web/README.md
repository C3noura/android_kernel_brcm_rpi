# Website: busca de artigos médicos (cirurgia sem sangue)

Aplicação web estática em português para:

- pesquisar artigos sobre intervenções cirúrgicas sem uso de sangue/hemoderivados;
- priorizar revistas médicas de reputação reconhecida;
- preparar envio por e-mail dos resultados via `mailto:`.

## Como executar localmente

No diretório `tools/medical-search-web`:

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Fonte de dados

- API Europe PMC (`/search` com retorno JSON).

## Observação sobre envio de e-mail

O botão de envio abre o cliente de e-mail padrão do usuário com assunto e corpo já preenchidos.

## Como colocar o site online (grátis)

Como este projeto é 100% estático (`HTML + CSS + JS`), você pode publicar gratuitamente em serviços de hospedagem estática.

### Opção 1) GitHub Pages (grátis)

1. Suba a pasta `tools/medical-search-web` para um repositório no GitHub.
2. No repositório, vá em **Settings > Pages**.
3. Em **Build and deployment**, escolha:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (ou `master`)
   - **Folder**: `/docs` **ou** `/ (root)`
4. Se quiser usar `/docs`, copie os arquivos do site para a pasta `docs/`.
5. Salve e aguarde alguns minutos. O site ficará em:
   - `https://SEU_USUARIO.github.io/NOME_DO_REPO/`

#### Passo a passo completo (GitHub Pages)

Se quiser um fluxo direto do zero, siga exatamente estes passos.

1. **Crie um repositório no GitHub**
   - Acesse [github.com](https://github.com/), clique em **New repository**.
   - Nome sugerido: `medical-search-web`.
   - Pode ser público (recomendado para plano grátis).

2. **Envie os arquivos do site para o repositório**

   No seu computador, dentro da pasta do projeto, rode:

   ```bash
   cd tools/medical-search-web
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/medical-search-web.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages**
   - Abra o repositório no GitHub.
   - Vá em **Settings > Pages**.
   - Em **Build and deployment**:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Clique em **Save**.

4. **Pegue a URL do site**
   - Aguarde de 1 a 5 minutos.
   - O GitHub mostrará a URL publicada, normalmente:
     - `https://SEU_USUARIO.github.io/medical-search-web/`

5. **Atualize o site quando quiser**

   Sempre que editar arquivos do site:

   ```bash
   cd tools/medical-search-web
   git add .
   git commit -m "Atualização do site"
   git push
   ```

   Após o `push`, o GitHub Pages publica automaticamente a nova versão.

6. **(Opcional) Domínio personalizado**
   - Em **Settings > Pages**, adicione seu domínio em **Custom domain**.
   - Configure os registros DNS no seu provedor de domínio.

### Opção 2) Netlify (grátis)

1. Crie conta em [netlify.com](https://www.netlify.com/).
2. Clique em **Add new site > Deploy manually**.
3. Arraste a pasta `tools/medical-search-web`.
4. O Netlify publica e entrega uma URL gratuita imediatamente.

Também é possível conectar ao GitHub para deploy automático a cada commit.

### Opção 3) Vercel (grátis)

1. Crie conta em [vercel.com](https://vercel.com/).
2. Clique em **Add New... > Project** e importe seu repositório GitHub.
3. Em configurações do projeto:
   - **Framework preset**: `Other`
   - **Root Directory**: `tools/medical-search-web`
4. Clique em **Deploy**.

## Dicas importantes de produção

- O app faz requisições diretas para a API Europe PMC no navegador.
- Se no futuro houver limitação de CORS/rate limit, use um backend leve (ex.: Cloudflare Workers, Render Free, Railway) para atuar como proxy.
- Para uso com domínio próprio, tanto GitHub Pages quanto Netlify/Vercel permitem configurar DNS personalizado.
