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

function Instance(props) {
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

    // const min = Math.ceil(0);
    // const max = Math.floor(2);
    // const rand = Math.floor(Math.random() * (max - min)) + min;
    // console.log(rand)
    
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

    var subjectPred = props.classNames[props.content.subject[length]];
    var factPred = props.classNames[props.content.fact[length]];
    var contrastPred = props.classNames[props.content.contrast[length]];

    if (props.task === 0) {
        // training
        return (
            // <h2 className="question">{props.content}</h2>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                        <CustomTableCell align="left">SUBJECT</CustomTableCell>
                        <CustomTableCell align="left">FACT</CustomTableCell>
                        <CustomTableCell align="left">CONTRAST</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                        <CustomTableCell component="th" scope="row">
                            <b>{row.attribute}</b>
                        </CustomTableCell>
                        <CustomTableCell align="left">{row.subjectValue}</CustomTableCell>
                        <CustomTableCell align="left" style={factStyles[row.id]}>{row.factValue}</CustomTableCell>
                        <CustomTableCell align="left" style={contrastStyles[row.id]}>{row.contrastValue}</CustomTableCell>
                        </TableRow>
                    ))}
                    <TableRow key={length}>
                        <CustomTableCell component="th" scope="row">
                            <b>Prediction (Income)</b>
                        </CustomTableCell>
                        <CustomTableCell align="left"><b>{subjectPred}</b></CustomTableCell>
                        <CustomTableCell align="left"><b>{factPred}</b></CustomTableCell>
                        <CustomTableCell align="left"><b>{contrastPred}</b></CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    } else {
        // prediction task
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell><b>Attribute</b></CustomTableCell>
                        <CustomTableCell align="left">Subject</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                        <CustomTableCell component="th" scope="row">
                            <b>{row.attribute}</b>
                        </CustomTableCell>
                        <CustomTableCell align="left">{row.subjectValue}</CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
    // verification task
    // return (
    //     // <h2 className="question">{props.content}</h2>
    //     <Paper className={classes.root}>
    //         <Table className={classes.table}>
    //             <TableHead>
    //             <TableRow>
    //                 <CustomTableCell><b>Attribute</b></CustomTableCell>
    //                 <CustomTableCell align="left">Subject</CustomTableCell>
    //                 <CustomTableCell align="left">Fact</CustomTableCell>
    //                 <CustomTableCell align="left">Contrast</CustomTableCell>
    //             </TableRow>
    //             </TableHead>
    //             <TableBody>
    //             {rows.map(row => (
    //                 <TableRow key={row.id}>
    //                 <CustomTableCell component="th" scope="row">
    //                     <b>{row.attribute}</b>
    //                 </CustomTableCell>
    //                 <CustomTableCell align="left">{row.subjectValue}</CustomTableCell>
    //                 <CustomTableCell align="left" style={factStyles[row.id]}>{row.factValue}</CustomTableCell>
    //                 <CustomTableCell align="left" style={contrastStyles[row.id]}>{row.contrastValue}</CustomTableCell>
    //                 </TableRow>
    //             ))}
    //             <TableRow key={length}>
    //                 <CustomTableCell component="th" scope="row">
    //                     <b>Prediction (Income)</b>
    //                 </CustomTableCell>
    //                 <CustomTableCell align="left">{subjectPred}</CustomTableCell>
    //                 <CustomTableCell align="left">{factPred}</CustomTableCell>
    //                 <CustomTableCell align="left">{contrastPred}</CustomTableCell>
    //                 </TableRow>
    //             </TableBody>
    //         </Table>
    //     </Paper>
    // );
    
}

Instance.propTypes = {
    content: PropTypes.object.isRequired
};

export default withStyles(styles)(Instance);