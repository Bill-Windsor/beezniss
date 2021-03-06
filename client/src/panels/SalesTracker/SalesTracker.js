import React, { Component } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import SkyLight from 'react-skylight';
import API from '../../utils/API';
import { Button, Icon } from 'semantic-ui-react';
import "../CSS/Panels.css";

class SalesTracker extends Component{
   constructor(props){
      super(props);
      this.state = {
         cookieQuarterly: {
             labels: ['Q1', 'Q2', 'Q3', 'Q4'],
             datasets: []
         },
         motorQuarterly: {
             labels: ['Q1', 'Q2', 'Q3', 'Q4'],
             datasets: []
         },
         rnaQuarterly: {
             labels: ['Q1', 'Q2', 'Q3', 'Q4'],
             datasets: []
         },
         chartDataQuarterly: {
             labels: ['Q1', 'Q2', 'Q3', 'Q4'],
             datasets: [{
                 label: 'Cookie Division',
                 data: []
              }, {
                 label: 'Electric Motors Division',
                 data: [],
             },{
                 label: 'Mitochondrial RNA Research Division',
                 data: [],
             } 
             ]},
         chartDataAnnual: {
             labels: ['Cookie Division', 'Electric Motors Division', 'Mitochondrial RNA Research Division'],
             datasets: [{
                 data: [],
             }
         ]}
      }
   }
    
   componentDidMount() {
        this.loadSales();
   }

   loadSales = () => {
      API.getSales()
         .then(res => {
            this.sortCookies(res.data);
            this.sortMotors(res.data);
            this.sortRNA(res.data);
            this.sortQuarterly(res.data);
         }).catch(err => console.log(err));
   }

   sortCookies = obj => {

      let newCookieDatasets = [];

      for (let i = 0; i < obj.cookies.length; i++) {
            
         const cookieColors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
         
         let theCookie = {
             label: '',
             data: [],
             backgroundColor: cookieColors[i]
         }

         theCookie.label = obj.cookies[i].cookie_name;
         theCookie.data.push(obj.cookies[i].Sales_1Q2018);
         theCookie.data.push(obj.cookies[i].Sales_2Q2018);
         theCookie.data.push(obj.cookies[i].Sales_3Q2018);
         theCookie.data.push(obj.cookies[i].Sales_4Q2018);

         newCookieDatasets.push(theCookie);
      }
      this.setState({
         cookieQuarterly: {
             datasets: newCookieDatasets
         }
      });
   }

   sortMotors = obj => {
      let newMotorDatasets = [];

      for (let i = 0; i < obj.motors.length; i++) {            
         const motorColors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
         
         let theMotor = {
             label: '',
             data: [],
             backgroundColor: motorColors[i]
         }

         theMotor.label = obj.motors[i].elecMotor_name;
         theMotor.data.push(obj.motors[i].Sales_1Q2018);
         theMotor.data.push(obj.motors[i].Sales_2Q2018);
         theMotor.data.push(obj.motors[i].Sales_3Q2018);
         theMotor.data.push(obj.motors[i].Sales_4Q2018);

         newMotorDatasets.push(theMotor);
      }
      this.setState({
         motorQuarterly: {
             datasets: newMotorDatasets
         }
      });
   }

   sortRNA = obj => {
      let newRNAdatasets = [];

      for (let i = 0; i < obj.RNA.length; i++) {  
         const RNAcolors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
         
         let theStrand = {
             label: '',
             data: [],
             backgroundColor: RNAcolors[i]
         }

         theStrand.label = obj.RNA[i].mitochonProduct_name;
         theStrand.data.push(obj.RNA[i].Sales_1Q2018);
         theStrand.data.push(obj.RNA[i].Sales_2Q2018);
         theStrand.data.push(obj.RNA[i].Sales_3Q2018);
         theStrand.data.push(obj.RNA[i].Sales_4Q2018);

         newRNAdatasets.push(theStrand);
      }
      this.setState({
         rnaQuarterly: {
             datasets: newRNAdatasets
         }
      });
   }

