# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, Game, Comment, User, Favorite, CommentReply


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Game.query.delete()
        Comment.query.delete()
        Favorite.query.delete()
        CommentReply.query.delete()

        g1 = Game(title = "League of Legends", image = "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LoL_1200x1600-15ad6c981af8d98f50e833eac7843986", genre = "MOBA", platform = "PC", price = 00.00)

        g2 = Game(title = "The Witcher 3: Wild Hunt", image = "https://e.snmc.io/lk/l/x/d19d69e31b8147ab185e491f43732182/10840457", genre = "RPG", platform ="PC", price = 59.99)
        
        g3 = Game(title = "Overwatch", image = "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg", genre = "PVP Team-Based Shooter", platform ="PC", price = 00.00)
        
        g4 = Game(title = "Apex Legends", image = "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Apex_legends_cover.jpg/220px-Apex_legends_cover.jpg", genre = "Battle Royale Shooter", platform ="PC", price = 00.00)

        g5 = Game(title = "Assassin's Creed Origins", image = "https://upload.wikimedia.org/wikipedia/en/4/4a/Assassin%27s_Creed_Origins_Cover_Art.png", genre = "RPG", platform ="PC", price = 59.99)

        g6 = Game(title = "Batman: Arkham City", image = "https://upload.wikimedia.org/wikipedia/en/0/00/Batman_Arkham_City_Game_Cover.jpg", genre = "RPG", platform ="PC", price = 29.99)

        g7 = Game(title = "Crysis", image = "https://upload.wikimedia.org/wikipedia/en/e/e9/Crysis_Cover.jpg", genre = "RPG Shooter", platform ="PC", price = 14.99)

        g8 = Game(title = "Guild Wars 2", image = "https://m.media-amazon.com/images/M/MV5BZjQzMWMxMDEtYWQzZS00Njg0LWE1MTEtNDNkMzY3NjhkMDc1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg", genre = "MMO", platform ="PC", price = 00.00)

        g9 = Game(title = "Outer Wilds", image = "https://upload.wikimedia.org/wikipedia/en/f/f6/Outer_Wilds_Steam_artwork.jpg", genre = "Action-Adventure", platform ="PC", price = 24.99)

        g10 = Game(title = "STAR WARS Jedi: Fallen Order", image = "https://lumiere-a.akamaihd.net/v1/images/image_25a0f282.jpeg", genre = "Action-Adventure", platform ="PC", price = 39.99)

        g11 = Game(title = "God of War (2018)", image = "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg", genre = "Action-Adventure", platform ="PC", price = 49.99)

        g12 = Game(title = "Sly 2: Band of Thieves", image = "https://m.media-amazon.com/images/I/51EdyufYBzL.jpg", genre = "Platformer", platform ="PS2", price = 15.99)

        g13 = Game(title = "Ratchet and Clank", image = "https://upload.wikimedia.org/wikipedia/en/b/b6/RaCbox.jpg", genre = "Platformer Shooter", platform ="PS2", price = 14.99)

        g14 = Game(title = "Jak II", image = "https://upload.wikimedia.org/wikipedia/en/b/b3/JakIIbox.jpg", genre = "Platformer Shooter", platform ="PS2", price = 20.99)

        g15 = Game(title = "Sly 3: Honor Among Thieves", image = "https://upload.wikimedia.org/wikipedia/en/c/c4/Sly_3.jpg", genre = "Platformer", platform ="PS2", price = 24.99)

        games = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15]


        # c1 = Comment(score = "5", content = "Great game", game_id = "1", user_id = "1")

        # comments = [c1]




        # db.session.add_all(comments)
        db.session.add_all(games)
        db.session.commit()