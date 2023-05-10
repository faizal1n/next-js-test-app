import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({ color, title, columnMap, rowData, mainRoute }) {
  let tableRow = [];
  const totalData = rowData.length;
  for (let i=0; i< totalData; i++) {
    const currentData = rowData[i];
    let cells = [];
    for (let j=0; j<columnMap.length; j++) {
      const cellData = currentData[columnMap[j].data];

      switch(columnMap[j].type) {
        case 'image':
          cells.push(
            <td key={ 'cell'+i+'-'+j } className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <img
                key={ 'img'+i+'-'+j }
                src={ cellData }
                className="h-12 w-12 bg-white rounded-full border"
                alt="..."
              ></img>{" "}
              <span
                key={ 'span'+i+'-'+j }
                className={
                  "ml-3 font-bold " +
                  +(color === "light" ? "text-blueGray-600" : "text-white")
                }
              >
              </span>
            </td>
          )
          break;

        default:
          cells.push(
            <td key={ 'cell'+i+'-'+j }
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              { cellData }
            </td>
          )
          break;
      }

    }
    cells.push(
      <td key={ currentData.id } className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
        <TableDropdown
          detailRoute={mainRoute+'/'+currentData.id}
        />
      </td>
    )
    tableRow.push( cells )
  }

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="flex w-full px-4 max-w-full justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                { title }
              </h3>
              <Link href="/admin/products/create">
                <button
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-plus text-emerald-500 mr-4"></i>
                  Tambah Produk
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                { columnMap.map((column, idx)=>(
                  <th
                    key={ 'header'+idx }
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    {column.title}
                  </th>
                )) }
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              { tableRow.map((row, idx)=>(
                <tr key={idx}>
                  {row}
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
