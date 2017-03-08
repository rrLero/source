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
        author: string,
        date: string) {
        template = `
        ---
        layout:
        title:
        tags:
        author: ${author}
        date: ${date}
        ---
        `;
    }
};
