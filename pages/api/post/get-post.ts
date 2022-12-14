import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Post, Profile, Reaction } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import { BaseConverter, getTags } from "../../../src/lib/types/type-mapper";
import { PostInfosRecord, ReactionsRecord, RecordIdString } from "../../../src/lib/types/pocket";
import Api from "../../../src/api_backend";

export type GetPostQueryParams = {
  postId: string;
}
export type GetPostReturnParams = Post | undefined;

const handler: TypedGetEndpoint<GetPostQueryParams, GetPostReturnParams> = async (req, res) => {
  const { postId } = req.query;
  if (postId == undefined) {
    res.status(400).send(undefined);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const postRecord = await pocketBaseInstance.getOne("posts", postId);
    const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);
    const { post_info, tags, author, ...response } = { ...postInfo, ...postRecord };
    const responseTags = await getTags(tags as unknown as RecordIdString[]);
    const responseAuthor = await Api.makeGetRequest("user/get-user-profile", { userId: postInfo.author }) as Profile;
    const responseReactions = await getReactions((postInfo as BaseConverter<PostInfosRecord>).id);
    res.status(200).json({
      "tags": responseTags,
      "author": responseAuthor,
      "reactions": responseReactions,
      ...response
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json(error as any);
  }
}

async function getReactions(postInfoId: RecordIdString): Promise<Record<string, number>> {
  console.log("started for", postInfoId)
  const pocketBaseInstance = pocketbase;
  console.log("pocketbase", postInfoId)
  const reactions = await pocketBaseInstance.getList("reactions");
  console.log("got reactions", postInfoId)
  const reactionsCounts =
    await Promise.all(
      reactions.map(
        async (reaction) => {
          try {
            const reactionRecord = reaction as BaseConverter<ReactionsRecord>;
            console.log("Reaction:", reactionRecord.id)
            console.log("PostInfo:", postInfoId)

            const reactionList =
              await pocketBaseInstance.getList("reactions_to_posts",
                `(reaction = '${reactionRecord.id}' && post_info = '${postInfoId}')`);
            return reactionList.length;
          }
          catch (e) {
            console.log("Reaction error")
            return 0;
          }
        }
      )
    );
  const zipped: Record<string, number> = {};
  for (const i in reactions) {
    zipped[reactions[i].name] = reactionsCounts[i];
  }
  return zipped;
}

export default handler;
