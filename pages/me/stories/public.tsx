import React from 'react';
import ProtectedPages from '../../../components/pages/ProtectedPages';
import PublishedHome from '../../../components/pages/stories/PublishedHome';
import StoriesHome from '../../../components/pages/stories/StoriesHome';

function Public() {
  return (
    <ProtectedPages>
      <StoriesHome>
        <PublishedHome />
      </StoriesHome>
    </ProtectedPages>
  );
}

export default Public;
