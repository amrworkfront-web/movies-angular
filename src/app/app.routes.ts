import { Routes } from '@angular/router';
import { Landingpage } from './components/landingpage/landingpage';
import { Movies } from './components/movies/movies';
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
                component:Movies
            },
            {
                path:'trend',
                component:Trending
            },
            {
                path:'watchlist',
                component:Watchlist
            },
            {
                path:'movies/:id',
                component:MovieDetails
            }
        ]
    },

];
