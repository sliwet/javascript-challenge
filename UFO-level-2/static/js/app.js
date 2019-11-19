var setAttrs = (whattoset,attrs) => {
    Object.entries(attrs).forEach(([key,value]) => {
        whattoset.attr(key,attrs[key]);
    });
}
// ----------- Add more lists ---------------
var filters = d3.select("#filters");

var labels = ["city","state","country","shape"];
var placeholdertexts = ["aspen","co","us","chevron"];

var attrbs = []
for(var i = 0;i< labels.length;i++){
    attrbs.push({"class":"form-control","id":labels[i],"type":"text","placeholder":placeholdertexts[i]});
}

for(var i = 0;i<labels.length;i++){
    var li = filters.append("li");
    li.attr("class", "filter list-group-item");
    
    var label = li.append('label');
    label.attr("for",labels[i]);
    label.text(labels[i]);
    
    var inpt = li.append('input');
    setAttrs(inpt,attrbs[i]);
}
//----------------------------------------

var tbody = d3.select("tbody");

var getMatchingRecords = (dt,flts) => {
    var mdy1 = new Date(dt);
    var records = []
    data.forEach((datum) => {
        var mdy2 = new Date(datum.datetime);
        if ((+mdy2 === +mdy1) && (flts[0] === datum.city) && (flts[1] === datum.state) 
        && (flts[2] === datum.country) && (flts[3] === datum.shape) ){
            records.push(datum);
        }
    });
    return records;
}

var updateTable = records => {
    tbody.html("");
    if (records.length < 1) return;
    records.forEach((record) => {
        var row = tbody.append("tr");
        Object.values(record).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

var button = d3.select("#filter-btn");

var handleInput = () => {
    var flts = labels.map(label =>{
        return d3.select(`#${label}`).property("value");
    });
    dt = d3.select("#datetime").property("value");
    updateTable(getMatchingRecords(dt,flts));
}

button.on("click", handleInput);
