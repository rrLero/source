export interface Post {
    id: string;
    author: string;
    date: string;
    tags: string[];
    title: string;
    text_full_strings: string;
    text_full_md: string;
    sha: string;
}

export let updatedPost: string;

export class UpdatedPost {
    constructor(
        title:  string,
        tags: string[],
        author: string,
        date: string,
        text: string) {
        updatedPost = `
---
layout:
title: ${title}
tags: ${tags}
author: ${author}
date: ${date}
---
${text}
`;
    }
}
