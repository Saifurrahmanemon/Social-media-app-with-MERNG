import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, CardContent, Grid, Icon } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

function SinglePost(props) {
    const { user } = useContext(AuthContext);
    const postId = props.match.param.postId;
    console.log(postId);

    const {
        data: { getPost },
    } = useQuery(GET_POST_QUERY, {
        variables: { postId },
    });
    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post ...</p>;
    } else {
        const {
            id,
            username,
            body,
            createdAt,
            comments,
            likes,
            likeCount,
            commentCount,
        } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                            size="small"
                            float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt.fromNow())}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button
                                    as="div"
                                    localPosition="right"
                                    onClick={console.log("coment on the post")}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="right">
                                        {commentCount}
                                    </Label>
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
const GET_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            created
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                bdoy
            }
        }
    }
`;

export default SinglePost;
