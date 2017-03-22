var search = instantsearch({
	appId: 'NIMS8YU344',
	apiKey: 'b6afbeab604d21583e215fc294c557ff',
	indexName: 'myplaces', 
	urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search for products'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: getTemplate('hit'),
      empty: getTemplate('no-results')
    }
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.addWidget(
  instantsearch.widgets.sortBySelector({
    container: '#sort-by',
    autoHideContainer: true,
    indices: [{
      name: search.indexName, label: 'Most relevant'
    }]
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);

//Refinement List Filter on Country
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#country',
    attributeName: 'properties.Location.Country Code',
    limit: 10,
    sortBy: ['name:asc'],
    operator: 'or',
    templates: {
      header: '<h5>Country/h5>'
    }
  })
);

search.start();


function getTemplate(templateName) {
  return document.getElementById(templateName + '-template').innerHTML;}