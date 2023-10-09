import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function exportToExcel(
  processedData: (string | number)[][],
  fileName: string = "data"
): void {
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(processedData); // Use aoa_to_sheet for array of arrays
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate Excel file.
  const excelBuffer: any = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Save to file.
  const blob: Blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(blob, `${fileName}.xlsx`);
}
