import { fork, take, all, put, call } from 'redux-saga/effects';
import * as watchActions from '../actions/watch';
import { REQUEST } from '../actions';
import {
  buildVideoDetailRequest,
  buildChannelRequest,
  buildCommentThreadRequest,
} from '../api/youtube-api';
import { VIDEO_LIST_RESPONSE } from '../api/youtube-api-response-types';

export function* watchWatchDetails() {
  while (true) {
    const { videoId, channelId } = yield take(
      watchActions.WATCH_DETAILS[REQUEST],
    );

    yield fork(fetchWatchDetails, videoId, channelId);
  }
}

export function* fetchWatchDetails(videoId, channelId) {
  let requests = [
    buildVideoDetailRequest.bind(null, videoId),
    buildCommentThreadRequest.bind(null, videoId),
  ];

  if (channelId) {
    requests.push(buildChannelRequest.bind(null, channelId));
  }

  try {
    const responses = yield all(requests.map((fn) => call(fn)));
    yield put(watchActions.details.success(responses, videoId));
    yield call(fetchVideoDetails, responses, channelId === null);
  } catch (error) {
    yield put(watchActions.details.failure(error));
  }
}

function* fetchVideoDetails(responses, shouldFetchChannelInfo) {
  let requests = [];

  if (shouldFetchChannelInfo) {
    // we have to extract the video's channel id from the video details response
    // so we can load additional channel information.
    // this is only needed, when a user directly accesses .../watch?v=1234
    // because then we only know the video id
    const videoDetailResponse = responses.find(
      (response) => response.result.kind === VIDEO_LIST_RESPONSE,
    );
    const videos = videoDetailResponse.result.items;
    if (videos && videos.length) {
      requests.push(
        buildChannelRequest.bind(null, videos[0].snippet.channelId),
      );
    }
  }

  try {
    const responses = yield all(requests.map((fn) => call(fn)));
    yield put(watchActions.videoDetails.success(responses));
  } catch (error) {
    yield put(watchActions.videoDetails.failure(error));
  }
}
