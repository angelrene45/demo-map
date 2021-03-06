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
        this.textInput = React.createRef();
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

        // Lega aqui cuando pase las validaciones
        e.preventDefault();
        const {name}        = this.state;
        const {addMark}     = this.props;
        addMark(name);

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

    showModal = () => {
        this.setState({
            showModal:true
        });
        /* Muestra modal y hecmos foco en el input nombre */
        this.textInput.current.focus();
        /* Activa evento cuando se presione trecla ESC */
        document.addEventListener("keydown", this.escFunction, false);
    }

    //Cuando el usuario presiona tecla esc se cierra el modal
    escFunction = (e) => {
        if(e.keyCode === 27) {
            this.hideModal();
        }
    }

    render() {

        const {errors,validated,showModal}  = this.state;

        return (
            <React.Fragment>

                <Modal show={showModal}>
                    <Modal.Header>Nuevo punto</Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit} ref={ (ref) => { this.form = ref; }} >
                            <Row>
                                <Col>
                                    <Form.Group controlId="formUrl">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="name" type="text" required onChange={this.handleChanged} ref={ this.textInput }  />
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
