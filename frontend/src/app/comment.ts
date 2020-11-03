import { ReplyComment } from './replyComment';

export interface InitComment {

  author: String,
  comment: String,
  replies: Array<ReplyComment>,
  time_posted: String,
  likes: Number

}
