import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
});

export const serializeData = (data: unknown) => {
  const string = JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
  return JSON.parse(string);
};

export const createPostFetchUrl = (username?: string | undefined) => {
  const params = new URLSearchParams();
  params.append('order', 'desc');
  username && params.append('excludeUser', username);

  const url = `/posts?${params.toString()}`;

  return url;
};

export const createAuthorPostsFetchUrl = (
  username: string | undefined,
  postStatus?: string | undefined
) => {
  const params = new URLSearchParams();
  params.append('order', 'desc');

  const url = `/${username}/${
    postStatus === 'draft' ? 'drafts' : 'posts'
  }?${params.toString()}`;

  return url;
};

export const createAuthorPostFetchUrlByID = (
  uuid: unknown,
  username: string
) => {
  const url = `/${username}/${uuid}`;

  return url;
};

export const fetcher = (url: string) => Api.get(url).then((res) => res.data);
