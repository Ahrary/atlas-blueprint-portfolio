import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Button,
  Footer,
  Header,
  Main,
  SearchInput,
  SearchRecommendations,
  SearchResults,
} from 'components';
import useSearch from 'hooks/useSearch';
import Head from 'next/head';
import React from 'react';
import styles from 'styles/pages/_Search.module.scss';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadMore,
    isLoading,
    pageInfo,
  } = useSearch();

  return (
    <>
      <Head>
        <title>Search - {generalSettings?.description}</title>
      </Head>

      <Header className={styles['search-header']} />

      <div className={styles['search-header-pane']}>
        <div className="container small">
          <h2 className={styles['search-header-text']}>
            {searchQuery && !isLoading
              ? `Showing results for "${searchQuery}"`
              : `Search`}
          </h2>
          <SearchInput
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
          />
        </div>
      </div>

      <Main className="container small">
        <>
          <SearchResults searchResults={searchResults} isLoading={isLoading} />

          {pageInfo?.hasNextPage && (
            <div className={styles['load-more']}>
              <Button onClick={() => loadMore()}>Load more</Button>
            </div>
          )}

          {!isLoading && searchResults === null && <SearchRecommendations />}
        </>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
