import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { AuthGuard }            from '../../services';

import {
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    DraftsComponent,
    DraftComponent,
    PostsByTagComponent,
} from './components';

const routes: Routes = [
    {
        path: ':name/:repo',
        children: [
            {
                path: '',
                component: PostsComponent,
            },
            {
                path: 'page/:id',
                component: PostsComponent
            },
            {
                path: 'tag/:tag',
                component: PostsByTagComponent
            },
            {
                path: 'tag/:tag/page/:id',
                component: PostsByTagComponent
            },
            {
                path: 'post/:title',
                component: PostComponent
            },
            {
                path: 'post/:title/edit',
                component: EditPostComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'create',
                component: CreatePostComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'drafts',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: DraftsComponent
                    },
                    {
                        path: 'page/:id',
                        component: DraftsComponent
                    },
                    {
                        path: 'post/:title',
                        component: DraftComponent
                    },
                    {
                        path: 'post/:title/edit',
                        component: EditPostComponent
                    }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        LocalizeRouterModule.forChild(routes),
        RouterModule.forChild(routes)
    ],
    exports: [
        LocalizeRouterModule,
        RouterModule
    ]
})
export class PostsRoutingModule { }
