import React, { useContext, useState } from "react";

import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h1" color="violet" textAlign="left">
                        Register
                    </Header>
                    <Form
                        size="large"
                        onSubmit={onSubmit}
                        noValidate
                        className={loading ? "loading" : ""}
                    >
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="center"
                                label="Username"
                                placeholder="Username.."
                                name="username"
                                type="text"
                                value={values.username}
                                error={errors.username ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                label="Email"
                                placeholder="Email"
                                name="email"
                                icon="at"
                                iconPosition="center"
                                type="email"
                                value={values.email}
                                error={errors.email ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="center"
                                placeholder="Password"
                                type="password"
                                label="Password"
                                name="password"
                                value={values.password}
                                error={errors.password ? true : false}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                icon="lock"
                                iconPosition="center"
                                type="password"
                                value={values.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                onChange={onChange}
                            />
                            <Button color="violet" fluid size="large">
                                Register
                            </Button>
                        </Segment>
                    </Form>
                    {Object.keys(errors).length > 0 && (
                        <div className="ui error message">
                            <ul className="list">
                                {Object.values(errors).map((value) => (
                                    <li key={value}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
