"""added favorite model

Revision ID: 1d01898350ec
Revises: 4b47f8594d04
Create Date: 2023-04-27 20:50:52.242854

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1d01898350ec'
down_revision = '4b47f8594d04'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_image', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('game_title', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_column('game_title')
        batch_op.drop_column('game_image')

    # ### end Alembic commands ###
