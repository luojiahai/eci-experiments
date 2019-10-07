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
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


const exemplarStyles = {
    plain: {
        color: 'black'
    },
    fact: {
        color: 'green',
        fontWeight: 'bold'
    },
    contrast: {
        color: 'red',
        fontWeight: 'bold'
    }
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
            factStyles.push(exemplarStyles.no);
        } else {
            factStyles.push(exemplarStyles.fact);
        }
        if (contrastValue === subjectValue) {
            contrastStyles.push(exemplarStyles.no);
        } else {
            contrastStyles.push(exemplarStyles.contrast);
        }
    }

    var subjectPred = props.classNames[props.content.subject[length]];
    var factPred = props.classNames[props.content.fact[length]];
    var contrastPred = props.classNames[props.content.contrast[length]];

    if (props.phase === 0) {
        // train
        if (props.group === 0) {
            // no exp
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                            <CustomTableCell align="left">SUBJECT</CustomTableCell>
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
                        <TableRow key={length}>
                            <CustomTableCell component="th" scope="row">
                                <b>Prediction (Income)</b>
                            </CustomTableCell>
                            <CustomTableCell align="left"><b>{subjectPred}</b></CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            );
        } else if (props.group === 1) {
            // fact exp
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                            <CustomTableCell align="left">SUBJECT</CustomTableCell>
                            <CustomTableCell align="left">FACTUAL</CustomTableCell>
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
                            </TableRow>
                        ))}
                        <TableRow key={length}>
                            <CustomTableCell component="th" scope="row">
                                <b>Prediction (Income)</b>
                            </CustomTableCell>
                            <CustomTableCell align="left"><b>{subjectPred}</b></CustomTableCell>
                            <CustomTableCell align="left"><b>{factPred}</b></CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            );
        } else if (props.group === 2) {
            // contrast exp
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                            <CustomTableCell align="left">SUBJECT</CustomTableCell>
                            <CustomTableCell align="left">CONTRASTIVE</CustomTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                            <CustomTableCell component="th" scope="row">
                                <b>{row.attribute}</b>
                            </CustomTableCell>
                            <CustomTableCell align="left">{row.subjectValue}</CustomTableCell>
                            <CustomTableCell align="left" style={contrastStyles[row.id]}>{row.contrastValue}</CustomTableCell>
                            </TableRow>
                        ))}
                        <TableRow key={length}>
                            <CustomTableCell component="th" scope="row">
                                <b>Prediction (Income)</b>
                            </CustomTableCell>
                            <CustomTableCell align="left"><b>{subjectPred}</b></CustomTableCell>
                            <CustomTableCell align="left"><b>{contrastPred}</b></CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            );
        } else if (props.group === 3) {
            // fact + contrast exp
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                            <CustomTableCell align="left">SUBJECT</CustomTableCell>
                            <CustomTableCell align="left">FACTUAL</CustomTableCell>
                            <CustomTableCell align="left">CONTRASTIVE</CustomTableCell>
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
                </div>
            );
        }
        // return (
        //     <div className={classes.root}>
        //     <Paper className={classes.paper}>
        //         <Table className={classes.table} size="small">
        //             <TableHead>
        //             <TableRow>
        //                 <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
        //                 <CustomTableCell align="left">SUBJECT</CustomTableCell>
        //                 <CustomTableCell align="left">FACTUAL</CustomTableCell>
        //                 <CustomTableCell align="left">CONTRASTIVE</CustomTableCell>
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
        //                 <CustomTableCell align="left"><b>{subjectPred}</b></CustomTableCell>
        //                 <CustomTableCell align="left"><b>{factPred}</b></CustomTableCell>
        //                 <CustomTableCell align="left"><b>{contrastPred}</b></CustomTableCell>
        //                 </TableRow>
        //             </TableBody>
        //         </Table>
        //     </Paper>
        //     </div>
        // );
    } else if (props.phase === 1) {
        // prediction task
        return (
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                    <TableRow>
                        <CustomTableCell><b>ATTRIBUTE</b></CustomTableCell>
                        <CustomTableCell align="left">SUBJECT</CustomTableCell>
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
            </div>
        );
    }
    // verification task
    // return (
    //     // <h2 className="test">{props.content}</h2>
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