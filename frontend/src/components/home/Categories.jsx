import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';

import { categories } from '../../constants/data';

import {Link} from 'react-router-dom'

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledTableCell = styled(TableCell)`
    text-align: center; /* Center horizontally */
    display: flex;      /* Flexbox to center vertically */
    align-items: center; /* Center vertically */
    justify-content: center; 
    font-size: 18px;     
    padding: 16px;       
`;
const Categories = () => {    
    return (
        <>
            <Link to="/create">
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            All Categories
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <StyledTableCell>
                                    {category.type}
                                </StyledTableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;