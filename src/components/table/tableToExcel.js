import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import dayjs from 'dayjs'
import { flatten, isNumber, isUndefined, toNumber } from 'lodash-es'
import { message } from 'ant-design-vue'

function cellToNumber (value) {
    const regExp = /^([0-9]+\.?[0-9]*|-[0-9]+\.?[0-9]*)$/
    const nextValue = value + ''
    if (nextValue.length < 15 && regExp.test(nextValue)) {
        const result = toNumber(nextValue)
        if (!isNaN(result)) return result
    }
    return nextValue
}

function getMaxLineBreak (rows) {
    const regExp = /\n/ig
    const values = rows.map((item) => {
        const value = item && item.v
        const nextValue = value + ''
        const result = nextValue.match(regExp)
        return result ? result.length : 0
    })
    return Math.max.apply(null, values)
}

function genCells (sheet) {
    const range = XLSX.utils.decode_range(sheet['!ref'])
    const cells = []
    for (let R = range.s.r; R <= range.e.r; ++R) {
        const rows = []
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R }
            const cellRef = XLSX.utils.encode_cell(cellAddress)
            const cellData = sheet[cellRef]
            rows.push(cellData)
        }
        cells.push(rows)
    }
    return cells
}

function dealWithLineBreak (cells) {
    const genFillRows = (rows) => {
        const maxLineBreak = getMaxLineBreak(rows)
        const maxRow = 1 + maxLineBreak
        const fillRows = Array.apply(null, Array(maxRow)).map(() => {
            return Array.apply(null, Array(rows.length))
        })
        rows.forEach((item, index) => {
            if (!isUndefined(item)) {
                const value = item.v + ''
                const strArr = value.split('\n')
                const r = strArr.length !== 1 ? 0 : maxLineBreak
                for (let i = 0; i < strArr.length; i++) {
                    const v = cellToNumber(strArr[i])
                    const t = isNumber(v) ? 'n' : item.t
                    const rowspan = i === 0 ? r : 0
                    fillRows[i][index] = { t, v, rowspan }
                }
            }
        })
        return fillRows
    }
    const nextCells = cells.map(genFillRows)
    return flatten(nextCells)
}

function writeSheet (sheetHead, sheetBody) {
    const genBodyMerges = (cells, omit) => {
        const merges = []
        for (let R = 0; R < cells.length; R++) {
            for (let C = 0; C < cells[R].length; C++) {
                if (cells[R][C] && cells[R][C].rowspan) {
                    const result = {
                        s: { r: R + omit, c: C },
                        e: { r: R + omit + cells[R][C].rowspan, c: C }
                    }
                    merges.push(result)
                }
            }
        }
        return merges
    }

    const headCells = genCells(sheetHead)
    const bodyCells = genCells(sheetBody)
    const nextHeadCells = dealWithLineBreak(headCells)
    const nextBodyCells = dealWithLineBreak(bodyCells)
    // --
    const headAoa = nextHeadCells.map((rows) => rows.map((item) => item && item.v))
    const bodyAoa = nextBodyCells.map((rows) => rows.map((item) => item && item.v))
    // --
    const nextTableSheet = XLSX.utils.aoa_to_sheet([...headAoa, ...bodyAoa])

    const headMerges = sheetHead['!merges'] || []
    const bodyMerges = genBodyMerges(nextBodyCells, headAoa.length)
    nextTableSheet['!merges'] = [...headMerges, ...bodyMerges]
    return nextTableSheet
}

function tableToExcel (tableDom) {
    try {
        // Table
        const printTableHead = tableDom.querySelector('.ant-table-thead').cloneNode(true)
        const printTableBody = tableDom.querySelector('.ant-table-tbody').cloneNode(true)
        const measureRow = printTableBody.querySelector('.ant-table-measure-row')
        measureRow && printTableBody.removeChild(measureRow)
        // XLSX
        const workbook = XLSX.utils.book_new()
        const sheetHead = XLSX.utils.table_to_sheet(printTableHead, { raw: true })
        const sheetBody = XLSX.utils.table_to_sheet(printTableBody, { raw: true })
        const sheetTable = writeSheet(sheetHead, sheetBody)
        XLSX.utils.book_append_sheet(workbook, sheetTable, 'Sheet1')
        const etOut = XLSX.write(workbook, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        })
        const time = dayjs()
        const day = time.format('YYYY-MM-DD')
        const now = time.valueOf()
        const fileName = `${day}_${now}.xlsx`
        FileSaver.saveAs(new Blob([etOut], {
            type: 'application/octet-stream'
        }), fileName)
        message.success('导出成功')
    } catch (error) {
        console.log(error, etOut)
        message.error('导出失败')
    }
}

export default tableToExcel
