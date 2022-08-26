import React, { forwardRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useColumnOrder,
  useBlockLayout,
  useResizeColumns,
  useGroupBy,
  useExpanded,
} from "react-table";
import { Button, ButtonGroup, Table, ToggleButton } from "react-bootstrap";
import styles from "./styles.module.scss";
import DefaultInput from "../Inputs/DefaultInput";
import SelectOptions from "../Inputs/SelectOptions";
import matchSorter from "match-sorter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type TableSettings = {
  columns: Array<Object>;
  data: any[];
  updateMyData: any;
  skipPageReset: any;
  rowsPerPage: Array<number>;
  hasPagination: boolean;
  hasColumnToggle: boolean;
  hasGrouping: boolean;
  hasSortBy: boolean;
  hasDoubleLine: boolean;
  editableCell: any;
  handleRowClick?: any;
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...await serverSideTranslations(locale, ["table"])
    },
  };
};

const ReactTable = ({
  columns,
  data,
  updateMyData,
  skipPageReset,
  rowsPerPage,
  hasPagination,
  hasColumnToggle,
  hasGrouping,
  hasSortBy,
  hasDoubleLine,
  editableCell,
  handleRowClick,
}: TableSettings) => {

  const { t } = useTranslation("table");
  columns.map((column: any) => {
    return column.Filter === "DefaultColumnFilter"
      ? (column.Filter = DefaultColumnFilter)
      : null;
  });

  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: editableCell,
  };

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <DefaultInput
        tableCase
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={"\uf0b0"}
      />
    );
  }

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter.matchSorter(rows, filterValue, {
      keys: [(row) => row[id]],
    });
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  let rowsPerPageList = [];

  for (let i = 0; i < rowsPerPage.length; i++) {
    rowsPerPageList[i] = {
      id: rowsPerPage[i],
      key: rowsPerPage[i],
      value: rowsPerPage[i],
      label: `${t("show")} ${rowsPerPage[i]} ${t("rows")}`,
    };
  }

  interface Props {
    indeterminate?: boolean;
    name: string;
  }

  const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    React.useEffect(() => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      });
    }, [refs]);

    return targetRef;
  };

  const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
      const defaultRef = React.useRef(null);
      const combinedRef = useCombinedRefs(ref, defaultRef);

      useEffect(() => {
        if (combinedRef?.current) {
          combinedRef.current.indeterminate = indeterminate ?? false;
        }
      }, [combinedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={combinedRef} {...rest} />
        </>
      );
    }
  );

  const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
    ...draggableStyle,
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "transparent" : "transparent",
    //border: isDragging ? "none" : "none",
    //borderRadius: isDragging ? "4px" : "",
    //boxShadow: isDragging ? "0px 2px 5px 1px" : "none",
    color: isDragging && "#007BFF",
    textShadow:
      isDragging &&
      "2px 2px 4px #000000, 0px -1px 0px #004C9E, 0px 1px 0px #004C9E, -1px 0px 0px #004C9E, 1px 0px 0px #004C9E",

    ...(!isDragging && { transform: "translate(0,0)" }),
    ...(isDropAnimating && { transitionDuration: "0.001s" }),

    // styles we need to apply on draggables
  });
  const currentColOrder: any = React.useRef();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    rows,
    allColumns,
    getToggleHideAllColumnsProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setColumnOrder,
    nextPage,
    previousPage,
    setPageSize,
    flatColumns,
    getSubRows,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, groupBy, expanded },
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: rowsPerPage[0] },
      defaultColumn,
      filterTypes,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useFilters,
    useColumnOrder,
    hasGrouping && useGroupBy,
    hasSortBy && useSortBy,
    useExpanded,
    hasPagination && usePagination,
    useBlockLayout,
    useResizeColumns
  );

  return (
    <>
      <Table
        className={styles.container}
        striped
        bordered
        hover
        responsive
        {...getTableProps()}
      >
        <thead className={styles.tableHead}>
          {headerGroups.map((headerGroup) => (
            <DragDropContext
              onDragStart={() => {
                currentColOrder.current =
                  visibleColumns != null
                    ? visibleColumns.map((o) => o.id)
                    : [0];
              }}
              onDragUpdate={(dragUpdateObj, b) => {
                const colOrder = [...currentColOrder.current];
                const sIndex = dragUpdateObj.source.index;
                const dIndex =
                  dragUpdateObj.destination && dragUpdateObj.destination.index;

                if (typeof sIndex === "number" && typeof dIndex === "number") {
                  colOrder.splice(sIndex, 1);
                  colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                  setColumnOrder(colOrder);
                }
              }}
            >
              <Droppable droppableId="droppable" direction="horizontal">
                {(droppableProvided, snapshot) => (
                  <tr
                    className={styles.rowWidthHeader}
                    ref={droppableProvided.innerRef}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, index) => (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={index}
                        isDragDisabled={!column.accessor}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={styles.headcerCellStyle}
                              {...column.getHeaderProps(
                                hasSortBy && column.getSortByToggleProps()
                              )}
                            >
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...getItemStyle(
                                    snapshot,
                                    provided.draggableProps.style
                                  ),
                                  // ...style
                                }}
                              >
                                {column.render("Header")}
                              </div>
                              <div>
                                {column.canGroupBy && hasGrouping ? (
                                  // If the column can be grouped, let's add a toggle
                                  <span {...column.getGroupByToggleProps()}>
                                    {column.isGrouped ? (
                                      <i className="fas fa-arrow-alt-circle-right" />
                                    ) : (
                                      <i className="far fa-arrow-alt-circle-left" />
                                    )}
                                  </span>
                                ) : null}
                                <span className={styles.sorter}>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <i className="fas fa-sort-alpha-up" />
                                    ) : (
                                      <i className="fas fa-sort-alpha-down" />
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span className={styles.filters}>
                                  {column.Filter
                                    ? column.render("Filter")
                                    : null}
                                </span>
                                <div
                                  {...column.getResizerProps()}
                                  className={styles.resizer}
                                ></div>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                  </tr>
                )}
              </Droppable>
            </DragDropContext>
          ))}
        </thead>
        <tbody className={styles.tableBody} {...getTableBodyProps()}>
          {hasPagination
            ? page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    onClick={(event, rowData) => handleRowClick(event)}
                    className={
                      hasDoubleLine
                        ? `${
                            i % 4 < 2 ? styles.rowWidthEven : styles.rowWidthOdd
                          } ${
                            i % 2 === 0 ? styles.contentEven : styles.contentOdd
                          }`
                        : styles.rowWidth
                    }
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`${
                            cell.isGrouped ? styles.cellGrouped : styles.cell
                          } ${cell.isAggregated && styles.cellGrouped} ${
                            cell.isPlaceholder && styles.cellGrouped
                          }`}
                        >
                          {cell.isGrouped && hasGrouping ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? (
                                  <i className="fas fa-arrow-alt-circle-up" />
                                ) : (
                                  <i className="fas fa-arrow-alt-circle-down" />
                                )}
                              </span>{" "}
                              {cell.render("Cell")} ({row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            cell.render("Aggregated")
                          ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render("Cell")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    className={
                      hasDoubleLine
                        ? `${
                            i % 4 < 2 ? styles.rowWidthEven : styles.rowWidthOdd
                          } ${
                            i % 2 === 0 ? styles.contentEven : styles.contentOdd
                          }`
                        : styles.rowWidth
                    }
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`${
                            cell.isGrouped ? styles.cellGrouped : styles.cell
                          } ${cell.isAggregated && styles.cellGrouped} ${
                            cell.isPlaceholder && styles.cellGrouped
                          }`}
                        >
                          {cell.isGrouped ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? (
                                  <i className="fas fa-arrow-alt-circle-up" />
                                ) : (
                                  <i className="fas fa-arrow-alt-circle-down" />
                                )}
                              </span>{" "}
                              {cell.render("Cell")} ({row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            cell.render("Aggregated")
                          ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render("Cell")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </Table>
      {hasColumnToggle && (
        <span>
          <div className={styles.columnHiddenToggle}>
            <ButtonGroup toggle className={styles.columnHiddenToggle}>
              {allColumns.map((column) => (
                <ToggleButton
                  key={column.id}
                  type="checkbox"
                  size="sm"
                  variant="light"
                  value={column.id}
                  onChange={() => {}}
                  {...column.getToggleHiddenProps()}
                >
                  {column.Header}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </span>
      )}
      {hasPagination ? (
        <span style={{ textAlign: "center" }}>
          <div style={{ padding: "15px 0px 15px 0px" }}>
            <span style={{ float: "left" }}>
              <Button
                size="sm"
                variant="light"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <i className="fas fa-angle-double-left" />
              </Button>{" "}
              <Button
                size="sm"
                variant="light"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <i className="fas fa-angle-left" />
              </Button>{" "}
            </span>
            <span>
              {`${t("page")} `}
              <strong>
                {pageIndex + 1} {t("pageOf")} {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | {t("goToPage")}:{" "}
              <DefaultInput
                tableCase
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                min={0}
                max={pageOptions.length}
                style={{ width: "100px", display: "inline" }}
              />
            </span>{" "}
            <div className={`${styles.rowShowList}`}>
              <SelectOptions
                tableCase
                defaultValue={rowsPerPageList[0]}
                onChange={(e) => {
                  setPageSize(Number(e.value));
                }}
                options={rowsPerPageList}
                style={{ width: "100px", display: "inline" }}
              />
            </div>
            <span style={{ float: "right" }}>
              <Button
                size="sm"
                variant="light"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <i className="fas fa-angle-right" />
              </Button>{" "}
              <Button
                size="sm"
                variant="light"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <i className="fas fa-angle-double-right" />
              </Button>{" "}
            </span>
          </div>
        </span>
      ) : (
        <span> </span>
      )}
    </>
  );
};

export default ReactTable;
