import { Grid, GridProps } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { styled } from '@mui/system';

import Header from '../components/header';
import { loadPharmacists, loadTasks } from '../api';
import HomeSection from '../section/home';

export const getStaticProps: GetStaticProps = async (context) => {
  const pharmacists = await loadPharmacists();
  const tasks = await loadTasks();
  return {
    props: {
      pharmacists,
      tasks,
    },
  };
};

const Home: NextPage = ({
  pharmacists,
  tasks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const VSGrid = styled(Grid)<GridProps>({
    backgroundColor: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  });
  const Main = styled(Grid)<GridProps>({
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  });

  return (
    <>
      <Head>
        <title>VS NimbleRx Take Home Project</title>
      </Head>
      <VSGrid container>
        <Header />
        <Main role="main">
          <HomeSection tasks={tasks} pharmacists={pharmacists} />
        </Main>
      </VSGrid>
    </>
  );
};

export default Home;
