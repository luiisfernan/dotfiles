var supported_languages = [{name:"English", code:"en"}, {name:"Spanish", code:"es"},
{name:"French", code:"fr"}, {name:"Malay", code:"ms"}, {name:"Portuguese", code:"pt"},
{name:"Bengali", code:"bn"}, {name:"Arabic", code:"ar"}, {name:"Russian", code:"ru"},
{name:"Italian", code:"it"}, {name:"Hindi", code:"hi"}, {name:"german", code:"de"},
{name:"Chinese(Simplified)", code:"zh-CN"}, {name:"Chinese(Traditional)", code:"zh-TW"}, {name:"Japanese", code:"ja"}];

supported_languages.sort(function(a,b){
	var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
	if (nameA < nameB) //sort string ascending
		return -1 
	if (nameA > nameB)
		return 1
	return 0

});


function get_cc(language){
	for(index in supported_languages){
		if(supported_languages[index].name == language){
			return supported_languages[index].code;
		}
	
	}
	return null;

}