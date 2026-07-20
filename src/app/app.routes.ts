import { Routes } from '@angular/router';
import { Landingpage } from './components/landingpage/landingpage';
import { Home } from './components/home/home';
import { MovieDetails } from './components/movie-details/movie-details';
import { Trending } from './components/trending/trending';
import { Watchlist } from './components/watchlist/watchlist';

export const routes: Routes = [
    {
        path:'',
        component:Landingpage
    },
    {
        path:'home',
        component:Home,
        children:[
            {
                path:'',
                loadComponent:()=>import('./components/movies/movies').then(c=>c.Movies)
            },
            {
                path:'trend',

                loadComponent:()=>import('./components/trending/trending').then(c=>c.Trending)
            },
            {
                path:'watchlist',
                                loadComponent:()=>import('./components/watchlist/watchlist').then(c=>c.Watchlist)

            },
            {
                path:'movies/:id',
                                loadComponent:()=>import('./components/movie-details/movie-details').then(c=>c.MovieDetails)

            }
        ]
    },

];
