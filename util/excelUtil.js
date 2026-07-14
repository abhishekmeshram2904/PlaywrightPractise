const ExcelJS = require('exceljs');

async function exceltest(seachtext, replacetext, filepath) 
{
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filepath);
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet, seachtext);
await writeExcel(workbook, worksheet, replacetext, output, filepath);
}
async function readExcel(worksheet, seachtext) 
{
let output = { row: -1, column: -1 };
worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
        if (cell.value === seachtext) {
            output.row = rowNumber;
            output.column = colNumber;
        }
    });
});
return output;
}
async function writeExcel(workbook, worksheet, replacetext, output, filepath)
{
    if (output.row !== -1 && output.column !== -1) {
        const cell = worksheet.getCell(output.row, output.column + 2);
        cell.value = replacetext;
        await workbook.xlsx.writeFile(filepath);
    } else {
        console.log('Text not found in the Excel file.');
    }
}

exports.exceltest = exceltest;