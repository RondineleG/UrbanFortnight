import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { withTranslation } from "next-i18next";

type TableSettings = {
  columnsT: Array<Object>;
  dataT: any[];
  handleRowClick: (any)=>void;
  i18nNamespaces?: ["table"];
  t?: any;
}

const Table = ({ columnsT, dataT, handleRowClick, t }: TableSettings) => {
  const containerStyle = {
    boxShadow: "0px 0px",
    marginTop: "-15px",
    marginLeft: "-15px",
    marginRight: "-15px",
  };
  const filterRowStyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
  };

  return (
    <MaterialTable
      data={dataT}
      columns={columnsT}
      options={{
        padding: "dense",
        showTitle: false,
        search: true,
        paging: true,
        filtering: true,
        grouping: true,
        toolbar: true,
        filterCellStyle: filterRowStyle,
        headerStyle: {fontWeight: "bold", fontSize: "16px"},
        exportButton: true,
        searchAutoFocus: false,
        paginationType: "stepped",
        columnsButton: true,
        pageSizeOptions: [5, 10, 20, 50, 100],
        actionsColumnIndex: -1,
      }}
      onRowClick={(event, rowData) => handleRowClick(rowData)}
      style={containerStyle}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
          </div>
        ),
      }}
      localization={{
        toolbar: {
          searchPlaceholder: t("search"),
          searchTooltip: t("searchTooltip"),
          showColumnsTitle: t("hideColumns"),
          exportTitle: t("export"),
          addRemoveColumns: t("hideColumns"),
        },
        body: {
          emptyDataSourceMessage: "Nenhum registro para exibir",
        },
        pagination: {
          labelRowsSelect: t("lines"),
          labelDisplayedRows: "{count} de {from}-{to}",
          firstTooltip: "Primeira página",
          previousTooltip: "Página anterior",
          nextTooltip: "Próxima página",
          lastTooltip: "Última página",
        },
        grouping: {
          placeholder: t("groupText"),
          groupedBy: t("groupedBy"),
        },
      }}
    />
  );
};

export default withTranslation(["table"])(Table);
