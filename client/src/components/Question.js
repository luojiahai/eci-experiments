import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#222',
        color: theme.palette.common.white,
        fontSize: 14,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        margin: '25px',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const noStyle = {
    color: 'black'
}

const factStyle = {
    color: 'green',
    fontWeight: 'bold'
}

const contrastStyle = {
    color: 'red',
    fontWeight: 'bold'
}

function Question(props) {
    const { classes } = props;

    let id = -1;
    function createData(attribute, subjectValue, factValue, contrastValue) {
        id += 1;
        return { id, attribute, subjectValue, factValue, contrastValue };
    }

    const rows = [];

    const factStyles = []
    const contrastStyles = []
    
    const length = props.attributeNames.length;
    
    for (let i = 0; i < length; i++) {
        var attributeName = props.attributeNames[i];
        var subjectAttribute = props.content.subject[i];
        var factAttribute = props.content.fact[i];
        var contrastAttribute = props.content.contrast[i];
        var subjectValue = props.categoricalNames[i][subjectAttribute];
        var factValue = props.categoricalNames[i][factAttribute];
        var contrastValue = props.categoricalNames[i][contrastAttribute];
        rows.push(createData(attributeName, subjectValue, factValue, contrastValue));
        if (factValue === subjectValue) {
            factStyles.push(noStyle);
        } else {
            factStyles.push(factStyle);
        }
        if (contrastValue === subjectValue) {
            contrastStyles.push(noStyle);
        } else {
            contrastStyles.push(contrastStyle);
        }
    }

    // var subjectPred = props.classNames[props.content.subject[length]];
    // var factPred = props.classNames[props.content.fact[length]];
    // var contrastPred = props.classNames[props.content.contrast[length]];
    // rows.push(createData('Prediction (Income)', subjectPred, factPred, contrastPred));

    return (
        // <h2 className="question">{props.content}</h2>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <CustomTableCell><b>Attribute</b></CustomTableCell>
                    <CustomTableCell align="left">Subject</CustomTableCell>
                    {/* <CustomTableCell align="left">Fact</CustomTableCell>
                    <CustomTableCell align="left">Contrast</CustomTableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                    <CustomTableCell component="th" scope="row">
                        <b>{row.attribute}</b>
                    </CustomTableCell>
                    <CustomTableCell align="left">{row.subjectValue}</CustomTableCell>
                    {/* <CustomTableCell align="left" style={factStyles[row.id]}>{row.factValue}</CustomTableCell>
                    <CustomTableCell align="left" style={contrastStyles[row.id]}>{row.contrastValue}</CustomTableCell> */}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

Question.propTypes = {
    content: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);