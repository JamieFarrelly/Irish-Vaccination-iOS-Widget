// based on https://gist.github.com/planecore/e7b4c1e5db2dd28b1a023860e831355e

const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
const country = "Ireland"
const req = new Request(endpoint)
const res = await req.loadJSON()

if (config.runsInWidget) {
    // create and show widget
    let widget = createWidget("Irish Vaccinations", `${res.IRL.total_vaccinations}`, ``, "#53d769")

    Script.setWidget(widget)
    Script.complete()
} else {
    // make table
    let table = new UITable()

    // add header
    let row = new UITableRow()
    row.isHeader = true
    row.addText(`Vaccination Stats in ${country}`)
    table.addRow(row)

    // fill data
    table.addRow(createRow("People Vaccinated", res.IRL.total_vaccinations))

    // present table
    table.present()
}

function createRow(title, number) {
    let row = new UITableRow()
    row.addText(title)
    row.addText(number.toString()).rightAligned()
    return row
}

function createWidget(pretitle, title, subtitle, color) {
    let w = new ListWidget()
    w.backgroundColor = new Color(color)
    let preTxt = w.addText(pretitle)
    preTxt.textColor = Color.white()
    preTxt.textOpacity = 0.8
    preTxt.font = Font.systemFont(16)
    w.addSpacer(5)
    let titleTxt = w.addText(title)
    titleTxt.textColor = Color.white()
    titleTxt.font = Font.systemFont(22)
    w.addSpacer(5)
    let subTxt = w.addText(subtitle)
    subTxt.textColor = Color.white()
    subTxt.textOpacity = 0.8
    subTxt.font = Font.systemFont(18)
    return w
}
