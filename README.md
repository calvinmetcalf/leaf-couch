leaf-couch
=========
[leaflet](http://leafletjs.com) + [couchdb](http://couchdb.apache.org/)(via [pouchdb](http://pouchdb.com/)) = crazy delicious

also includes [leaflet-hash](https://github.com/mlevans/leaflet-hash) and [leaflet.draw](https://github.com/jacobtoye/Leaflet.draw), requires [erica](https://github.com/benoitc/erica) to put it into a db, since I can't get the local pouchdb to replicate over, instead we just send it straight there.

if you have erica installed you should be able to go

```shell
cd leaf-couch
erica push http://localhost:5984/leaflet
```

todo
---

- edit properties
- m̶a̶k̶e̶ ̶m̶a̶p̶ ̶o̶f̶ ̶h̶t̶t̶p̶:̶/̶/̶l̶o̶c̶a̶l̶h̶o̶s̶t̶:̶5̶9̶8̶4̶/̶l̶e̶a̶f̶l̶e̶t̶/̶_̶d̶e̶s̶i̶g̶n̶/̶l̶e̶a̶f̶l̶e̶t̶/̶_̶s̶p̶a̶t̶i̶a̶l̶/̶_̶l̶i̶s̶t̶/̶g̶e̶o̶j̶s̶o̶n̶/̶a̶l̶l̶?̶b̶b̶o̶x̶=̶ ̶b̶b̶o̶x̶ ̶w̶h̶i̶c̶h̶ ̶u̶p̶d̶a̶t̶e̶s̶ ̶o̶n̶ ̶m̶o̶v̶e̶/̶z̶o̶o̶m̶
- authentication
