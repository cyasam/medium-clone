import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export const serializeData = (data: unknown) => {
  const string = JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' || value === 'date' ? value.toString() : value
  );
  return JSON.parse(string);
};

export const createPostFetchUrl = (username?: string | undefined) => {
  const params = new URLSearchParams();
  params.append('order', 'desc');
  username && params.append('excludeUser', username);

  const url = `/api/posts?${params.toString()}`;

  return url;
};

export const createAuthorPostsFetchUrl = (
  username: string | undefined,
  postStatus?: string | undefined
) => {
  const params = new URLSearchParams();
  params.append('order', 'desc');

  const url = `/api/${username}/${
    postStatus === 'draft' ? 'drafts' : 'posts'
  }?${params.toString()}`;

  return url;
};

export const createPostFetchUrlByID = (uuid: unknown) => {
  const url = `/api/posts/${uuid}`;

  return url;
};

export const createAuthorPostFetchUrlByID = (
  uuid: unknown,
  username: string
) => {
  const url = `/api/${username}/${uuid}`;

  return url;
};

export const fetcher = (url: string) => Api.get(url).then((res) => res.data);
