function(doc){
	if(doc.geometry && doc.properties && doc._id){
		var outP = {id:doc._id,rev:doc._rev}
		for(key in doc.properties){
			outP[key]=doc.properties[key];
		}
		emit(doc.geometry, {"geometry":doc.geometry,"properties":outP});
	}
}

