function(doc){
	if(doc.geometry && doc.properties && doc._id){
		var outP = {_id:doc._id,_rev:doc._rev}
		for(key in doc.properties){
			outP[key]=doc.properties[key];
		}
		emit(doc.geometry, {"geometry":doc.geometry,"properties":outP});
	}
}

