function getPRsFromDate(repoPRs, lastReportDate) {
  return repoPRs.filter((pr) =>
    new Date(pr.closed_at) <= new Date(lastReportDate));
}

function getFeatures(PR) {
  const body = PR.body;
  const featureList = []
  const sections = body.split('####');
  sections.filter((section) => {
    return section.toLowerCase().includes('what does this pr do');
  }).join('').split('- ').forEach((feature, index) => {
    if (index) {
      featureList.push(feature);
    }
  });
  return featureList;
}

function formatReport(features, repo) {
  return `
    <div>
      <h2>${repo.productName}</h2>
      <p>${repo.description}</p>
      <p>Updates:
        <ul>
          ${features.map((feature) => {
      if (feature.trim()) {
        if (!feature.includes('![image](')) {
          return '<li>' + feature.trim() + '</li>';
        }
      }
    }).join('')}
        </ul>
      </p>
    </div>
  `;
}

function flattenFeature(features) {
  return features.reduce((a, b) => {
    return a.concat(b);
  }, []);
}

export function reportThisRepo(repoPRs, repo) {
  const PRs = getPRsFromDate(repoPRs, repo.lastReportDate);
  const features = PRs.map((PR) => getFeatures(PR));
  return formatReport(flattenFeature(features), repo);
}

