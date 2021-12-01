import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT } from "../fragments";



const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      user {
        username
        avatar
      }
      ...PhotoFragment
      caption
      comments {
        id
        user {
          username
          avatar
        }
        text
        isMine
        createdAt
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
