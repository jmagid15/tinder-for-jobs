import _ from 'lodash';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';
import { REHYDRATE } from 'redux-persist';

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      if (action && action.payload) {
        return action.payload.likedJobs
      } else {
        return []
      }
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'id');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
