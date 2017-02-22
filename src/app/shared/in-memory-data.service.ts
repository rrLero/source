import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let posts = [
            {
                id: 1,
                title: 'first post',
                preview: `<p>test post preview</p>`,
                content: `<p>test post content</p>`
            },
            {
                id: 2,
                title: 'second post',
                preview: `<p>test post preview 2 </p>`,
                content: `<p>test post content 2</p>`
            }

        ];
        return { posts };
    }
}
