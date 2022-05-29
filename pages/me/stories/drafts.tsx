import React from 'react';
import ProtectedPages from '../../../components/pages/ProtectedPages';
import StoriesHome from '../../../components/pages/stories/StoriesHome';
import DraftsHome from '../../../components/pages/stories/DraftsHome';

function Drafts() {
  return (
    <ProtectedPages redirect={true}>
      <StoriesHome>
        <DraftsHome />
      </StoriesHome>
    </ProtectedPages>
  );
}

export default Drafts;
