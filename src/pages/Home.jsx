import React, { useState } from "react";
import {
  Button,
  Card,
  FileInput,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react"; // Assuming FileInput is from your custom library
import * as XLSX from "xlsx";

function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [toggleShowTable, setToggleShowTable] = useState(false);
  const [dataColumns, setDataColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

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
      setTableData(jsonData);
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
    <div className="container p-10" style={{ fontFamily: "Inter" }}>
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
      <div className="flex h-16 mt-2 justify-between flex-row">
        <Button
          disabled={tableData.length < 1}
          gradientMonochrome={toggleShowTable ? "failure" : "success"}
          onClick={() => {
            console.log(dataColumns);
            setToggleShowTable(!toggleShowTable);
          }}
        >
          {toggleShowTable ? "Hide Preview" : "Show Preview"}
        </Button>

        <div>
          <h1 className="text-3xl font-bold">{dataColumns.length}</h1>
          <p className="text-gray-600">Columns Found</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{tableData.length}</h1>
          <p className="text-gray-600">Rows Found</p>
        </div>
      </div>
      <div className="mt-4">
        <Table hoverable>
          <TableHead>
            {toggleShowTable &&
              dataColumns.map((columnName) => (
                <TableHeadCell key={columnName}>{columnName}</TableHeadCell>
              ))}
          </TableHead>
          <TableBody className="divide-y">
            {toggleShowTable &&
              tableData.slice(1, 200).map((item) => (
                <TableRow
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={item.id || item.name || Math.random()}
                >
                  {dataColumns.map((columnName) => (
                    <TableCell
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                      key={`${tableData.indexOf(item)},${dataColumns.indexOf(
                        columnName
                      )}`}
                    >
                      {item[columnName]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default Home;
