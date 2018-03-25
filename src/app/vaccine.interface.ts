export interface IUser {
    _id: string;
    username: string;
    email: string;
    followers: string[] | IUser[];
    followings: string[] | IUser[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPost {
    _id: string;
    content: string;
    hashtags: string[];
    author: string | IUser;
    comments: string[];
    goods: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IComment {
    _id: string;
    post: string | IPost;
    author: string | IUser;
    content: string;
    goods: string[];
    createdAt: Date;
    updatedAt: Date;
}
