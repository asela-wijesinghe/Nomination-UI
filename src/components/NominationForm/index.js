import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NominationStep1 from '../NominationStep1/NominationStep1';
import NominationStep2 from '../NominationStep2';
import NominationStep3 from '../NominationStep3/NominationStep3';
import NominationStep2Update from '../NominationStep2Update';
import { postNominationPayments } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";





const styles = theme => ({
  root: {
    width: '90%',
    marginTop:10,
    padding: 24,
    paddingLeft: 26,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  pageContent: {
    padding: 24,
},
paperContent:{
  padding: 24,
}
});

function getSteps() {
  return ['Candidate Details', 'Payment Details', 'Review'];
}



class NominationForm extends React.Component {
 
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      completed: {},
      props:'',
      language:'',
        depositor:'',
        depositAmount:'',
        depositeDate:'12345',
        filePath:'upload',
        status:'PENDING',
        nominationId:this.props.customProps,
    
    }
  }


  handleChange = (name) => event => {
    this.setState({
            [name]:event.target.value,
    });   
  };


  getStepContent(step,props) {
    const { nominationPayments, customProps } = this.props;
    switch (step) {
      case 0:
        return <NominationStep1 customProps={customProps}/>;
      case 1:
      if(customProps){
        return <NominationStep2Update customProps={customProps} nominationPayments={nominationPayments} handleChange={this.handleChange} />;
      }else{
        return <NominationStep2 nominationPayments={nominationPayments} handleChange={this.handleChange} />;
      }
      case 2:
        return <NominationStep3 />;
      default:
        return 'Unknown step';
    }
  }

  
  

  totalSteps = () => {
    return getSteps().length;
  };
  

  handleNext = () => {
    const {postNominationPayments}=this.props;
    let activeStep;
   
    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
    if (activeStep === 2){
      postNominationPayments(this.state);   
  }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };



  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    
    return (
      <div className={classes.root}>
      <Paper className={classes.pageContent} elevation={1}>

        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                                {/* {getStepContent(activeStep)} */}
                                                {this.getStepContent(activeStep,this.props)}
                                            </Grid>
                                        </Grid>
              {/* <Typography className={classes.instructions}>{this.getStepContent(activeStep,this.props)}</Typography> */}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
        </Paper>
      </div>
    );
  }
}

NominationForm.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = ({Nomination}) => {
  const {nominationPayments} = Nomination;
  return {nominationPayments};
};

const mapActionsToProps = {
  postNominationPayments 
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationForm));


