export interface Post {
    id: string;
    author: string;
    date: string;
    tags: string[];
    title: string;
    text_full_strings: string;
}

export let template: string;

export class Template {
    constructor(
        title: string,
        tags: string[],
        author: string,
        date: string,
        text_full_strings?: string) {
        template = `
---
layout:
title: ${title}
tags: ${tags}
author: ${author}
date: ${date}
---
${text_full_strings || ''}`;
    }
};
