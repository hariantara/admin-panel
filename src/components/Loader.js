import React from 'react'
import {
    Container, Row, Col
} from 'reactstrap'
// import ReactLoading from 'react-loading';
import '../styles/Loader.css'

class StandardLoader extends React.Component {
    render() {
        return (
            <Container fluid className="loading-container">
                <Row>
                    <Col></Col>
                    <Col>
                        <div className="loading">
                            <div className="loader"></div>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )
    }
}

export default StandardLoader
