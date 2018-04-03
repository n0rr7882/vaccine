export interface IUser {
    _id: string;
    username: string;
    email: string;
    followers: string[];
    followings: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPost {
    _id: string;
    content: string;
    hashtags: string[];
    author: IUser;
    comments: string[];
    goods: string[];
    goodsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IComment {
    _id: string;
    post: string | IPost;
    author: IUser;
    content: string;
    goods: string[];
    createdAt: Date;
    updatedAt: Date;
}
