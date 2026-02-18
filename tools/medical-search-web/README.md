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
