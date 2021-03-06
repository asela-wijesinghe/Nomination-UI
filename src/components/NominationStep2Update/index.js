import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import { handleChangePayment } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 25
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const paymentStatus = [
    {
      value: 'PENDING',
      label: 'PENDING',
    },
    {
      value: 'APPROVED',
      label: 'APPROVED',
    },
    {
      value: 'REJECTED',
      label: 'REJECTED',
    },
  ];

const designation = [
    {
      value: 'teamLeader',
      label: 'Team Leader',
    },
    {
      value: 'secretory',
      label: 'Secretory',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
class NominationPayments extends React.Component {
  
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            depositor:'',
            depositAmount:'',
            depositeDate:'',  
        }
      }
    
    render() {
        const {classes, depositor,handleChange,NominationPayments,NumberFormatCustom,CandidateList} = this.props;
        const {  numberformat } = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>                
                    <Grid item lg={3}>
                        <TextField
                            id="formatted-numberformat-input"
                            label="Deposited Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={NominationPayments.depositAmount}
                            onChange={handleChange('depositAmount')}
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                        />
                    </Grid>
                    <Grid item lg={3}>
                    <TextField
                            label="Depositor Name"
                            className={classes.textField}
                            value={NominationPayments.depositor}
                            onChange={handleChange("depositor")}
                            margin="normal"
                        />  
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={CandidateList.length}
                            onChange={handleChange('candidateCount')}
                            margin="normal"
                        />
                    </Grid>                   
                </Grid>
                <Grid container spacing={8}>
                    <Grid item lg={3}>
                        <TextField
                            id="date"
                            label="Diposited Date"
                            type="date"
                            value={NominationPayments.depositeDate}
                            onChange={handleChange('depositeDate')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>                             
                </Grid>
            </form>
        );
    }
}

NominationPayments.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {handleChangePayment} = Nomination;
    const CandidateList = Nomination.getNominationCandidates;

    return {handleChangePayment,CandidateList};
  };

  const mapActionsToProps = {
    handleChangePayment
  };
  
 
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));


