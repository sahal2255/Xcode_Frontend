import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

function CommonTable({ rows, columns, onEdit, onDelete }) {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  return (
    <Paper sx={{ boxShadow: 3, borderRadius: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell> {/* Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f0f0f0" }, // Hover effect
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  {/* Conditional Edit and Delete buttons */}
                  <IconButton
                    onClick={() => onEdit(row)}
                    color="primary"
                    sx={{ marginRight: 1 }}
                  >
                    {/* <EditIcon /> */}
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(row.id)}
                    color="error"
                  >
                    {/* <DeleteIcon /> */}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CommonTable;
