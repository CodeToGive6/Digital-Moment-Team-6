import React, { useState } from "react";
import styles from '../../../styles/post.module.scss'
import TagComponent from "./tag";
import { PostWithComments } from '../../lib/types/fullPocketTypes'
import { TagsRecord } from "../../lib/types/pocket";
import postStyles from '../../../styles/postInfo.module.scss'
import Image from "next/image";
import CommentSection from "./comment-section";

export default function InDepthPostComponent(props: { post: PostWithComments, hide: () => void, visibile: boolean }) {
  let post = props.post
  return (
    <>
      {
        post && props.visibile ?
          <>
            <div className={postStyles['post-info']} onClick={(e)=>{e.stopPropagation()}}>
              <div>
                <div className={postStyles['post-info-title-section']}>
                  <h1>{post.title}</h1>
                  <Image onClick={(e) => { e.stopPropagation(); props.hide() }} className={postStyles['close-icon']} src="/img/close.svg" width="50" height="50" alt="close-placeholder" />
                </div>
              </div>
              <p>{post.body}</p>
              <div className={styles['tags-container']}>
                {post.tags.map((tag: TagsRecord, index: number) => {
                  return <TagComponent tag={tag} key={index} />
                })}
              </div>
              <input className={styles['new-comment-input']} placeholder="add a new comment..."/>
              <CommentSection comments={post.child_comments} />
            </div>
          </>
          :
          null
      }
    </>
  )
}