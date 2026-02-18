const reputableJournals = [
  'The Lancet',
  'BMJ',
  'JAMA',
  'New England Journal of Medicine',
  'Annals of Surgery',
  'British Journal of Surgery',
  'Transfusion',
  'Vox Sanguinis',
  'Anesthesiology',
  'Journal of Thoracic and Cardiovascular Surgery'
];

const termInput = document.getElementById('term');
const maxResultsInput = document.getElementById('max-results');
const form = document.getElementById('search-form');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const sendEmailButton = document.getElementById('send-email');
const recipientEmailInput = document.getElementById('recipient-email');

let currentResults = [];

const scoreArticle = (article) => {
  const source = (article.journalTitle || '').toLowerCase();
  const title = (article.title || '').toLowerCase();
  const abstractText = (article.abstractText || '').toLowerCase();

  let score = 0;
  reputableJournals.forEach((journal) => {
    if (source.includes(journal.toLowerCase())) score += 15;
  });

  ['bloodless', 'blood conservation', 'transfusion-free', 'jehovah', 'patient blood management', 'blood product-free'].forEach((kw) => {
    if (title.includes(kw) || abstractText.includes(kw)) score += 10;
  });

  if (article.citedByCount > 20) score += 5;
  return score;
};

const renderResults = (articles) => {
  resultsEl.innerHTML = '';

  if (!articles.length) {
    statusEl.textContent = 'Nenhum resultado encontrado para este tema.';
    sendEmailButton.disabled = true;
    return;
  }

  statusEl.textContent = `${articles.length} artigos encontrados e ordenados por relevância.`;

  articles.forEach((article, idx) => {
    const li = document.createElement('li');
    const title = article.title || 'Sem título';
    const journal = article.journalTitle || 'Revista não informada';
    const year = article.pubYear || 'Ano não informado';
    const link = article.doi
      ? `https://doi.org/${article.doi}`
      : article.pmid
      ? `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}`
      : '#';

    li.innerHTML = `
      <strong>${idx + 1}. <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></strong>
      <div class="meta">${journal} • ${year}</div>
    `;

    resultsEl.appendChild(li);
  });

  sendEmailButton.disabled = false;
};

const buildSearchQuery = (term) => {
  const bloodlessTerms = '"bloodless surgery" OR "transfusion-free" OR "without blood transfusion" OR "patient blood management"';
  return `(${term}) AND (${bloodlessTerms})`;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const term = termInput.value.trim();
  const maxResults = Number(maxResultsInput.value || 15);

  statusEl.textContent = 'Pesquisando em bases biomédicas...';
  resultsEl.innerHTML = '';
  sendEmailButton.disabled = true;

  const query = buildSearchQuery(term);
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&pageSize=${maxResults}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha ao consultar API');

    const data = await response.json();
    const articles = (data.resultList?.result || [])
      .map((a) => ({ ...a, relevanceScore: scoreArticle(a) }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    currentResults = articles;
    renderResults(articles);
  } catch (error) {
    statusEl.textContent = 'Erro na pesquisa. Verifique sua conexão e tente novamente.';
    console.error(error);
  }
});

sendEmailButton.addEventListener('click', () => {
  if (!currentResults.length) return;

  const recipient = recipientEmailInput.value.trim();

  const lines = currentResults.slice(0, 10).map((article, i) => {
    const title = article.title || 'Sem título';
    const journal = article.journalTitle || 'Revista não informada';
    const year = article.pubYear || 'Ano não informado';
    const link = article.doi
      ? `https://doi.org/${article.doi}`
      : article.pmid
      ? `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}`
      : 'Sem link';

    return `${i + 1}. ${title}\n   ${journal} (${year})\n   ${link}`;
  });

  const subject = encodeURIComponent('Resultados de artigos: intervenções cirúrgicas sem sangue');
  const body = encodeURIComponent(`Olá,\n\nSegue a lista de artigos encontrados:\n\n${lines.join('\n\n')}\n\nGerado pelo buscador de artigos médicos.`);
  const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
});
