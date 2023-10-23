import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FarmLoggingRecord,
  useGetFarmLoggingDataQuery,
} from "../../store/api/farmLoggingApi";
import { Box, Typography } from "@mui/material";

const columnHelper = createColumnHelper<FarmLoggingRecord>();
const columns = [
  columnHelper.accessor("harvestTimestamp", {
    cell: (data) => data.getValue(),
    header: "Date Logged",
  }),
  columnHelper.accessor("islandOwner", {
    cell: (data) => data.getValue(),
    header: "Island Owner",
  }),
  columnHelper.accessor("seedType", {
    cell: (data) => data.getValue(),
    header: "Seed Type",
  }),
  columnHelper.accessor("seedReturnCount", {
    cell: (data) => data.getValue(),
    header: "Gathered Seeds",
  }),
  columnHelper.accessor("seedProduceCount", {
    cell: (data) => data.getValue(),
    header: "Seed Produce",
  }),
  columnHelper.accessor("wormsGathered", {
    cell: (data) => data.getValue(),
    header: "Worms",
  }),
];

export function LogsTableComponent() {
  const { refetch, isError, isLoading, data } = useGetFarmLoggingDataQuery();
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Box>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <Typography>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Typography>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <Typography>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
