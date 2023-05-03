"""back to table

Revision ID: 869cbcfb266d
Revises: da7ae0cc9db1
Create Date: 2023-05-03 05:58:12.074716

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '869cbcfb266d'
down_revision = 'da7ae0cc9db1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followee_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followee_id'], ['users.id'], name=op.f('fk_followers_followee_id_users')),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name=op.f('fk_followers_follower_id_users'))
    )
    op.drop_table('follows')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('follower_id', sa.INTEGER(), nullable=False),
    sa.Column('followee_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['followee_id'], ['users.id'], name='fk_follows_followee_id_users'),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name='fk_follows_follower_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('followers')
    # ### end Alembic commands ###