   sortQuarterly = obj => {
      let cookieAnnual = 0;
      let motorAnnual = 0;
      let RNAannual = 0;
      let cookieByQuarter = [0, 0, 0, 0];
      let motorByQuarter = [0, 0, 0, 0];
      let RNAbyQuarter = [0, 0, 0, 0];
      let annualDivisionArray = [];
      const divisionColors = ['hsla(69, 53%, 50%, 0.27)', 'hsla(179, 53%, 50%, 0.27)', 'hsla(258, 55%, 73%, 0.27)', 'hsla(332, 55%, 73%, 0.27)'];
        
      let annualDatasets = [{
         labels: ['Cookie Division', 'Electric Motors Division', 'Mitochondrial RNA Research Division'],
         data: [],
         backgroundColor: [divisionColors[0], divisionColors[1], divisionColors[2]]
      }];

      let quarterlyDatasets = [{
         label: "Cookie Division",
         data: [],
         backgroundColor: divisionColors[0]
      },{
         label: "Electric Motors Division",
         data: [],
         backgroundColor: divisionColors[1]
      },{
         label: "Mitochondrial RNA Research Division",
         data: [],
         backgroundColor: divisionColors[2]
      }];

      for (let i = 0; i < obj.cookies.length; i++) {
         cookieByQuarter[0] += parseInt(obj.cookies[i].Sales_1Q2018, 10);
         cookieByQuarter[1] += parseInt(obj.cookies[i].Sales_2Q2018, 10);
         cookieByQuarter[2] += parseInt(obj.cookies[i].Sales_3Q2018, 10);
         cookieByQuarter[3] += parseInt(obj.cookies[i].Sales_4Q2018, 10);
         if (i === (obj.cookies.length-1)) {
             quarterlyDatasets[0].data = cookieByQuarter;
             cookieAnnual = cookieByQuarter[0]+cookieByQuarter[1]+cookieByQuarter[2]+cookieByQuarter[3];
             annualDivisionArray[0] = cookieAnnual;
         }
      }    
      for (let i = 0; i < obj.motors.length; i++) {
         motorByQuarter[0] += parseInt(obj.motors[i].Sales_1Q2018, 10);
         motorByQuarter[1] += parseInt(obj.motors[i].Sales_2Q2018, 10);
         motorByQuarter[2] += parseInt(obj.motors[i].Sales_3Q2018, 10);
         motorByQuarter[3] += parseInt(obj.motors[i].Sales_4Q2018, 10);
         if (i === obj.motors.length-1) {
             quarterlyDatasets[1].data = motorByQuarter;
             motorAnnual = motorByQuarter[0]+motorByQuarter[1]+motorByQuarter[2]+motorByQuarter[3];
             annualDivisionArray[1] = motorAnnual;
         }
      }    
      for (let i = 0; i < obj.RNA.length; i++) {
         RNAbyQuarter[0] += parseInt(obj.RNA[i].Sales_1Q2018, 10);
         RNAbyQuarter[1] += parseInt(obj.RNA[i].Sales_2Q2018, 10);
         RNAbyQuarter[2] += parseInt(obj.RNA[i].Sales_3Q2018, 10);
         RNAbyQuarter[3] += parseInt(obj.RNA[i].Sales_4Q2018, 10);
         if (i === obj.RNA.length-1) {
             quarterlyDatasets[2].data = RNAbyQuarter;
             RNAannual = RNAbyQuarter[0]+RNAbyQuarter[1]+RNAbyQuarter[2]+RNAbyQuarter[3];
             annualDivisionArray[2] = RNAannual;
             annualDatasets[0].data = annualDivisionArray;
             this.setState({
                 chartDataQuarterly: {
                     datasets: quarterlyDatasets
                 },
                 chartDataAnnual: {
                     datasets: annualDatasets
                 }
             });
         }
      } 
   }

   render() {
      const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
      const buttonStyle = [
         { backgroundColor: 'rgba(255, 189, 56, 0.81)' },
         { backgroundColor: 'rgba(115, 117, 135, 0.57)', color: 'white' }
      ]
      return (
      <div>
         <section>
            <div className="well" style={wellStyles}>
              <h1 className="salesHeading">Sales Forecasts</h1>
            <Button.Group horizontal="true" className='btnGroups'>
               <Button fluid className='salesBtn salesBtn1' style={buttonStyle[0]} onClick={() => this.animated.show()}><Icon name='bar chart' /><span>Quarterly Sales: <br/>Cookie Division</span></Button>
               <Button fluid className='salesBtn salesBtn2' style={buttonStyle[1]} icon='bar chart' content='Quarterly Sales: Motors Division' onClick={() => this.animatedmotors.show()} />
            </Button.Group>
            <Button.Group horizontal="true" className='btnGroups'>
               <Button fluid className='salesBtn salesBtn3' style={buttonStyle[0]} onClick={() => this.animatedRNA.show()}><Icon name='bar chart' /><span>Quarterly Sales: <br/>Mitochon. RNA Division</span></Button>
               <Button fluid className='salesBtn salesBtn4' style={buttonStyle[1]} onClick={() => this.animatedquarterly.show()}><Icon name='bar chart' /><span>Quarterly Sales: <br/>All Divisions</span></Button>
            </Button.Group>
               <Button fluid className='salesBtn salesBtnBig salesBtn5' style={buttonStyle[0]} onClick={() => this.animatedannual.show()}><Icon name='pie chart' /><span>Annual Sales: <br/>All Divisions</span></Button>
            </div>
         </section>
         <SkyLight 
           hideOnOverlayClicked 
           ref={ref => this.animated = ref} 
           transitionDuration={500} 
         >
           <div className="chart">
             <Line
             data={this.state.cookieQuarterly}
             width={500}
              height={370}
              options={{
      	        maintainAspectRatio: false
              }}
             />
             </div>
         </SkyLight>
         <SkyLight 
           hideOnOverlayClicked 
           ref={ref => this.animatedmotors = ref} 
           transitionDuration={500} 
         >
           <div className="chart">
             <Line
             data={this.state.motorQuarterly}
             width={500}
             height={370}
             options={{
                 maintainAspectRatio: false
             }}
             />
             </div>
         </SkyLight>
         <SkyLight 
           hideOnOverlayClicked 
           ref={ref => this.animatedRNA = ref} 
           transitionDuration={400} 
         >
           <div className="chart">
             <Line
             data={this.state.rnaQuarterly}
             width={500}
             height={370}
             options={{
                 maintainAspectRatio: false
             }}
             />
             </div>
         </SkyLight>
         <SkyLight 
           hideOnOverlayClicked 
           ref={ref => this.animatedquarterly = ref} 
           transitionDuration={400} 
         >
           <div className="chart">
             <Line
             data={this.state.chartDataQuarterly}
             width={500}
              height={370}
              options={{
      	        maintainAspectRatio: false
              }}
             />
             </div>
         </SkyLight>
         <SkyLight 
           hideOnOverlayClicked 
           ref={ref => this.animatedannual = ref} 
           transitionDuration={400} 
         >
           <div className="chart">
             <Pie
             data={this.state.chartDataAnnual}
             width={500}
              height={380}
              options={{
      	        maintainAspectRatio: false
              }}
             />
             </div>
         </SkyLight>
      </div>
      )
   }
}

export default SalesTracker;
