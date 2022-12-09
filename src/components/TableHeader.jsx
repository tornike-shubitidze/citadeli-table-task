import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "semantic-ui-react";

const TableHeader = ({ data, setSelectedFilters }) => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);

  const getUniqueOptions = (items) => {
    const result = items.map((x) => x.name);
    return [...new Set(result)].map((x) => ({
      key: x,
      value: x,
      text: x,
    }));
  };

  useEffect(() => {
    const { department } = data;
    setDepartmentOptions(getUniqueOptions(department));
    setGroupOptions(getUniqueOptions(department.flatMap((x) => x.groups)));
    setManagerOptions(
      getUniqueOptions(
        department.flatMap((x) => x.groups).flatMap((x) => x.manager)
      )
    );
  }, []);

  return (

    <Table.Header className="table-header">
      <Table.Row>
        <Table.HeaderCell>
          <div className="table-header-cell">
            <span>დეპარტამენტი</span>
            <Dropdown className="custom-dropdown"
              onChange={(_e, { value }) => {
                setSelectedDepartments(value);
                setSelectedFilters({
                  selectedDepartments: value,
                  selectedGroups,
                  selectedManagers,
                });
              }}
              multiple
              search
              selection
              options={departmentOptions}
            />
          </div >
        </Table.HeaderCell>
        <Table.HeaderCell>
          <div className="table-header-cell">
            <span>ჯგუფი</span>
            <Dropdown className="custom-dropdown"
              onChange={(_e, { value }) => {
                setSelectedGroups(value);
                setSelectedFilters({
                  selectedDepartments,
                  selectedGroups: value,
                  selectedManagers,
                });
              }}
              multiple
              search
              selection
              options={groupOptions}
            />
          </div >
        </Table.HeaderCell>
        <Table.HeaderCell>
          <div className="table-header-cell">
            <span>მენეჯერი</span>
            <Dropdown className="custom-dropdown"
              onChange={(_e, { value }) => {
                setSelectedManagers(value);
                setSelectedFilters({
                  selectedDepartments,
                  selectedGroups,
                  selectedManagers: value,
                });
              }}
              multiple
              search
              selection
              options={managerOptions}
            /></div >
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

  );
};

export default TableHeader;
