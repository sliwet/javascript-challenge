
var tbody = d3.select("tbody");

function getMatchingRecords(mdy) {
    var mdy1 = new Date(mdy);
    // console.log(mdy1.getMonth());
    // console.log(mdy1.getDate());
    // console.log(mdy1.getFullYear());
    var records = []
    data.forEach((datum) => {
        var mdy2 = new Date(datum.datetime);
        if (+mdy2 === +mdy1) {
            records.push(datum);
        }
    });
    return records;
}

function updateTable(records) {
    tbody.html("");
    if (records.length < 1) return;
    records.forEach((record) => {
        var row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

var button = d3.select("#filter-btn");

var handleInput = () => {
    // stops the page refresh on "Enter" button
    d3.event.preventDefault();

    var dt = d3.select("#datetime").property("value");
    var records = getMatchingRecords(dt);
    updateTable(records);
}

// Update the table with button click
button.on("click", handleInput);
// Enter also update the output
d3.select("form").on("submit", handleInput);
