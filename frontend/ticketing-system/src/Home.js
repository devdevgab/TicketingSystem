import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    TablePagination
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tickets', { withCredentials: true });
                setTickets(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching tickets');
            }
        };

        fetchTickets();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container component="main" maxWidth="lg">
            <Paper elevation={6} style={{ padding: '16px', marginTop: '32px' }}>
                <Typography variant="h5" gutterBottom>
                    My Tickets
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TableContainer style={{ width: '100%' }}>
                    <Table style={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Ticket ID</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Service Type</StyledTableCell>
                                <StyledTableCell>Service For</StyledTableCell>
                                <StyledTableCell>Number of Computers</StyledTableCell>
                                <StyledTableCell>Number of Users</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(ticket => (
                                <StyledTableRow key={ticket.ticketId}>
                                    <TableCell>{ticket.ticketId}</TableCell>
                                    <TableCell>{ticket.ticketTitle}</TableCell>
                                    <TableCell>{ticket.ticketDesc}</TableCell>
                                    <TableCell>{ticket.ticketStatus}</TableCell>
                                    <TableCell>{ticket.ticketServiceType}</TableCell>
                                    <TableCell>{ticket.ticketServiceFor}</TableCell>
                                    <TableCell>{ticket.ticketNumberOfComp}</TableCell>
                                    <TableCell>{ticket.ticketNumberOfUsers}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tickets.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};

export default Home;
