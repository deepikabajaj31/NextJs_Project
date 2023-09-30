import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from 'react';
import Head from 'next/head';
function HomePage(props) {
  // console.log(props.meetups);
  return(
  <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
   <MeetupList meetups={props.meetups} />;
   </Fragment>
  )
}
export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URL);
  //navigate to the created database
  const db = client.db();
  const meetupsCollection = db.collection("meetup");
  //get all documents from database and its in form of object so convert into array format
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
