function(doc){
	if(doc.geometry && doc.properties){
		emit(doc.geometry, {geometry:doc.geometry,properties:doc.properties,type: "Feature"});
	}
}

