// based on https://gist.github.com/planecore/e7b4c1e5db2dd28b1a023860e831355e

const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
const req = new Request(endpoint)
const res = await req.loadJSON()

if (config.runsInWidget) {
    // create and show widget
	let w = new ListWidget()
    w.backgroundColor = new Color("#53d769")
	
    let titleTxt = w.addText(`Total Vaccinations: ${res.IRL.total_vaccinations}`)
    titleTxt.textColor = Color.white()
    titleTxt.font = Font.systemFont(14)
    w.addSpacer(5)
	
    let subTxtFirstDose = w.addText(`First Dose: ${res.IRL.people_vaccinated}`)
    subTxtFirstDose.textColor = Color.white()
    subTxtFirstDose.textOpacity = 0.8
    subTxtFirstDose.font = Font.systemFont(12)
	w.addSpacer(2)
	
	let subTxtSecondDose = w.addText(`Fully Vaccinated: ${res.IRL.people_fully_vaccinated}`)
    subTxtSecondDose.textColor = Color.white()
    subTxtSecondDose.textOpacity = 0.8
    subTxtSecondDose.font = Font.systemFont(12)
	
    Script.setWidget(w)
    Script.complete()
} else {
    // make table
    let table = new UITable()

    // add header
    let row = new UITableRow()
    row.isHeader = true
    row.addText(`Vaccination in Ireland`)
    table.addRow(row)

    // fill data
	table.addRow(createRow("Total Vaccinations", res.IRL.total_vaccinations))
    table.addRow(createRow("First Dose Vaccinations", res.IRL.people_vaccinated))
	table.addRow(createRow("Fully Vaccinated", res.IRL.people_fully_vaccinated))

    // present table
    table.present()
}

function createRow(title, number) {
    let row = new UITableRow()
    row.addText(title)
    row.addText(number.toString()).rightAligned()
    return row
}
