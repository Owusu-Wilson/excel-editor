import React, { useState } from "react";
import {
  Button,
  FileInput,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
} from "flowbite-react"; // Assuming FileInput is from your custom library
import * as XLSX from "xlsx";

function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [toggleShowTable, setToggleShowTable] = useState(false);
  const [dataColumns, setDataColumns] = useState([]);

  const readFirstWorkSheet = (excelFile) => {
    // Reading the contents of the excel file
    const reader = new FileReader();
    reader.readAsBinaryString(excelFile);
    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: "binary" });
      // Access worksheets and data
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const firstRow = jsonData[0];
      const columnNames = Object.keys(firstRow);
      setDataColumns(columnNames);
      console.log("headings: ", columnNames);
      console.log("Excel data:", jsonData); // Do something with the parsed data
    };
  };
  const readExcelContent = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const workSheets = workbook.Sheets[workbook.SheetNames];
      const rowsInFirstSheet = XLSX.utils.sheet_to_json(workSheets[0]);
      console.log("Sheets: ", workSheets);
      console.log(rowsInFirstSheet);
    };
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file); // Log file name and size
    setSelectedFile(file);
    readFirstWorkSheet(file);
  };

  return (
    <div className="container p-4" style={{ fontFamily: "Inter" }}>
      <h1 className=" text-7xl font-semibold ">
        Upload <span className="text-green-500">Excel</span>
      </h1>
      <div id="fileUpload" className="max-w-md mt-5">
        <FileInput
          id="file"
          name="file"
          accept=".xlsx, .xls" // Accept only .xlsx and .xls files
          onChange={handleFileUpload}
          helperText="Add new data easily by uploading an existing excel file"
        />
      </div>
      <Button
        onClick={() => {
          console.log(dataColumns);
          setToggleShowTable(!toggleShowTable);
        }}
      >
        {toggleShowTable ? "Hide Preview" : "Show Preview"}
      </Button>
      <div className="mt-4">
        <Table>
          <TableHead>
            {toggleShowTable &&
              dataColumns.map((columnName) => (
                <TableHeadCell key={columnName}>{columnName}</TableHeadCell>
              ))}
          </TableHead>
          <TableBody>
            {toggleShowTable &&
              jsonData.map((columnName) => (
                <TableCell key={columnName}>{columnName}</TableCell>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default Home;
