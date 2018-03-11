export const CHECK_LIST = {
    user: [
        { property: 'username', reg: /^(?=.*).{2,20}$/, message: 'INVALID_USERNAME' },
        { property: 'email', reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'INVALID_EMAIL' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/, message: 'INVALID_PASSWORD' }
    ],
    post: [
        { property: 'title', reg: /^(?=.*).{1,50}$/, message: 'INVALID_TITLE' },
        { property: 'tags', reg: /^(?=.*).{1,50}$/, message: 'INVALID_TAGS' },
        { property: 'contents', reg: /^(?=.*).+$/m, message: 'INVALID_CONTENTS' }
    ],
    comment: [
        { property: 'contents', reg: /^(?=.*).+$/m, message: 'INVALID_CONTENTS' }
    ]
};

export function checkProperty(data, service, strict) {
    let result = {};
    for (const item of CHECK_LIST[service]) {
        if (data[item.property] && item.reg.exec(data[item.property])) {
            result[item.property] = data[item.property];
        } else {
            if (!strict && !data[item.property]) continue;
            return { message: item.message, data: null };
        }
    }
    return { message: 'SUCCESS', data: result };
}