import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'reactstrap';
import  MenuLinks  from '../../data/beverage-menu';
import  BeverageQueue  from '../../data/beverage-queue';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export default class BoiView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                       menuLinks : null,
                       beverageList : null,
                       modal: false,  
                       modal1: false,
                       custName: '',
                       beverageName: '- Please Select -',
                       updateQueue:null                     
                     };
        this.state.menuLinks = MenuLinks;
        this.state.beverageList = BeverageQueue;  

        this.toggle = this.toggle.bind(this);
        this.adOrder = this.adOrder.bind(this);        
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });        
      }

      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

      adOrder() {
        this.setState(prevState => ({
          modal1: !prevState.modal1
        }));
      }

      handleClick = (e, data,type) => {
        var IsBeingMixed = "IsBeingMixed";
        var IsReadyToCollect = "IsReadyToCollect";
        var IsCollected = "IsCollected";

        console.log("BeverageId type" + type);
        if(type === IsBeingMixed)
        {
        data.IsBeingMixed = true;
        }
        else if(type === IsReadyToCollect){ 
            data.IsBeingMixed = false; 
                     
            data.IsReadyToCollect = true;

        }else if (type === IsCollected){   
                     
            data.IsReadyToCollect = false;
            data.IsCollected = true;
        }

        this.setState(prevState => ({
            updateQueue: data
          }));
      }



      queueUpdate = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal
          }));      


        BeverageQueue.forEach((element, index) => {
            if(element.BeverageId === this.state.updateQueue.BeverageId) {                
                BeverageQueue[index] = this.state.updateQueue;
            }
        });
      //  console.log("BeverageId" + BeverageQueue);
      }

      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state   
       this.setState(prevState => ({
        modal1: !prevState.modal1
      }));

      if(this.state.beverageName !== "- Please Select -") {
      var tmpobj = {
        "BeverageBarOrderId":"733416c1-89ed-46ab-9484-e88ce05960ad",
        "OrderedBeverage":{
        "BeverageId":"04d8e4eb-306e-4ff3-a027-7bed4da883f8",
        "Name": this.state.beverageName
        },
        "OrderQuantity":1,
        "IsBeingMixed":false,
        "IsReadyToCollect":false,
        "IsCollected":false,
        "BeverageBarUserId":"U034AT9TN",
        "BeverageBarUserFirstName": this.state.custName,  
        }
        this.state.beverageList.push(tmpobj);
     }
      
      }
      

    render() {
        return (
            <Container>
                <Row>
                    <Col lg="3">
                      <div>BEVERAGE MENU</div>
                        <div className="nav-custom-box">
                           
                            {MenuLinks.map((data, index) => {

                             return data.Beverages.map((data1, index1) => {
                                 return <NavLink onClick={this.adOrder} key={ data1.BeverageId } >{data1.Name}</NavLink>;
                             })
                            })
                            }                       
     
                            <Modal isOpen={this.state.modal1} toggle={this.adOrder} className={this.props.className}>
                                <ModalHeader toggle={this.adOrder}>ORDER YOUR BEVERAGE</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup row>

                                            <Label for="custName" sm={2}>NAME</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="custName" id="custName" placeholder="Name of the beverage" onChange={this.onChange} />
                                            </Col>

                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleSelect" sm={2}>BEVERAGE</Label>
                                            <Col sm={10}>
                                                <Input type="select" name="beverageName" id="beverageName" onChange={this.onChange}>
                                                    <option value={this.state.beverageName} >- Please Select -</option>
                                                    {MenuLinks.map((data, index) => {

                                                        return data.Beverages.map((data1, index1) => {
                                                            return <option key={data1.BeverageId} value={data1.Name}>{data1.Name}</option>
                                                        })
                                                    })
                                                    }


                                                </Input>
                                            </Col>
                                        </FormGroup>

                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.onSubmit}>Ok</Button>{' '}
                                    <Button color="secondary" onClick={this.adOrder}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </Col>
                    <Col lg="9">
                        <div>BEVERAGE QUEUE</div>
                        <div className="beverage-box ">
                            <Row>
                                <Col lg="4">
                                    <div>IN THE QUEUE</div>

                                    {
                                        this.state.beverageList.map((data, index) => {

                                            if (!data.IsBeingMixed && !data.IsReadyToCollect && !data.IsCollected) {
                                                return <div key={index} className="card-box-cust">
                                                    <div onClick={((e) => this.handleClick(e, data, "IsBeingMixed"))} className="cust-card-title">
                                                        {
                                                            data.OrderedBeverage.Name
                                                        }
                                                    </div>
                                                    <div className="cust-card-name">{data.BeverageBarUserFirstName} </div>
                                                </div>

                                            } else return "";
                                        })

                                    }
                                </Col>
                                <Col lg="4">
                                    <div>BEING MIXED</div>
                                    {
                                        this.state.beverageList.map((data, index) => {

                                            if (data.IsBeingMixed) {
                                                return <div key={index} className="card-box-cust">
                                                    <div onClick={((e) => this.handleClick(e, data, "IsReadyToCollect"))} className="cust-card-title">
                                                        {
                                                            data.OrderedBeverage.Name
                                                        }
                                                    </div>
                                                    <div className="cust-card-name">{data.BeverageBarUserFirstName} </div>
                                                </div>
                                            } else return "";
                                        })

                                    }

                                </Col>
                                <Col lg="4">
                                    <div>READY TO COLLECT</div>
                                    {                                         
                                        this.state.beverageList.map((data, index) => {                                    
  
                                         if(data.IsReadyToCollect) {
                                        return  <div key={index} className="card-box-cust">
                                            <div onClick={((e) => this.handleClick(e, data, "IsCollected"))} className="cust-card-title">
                                            { 
                                                data.OrderedBeverage.Name                                           
 
                                             }
                                             </div>
                                            <div className="cust-card-name">{ data.BeverageBarUserFirstName } </div>
                                        </div>
                                         }else return "";
                                    })                               

                                    }
                                </Col>
                            </Row>
                      </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}