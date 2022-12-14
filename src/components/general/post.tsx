import React, { useState } from "react";
import styles from '../../../styles/post.module.scss'
import TagComponent from "./tag";
import { PostWithComments } from '../../lib/types/fullPocketTypes'
import { TagsRecord } from "../../lib/types/pocket";
import InDepthPostComponent from "./in-depth-post";

export default function PostComponent(props: { post: PostWithComments }) {
  let [isInDepthPostVisible, setIsInDepthPostVisible] = useState(false)
  let post = props.post
  return <div className={styles.post} onClick={() => { setIsInDepthPostVisible(!isInDepthPostVisible) }}>
    <h1>{post.title}</h1>
    <div className={styles['tags-container']}>
      {post.tags.map((tag: TagsRecord, index: number) => {
        return <TagComponent tag={tag} key={index} />
      })}
    </div>
    <InDepthPostComponent post={post} hide={() => setIsInDepthPostVisible(false)} visibile={isInDepthPostVisible} />
  </div>
}