import React from "react";
import styles from "../../../styles/post.module.scss"
import { Comment, CommentWithComments } from "../../lib/types/fullPocketTypes";
import Image from 'next/image'
import { BaseConverter } from "../../lib/types/type-mapper";
import { CommentsRecord } from "../../lib/types/pocket";

export default function CommentSection(props: { comments: CommentWithComments[] }) {
  return (
    <>
      {props.comments.map((comment, index)=>{
        const time = (comment as unknown as BaseConverter<Comment>).created
        const reactions = Object.keys(comment.reactions)
        let count = 0;
        reactions.forEach((value)=>{count += comment.reactions[value]})

        return <div className={styles.hor} key={index}>
          <div className={styles.vert}>
            <Image src="/img/avatar.svg" width="0" height="0" alt="avatar-placeholder" className={styles['profile-picture']}/>
            <i className={styles.thread}></i>
          </div>
          <div className={styles["content-wrapper"]}>
            <h4 className={styles.title}>{comment.author.username} <a className={styles.time} href="">2h ago</a></h4>
            <p className={styles.content}>{comment.body}</p>
            <p className={styles.reaction}>
              {reactions.map((reaction, index)=>{
                return <a key={index} className={styles.emoji}>{reactionToEmoji(reaction)}</a>
              })}
              <a href="">{count}</a>
            </p>
            {comment.child_comments.length > 0 ?
              <CommentSection comments={comment.child_comments}/>
              :
              null
            }
          </div>
        </div>
      })}
      
    </>
  )
}

const printifyDate = (date: Date): string => {
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}


function reactionToEmoji(reaction: string): string | undefined{
  const map: {[key: string]: string} = {
    "happy": '😊',
    "sad": '😭',
    "confused": '🤨',
    "angry": '😠',
    "shocked": '😲'
  }

  return map[reaction]
}