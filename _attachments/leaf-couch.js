var db, dbPath= document.location.protocol+"//"+document.location.host+"/"+document.location.pathname.split("/")[1];
Pouch(dbPath, function(e, dd){
	if(!e){
		db = dd;
		changes=db.changes({continuous:true});
	}});
	
var m= L.map('map').setView([39.40, -96.42], 4),
	mq=L.tileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg", {attribution:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains:'1234'}).addTo(m),
	h = new L.Hash(m),
	d = new L.Control.Draw().addTo(m),
	drawnStuff = L.geoJson("",{pointToLayer:pointToLayer,onEachFeature:popUp}).addTo(m),
	allStuff = L.geoJson.ajax(document.location.protocol+"//"+document.location.host+"/"+document.location.pathname.split("/")[1]+"/"+document.location.pathname.split("/")[2]+"/"+document.location.pathname.split("/")[3]+"/_spatial/_list/geojson/all?bbox="+m.getBounds().toBBoxString(),{pointToLayer:pointToLayer,onEachFeature:popUp});
	m.on('drawn', function (e) {
			doStuff(e.feature);
		});
		
function redoJson(){
		allStuff.clearLayers();
		allStuff.addUrl(document.location.protocol+"//"+document.location.host+"/"+document.location.pathname.split("/")[1]+"/"+document.location.pathname.split("/")[2]+"/"+document.location.pathname.split("/")[3]+"/_spatial/_list/geojson/all?bbox="+m.getBounds().toBBoxString());
		};
		
m.on("moveend", redoJson);

var baseMaps = {
    "Map Quest": mq
    }, overlayMaps = {
	"Drawn Layers":drawnStuff,
	"All Layers":allStuff
	},lc=L.control.layers(baseMaps, overlayMaps).addTo(m);

function doStuff(data){
	drawnStuff.addData(data);
	db.post(data);
}

function pointToLayer(f,l){
	if(f.properties.radius){
		return L.circle(l, f.properties.radius);
	}else{
		return L.marker(l);
	}
}
function popUp(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
        	if("_"!==key.slice(0,1)){
            	out.push(key+": "+f.properties[key]);
        	}
        }
        l.bindPopup(out.join("<br />"));
    }
}
