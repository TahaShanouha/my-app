import { use, useEffect, useState } from "react"
import styled from "styled-components";
import avatar from '../img/avatar.jpg'; // with import
import loading from '../img/loading.gif'
import { Button, PaginationProps } from 'antd';
import { Pagination } from 'antd';

import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "react-query";

const sortAndChunk = (arr: any[], size: number) => {
    const sortedDesc = arr.sort(
        (objA, objB) => new Date(objB.createdAt).getTime() - new Date(objA.createdAt).getTime(),
    );
    return Array.from({ length: Math.ceil(sortedDesc.length / size) }, (v, i) =>
        sortedDesc.slice(i * size, i * size + size)
    );
}

const Page = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 700px;
  }
`;

const LoadingGif = styled.img`
width: 15px;
height: 15px;
`;
const CardLayout = styled.div`
display: flex;
flex-direction: column;
padding: 30px 20px 25px 20px;
border-radius: 14px;
margin-bottom: 20px;
width: 350px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardTitle = styled.h3`
  font-size:16px;
  font-weight: bold;
  display: block;
  text-align: left;
  margin-top: 5px;
  margin-bottom:5px;
`;
const CardDescription = styled.p`
  font-size: 14px;
  margin-bottom:30px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardFooterCreation = styled.div`
  font-size:10px;
  font-weight: bold;
`;
const CardFooterAuthors = styled.div`
  font-size:10px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  } 
`;

const CardCommentsContainer = styled.div`
  display:flex;
  flex-direction:column;
  padding-top:10px;
  
`;

const CardCommentSection = styled.div`
  display:flex;
  flex-direction:column;
`;
const Comment = styled.ul`
  list-style-type: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 14px;
  padding: 20px 20px 25px 20px;
`;
const CommentTitle = styled.li`
    font-size: 14px;
    font-weight: bold;
    display: block;
    text-align: left;
    margin-top: 5px;
    margin-bottom: 5px;`;

const CommentDescription= styled.li`
font-size: 12px;
`;

const CardImage = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50%;
`;
const PaginationContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
`;

function usePosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const data = await fetch(
                "https://6144e843411c860017d256f0.mockapi.io/api/v1/posts"
            ).then(r => r.json());
            return data;
        },
    });
}

function fetchProperDateFormat(dateToFormat: string) {
    let dateObj = new Date(dateToFormat);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const newdate = day + "/" + month + "/" + year;
    return newdate;
}



export default function BlogFeed(): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page);
    };

    const posts = usePosts();
    if (posts.isLoading) {
        return <LoadingGif src={loading.src} />;
    }
    const chunks = sortAndChunk(posts.data, 5);
    return (
        <div>
            <BlogFeedPage>
                {chunks[currentPage - 1]}
            </BlogFeedPage>
            <PaginationContainer><Pagination current={currentPage} defaultPageSize={5} onChange={onChange} total={posts.data.length} /></PaginationContainer>
        </div>
    )
}

function BlogFeedPage(props: { children: any[] }) {
    return <Page>
        {props.children.map(child =>
            <BlogCard
                title={child.title}
                description={child.description}
                createdAt={child.createdAt}
                authors={child.authors}
                comments={child.comments}
            />)}
    </Page>
}

function BlogCard(props: { title: string, description: string, createdAt: string, authors: [{ name: string, avatar: string }], comments: [{ id: string, title: string, description: string }] }) {

    const [showComments, setShowComments] = useState(false);

    return (
        <CardLayout>
            <CardBody>
                <CardTitle>
                    {props.title}
                </CardTitle>
                <CardDescription>
                    {props.description}
                </CardDescription>
                <CardFooter>
                    <CardFooterCreation>
                        Created At: {fetchProperDateFormat(props.createdAt)}
                    </CardFooterCreation>
                    <CardFooterAuthors>
                        <div>Created By:</div>
                        {props.authors.map(auth =>
                            <div><span>{auth.name}</span><CardImage src={avatar.src} /></div>
                        )}
                    </CardFooterAuthors>
                </CardFooter>
                <CardCommentsContainer>
                    <Button style={{margin:'0 auto', width: '50%'}} onClick={() => setShowComments(!showComments)} type="primary">{showComments ? "Hide Comments" : "Show Comments"}</Button>
                    {showComments &&
                        <CardCommentSection>
                            {props.comments.map(comment =>

                                <Comment>
                                    <CommentTitle>{comment.title}</CommentTitle>
                                    <CommentDescription>{comment.description}</CommentDescription>
                                </Comment>

                            )}
                        </CardCommentSection>
                    }
                </CardCommentsContainer>
            </CardBody>
        </CardLayout>
    )
}