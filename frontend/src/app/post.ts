import { InitComment } from './comment'

export interface Post{

  author: String,
  post_caption: String,
  post_content: Object,
  comments: Array<InitComment>,
  time_posted: String

}
