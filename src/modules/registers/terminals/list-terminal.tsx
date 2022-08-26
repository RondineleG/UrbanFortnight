import Register from "@/components/shared/Register";
import React, { FunctionComponent } from "react";
import MaterialTable from "@/components/shared/MaterialTable";
import { useTranslation } from "next-i18next";
import { TerminalModel, ListProps } from "models/TerminalTypes";

const ListTerminal: FunctionComponent<ListProps> = ({ terminalList, onAddClick, handleRowClick }: ListProps): JSX.Element => {

  const dataTable: Array<Object> = [];
  const { t } = useTranslation("terminal");
  const columns: Array<Object> = [
    {
      title: t("IdTerminal"),
      field: "idTerminal",
      hidden: true
    },
    {
      title: t("NameTerminal"),
      field: "nameTerminal"
    },
    {
      title: t("CNPJTerminal"),
      field: "cnpjTerminal"
    },
    {
      title: t("Location"),
      field: "nameCity"
    },
    {
      title: t("ActiveTerminal"),
      field: "activeTerminal",
      type: "boolean"
    }
  ];

  function tableDataMount(): void {
    terminalList.map((terminal: TerminalModel) =>
      dataTable.push({
        idTerminal: terminal.idTerminal,
        nameTerminal: terminal.nameTerminal,
        cnpjTerminal: terminal.cnpjTerminal,
        cityIdCity: terminal.cityIdCity,
        city: terminal.city,
        nameCity: terminal.city.nameCity,
        addressTerminal: terminal.addressTerminal,
        specificInstructionTerminal: terminal.specificInstructionTerminal,
        generalObservationTerminal: terminal.generalObservationTerminal,
        activeTerminal: terminal.activeTerminal,
        stateRegistrationTerminal: terminal.stateRegistrationTerminal,
        municipalRegistrationTerminal: terminal.municipalRegistrationTerminal,
        zipcodeTerminal: terminal.zipcodeTerminal,
      })
    );
  }

  tableDataMount();

  return (
    <Register
      headerName={t("terminals")}
      onAddClick={onAddClick}
    >
      <MaterialTable
        dataT={dataTable}
        columnsT={columns}
        handleRowClick={handleRowClick}
      />
    </Register>
  );
};

export default ListTerminal;
