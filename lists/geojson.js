function(head, req) {
    var row, out, sep = '\n';
    if (req.headers.Accept.indexOf('application/json')!=-1) {
        start({"headers":{"Content-Type" : "application/json"}});
    }    else {
        start({"headers":{"Content-Type" : "text/plain"}});
    }
    if ('callback' in req.query) {
        send(req.query['callback'] + "(");
    }    send('{"type": "FeatureCollection", "features":[');
    while (row = getRow()) {
        out = JSON.stringify({
        	type: "Feature", 
        	geometry: row.value.geometry, 
        	properties: row.value.properties
        });
        send(sep + out);        sep = ',\n';
    }
    send("]}");
    if ('callback' in req.query) {
        send(")");
	}
};
