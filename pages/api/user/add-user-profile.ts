import { TypedPostEndpoint } from "../../../src/lib/types/request";
import { UserProfile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from "../../../src/pocketbase";

export type AddUserProfileParams = UserProfile & { password: string };
export type AddUserProfileReturns = {id: string};

const handler: TypedPostEndpoint<AddUserProfileParams, AddUserProfileReturns> = async (req, res) => {
  const pocketBaseInstance = pocketbase;
  try {
    const userRecord = await (await pocketbase.getConnection()).users.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password
    })
    const profileRecord = await pocketBaseInstance.add(
      "profiles",
      {
        userId: userRecord.id,
        username: req.body.username,
        age_group: req.body.age_group,
        preferences: req.body.preferences,
        location: req.body.location
      }
    );
    res.status(200).json({id: userRecord.id});
  } catch (error) {
    res.status(404).json(undefined);
  }
}

export default handler;