export interface Post {
    id: number;
    user: string;
    date: string;
    category: string;
    tags: string[];
    title: string;
    content: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body?: string;
}
