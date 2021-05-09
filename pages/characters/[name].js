import Layout from '../../components/mlayout';
// import Image from 'next/image'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.scss';
import styled from 'styled-components';
import { getAllCharacterNames, getCharacterPageData } from '../../lib/characters';
import MarvelLink from '../../components/marvelLink';

export async function getStaticProps({ params }) {
  let currentName = params.name;

  if (currentName === 'Araña') {
    currentName = 'Arana';
  } else if (currentName === 'Edward "Ted" Forrester') {
    currentName = 'Edward%20%22Ted%22%20Forrester';
  } else if (currentName === 'Dog Brother #1') {
    currentName = 'Dog%20Brother%20%231';
  }

  const characterData = await getCharacterPageData(currentName);
  return {
    props: {
      characterData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllCharacterNames();
  return {
    paths,
    fallback: true,
  };
}

export default function Character({ characterData }) {
  let urlArray = characterData.response[0].urls;
  return (<Layout>
    <CharacterPageStyles>
      <Head>
        <title>{characterData.response[0].name}</title>
      </Head>
      <div className={utilStyles.content}>
        <h1>
          {characterData.response[0].name}
        </h1>
        {/* <Image
        priority
        src={characterData.pageData[0].thumbnail.path + "." + characterData.pageData[0].thumbnail.extension}
        className={utilStyles.borderCircle}
        height={200}
        width={200}
        alt={characterData.pageData[0].name} /> */}
        <img src={characterData.response[0].thumbnail.path + '.' + characterData.response[0].thumbnail.extension}
             className={`${utilStyles.borderCircle} ${utilStyles.characterImage}`}
             height={200}
             width={200} />
        <div className='description'>
          <p>{characterData.response[0].description}</p>
        </div>
        <div>
          {urlArray.map(item => (
            <MarvelLink urlData={item} key={item.type} />
          ))}
        </div>
      </div>
    </CharacterPageStyles>
  </Layout>);
}

const CharacterPageStyles = styled.div`
  .description {
    margin: auto;
    max-width: 700px;
  }
`;