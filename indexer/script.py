import json
import os
from algoliasearch import algoliasearch


with open('places.json') as f:
	raw = json.load(f)
with open('config.json') as c:
	credentials = json.load(c)

USER_ID = credentials["ALGOLIA_USER_ID"]
API_KEY = credentials["ALGOLIA_API_KEY"]
client = algoliasearch.Client(USER_ID, API_KEY)

# Push data
index = client.init_index("myplaces")
# Flush database so that we don't get dupes
index.delete_by_query({})
print index.add_objects(raw["features"])

print 'Nombre de MyPlaces : {0}.'.format(len(raw["features"]))

settingsTask = index.set_settings({
  "searchableAttributes": ["properties.Title", "properties.Location.BusinessName", "properties.Location.Address"],
  "attributesForFaceting":["properties.Location.Category", "properties.Location.Country Code"]
})

print 'Settings Task : {0}.'.format(settingsTask['taskID'])

index.wait_task(settingsTask['taskID'])
