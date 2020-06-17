import React, {Component} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

class ModalPoint extends Component{

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            template:{},
            validated:false,
            errors:{
                name:"Campo obligatorio",
            }
        }
    }

    handleSubmit = (e) => {
        // Comprueba que pase las validaciones HTML
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated:true
            });
            return;
        }

        // Lega aqui cuando todo esta bien
        e.preventDefault();
        const {name} = this.state;
        alert(name);

    }

    handleChanged = ({target}) =>{
        const {name,value} = target;
        this.setState({
            [name]:value
        })
    }


    hideModal = () => {
        this.setState({
            showModal:false
        })
    }


    render() {

        const {errors,validated,showModal} = this.state;


        return (
            <React.Fragment>

                <Modal show={showModal|true}>
                    <Modal.Header>Nuevo punto</Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit} ref={ (ref) => { this.form = ref; }} >
                            <Row>
                                <Col>
                                    <Form.Group controlId="formUrl">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="name" type="text" required onChange={this.handleChanged}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            Nombre del punto
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancelar</Button>
                        <Button onClick={ () => { this.form.dispatchEvent(new Event('submit')) } }>Añadir punto</Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        );
    }

}

export default ModalPoint;
