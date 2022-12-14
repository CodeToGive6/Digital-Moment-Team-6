import qs from "qs";
import { GetUserQueryParams, GetUserReturnParams } from "../pages/api/user/get-user-profile";
import { AddUserProfileParams, AddUserProfileReturns } from "../pages/api/user/add-user-profile";
import { AddPostBodyParams, AddPostReturnParams } from "../pages/api/post/add-post";
import { GetPostQueryParams, GetPostReturnParams } from "../pages/api/post/get-post";
import { AddCommentBodyParams, AddCommentReturnParams } from "../pages/api/comment/add-comment";
import { GetCommentQueryParams, GetCommentReturnParams } from "../pages/api/comment/get-comment";
import { GetTagQueryParams, GetTagReturnParams } from "../pages/api/tag/get-tag";
import { GetPostCommentsQueryParams, GetPostCommentsReturnParams } from "../pages/api/post/get-post-comments";
import { GetAllPostsQueryParams, GetAllPostsReturnParams } from "../pages/api/post/get-all-posts";
import { GetTagLocQueryParams, GetTagLocReturnParams } from "../pages/api/tag/get-tag-loc";

type EndpointHandler<D, T> = (args: D) => T;

interface IPostEndpoints {
  "user/add-user-profile": EndpointHandler<AddUserProfileParams, AddUserProfileReturns>
  "post/add-post": EndpointHandler<AddPostBodyParams, AddPostReturnParams>
  "comment/add-comment": EndpointHandler<AddCommentBodyParams, AddCommentReturnParams>
}

interface IGetEndpoints {
  "user/get-user-profile": EndpointHandler<GetUserQueryParams, GetUserReturnParams>
  "post/get-post": EndpointHandler<GetPostQueryParams, GetPostReturnParams>
  "post/get-post-comments": EndpointHandler<GetPostCommentsQueryParams, GetPostCommentsReturnParams>
  "post/get-all-posts": EndpointHandler<GetAllPostsQueryParams, GetAllPostsReturnParams>
  "comment/get-comment": EndpointHandler<GetCommentQueryParams, GetCommentReturnParams>
  "tag/get-tag": EndpointHandler<GetTagQueryParams, GetTagReturnParams>
  "tag/get-tag-loc": EndpointHandler<GetTagLocQueryParams, GetTagLocReturnParams>
}


const wait = async () => new Promise<undefined>((res, rej) => setTimeout(() => res(undefined), 1000))

export default class Api {
  private static baseURL = "http://localhost:3000/api"

  public static async makeGetRequest<R extends keyof IGetEndpoints, D extends Parameters<IGetEndpoints[R]>, T extends ReturnType<IGetEndpoints[R]>>(route: R, ...args: D): Promise<T> {
    // console.log(JSON.stringify(Ob);
    const source = {};
    args.forEach(o => Object.assign(source, o));
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(`${this.baseURL}/${route}?${qs.stringify(source)}`, {
          method: 'GET',
          headers: {
            // "Accept-Encoding": "gzip, deflate, br",
            // "Accept- Language": " en- CA, en - GB; q = 0.9, en - US; q = 0.8, en; q = 0.7, la; q = 0.6, fr; q = 0.5",
          }
        });
        if (response.status == 200) {
          res(response.json());
        } else {
          console.log("retrying")
          return Api.makeGetRequest(route, ...args);
          rej(response.statusText);
        }
      } catch {
        console.log("retrying")

        return Api.makeGetRequest(route, ...args);
      }
    });
  }

  public static async makePostRequest<R extends keyof IPostEndpoints, D extends Parameters<IPostEndpoints[R]>[0], T extends ReturnType<IPostEndpoints[R]>>(route: R, args: D): Promise<T> {
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(`${this.baseURL}/${route}`, {
          method: 'POST',
          body: JSON.stringify(args),
          headers: {
            "content-type": "application/json"
          }
        });

        if (response.status == 200) {
          res(response.json());

        } else {
          return Api.makePostRequest(route, args);
          rej(response.statusText);
        }
      } catch {
        return Api.makePostRequest(route, args);
      }
    });
  }
}
