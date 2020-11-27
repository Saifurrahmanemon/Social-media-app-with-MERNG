import React, { useContext, useState } from "react";

import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 600 }}>
                    <Header as="h1" color="violet" textAlign="left">
                        Login
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

                            <Button color="violet" fluid size="large">
                                Login
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

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;
