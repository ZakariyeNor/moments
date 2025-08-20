import React, { useState } from "react";

import { Form, Alert, Button, Col, Row, Image, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

function SignInForm() {
    //   Add your component logic here
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    const history2 = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    }

    const handleChangeSubmit = async (events) => {
        events.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInData);

            // Save user in state
            setCurrentUser(data.user);

            history2.push('/');
        } catch (error) {
            setErrors(error.response?.data);
        }
    };


    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign in</h1>
                    <Form onSubmit={handleChangeSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((msg, ind) =>
                            <Alert variant="warning" key={ind}>{msg}</Alert>
                        )}

                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.password?.map((msg, ind) =>
                            <Alert variant="warning" key={ind}>{msg}</Alert>
                        )}

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit">
                            Sign In
                        </Button>
                        {errors.non_field_errors?.map((msg, ind) =>
                            <Alert variant="warning" key={ind} className="mt-3">{msg}</Alert>
                        )}
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signup">
                        Don't have an account? <span>Sign up now!</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
                />
            </Col>
        </Row>
    );
}

export default SignInForm;