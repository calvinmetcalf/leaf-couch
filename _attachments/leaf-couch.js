var db,rdb, dbPath=  document.location.protocol+"//"+document.location.host+"/"+document.location.pathname.split("/")[1];
Pouch("idb://couch-leaf",function(e1,db1){
    if(!e1){
        db=db1;
        db.changes({continuous:true,onChange:docChange,include_docs:true},pass);
        Pouch(dbPath,function(e2,db2){
             if(!e2){
                rdb=db2;
                db.replicate.to(rdb,{continuous:true});
                rdb.changes({continuous:true,onChange:rdocChange,include_docs:true},pass);
            }
        });
    }
});
var m= L.map('map').setView([39.40, -96.42], 4),
	mq=L.tileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg", {attribution:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains:'1234'}).addTo(m),
	h = new L.Hash(m),
	d = new L.Control.Draw().addTo(m),
	drawnStuff = L.geoJson("",{pointToLayer:pointToLayer,onEachFeature:popUp}).addTo(m),
	allStuff = L.geoJson("",{pointToLayer:pointToLayer,onEachFeature:popU})
	m.on('drawn', function (e) {
			doStuff(e.feature);
		});
		
function redoJson(){
		allStuff.clearLayers();
		allStuff.addUrl(document.location.protocol+"//"+document.location.host+"/"+document.location.pathname.split("/")[1]+"/"+document.location.pathname.split("/")[2]+"/"+document.location.pathname.split("/")[3]+"/_spatial/_list/geojson/all?bbox="+m.getBounds().toBBoxString());
		};
		
//m.on("moveend", redoJson);

var baseMaps = {
    "Map Quest": mq
    }, overlayMaps = {
	"Drawn Layers":drawnStuff,
	"All Layers":allStuff
	},lc=L.control.layers(baseMaps, overlayMaps).addTo(m);

function doStuff(data){
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
            	out.push(key+": "+f.properties[key] + " <a href='#' id='key-"+key+"' class='delete-row'>x</a>");
        }
        l.bindPopup("<div class='"+ out.lenghth+"' id='" + f._id+"'>"+out.join("<br />")+"</div><br /><input type='button' value='Add Row' id='addRow'><input type='button' value='delete' id='deleteDoc'>");
    }
}
function popU(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
                out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}
function docChange(c){
var doc = c.doc;    
if(doc._rev.slice(0,1)==1&&"geometry" in doc){
drawnStuff.addData(doc);
}else if(doc._rev.slice(0,1)>1){
    delId(drawnStuff,doc._id);
    if(!doc._deleted&&"geometry" in doc){
    drawnStuff.addData(doc);
}
}
}
function rdocChange(c){
var doc = c.doc;    
if(doc._rev.slice(0,1)==1&&"geometry" in doc){
allStuff.addData(doc);
}else if(doc._rev.slice(0,1)>1){
    delId(allStuff,doc._id);
    if(!doc._deleted&&"geometry" in doc){
    allStuff.addData(doc);
}
}
}
function delId(layer,id){
layer.eachLayer(function(f){
if(f.feature._id===id){
layer.removeLayer(f);
}
})}
var ee;
m.on("popupopen",function(e){
    if(e.popup._source._leaflet_id in drawnStuff._layers){
    var id = e.popup._source.feature._id;
    L.DomEvent.addListener(L.DomUtil.get("deleteDoc"),"click",function(click){
        db.get(id, function(err, doc) {
            db.remove(doc, pass);
        });
    });
    L.DomEvent.addListener(L.DomUtil.get("addRow"),"click",function(click){
        var div =L.DomUtil.get(id);
        var form = L.DomUtil.create("form","row-form");
        form.id="addRowForm";
      var kInput =  L.DomUtil.create("input","k-input");
      kInput.setAttribute("style","width:4em");kInput.setAttribute("placeholder","key");
      
      var vInput =  L.DomUtil.create("input","v-input");
      vInput.setAttribute("style","width:4em");vInput.setAttribute("placeholder","value");
      form.appendChild(kInput);
      form.appendChild(vInput);
      var sub = L.DomUtil.create("input","sub-input");
      sub.setAttribute("type","submit");
      sub.setAttribute("value","save");
      form.appendChild(sub);
      form.onsubmit=function(e){
        var key = e.srcElement[0].value;
        var value = e.srcElement[1].value
        db.get(id,function(err,dc){
            dc.properties[key]=value;
            db.post(dc);
            })
        return false;
        };
      div.appendChild(form);
      
    });
    $(".delete-row").click(function(e){ //almost did this without jquery
        var key = e.currentTarget.id.slice(4)
        db.get(id,function(err,dc){
            delete dc.properties[key]
            db.post(dc);
            })
        })
}});
function pass(){}
