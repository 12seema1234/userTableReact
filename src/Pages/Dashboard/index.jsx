import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FAKE_DATA from "../../FAKE_DATA.json";

function Dashboard() {
  const navigate = useNavigate();
  const [searchtext, setSearchText] = useState("");
  const [tableData, setTableData] = useState(FAKE_DATA);

  const handlelogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const doSearch = (event) => {
    event.preventDefault();
    const searchReasult = FAKE_DATA.filter(
      (d) =>
        (d.empName + d.empAddress)
          .toLocaleLowerCase()
          .search(searchtext.toLocaleLowerCase()) >= 0
    );
    setTableData(searchReasult);
    localStorage.setItem(
      "searchReasult",
      JSON.stringify({ searchtext, searchReasult })
    );
  };

  useEffect(() => {
    let prevSearchData = localStorage.getItem("searchReasult");
    if (prevSearchData) {
      prevSearchData = JSON.parse(prevSearchData);
      setSearchText(prevSearchData.searchtext);
      setTableData(prevSearchData.searchReasult);
    }
  }, []);

  return (
    <div className="Dashboard">
      <h1>User Dahsboard</h1>
      <button onClick={handlelogout}>Logout</button>

      <div className="searchInput">
        <input
          type={"text"}
          name="searchText"
          value={searchtext}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" onClick={doSearch}>
          Search
        </button>
      </div>

      <div className="employeData">
        <DataTable empData={tableData} />
      </div>
    </div>
  );
}

const DataTable = ({ empData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>EmpId</th>
          <th>empName</th>
          <th>empAddress</th>
          <th>empNumber</th>
        </tr>
      </thead>
      <tbody>
        {empData.map((emp) => {
          const { empId, empName, empAddress, empNumber } = emp;
          return (
            <tr>
              <td>{empId}</td>
              <td>{empName}</td>
              <td>{empAddress}</td>
              <td>{empNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Dashboard;
