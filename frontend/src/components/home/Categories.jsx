import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';

import { categories } from '../../constants/data';

import {Link,useSearchParams} from 'react-router-dom'

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
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color:inherit;
`;
const Categories = () => {  
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')
    return (
        <>
            <StyledLink to={`/create?category=${category||'All'}`}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <StyledLink to = "/">
                                All Categories
                            </StyledLink>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <StyledTableCell>
                                    <StyledLink to = {`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
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