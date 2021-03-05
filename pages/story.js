import axios from 'axios';
import Error from 'next/error';
import CommentList from '../components/CommentList';
import Layout from '../components/Layout';

const story = ({ story }) => {
  
  if (!story) {
    return <Error statusCode={503} />;
  }
  
  return (
    <Layout title={story.title} backButton={true}>
        <main>
          <h1 className="story-title">
            <a href={story.url} target="_blank">{story.title}</a>
          </h1>
          <div className="story-details">
            <strong>{story.points} points</strong>
            <strong>{story.comments_count} comments</strong>
            <strong>{story.time_ago}</strong>
          </div>

          {story.comments.length > 0 ? (
            <CommentList comments={story.comments} />
          ) : (
            <h3>No comments for this story</h3>
          )}
        </main>

        <style jsx>{`
          main {
            padding: 1em;
          }
          .story-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5em;
          }
          .story-title a {
            color: #333;
            text-decoration: none;
          }
          .story-title a:hover {
            text-decoration: underline;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 1em;
          }
          .story-details strong {
            margin-right: 1em;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
  );
}

export async function getServerSideProps({ req, res, query }) {
    let story;
    try {
      const storyId = query.id
      const response = await axios.get(`https://node-hnapi.herokuapp.com/item/${storyId}`)
      story = response.data;
      
    } catch (error) {
      console.log(error);
      story = []
    }
    
    return { props: { story } }
}

export default story;
