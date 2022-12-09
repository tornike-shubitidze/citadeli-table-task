import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import Spinner from "./components/Spinner";
import TableHeader from "./components/TableHeader";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (initialized) {
      return;
    }

    fetch("data.json")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setInitialized(true);
        setLoading(false);
      })
      .catch(() => {
        alert("Something Went Wrong 😬 Try Again! ");
      });
  }, [initialized]);

  useEffect(() => {
    setLoading(true);
    fetch("data.json")
      .then((response) => response.json())
      .then((response) => {
        const { selectedDepartments, selectedGroups, selectedManagers } =
          selectedFilters;

        if (selectedDepartments.length > 0) {
          const filteredDepartments = response.department.filter(
            (departmentItem) =>
              selectedDepartments.some((x) => x === departmentItem.name)
          );
          response = { department: filteredDepartments };
        }

        if (selectedGroups.length > 0) {
          const filteredGroups = response.department.filter(
            (departmentItem) => {
              const filteredGroup = departmentItem.groups.filter((groupItem) =>
                selectedGroups.some((x) => x === groupItem.name)
              );

              departmentItem.groups = filteredGroup;
              return departmentItem;
            }
          );
          response = { department: filteredGroups };
        }

        if (selectedManagers.length > 0) {
          const filteredManagers = response.department.filter(
            (departmentItem) => {
              return departmentItem.groups.filter((groupItem) => {
                const filteredManager = groupItem.manager.filter(
                  (managerItem) =>
                    selectedManagers.some((a) => a === managerItem.name)
                );

                groupItem.manager = filteredManager;
                departmentItem.groups.manager = groupItem.manager;
                return departmentItem;
              });
            }
          );
          response = { department: filteredManagers };
        }
        setLoading(false);
        setData(response);
      });
  }, [selectedFilters]);

  return (
    <div>
      {loading && <Spinner />}
      {initialized && (
        <Table celled>
          <TableHeader data={data} setSelectedFilters={setSelectedFilters} />
          <Table.Body>
            {initialized &&
              data.department.map((department) =>
                department.groups.map((group) =>
                  group.manager.map((manager, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{department.name}</Table.Cell>
                      <Table.Cell>{group.name}</Table.Cell>
                      <Table.Cell>{manager.name}</Table.Cell>
                    </Table.Row>
                  ))
                )
              )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default App;
