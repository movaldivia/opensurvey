"use client";

import { exportToExcel } from "@/lib/exportToExcel";
import { Button } from "@/components/ui/button";

type FormattedResponse = {
  [key: string]: string;
};

export function ExportToExcelButton({
  processedData,
}: {
  processedData: (string | number)[][];
}) {
  return (
    <Button onClick={() => exportToExcel(processedData, "myData")}>
      Export to Excel
    </Button>
  );
}
