/*
  Util - Youtube API boilerplate code
 */

export function buildApiRequest(requestMethod, path, params, properties) {
  params = removeEmptyParams(params);
  let request;
  if (properties) {
    let resource = createResource(properties);
    request = window.gapi.client.request({
      body: resource,
      method: requestMethod,
      path: path,
      params: params,
    });
  } else {
    request = window.gapi.client.request({
      method: requestMethod,
      path: path,
      params: params,
    });
  }
  return request;
}

function removeEmptyParams(params) {
  for (const p in params) {
    if (!params[p] || params[p] === 'undefined') {
      delete params[p];
    }
  }
  return params;
}

function createResource(properties) {
  const resource = {};
  const normalizedProps = properties;
  for (const p in properties) {
    const value = properties[p];
    if (p && p.substr(-2, 2) === '[]') {
      const adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (const prop in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    // eslint-disable-next-line no-prototype-builtins
    if (normalizedProps.hasOwnProperty(prop) && normalizedProps[prop]) {
      const propArray = prop.split('.');
      let ref = resource;
      for (let pa = 0; pa < propArray.length; pa++) {
        const key = propArray[pa];
        if (pa === propArray.length - 1) {
          ref[key] = normalizedProps[prop];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    }
  }
  return resource;
}

export function buildMostPopularVideosRequest(
  amount = 12,
  loadDescription = false,
  nextPageToken,
  videoCategoryId = null,
) {
  let fields =
    'nextPageToken,prevPageToken,items(contentDetails/duration,id,snippet(channelId,channelTitle,publishedAt,thumbnails/medium,title),statistics/viewCount),pageInfo(totalResults)';
  if (loadDescription) {
    fields += ',items/snippet/description';
  }
  return buildApiRequest(
    'GET',
    '/youtube/v3/videos',
    {
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      maxResults: amount,
      regionCode: 'US',
      pageToken: nextPageToken,
      fields,
      videoCategoryId,
    },
    null,
  );
}

export function buildVideoCategoriesRequest() {
  return buildApiRequest(
    'GET',
    '/youtube/v3/videoCategories',
    {
      part: 'snippet',
      regionCode: 'US',
    },
    null,
  );
}

export function buildVideoDetailRequest(videoId) {
  return buildApiRequest(
    'GET',
    '/youtube/v3/videos',
    {
      part: 'snippet,statistics,contentDetails',
      id: videoId,
      fields:
        'kind,items(contentDetails/duration,id,snippet(channelId,channelTitle,description,publishedAt,thumbnails/medium,title),statistics)',
    },
    null,
  );
}

export function buildChannelRequest(channelId) {
  return buildApiRequest(
    'GET',
    '/youtube/v3/channels',
    {
      part: 'snippet,statistics',
      id: channelId,
      fields:
        'kind,items(id,snippet(description,thumbnails/medium,title),statistics/subscriberCount)',
    },
    null,
  );
}

export function buildCommentThreadRequest(videoId, nextPageToken) {
  return buildApiRequest(
    'GET',
    '/youtube/v3/commentThreads',
    {
      part: 'id,snippet',
      pageToken: nextPageToken,
      videoId,
    },
    null,
  );
}

export function buildSearchRequest(query, nextPageToken, amount = 12) {
  return buildApiRequest(
    'GET',
    '/youtube/v3/search',
    {
      part: 'id,snippet',
      q: query,
      type: 'video',
      pageToken: nextPageToken,
      maxResults: amount,
    },
    null,
  );
}
