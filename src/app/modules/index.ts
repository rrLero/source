import { CommentsModule } from './comments/comments.module';
import { PostsModule }    from './posts/posts.module';
import { SharedModule }   from './shared/shared.module';

export {
    CommentsModule,
    PostsModule,
    SharedModule
};

export const modules = [
    CommentsModule,
    PostsModule,
    SharedModule
];
