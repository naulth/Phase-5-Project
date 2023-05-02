import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"

import ScrollToTop from './Helpers/ScrollToTop';

import {UserProvider} from "./Context/user"
import { FavoritesProvider } from './Context/favorites';
import { UsersArrayProvider } from './Context/usersArray';
import { CommentsProvider } from './Context/comments';
import { FollowersProvider } from './Context/followers';
import { GameProvider } from './Context/game';

const root = createRoot(document.getElementById('root'));

root.render(

	<BrowserRouter>
        <ScrollToTop />
        <GameProvider>
        <FollowersProvider>
        <UsersArrayProvider>
        <CommentsProvider>
        <FavoritesProvider>
        <UserProvider>
            <App />
        </UserProvider>
        </FavoritesProvider>
        </CommentsProvider>
        </UsersArrayProvider>
        </FollowersProvider>
        </GameProvider>
    </BrowserRouter>
);
