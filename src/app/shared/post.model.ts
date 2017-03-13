export let post;
export class Post {
    id: string;
    author: string;
    date: string;
    tags: string[];
    title: string;
    text_full_strings: string;
    text_full_md: string;
    sha: string;
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
        text: string) {
        fullMd = `
---
layout:
title: ${title}
tags: ${tags}
author: ${author}
date: ${date}
---
${text}`;
    }
}
