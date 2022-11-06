import { PostsRecord, PostInfosRecord, ProfilesRecord, CommentsRecord, TagsRecord } from "./pocket";
import { User } from 'pocketbase';

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info" | 'tags'> & {
    "tags": TagsRecord[];
}

// TODO remove "name" from age group from DB
export type AgeGroup =
  Omit<pocket.AgeGroupsRecord, "name">

export type Post =
  pocket.PostInfosRecord
  & Omit<pocket.PostsRecord, "post_info" | "tags">
  & {
    "tags": Tag[]
  };

export type Comment =
  pocket.PostInfosRecord
  & Omit<pocket.CommentsRecord, "post_info">;

export type Profile =
  Omit<pocket.ProfilesRecord, "userId" | "age_group" | "preferences" | "location">
  & {
    "age_group": Omit<pocket.AgeGroupsRecord, "name">,
    "preferences": Tag[],
    "location": Tag
  };
