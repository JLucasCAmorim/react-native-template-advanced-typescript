import {all, AllEffect} from 'redux-saga/effects';

export default function* rootSaga(): Generator<
  AllEffect<never>,
  void,
  unknown
> {
  yield all([]);
}
