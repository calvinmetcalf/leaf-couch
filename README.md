leaf-couch
=========
[leaflet](http://leafletjs.com) + [couchdb](http://couchdb.apache.org/)(via [pouchdb](http://pouchdb.com/)) = crazy delicious

also includes [leaflet-hash](https://github.com/mlevans/leaflet-hash) and [leaflet.draw](https://github.com/jacobtoye/Leaflet.draw), requires [erica](https://github.com/benoitc/erica) to put it into a db, since I can't get the local pouchdb to replicate over, instead we just send it straight there.

if you have erica installed you should be able to go

```shell
cd leaf-couch
erica push http://localhost:5984/leaflet
```
