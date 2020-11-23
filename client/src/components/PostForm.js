import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import gql from "graphql-tag";

function PostForm() {
    const { values, onSubmit, onChange } = useForm(createPostCallback, {
        body: "",
    });
    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi  there"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="violet">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    );
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
