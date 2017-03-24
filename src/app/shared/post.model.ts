export let post;
export class Post {
    id: string;
    author: string;
    date: string;
    tags: string[];
    title: string;
    preview: string;
    text_full_strings: string;
    text_full_md: string;
    sha: string;
    comments_status: boolean;
    comments: number;
    constructor(filename: string, text_full_md: string) {
        post = {
            filename: filename,
            text_full_md: text_full_md
        };
    }
}

export let fullMd: string;
export class FullMd {
    constructor(
        title: string,
        tags: string,
        author: string,
        date: string,
        preview: string,
        text: string) {
        fullMd = `
---
preview: ${preview}
title: ${title}
tags: ${tags}
author: ${author}
date: ${date}
---
${text}`;
    }
}
