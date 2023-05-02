"""rebuilding tables

Revision ID: ed8d87bf93be
Revises: d61fbb377753
Create Date: 2023-05-02 10:14:23.179192

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed8d87bf93be'
down_revision = 'd61fbb377753'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('friendships', schema=None) as batch_op:
        batch_op.drop_index('ix_friendships_user_id')

    op.drop_table('friendships')
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_column('game_image')

    op.create_table('friendships',
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('friend_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], name='fk_friendships_friend_id_users'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_friendships_user_id_users')
    )
    with op.batch_alter_table('friendships', schema=None) as batch_op:
        batch_op.create_index('ix_friendships_user_id', ['user_id'], unique=False)

    # ### end Alembic commands ###