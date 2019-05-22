import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(attribute, subject_value, fact_value, contrast_value) {
    id += 1;
    return { id, attribute, subject_value, fact_value, contrast_value };
}

const rows = [
    createData('Age', '28.00 < Age <= 37.00', '28.00 < Age <= 37.00', 'Age > 48.00'),
    createData('Workclass', 'Self-emp-not-inc', 'Self-emp-not-inc', 'Self-emp-not-inc'),
    createData('Education', 'Bachelors', 'Bachelors', 'Bachelors'),
    createData('Marital Status', 'Married-civ-spouse', 'Never-married', 'Married-civ-spouse'),
    createData('Occupation', 'Prof-specialty', 'Prof-specialty', 'Protective-serv'),
    createData('Relationship', 'Husband', 'Husband', 'Husband'),
    createData('Race', 'White', 'White', 'White'),
    createData('Sex', 'Male', 'Male', 'Male'),
    createData('Hours per week', 'Hours per week <= 40.00', 'Hours per week <= 40.00', 'Hours per week > 45.00'),
    createData('Country', 'United-States', 'United-States', 'United-States'),
];

function Question(props) {
    const { classes } = props;

    return (
        // <h2 className="question">{props.content}</h2>

        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell><b>Attribute</b></TableCell>
                    <TableCell align="right">Subject</TableCell>
                    <TableCell align="right">Fact</TableCell>
                    <TableCell align="right">Contrast</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        <b>{row.attribute}</b>
                    </TableCell>
                    <TableCell align="right">{row.subject_value}</TableCell>
                    <TableCell align="right">{row.fact_value}</TableCell>
                    <TableCell align="right">{row.contrast_value}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default withStyles(styles)(Question);