import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({}); // Store errors
  const [formErrors, setFormErrors] = useState({}); // Store form errors (e.g., blank fields)

  const history = useHistory(); // Use the history hook properly

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password1) newErrors.password1 = "Password is required";
    if (!password2) newErrors.password2 = "Confirm password is required";
    if (password1 !== password2) newErrors.password2 = "Passwords do not match";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation before sending the request
    if (!validateForm()) return; // If the form is not valid, stop submission

    try {
      // Send the signUpData to the API
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin"); // Navigate to sign-in page after success
    } catch (err) {
      console.log("Error response:", err.response?.data); // Debugging
      setErrors(err.response?.data || {}); // Set errors to state
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
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
              {formErrors.username && (
                <Alert variant="warning">{formErrors.username}</Alert>
              )}
            </Form.Group>
            {errors.username && Array.isArray(errors.username) &&
              errors.username.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))
            }

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
              {formErrors.password1 && (
                <Alert variant="warning">{formErrors.password1}</Alert>
              )}
            </Form.Group>

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
              {formErrors.password2 && (
                <Alert variant="warning">{formErrors.password2}</Alert>
              )}
            </Form.Group>

            {errors.password1 && Array.isArray(errors.password1) &&
              errors.password1.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))
            }
            {errors.password2 && Array.isArray(errors.password2) &&
              errors.password2.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))
            }

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col md={6} className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}>
        <Image
          className={`${appStyles.FillerImage}`}
          src="https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
